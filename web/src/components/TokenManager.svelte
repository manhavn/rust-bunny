<script lang="ts">
  import type { WebToken } from '../types'

  let {
    tokens,
    name = $bindable(),
    oneTimeToken,
    onCreate,
    onRotate,
    onRevoke,
    onDelete,
  }: {
    tokens: WebToken[]
    name: string
    oneTimeToken: string
    onCreate: () => void
    onRotate: (id: string) => void
    onRevoke: (id: string) => void
    onDelete: (id: string) => void
  } = $props()
</script>

<section class="page-head"><div><p class="eyebrow">WEB SECURITY</p><h1>Web access tokens</h1><p class="muted">Tokens grant access to this local browser interface.</p></div></section>
{#if oneTimeToken}
  <section class="one-time"><strong>Copy this token now — it will not be shown again.</strong><code>{oneTimeToken}</code><button onclick={() => navigator.clipboard.writeText(oneTimeToken)}>Copy</button></section>
{/if}
<section class="management-layout">
  <div class="panel settings-card">
    <h2>Create Web token</h2>
    <label>Name<input bind:value={name} placeholder="my browser" /></label>
    <p class="muted">Default scopes: read and operate.</p>
    <button class="primary" disabled={!name} onclick={onCreate}>Create token</button>
  </div>
  <div class="panel item-list">
    <h2>Tokens</h2>
    {#each tokens as token (token.id)}
      <article class="managed-item">
        <div><strong>{token.name}</strong><small>{token.scopes.join(', ')}</small></div>
        <b class:revoked={token.revoked_at} class="active-badge">{token.revoked_at ? 'REVOKED' : 'ACTIVE'}</b>
        <div class="item-actions">
          {#if !token.revoked_at}<button onclick={() => onRotate(token.id)}>Rotate</button><button onclick={() => onRevoke(token.id)}>Revoke</button>{/if}
          <button class="text-danger" onclick={() => onDelete(token.id)}>Delete</button>
        </div>
      </article>
    {:else}<div class="empty">No Web tokens found.</div>{/each}
  </div>
</section>
