<script lang="ts">
  import type { Operation } from '../types'

  let {
    operation,
    params = $bindable(),
    queryText = $bindable(),
    bodyText = $bindable(),
    bodyExample,
    result,
    busy,
    onBack,
    onRun,
    onResetBody,
  }: {
    operation: Operation
    params: Record<string, string>
    queryText: string
    bodyText: string
    bodyExample: string | null
    result: string
    busy: boolean
    onBack: () => void
    onRun: () => void
    onResetBody: () => void
  } = $props()

  const pathKeys = $derived([...operation.path.matchAll(/\{([^}]+)\}/g)].map(match => match[1]))
</script>

<section class="page-head">
  <button class="back" onclick={onBack}>← Operations</button>
  <div class="operation-title">
    <span class:danger={operation.destructive} class="method">{operation.method}</span>
    <div><h1>{operation.summary}</h1><code>{operation.path}</code></div>
  </div>
</section>
<section class="operation-grid">
  <div class="panel form-panel">
    <h2>Request</h2>
    {#each pathKeys as key (key)}
      <label>{key}<input bind:value={params[key]} placeholder={`Path parameter: ${key}`} /></label>
    {/each}
    <label>Query string<input bind:value={queryText} placeholder="page=1&perPage=100" /></label>
    {#if bodyExample !== null}
      <label>
        <span class="field-heading">
          JSON body
          <button class="text-button" type="button" onclick={onResetBody}>Restore Bunny example</button>
        </span>
        <textarea bind:value={bodyText} rows="12" spellcheck="false"></textarea>
        <small class="field-help">Pre-filled from the official bunny.net Core OpenAPI schema.</small>
      </label>
    {/if}
    <button class:danger-button={operation.destructive} class="primary" disabled={busy} onclick={onRun}>{busy ? 'Running…' : 'Run operation'}</button>
  </div>
  <div class="panel response-panel"><h2>Response</h2><pre>{result || 'Run the operation to inspect its response.'}</pre></div>
</section>
