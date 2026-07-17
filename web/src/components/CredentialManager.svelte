<script lang="ts">
  import type { Credential } from '../types'

  let {
    credentials,
    name = $bindable(),
    apiKey = $bindable(),
    onAdd,
    onSelect,
    onRename,
    onDelete,
  }: {
    credentials: Credential[]
    name: string
    apiKey: string
    onAdd: () => void
    onSelect: (id: string) => void
    onRename: (credential: Credential) => void
    onDelete: (credential: Credential) => void
  } = $props()
</script>

<section class="page-head"><div><p class="eyebrow">SECURE VAULT</p><h1>Bunny credentials</h1><p class="muted">Create, select, rename, and remove account API keys.</p></div></section>
<section class="management-layout">
  <div class="panel settings-card">
    <h2>Add credential</h2>
    <label>Name<input bind:value={name} placeholder="production" /></label>
    <label>Account API key<input bind:value={apiKey} type="password" autocomplete="new-password" /></label>
    <button class="primary" disabled={!name || !apiKey} onclick={onAdd}>Save credential</button>
  </div>
  <div class="panel item-list">
    <h2>Saved credentials</h2>
    {#each credentials as credential (credential.id)}
      <article class="managed-item">
        <div><strong>{credential.name}</strong><small>{credential.id}</small></div>
        {#if credential.is_active}<b class="active-badge">ACTIVE</b>{/if}
        <div class="item-actions">
          {#if !credential.is_active}<button onclick={() => onSelect(credential.id)}>Use</button>{/if}
          <button onclick={() => onRename(credential)}>Rename</button>
          <button class="text-danger" onclick={() => onDelete(credential)}>Delete</button>
        </div>
      </article>
    {:else}<div class="empty">No credentials saved.</div>{/each}
  </div>
</section>
