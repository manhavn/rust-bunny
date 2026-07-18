<script lang="ts">
  import type { Operation, RequestBodySchema } from '../types'

  let {
    operation,
    params = $bindable(),
    queryText = $bindable(),
    bodyText = $bindable(),
    bodyExample,
    bodySchema,
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
    bodySchema: RequestBodySchema | null
    result: string
    busy: boolean
    onBack: () => void
    onRun: () => void
    onResetBody: () => void
  } = $props()

  const pathKeys = $derived([...operation.path.matchAll(/\{([^}]+)\}/g)].map(match => match[1]))
  let copyLabel = $state('Copy cURL')
  let formMode = $state(false)

  function shellQuote(value: string) {
    return `'${value.replaceAll("'", `'"'"'`)}'`
  }

  function buildCurl() {
    const path = operation.path.replace(/\{([^}]+)\}/g, (_, key: string) =>
      encodeURIComponent(params[key] || key.toUpperCase()),
    )
    const query = queryText.trim().replace(/^\?/, '')
    const url = `https://api.bunny.net${path}${query ? `?${query}` : ''}`
    const parts = [
      `curl --request ${operation.method}`,
      `  --url ${shellQuote(url)}`,
      `  --header ${shellQuote('AccessKey: YOUR_BUNNY_API_KEY')}`,
    ]
    if (bodyExample !== null && bodyText.trim()) {
      parts.push(
        `  --header ${shellQuote('Content-Type: application/json')}`,
        `  --data-raw ${shellQuote(bodyText.trim())}`,
      )
    }
    return parts.join(' \\\n')
  }

  function legacyCopy(value: string) {
    const textarea = document.createElement('textarea')
    textarea.value = value
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.append(textarea)
    textarea.select()
    const copied = document.execCommand('copy')
    textarea.remove()
    if (!copied) throw new Error('Clipboard copy was rejected')
  }

  async function copyCurl() {
    try {
      const curl = buildCurl()
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(curl)
      } else {
        legacyCopy(curl)
      }
      copyLabel = 'Copied!'
    } catch {
      try {
        legacyCopy(buildCurl())
        copyLabel = 'Copied!'
      } catch {
        copyLabel = 'Copy failed'
      }
    }
    window.setTimeout(() => copyLabel = 'Copy cURL', 1800)
  }
</script>

<section class="page-head">
  <button class="back" onclick={onBack}>← Operations</button>
  <div class="operation-title">
    <span class={`method method-${operation.method.toLowerCase()}`}>{operation.method}</span>
    <div><h1>{operation.summary}</h1><code>{operation.path}</code></div>
  </div>
</section>
<section class="operation-grid">
  <div class={`request-column${formMode ? ' form-mode' : ''}`}>
    <div class="panel form-panel">
      <div class="request-heading">
        <h2>Request</h2>
        <div class="request-actions">
          <button
            class="form-mode-switch"
            class:enabled={formMode}
            type="button"
            role="switch"
            aria-checked={formMode}
            aria-disabled={!bodySchema}
            title={bodySchema
              ? 'Toggle a structured HTML form generated from the Bunny OpenAPI schema'
              : 'This operation has no JSON request body in the Bunny OpenAPI schema'}
            onclick={() => {
              if (bodySchema) formMode = !formMode
            }}
          >
            <span>Form mode</span>
            <i class:active={!formMode}>OFF</i>
            <i class:active={formMode}>ON</i>
          </button>
          <button class="secondary curl-button" type="button" onclick={copyCurl}>{copyLabel}</button>
        </div>
      </div>
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

    {#if formMode && bodySchema}
      {#await import('./StructuredRequestForm.svelte') then { default: StructuredRequestForm }}
        <StructuredRequestForm
          schema={bodySchema}
          bind:bodyText
          {busy}
          destructive={operation.destructive}
          onSubmit={onRun}
        />
      {:catch error}
        <div class="panel error">Could not load form mode: {error.message}</div>
      {/await}
    {/if}
  </div>
  <div class="panel response-panel"><h2>Response</h2><pre>{result || 'Run the operation to inspect its response.'}</pre></div>
</section>
