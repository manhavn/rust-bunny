<script lang="ts">
  import type { Credential, Operation, RequestBodySchema, WebToken } from './types'

  let token = $state(sessionStorage.getItem('bunny-web-token') ?? '')
  let authenticated = $state(false)
  let loginError = $state('')
  let operations = $state<Operation[]>([])
  let credentials = $state<Credential[]>([])
  let webTokens = $state<WebToken[]>([])
  let activeGroup = $state('dashboard')
  let selected = $state<Operation | null>(null)
  let sidebarOpen = $state(false)
  let search = $state('')
  let params = $state<Record<string, string>>({})
  let queryText = $state('')
  let bodyText = $state('{}')
  let bodyExample = $state<string | null>(null)
  let bodySchema = $state<RequestBodySchema | null>(null)
  let result = $state('')
  let busy = $state(false)
  let theme = $state(localStorage.getItem('bunny-theme') ?? 'dark')
  let backupPassphrase = $state('')
  let importFile = $state<File | null>(null)
  let importReplace = $state(false)
  let settingsMessage = $state('')
  let credentialName = $state('')
  let credentialKey = $state('')
  let tokenName = $state('')
  let oneTimeToken = $state('')
  let uiMode = $state(localStorage.getItem('bunny-core-ui-mode') === 'on')

  const groups = $derived([...new Set(operations.map(operation => operation.group))])
  const groupOperations = $derived(
    operations.filter(operation => activeGroup === 'all' || operation.group === activeGroup),
  )
  const visibleOperations = $derived(
    groupOperations.filter(operation =>
      `${operation.id} ${operation.summary} ${operation.path}`.toLowerCase().includes(search.toLowerCase())
    )
  )
  function authHeaders() {
    return { authorization: `Bearer ${token}` }
  }

  function setUiMode(value: boolean) {
    uiMode = value
    selected = null
    localStorage.setItem('bunny-core-ui-mode', value ? 'on' : 'off')
  }

  async function executeOperation(
    operation: Operation,
    operationParams: Record<string, string> = {},
    query: [string, string][] = [],
    body: unknown = null,
  ) {
    const response = await fetch(`/api/operations/${encodeURIComponent(operation.id)}/run`, {
      method: 'POST',
      headers: { ...authHeaders(), 'content-type': 'application/json' },
      body: JSON.stringify({
        profile: 'default',
        params: operationParams,
        query,
        body,
        confirm: operation.destructive,
      }),
    })
    const text = await response.text()
    let payload: unknown = text
    try {
      payload = JSON.parse(text)
    } catch {
      // Binary and plain-text endpoints remain readable in the admin response.
    }
    if (!response.ok) {
      const message = typeof payload === 'object' && payload && 'error' in payload
        ? String(payload.error)
        : text || `Request failed with HTTP ${response.status}`
      throw new Error(message)
    }
    return payload
  }

  async function login() {
    loginError = ''
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ token }),
    })
    if (!response.ok) {
      loginError = 'Invalid or expired Web access token.'
      return
    }
    sessionStorage.setItem('bunny-web-token', token)
    authenticated = true
    await load()
  }

  async function load() {
    const [operationResponse, credentialResponse, tokenResponse] = await Promise.all([
      fetch('/api/operations', { headers: authHeaders() }),
      fetch('/api/credentials', { headers: authHeaders() }),
      fetch('/api/web-tokens', { headers: authHeaders() }),
    ])
    if (operationResponse.status === 401) {
      authenticated = false
      return
    }
    operations = await operationResponse.json()
    credentials = credentialResponse.ok ? await credentialResponse.json() : []
    webTokens = tokenResponse.ok ? await tokenResponse.json() : []
  }

  async function selectOperation(operation: Operation) {
    selected = operation
    params = {}
    queryText = ''
    bodyText = ''
    bodyExample = null
    bodySchema = null
    result = ''
    sidebarOpen = false
    const examples = await import('./generated/requestExamples')
    if (selected?.id !== operation.id) return
    bodyExample = examples.requestBodyExample(operation)
    bodySchema = examples.requestBodySchema(operation)
    bodyText = bodyExample ?? ''
  }

  function resetRequestBody() {
    bodyText = bodyExample ?? ''
  }

  async function runOperation() {
    if (!selected) return
    if (selected.destructive && !confirm(`Run destructive operation “${selected.summary}”?`)) return
    busy = true
    result = ''
    try {
      const query = queryText.split('&').filter(Boolean).map(pair => {
        const [key, value = ''] = pair.split('=')
        return [decodeURIComponent(key), decodeURIComponent(value)]
      })
      const payload = await executeOperation(
        selected,
        params,
        query as [string, string][],
        selected.method === 'GET' || !bodyText.trim() ? null : JSON.parse(bodyText),
      )
      result = typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2)
    } catch (error) {
      result = error instanceof Error ? error.message : String(error)
    } finally {
      busy = false
    }
  }

  function setTheme(value: string) {
    theme = value
    document.documentElement.dataset.theme = value
    localStorage.setItem('bunny-theme', value)
  }

  async function exportConfiguration(includeSecrets: boolean) {
    settingsMessage = ''
    const response = await fetch('/api/config/export', {
      method: 'POST',
      headers: { ...authHeaders(), 'content-type': 'application/json' },
      body: JSON.stringify({ include_secrets: includeSecrets, passphrase: includeSecrets ? backupPassphrase : null }),
    })
    if (!response.ok) {
      settingsMessage = (await response.json()).error ?? 'Export failed.'
      return
    }
    const blob = await response.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = includeSecrets ? 'bunny-full-backup.enc.json' : 'bunny-settings.json'
    link.click()
    URL.revokeObjectURL(link.href)
    settingsMessage = 'Export created successfully.'
  }

  async function importConfiguration() {
    if (!importFile) return
    settingsMessage = ''
    try {
      const data = JSON.parse(await importFile.text())
      const response = await fetch('/api/config/import', {
        method: 'POST',
        headers: { ...authHeaders(), 'content-type': 'application/json' },
        body: JSON.stringify({ data, passphrase: backupPassphrase || null, replace: importReplace }),
      })
      const payload = await response.json()
      settingsMessage = response.ok ? 'Configuration imported. Reloading data…' : payload.error
      if (response.ok) await load()
    } catch (error) {
      settingsMessage = error instanceof Error ? error.message : String(error)
    }
  }

  async function addCredential() {
    if (!credentialName || !credentialKey) return
    const response = await fetch('/api/credentials', {
      method: 'POST',
      headers: { ...authHeaders(), 'content-type': 'application/json' },
      body: JSON.stringify({ profile: 'default', name: credentialName, api_key: credentialKey }),
    })
    credentialKey = ''
    if (response.ok) {
      credentialName = ''
      await load()
    } else {
      settingsMessage = (await response.json()).error
    }
  }

  async function selectCredential(id: string) {
    await fetch(`/api/credentials/${id}/select`, { method: 'POST', headers: authHeaders() })
    await load()
  }

  async function renameCredential(credential: Credential) {
    const name = prompt('Credential name', credential.name)
    if (!name || name === credential.name) return
    await fetch(`/api/credentials/${credential.id}`, {
      method: 'PATCH',
      headers: { ...authHeaders(), 'content-type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    await load()
  }

  async function deleteCredential(credential: Credential) {
    if (!confirm(`Delete credential “${credential.name}”?`)) return
    await fetch(`/api/credentials/${credential.id}`, { method: 'DELETE', headers: authHeaders() })
    await load()
  }

  async function createWebToken() {
    if (!tokenName) return
    const response = await fetch('/api/web-tokens', {
      method: 'POST',
      headers: { ...authHeaders(), 'content-type': 'application/json' },
      body: JSON.stringify({ name: tokenName, scopes: ['read', 'operate'] }),
    })
    const payload = await response.json()
    if (response.ok) {
      oneTimeToken = payload.token
      tokenName = ''
      await load()
    }
  }

  async function rotateWebToken(id: string) {
    if (!confirm('Rotate this token? The old value will stop working.')) return
    const response = await fetch(`/api/web-tokens/${id}/rotate`, { method: 'POST', headers: authHeaders() })
    const payload = await response.json()
    if (response.ok) {
      oneTimeToken = payload.token
      await load()
    }
  }

  async function revokeWebToken(id: string) {
    if (!confirm('Revoke this Web token?')) return
    await fetch(`/api/web-tokens/${id}/revoke`, { method: 'POST', headers: authHeaders() })
    await load()
  }

  async function deleteWebToken(id: string) {
    if (!confirm('Permanently delete this Web token metadata?')) return
    await fetch(`/api/web-tokens/${id}`, { method: 'DELETE', headers: authHeaders() })
    await load()
  }

  $effect(() => {
    document.documentElement.dataset.theme = theme
    if (token) login()
  })
</script>

{#if !authenticated}
  <main class="auth-page">
    <section class="auth-card">
      <div class="logo">B</div>
      <p class="eyebrow">LOCAL CONTROL PLANE</p>
      <h1>Welcome to Bunny CLI</h1>
      <p class="muted">Use a Web access token generated by the CLI. Your Bunny API keys never reach the browser.</p>
      <form onsubmit={(event) => { event.preventDefault(); login() }}>
        <label for="token">Web access token</label>
        <input id="token" bind:value={token} type="password" autocomplete="current-password" placeholder="bwt_v1_…" required />
        {#if loginError}<p class="error">{loginError}</p>{/if}
        <button class="primary">Open dashboard</button>
      </form>
      <code>bunny web-token create --name browser</code>
    </section>
  </main>
{:else}
  <div class="app-shell">
    <header class="topbar">
      <button class="icon-button mobile-only" onclick={() => sidebarOpen = !sidebarOpen} aria-label="Open navigation">☰</button>
      <div class="brand"><span class="brand-mark">B</span><strong>Bunny CLI</strong></div>
      <div class="top-actions">
        <span class="connection"><i></i> Local</span>
        <button
          class="ui-mode-toggle"
          class:enabled={uiMode}
          type="button"
          role="switch"
          aria-checked={uiMode}
          title="Switch Core API groups between operations documentation and admin UI"
          onclick={() => setUiMode(!uiMode)}
        >
          <span>UI mode</span><i class:active={!uiMode}>OFF</i><i class:active={uiMode}>ON</i>
        </button>
        <button class="icon-button" onclick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </header>

    <div class="layout">
      <aside class:open={sidebarOpen} class="sidebar">
        <nav>
          <button class:active={activeGroup === 'dashboard'} onclick={() => { activeGroup = 'dashboard'; selected = null; sidebarOpen = false }}>
            <span>⌂</span> Dashboard
          </button>
          <button class:active={activeGroup === 'settings'} onclick={() => { activeGroup = 'settings'; selected = null; sidebarOpen = false }}>
            <span>⚙</span> Settings
          </button>
          <button class:active={activeGroup === 'credentials'} onclick={() => { activeGroup = 'credentials'; selected = null; sidebarOpen = false }}>
            <span>◆</span> Credentials <small>{credentials.length}</small>
          </button>
          <button class:active={activeGroup === 'tokens'} onclick={() => { activeGroup = 'tokens'; selected = null; sidebarOpen = false }}>
            <span>♢</span> Web tokens <small>{webTokens.length}</small>
          </button>
          <p class="nav-label">CORE API</p>
          <button class:active={activeGroup === 'all'} onclick={() => { activeGroup = 'all'; sidebarOpen = false }}>
            <span>⌘</span> All operations <small>{operations.length}</small>
          </button>
          {#each groups as group (group)}
            <button class:active={activeGroup === group} onclick={() => { activeGroup = group; selected = null; sidebarOpen = false }}>
              <span>◇</span> {group}<small>{operations.filter(item => item.group === group).length}</small>
            </button>
          {/each}
        </nav>
      </aside>
      {#if sidebarOpen}<button class="drawer-overlay" onclick={() => sidebarOpen = false} aria-label="Close navigation"></button>{/if}

      <main class="workspace">
        {#if activeGroup === 'dashboard' && !selected}
          {#await import('./components/DashboardView.svelte') then { default: DashboardView }}
            <DashboardView {operations} {credentials} />
          {/await}
        {:else if activeGroup === 'credentials' && !selected}
          {#await import('./components/CredentialManager.svelte') then { default: CredentialManager }}
            <CredentialManager
              {credentials}
              bind:name={credentialName}
              bind:apiKey={credentialKey}
              onAdd={addCredential}
              onSelect={selectCredential}
              onRename={renameCredential}
              onDelete={deleteCredential}
            />
          {/await}
        {:else if activeGroup === 'tokens' && !selected}
          {#await import('./components/TokenManager.svelte') then { default: TokenManager }}
            <TokenManager
              tokens={webTokens}
              bind:name={tokenName}
              {oneTimeToken}
              onCreate={createWebToken}
              onRotate={rotateWebToken}
              onRevoke={revokeWebToken}
              onDelete={deleteWebToken}
            />
          {/await}
        {:else if activeGroup === 'settings' && !selected}
          {#await import('./components/SettingsView.svelte') then { default: SettingsView }}
            <SettingsView
              bind:backupPassphrase
              bind:importFile
              bind:importReplace
              message={settingsMessage}
              onExport={exportConfiguration}
              onImport={importConfiguration}
            />
          {/await}
        {:else if selected}
          {#await import('./components/OperationRunner.svelte') then { default: OperationRunner }}
            <OperationRunner
              operation={selected}
              bind:params
              bind:queryText
              bind:bodyText
              {bodyExample}
              {bodySchema}
              {result}
              {busy}
              onBack={() => selected = null}
              onRun={runOperation}
              onResetBody={resetRequestBody}
            />
          {/await}
        {:else if uiMode}
          {#await import('./components/AdminResourceView.svelte') then { default: AdminResourceView }}
            <AdminResourceView
              group={activeGroup}
              operations={groupOperations}
              allOperations={operations}
              onExecute={executeOperation}
              onNavigate={(group) => {
                activeGroup = group
                selected = null
              }}
            />
          {:catch error}
            <section class="panel error">Could not load admin UI: {error.message}</section>
          {/await}
        {:else}
          <section class="page-head">
            <div><p class="eyebrow">CORE API</p><h1>{activeGroup === 'all' ? 'All operations' : activeGroup}</h1><p class="muted">{visibleOperations.length} available operations</p></div>
            <input class="search" bind:value={search} type="search" placeholder="Search operations…" />
          </section>
          <section class="operation-list">
            {#each visibleOperations as operation (operation.id)}
              <button class="operation-card" onclick={() => selectOperation(operation)}>
                <span class={`method method-${operation.method.toLowerCase()}`}>{operation.method}</span>
                <span><strong>{operation.summary}</strong><code>{operation.path}</code></span><i>›</i>
              </button>
            {/each}
          </section>
        {/if}
      </main>
    </div>
  </div>
{/if}
