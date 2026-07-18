<script lang="ts">
  import type { RequestBodySchema, RequestFieldOption, RequestFieldSchema } from '../types'

  let {
    schema,
    bodyText = $bindable(),
    busy,
    destructive,
    onSubmit,
  }: {
    schema: RequestBodySchema
    bodyText: string
    busy: boolean
    destructive: boolean
    onSubmit: () => void
  } = $props()

  function parseBody(value: string): Record<string, unknown> {
    try {
      const parsed = JSON.parse(value)
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
    } catch {
      return {}
    }
  }

  let values = $state<Record<string, unknown>>(parseBody(bodyText))
  let lastWritten = ''

  $effect(() => {
    if (bodyText !== lastWritten) values = parseBody(bodyText)
  })

  function commit(name: string, value: unknown) {
    values[name] = value
    lastWritten = JSON.stringify(values, null, 2)
    bodyText = lastWritten
  }

  function inputValue(name: string) {
    const value = values[name]
    return value === null || value === undefined ? '' : String(value)
  }

  function jsonValue(name: string) {
    const value = values[name]
    return JSON.stringify(value ?? null, null, 2)
  }

  function parseJsonField(name: string, value: string) {
    try {
      commit(name, JSON.parse(value))
    } catch {
      // Keep the last valid JSON value while the user is still typing.
    }
  }

  function optionsFor(field: RequestFieldSchema): RequestFieldOption[] | null {
    if (field.options?.length) return field.options
    if (field.name.toLowerCase() === 'ttl') {
      return [
        { value: 60, label: '1 minute' },
        { value: 300, label: '5 minutes' },
        { value: 900, label: '15 minutes' },
        { value: 1800, label: '30 minutes' },
        { value: 3600, label: '1 hour' },
        { value: 21600, label: '6 hours' },
        { value: 43200, label: '12 hours' },
        { value: 86400, label: '1 day' },
      ]
    }
    return null
  }

  function submit(event: SubmitEvent) {
    event.preventDefault()
    onSubmit()
  }
</script>

<div class="panel structured-form-panel">
  <div>
    <p class="eyebrow">FORM MODE</p>
    <h2>Structured JSON body</h2>
    <p class="muted">Fields and choices are generated from the official Bunny Core OpenAPI schema.</p>
  </div>

  <form class="schema-form" onsubmit={submit}>
    <div class="schema-field-grid">
      {#each schema.fields as field (field.name)}
        {@const options = optionsFor(field)}
        <label class:wide-field={field.type === 'array' || field.type === 'object'}>
          <span class="schema-field-title">
            {field.name}
            {#if field.required}<b>Required</b>{/if}
          </span>

          {#if options}
            <select
              value={JSON.stringify(values[field.name])}
              onchange={event => commit(field.name, JSON.parse(event.currentTarget.value))}
            >
              {#each options as option (option.value)}
                <option value={JSON.stringify(option.value)}>{option.label} ({option.value})</option>
              {/each}
            </select>
          {:else if field.type === 'boolean'}
            <label class="boolean-field">
              <input
                type="checkbox"
                checked={Boolean(values[field.name])}
                onchange={event => commit(field.name, event.currentTarget.checked)}
              />
              <span>{values[field.name] ? 'Enabled' : 'Disabled'}</span>
            </label>
          {:else if field.type === 'integer' || field.type === 'number'}
            <input
              type="number"
              value={inputValue(field.name)}
              min={field.minimum}
              max={field.maximum}
              step={field.type === 'integer' ? 1 : 'any'}
              oninput={event => commit(
                field.name,
                event.currentTarget.value === '' ? null : Number(event.currentTarget.value),
              )}
            />
          {:else if field.type === 'array' || field.type === 'object'}
            <textarea
              rows="4"
              spellcheck="false"
              value={jsonValue(field.name)}
              oninput={event => parseJsonField(field.name, event.currentTarget.value)}
            ></textarea>
          {:else}
            <input
              type={field.format === 'date-time' ? 'datetime-local' : field.format === 'date' ? 'date' : 'text'}
              value={inputValue(field.name)}
              required={field.required}
              oninput={event => commit(field.name, event.currentTarget.value)}
            />
          {/if}

          {#if field.description}<small>{field.description}</small>{/if}
        </label>
      {/each}
    </div>

    <button class:danger-button={destructive} class="primary" disabled={busy} type="submit">
      {busy ? 'Running…' : 'Submit request'}
    </button>
  </form>
</div>
