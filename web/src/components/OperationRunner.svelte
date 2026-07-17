<script lang="ts">
  import type { Operation } from '../types'

  let {
    operation,
    params = $bindable(),
    queryText = $bindable(),
    bodyText = $bindable(),
    result,
    busy,
    onBack,
    onRun,
  }: {
    operation: Operation
    params: Record<string, string>
    queryText: string
    bodyText: string
    result: string
    busy: boolean
    onBack: () => void
    onRun: () => void
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
    {#if operation.method !== 'GET'}
      <label>JSON body<textarea bind:value={bodyText} rows="12" spellcheck="false"></textarea></label>
    {/if}
    <button class:danger-button={operation.destructive} class="primary" disabled={busy} onclick={onRun}>{busy ? 'Running…' : 'Run operation'}</button>
  </div>
  <div class="panel response-panel"><h2>Response</h2><pre>{result || 'Run the operation to inspect its response.'}</pre></div>
</section>
