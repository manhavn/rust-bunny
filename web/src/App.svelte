<script lang="ts">
  type Operation = {
    id: string
    group: string
    method: string
    path: string
    summary: string
    destructive: boolean
  }
  type Credential = {
    id: string
    profile_id: string
    name: string
    is_active: boolean
  }
  type WebToken = {
    id: string
    name: string
    scopes: string[]
    created_at: string
    expires_at: string | null
    revoked_at: string | null
  }

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

  const groups = $derived([...new Set(operations.map(operation => operation.group))])
  const visibleOperations = $derived(
    operations.filter(operation =>
      (activeGroup === 'all' || operation.group === activeGroup) &&
      `${operation.id} ${operation.summary} ${operation.path}`.toLowerCase().includes(search.toLowerCase())
    )
  )
  const pathKeys = $derived(
    selected ? [...selected.path.matchAll(/\{([^}]+)\}/g)].map(match => match[1]) : []
  )

  function authHeaders() {
    return { authorization: `Bearer ${token}` }
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

  function selectOperation(operation: Operation) {
    selected = operation
    params = {}
    result = ''
    sidebarOpen = false
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
      const response = await fetch(`/api/operations/${encodeURIComponent(selected.id)}/run`, {
        method: 'POST',
        headers: { ...authHeaders(), 'content-type': 'application/json' },
        body: JSON.stringify({
          profile: 'default',
          params,
          query,
          body: selected.method === 'GET' || !bodyText.trim() ? null : JSON.parse(bodyText),
          confirm: selected.destructive,
        }),
      })
      const text = await response.text()
      try { result = JSON.stringify(JSON.parse(text), null, 2) } catch { result = text }
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
          {#each groups as group}
            <button class:active={activeGroup === group} onclick={() => { activeGroup = group; selected = null; sidebarOpen = false }}>
              <span>◇</span> {group}<small>{operations.filter(item => item.group === group).length}</small>
            </button>
          {/each}
        </nav>
      </aside>
      {#if sidebarOpen}<button class="drawer-overlay" onclick={() => sidebarOpen = false} aria-label="Close navigation"></button>{/if}

      <main class="workspace">
        {#if activeGroup === 'dashboard' && !selected}
          <section class="page-head">
            <div><p class="eyebrow">OVERVIEW</p><h1>Control your Bunny network</h1><p class="muted">One secure workspace for Core API operations.</p></div>
          </section>
          <section class="stats">
            <article><span>Core operations</span><strong>{operations.length}</strong><small>Official API coverage</small></article>
            <article><span>Credentials</span><strong>{credentials.length}</strong><small>{credentials.filter(item => item.is_active).length} active</small></article>
            <article><span>Connection</span><strong class="success">Ready</strong><small>Local encrypted state</small></article>
          </section>
          <section class="panel">
            <div class="panel-head"><div><h2>Credentials</h2><p class="muted">Managed securely through the local vault.</p></div></div>
            <div class="record-grid">
              {#each credentials as credential}
                <article class="record"><span class="status-dot"></span><div><strong>{credential.name}</strong><small>{credential.profile_id}</small></div>{#if credential.is_active}<b>ACTIVE</b>{/if}</article>
              {:else}
                <div class="empty"><strong>No credentials yet</strong><span>Run <code>bunny credential add</code> to get started.</span></div>
              {/each}
            </div>
          </section>
        {:else if activeGroup === 'credentials' && !selected}
          <section class="page-head"><div><p class="eyebrow">SECURE VAULT</p><h1>Bunny credentials</h1><p class="muted">Create, select, rename, and remove account API keys.</p></div></section>
          <section class="management-layout">
            <div class="panel settings-card">
              <h2>Add credential</h2>
              <label>Name<input bind:value={credentialName} placeholder="production" /></label>
              <label>Account API key<input bind:value={credentialKey} type="password" autocomplete="new-password" /></label>
              <button class="primary" disabled={!credentialName || !credentialKey} onclick={addCredential}>Save credential</button>
            </div>
            <div class="panel item-list">
              <h2>Saved credentials</h2>
              {#each credentials as credential}
                <article class="managed-item">
                  <div><strong>{credential.name}</strong><small>{credential.id}</small></div>
                  {#if credential.is_active}<b class="active-badge">ACTIVE</b>{/if}
                  <div class="item-actions">
                    {#if !credential.is_active}<button onclick={() => selectCredential(credential.id)}>Use</button>{/if}
                    <button onclick={() => renameCredential(credential)}>Rename</button>
                    <button class="text-danger" onclick={() => deleteCredential(credential)}>Delete</button>
                  </div>
                </article>
              {:else}<div class="empty">No credentials saved.</div>{/each}
            </div>
          </section>
        {:else if activeGroup === 'tokens' && !selected}
          <section class="page-head"><div><p class="eyebrow">WEB SECURITY</p><h1>Web access tokens</h1><p class="muted">Tokens grant access to this local browser interface.</p></div></section>
          {#if oneTimeToken}<section class="one-time"><strong>Copy this token now — it will not be shown again.</strong><code>{oneTimeToken}</code><button onclick={() => navigator.clipboard.writeText(oneTimeToken)}>Copy</button></section>{/if}
          <section class="management-layout">
            <div class="panel settings-card">
              <h2>Create Web token</h2>
              <label>Name<input bind:value={tokenName} placeholder="my browser" /></label>
              <p class="muted">Default scopes: read and operate.</p>
              <button class="primary" disabled={!tokenName} onclick={createWebToken}>Create token</button>
            </div>
            <div class="panel item-list">
              <h2>Tokens</h2>
              {#each webTokens as webToken}
                <article class="managed-item">
                  <div><strong>{webToken.name}</strong><small>{webToken.scopes.join(', ')}</small></div>
                  <b class:revoked={webToken.revoked_at} class="active-badge">{webToken.revoked_at ? 'REVOKED' : 'ACTIVE'}</b>
                  <div class="item-actions">
                    {#if !webToken.revoked_at}<button onclick={() => rotateWebToken(webToken.id)}>Rotate</button><button onclick={() => revokeWebToken(webToken.id)}>Revoke</button>{/if}
                    <button class="text-danger" onclick={() => deleteWebToken(webToken.id)}>Delete</button>
                  </div>
                </article>
              {:else}<div class="empty">No Web tokens found.</div>{/each}
            </div>
          </section>
        {:else if activeGroup === 'settings' && !selected}
          <section class="page-head"><div><p class="eyebrow">APPLICATION</p><h1>Settings</h1><p class="muted">Portable configuration and encrypted backups.</p></div></section>
          <section class="settings-grid">
            <div class="panel settings-card">
              <h2>Export</h2>
              <p class="muted">A settings export contains no secrets. A full backup is encrypted and can restore this app on another machine.</p>
              <label>Backup passphrase<input bind:value={backupPassphrase} type="password" autocomplete="new-password" placeholder="Required for full backup" /></label>
              <div class="button-row"><button class="secondary" onclick={() => exportConfiguration(false)}>Export settings</button><button class="primary" disabled={!backupPassphrase} onclick={() => exportConfiguration(true)}>Full encrypted backup</button></div>
            </div>
            <div class="panel settings-card">
              <h2>Import</h2>
              <p class="muted">Select a settings export or encrypted full backup. Existing Web sessions are never restored.</p>
              <label>Backup file<input type="file" accept=".json,.enc" onchange={(event) => importFile = event.currentTarget.files?.[0] ?? null} /></label>
              <label class="check"><input bind:checked={importReplace} type="checkbox" /> Replace existing configuration</label>
              <button class="primary" disabled={!importFile} onclick={importConfiguration}>Import configuration</button>
            </div>
          </section>
          {#if settingsMessage}<p class="settings-message">{settingsMessage}</p>{/if}
        {:else if selected}
          <section class="page-head">
            <button class="back" onclick={() => selected = null}>← Operations</button>
            <div class="operation-title"><span class:danger={selected.destructive} class="method">{selected.method}</span><div><h1>{selected.summary}</h1><code>{selected.path}</code></div></div>
          </section>
          <section class="operation-grid">
            <div class="panel form-panel">
              <h2>Request</h2>
              {#each pathKeys as key}
                <label>{key}<input bind:value={params[key]} placeholder={`Path parameter: ${key}`} /></label>
              {/each}
              <label>Query string<input bind:value={queryText} placeholder="page=1&perPage=100" /></label>
              {#if selected.method !== 'GET'}
                <label>JSON body<textarea bind:value={bodyText} rows="12" spellcheck="false"></textarea></label>
              {/if}
              <button class:danger-button={selected.destructive} class="primary" disabled={busy} onclick={runOperation}>{busy ? 'Running…' : 'Run operation'}</button>
            </div>
            <div class="panel response-panel"><h2>Response</h2><pre>{result || 'Run the operation to inspect its response.'}</pre></div>
          </section>
        {:else}
          <section class="page-head">
            <div><p class="eyebrow">CORE API</p><h1>{activeGroup === 'all' ? 'All operations' : activeGroup}</h1><p class="muted">{visibleOperations.length} available operations</p></div>
            <input class="search" bind:value={search} type="search" placeholder="Search operations…" />
          </section>
          <section class="operation-list">
            {#each visibleOperations as operation}
              <button class="operation-card" onclick={() => selectOperation(operation)}>
                <span class:danger={operation.destructive} class="method">{operation.method}</span>
                <span><strong>{operation.summary}</strong><code>{operation.path}</code></span><i>›</i>
              </button>
            {/each}
          </section>
        {/if}
      </main>
    </div>
  </div>
{/if}
