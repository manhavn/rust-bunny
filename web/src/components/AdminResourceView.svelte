<script lang="ts">
  import type { Operation, RequestBodySchema } from '../types'

  type ExecuteOperation = (
    operation: Operation,
    params?: Record<string, string>,
    query?: [string, string][],
    body?: unknown,
  ) => Promise<unknown>

  let {
    group,
    operations,
    allOperations,
    onExecute,
    onNavigate,
  }: {
    group: string
    operations: Operation[]
    allOperations: Operation[]
    onExecute: ExecuteOperation
    onNavigate: (group: string) => void
  } = $props()

  let records = $state<Record<string, unknown>[]>([])
  let rawResponse = $state<unknown>(null)
  let loading = $state(false)
  let message = $state('')
  let search = $state('')
  let action = $state<Operation | null>(null)
  let actionRecord = $state<Record<string, unknown> | null>(null)
  let actionParams = $state<Record<string, string>>({})
  let actionBody = $state('')
  let actionSchema = $state<RequestBodySchema | null>(null)
  let actionBusy = $state(false)

  const listOperation = $derived(
    operations.find(item => item.id.endsWith('.list'))
      ?? operations.find(item => item.method === 'GET' && !item.path.includes('{'))
      ?? null,
  )
  const resourcePrefix = $derived(listOperation?.id.replace(/\.list$/, '') ?? '')
  const resourceOperations = $derived(
    resourcePrefix
      ? operations.filter(item => item.id === resourcePrefix || item.id.startsWith(`${resourcePrefix}.`))
      : operations,
  )
  const createOperation = $derived(
    resourceOperations.find(item => item.id.endsWith('.create'))
      ?? resourceOperations.find(item => /\b(add|create)\b/i.test(item.summary) && !item.path.includes('{'))
      ?? null,
  )
  const getOperation = $derived(
    resourceOperations.find(item => item.id.endsWith('.get') && item.path.includes('{')) ?? null,
  )
  const updateOperation = $derived(
    resourceOperations.find(item => item.id.endsWith('.update')) ?? null,
  )
  const deleteOperation = $derived(
    resourceOperations.find(item => item.id.endsWith('.delete')) ?? null,
  )
  const moreOperations = $derived(
    resourceOperations.filter(item =>
      ![listOperation?.id, createOperation?.id, getOperation?.id, updateOperation?.id, deleteOperation?.id]
        .includes(item.id),
    ),
  )
  const columns = $derived(columnNames(records))
  const filteredRecords = $derived(
    records.filter(record => JSON.stringify(record).toLowerCase().includes(search.toLowerCase())),
  )
  const groupedOperations = $derived(
    [...new Set(allOperations.map(item => item.group))].map(name => ({
      name,
      count: allOperations.filter(item => item.group === name).length,
      capabilities: capabilityLabels(allOperations.filter(item => item.group === name)),
    })),
  )

  $effect(() => {
    const currentGroup = group
    if (currentGroup !== 'all') void refresh(currentGroup)
  })

  function capabilityLabels(items: Operation[]) {
    const labels = []
    if (items.some(item => item.id.endsWith('.list') || item.method === 'GET')) labels.push('Browse')
    if (items.some(item => item.method === 'POST' || item.method === 'PUT')) labels.push('Manage')
    if (items.some(item => item.method === 'DELETE')) labels.push('Delete')
    return labels
  }

  function normalizeRecords(payload: unknown): Record<string, unknown>[] {
    if (Array.isArray(payload)) return payload.filter(item => item && typeof item === 'object')
    if (!payload || typeof payload !== 'object') return []
    const object = payload as Record<string, unknown>
    for (const key of ['Items', 'items', 'Records', 'records', 'Data', 'data']) {
      if (Array.isArray(object[key])) {
        return object[key].filter(item => item && typeof item === 'object') as Record<string, unknown>[]
      }
    }
    return [object]
  }

  function columnNames(items: Record<string, unknown>[]) {
    const names: string[] = []
    for (const item of items.slice(0, 10)) {
      for (const [key, value] of Object.entries(item)) {
        if (!names.includes(key) && (value === null || typeof value !== 'object')) names.push(key)
        if (names.length >= 6) return names
      }
    }
    return names
  }

  function displayValue(value: unknown) {
    if (value === null || value === undefined) return '—'
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    if (typeof value === 'object') return JSON.stringify(value)
    return String(value)
  }

  function rowValue(record: Record<string, unknown>, key: string) {
    const entry = Object.entries(record).find(([name]) => name.toLowerCase() === key.toLowerCase())
    return entry?.[1]
  }

  function pathKeys(operation: Operation) {
    return [...operation.path.matchAll(/\{([^}]+)\}/g)].map(match => match[1])
  }

  function paramsFromRecord(operation: Operation, record: Record<string, unknown> | null) {
    return Object.fromEntries(pathKeys(operation).map(key => {
      const direct = record ? rowValue(record, key) : undefined
      const fallback = record ? rowValue(record, 'id') ?? rowValue(record, 'guid') : undefined
      return [key, direct === undefined ? String(fallback ?? '') : String(direct)]
    }))
  }

  async function refresh(expectedGroup = group) {
    if (!listOperation) {
      records = []
      rawResponse = null
      return
    }
    loading = true
    message = ''
    try {
      const payload = await onExecute(listOperation)
      if (group !== expectedGroup) return
      rawResponse = payload
      records = normalizeRecords(payload)
    } catch (error) {
      message = error instanceof Error ? error.message : String(error)
      records = []
    } finally {
      loading = false
    }
  }

  async function openAction(operation: Operation, record: Record<string, unknown> | null = null) {
    action = operation
    actionRecord = record
    actionParams = paramsFromRecord(operation, record)
    message = ''
    const examples = await import('../generated/requestExamples')
    if (action?.id !== operation.id) return
    actionSchema = examples.requestBodySchema(operation)
    const example = examples.requestBodyExample(operation)
    if (!example) {
      actionBody = ''
      return
    }
    const body = JSON.parse(example) as Record<string, unknown>
    if (record) {
      for (const key of Object.keys(body)) {
        const value = rowValue(record, key)
        if (value !== undefined) body[key] = value
      }
    }
    actionBody = JSON.stringify(body, null, 2)
  }

  function closeAction() {
    action = null
    actionRecord = null
    actionParams = {}
    actionBody = ''
    actionSchema = null
  }

  async function submitAction() {
    if (!action) return
    if (action.destructive && !confirm(`Run “${action.summary}”?`)) return
    actionBusy = true
    message = ''
    try {
      const payload = await onExecute(
        action,
        actionParams,
        [],
        actionBody.trim() ? JSON.parse(actionBody) : null,
      )
      message = `${action.summary} completed successfully.`
      rawResponse = payload
      if (action.method === 'GET') {
        const normalized = normalizeRecords(payload)
        if (normalized.length) actionRecord = normalized[0]
      } else {
        closeAction()
        await refresh()
      }
    } catch (error) {
      message = error instanceof Error ? error.message : String(error)
    } finally {
      actionBusy = false
    }
  }

  async function deleteRecord(record: Record<string, unknown>) {
    if (!deleteOperation || !confirm(`Run “${deleteOperation.summary}” for this item?`)) return
    actionBusy = true
    try {
      await onExecute(deleteOperation, paramsFromRecord(deleteOperation, record))
      message = 'Item deleted successfully.'
      await refresh()
    } catch (error) {
      message = error instanceof Error ? error.message : String(error)
    } finally {
      actionBusy = false
    }
  }
</script>

{#if group === 'all'}
  <section class="page-head">
    <div><p class="eyebrow">ADMIN UI</p><h1>Core resources</h1><p class="muted">Manage bunny.net resources without navigating raw operations.</p></div>
  </section>
  <section class="resource-hub">
    {#each groupedOperations as item (item.name)}
      <button class="resource-tile" onclick={() => onNavigate(item.name)}>
        <span class="resource-icon">◇</span>
        <span><strong>{item.name}</strong><small>{item.count} capabilities</small></span>
        <span class="resource-capabilities">
          {#each item.capabilities as capability (capability)}<i>{capability}</i>{/each}
        </span>
        <b>›</b>
      </button>
    {/each}
  </section>
{:else}
  <section class="page-head admin-page-head">
    <div><p class="eyebrow">ADMIN UI</p><h1>{group}</h1><p class="muted">Browse and manage {group} resources.</p></div>
    <div class="admin-toolbar">
      {#if createOperation}<button class="primary" onclick={() => openAction(createOperation)}>＋ Create</button>{/if}
      <button class="secondary" disabled={loading || !listOperation} onclick={() => refresh()}>
        {loading ? 'Refreshing…' : '↻ Refresh'}
      </button>
    </div>
  </section>

  {#if message}<div class:error={!message.includes('success')} class="admin-message">{message}</div>{/if}

  {#if action}
    <section class="panel admin-action-panel">
      <div class="admin-action-heading">
        <div><p class="eyebrow">ACTION</p><h2>{action.summary}</h2><code>{action.method} {action.path}</code></div>
        <button class="icon-button" aria-label="Close action" onclick={closeAction}>×</button>
      </div>
      {#each pathKeys(action) as key (key)}
        <label>{key}<input bind:value={actionParams[key]} placeholder={`Required path value: ${key}`} /></label>
      {/each}
      {#if actionSchema}
        {#await import('./StructuredRequestForm.svelte') then { default: StructuredRequestForm }}
          <StructuredRequestForm
            schema={actionSchema}
            bind:bodyText={actionBody}
            busy={actionBusy}
            destructive={action.destructive}
            onSubmit={submitAction}
          />
        {:catch error}
          <div class="error">Could not load the request form: {error.message}</div>
        {/await}
      {:else}
        <button class:danger-button={action.destructive} class="primary" disabled={actionBusy} onclick={submitAction}>
          {actionBusy ? 'Running…' : action.method === 'GET' ? 'Load details' : 'Run action'}
        </button>
      {/if}
      {#if actionRecord}<pre class="record-details">{JSON.stringify(actionRecord, null, 2)}</pre>{/if}
    </section>
  {/if}

  {#if listOperation}
    <section class="panel resource-table-panel">
      <div class="table-heading">
        <div><h2>Resources</h2><small>{filteredRecords.length} items</small></div>
        <input class="search" type="search" bind:value={search} placeholder="Filter resources…" />
      </div>
      {#if loading}
        <div class="admin-empty">Loading resources…</div>
      {:else if filteredRecords.length === 0}
        <div class="admin-empty">No resources returned by this account.</div>
      {:else}
        <div class="table-scroll">
          <table class="resource-table">
            <thead><tr>{#each columns as column (column)}<th>{column}</th>{/each}<th>Actions</th></tr></thead>
            <tbody>
              {#each filteredRecords as record, index (`${index}-${displayValue(rowValue(record, 'id'))}`)}
                <tr>
                  {#each columns as column (column)}<td title={displayValue(record[column])}>{displayValue(record[column])}</td>{/each}
                  <td>
                    <div class="row-actions">
                      {#if getOperation}<button onclick={() => openAction(getOperation, record)}>View</button>{/if}
                      {#if updateOperation}<button onclick={() => openAction(updateOperation, record)}>Edit</button>{/if}
                      {#if deleteOperation}<button class="text-danger" onclick={() => deleteRecord(record)}>Delete</button>{/if}
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </section>
  {:else}
    <section class="panel action-dashboard">
      <div><h2>Available actions</h2><p class="muted">This resource does not expose a collection endpoint.</p></div>
      <div class="admin-action-grid">
        {#each operations as operation (operation.id)}
          <button onclick={() => openAction(operation)}>
            <span class={`method method-${operation.method.toLowerCase()}`}>{operation.method}</span>
            <span><strong>{operation.summary}</strong><code>{operation.path}</code></span>
          </button>
        {/each}
      </div>
    </section>
  {/if}

  {#if moreOperations.length}
    <details class="panel more-actions">
      <summary>More actions ({moreOperations.length})</summary>
      <div class="admin-action-grid">
        {#each moreOperations as operation (operation.id)}
          <button onclick={() => openAction(operation)}>
            <span class={`method method-${operation.method.toLowerCase()}`}>{operation.method}</span>
            <span><strong>{operation.summary}</strong><code>{operation.path}</code></span>
          </button>
        {/each}
      </div>
    </details>
  {/if}

  {#if rawResponse !== null && records.length === 0}
    <details class="panel raw-response"><summary>Raw API response</summary><pre>{JSON.stringify(rawResponse, null, 2)}</pre></details>
  {/if}
{/if}
