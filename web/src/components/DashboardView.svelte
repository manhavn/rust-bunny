<script lang="ts">
  import type { Credential, Operation } from '../types'

  let { operations, credentials }: { operations: Operation[]; credentials: Credential[] } =
    $props()
</script>

<section class="page-head">
  <div>
    <p class="eyebrow">OVERVIEW</p>
    <h1>Control your Bunny network</h1>
    <p class="muted">One secure workspace for Core API operations.</p>
  </div>
</section>
<section class="stats">
  <article><span>Core operations</span><strong>{operations.length}</strong><small>Official API coverage</small></article>
  <article><span>Credentials</span><strong>{credentials.length}</strong><small>{credentials.filter(item => item.is_active).length} active</small></article>
  <article><span>Connection</span><strong class="success">Ready</strong><small>Local encrypted state</small></article>
</section>
<section class="panel">
  <div class="panel-head">
    <div><h2>Credentials</h2><p class="muted">Managed securely through the local vault.</p></div>
  </div>
  <div class="record-grid">
    {#each credentials as credential (credential.id)}
      <article class="record">
        <span class="status-dot"></span>
        <div><strong>{credential.name}</strong><small>{credential.profile_id}</small></div>
        {#if credential.is_active}<b>ACTIVE</b>{/if}
      </article>
    {:else}
      <div class="empty"><strong>No credentials yet</strong><span>Run <code>bunny credential add</code> to get started.</span></div>
    {/each}
  </div>
</section>
