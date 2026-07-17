<script lang="ts">
  let {
    backupPassphrase = $bindable(),
    importFile = $bindable(),
    importReplace = $bindable(),
    message,
    onExport,
    onImport,
  }: {
    backupPassphrase: string
    importFile: File | null
    importReplace: boolean
    message: string
    onExport: (includeSecrets: boolean) => void
    onImport: () => void
  } = $props()
</script>

<section class="page-head">
  <div><p class="eyebrow">APPLICATION</p><h1>Settings</h1><p class="muted">Portable configuration and encrypted backups.</p></div>
</section>
<section class="settings-grid">
  <div class="panel settings-card">
    <h2>Export</h2>
    <p class="muted">A settings export contains no secrets. A full backup is encrypted and can restore this app on another machine.</p>
    <label>Backup passphrase<input bind:value={backupPassphrase} type="password" autocomplete="new-password" placeholder="Required for full backup" /></label>
    <div class="button-row">
      <button class="secondary" onclick={() => onExport(false)}>Export settings</button>
      <button class="primary" disabled={!backupPassphrase} onclick={() => onExport(true)}>Full encrypted backup</button>
    </div>
  </div>
  <div class="panel settings-card">
    <h2>Import</h2>
    <p class="muted">Select a settings export or encrypted full backup. Existing Web sessions are never restored.</p>
    <label>Backup file<input type="file" accept=".json,.enc" onchange={(event) => importFile = event.currentTarget.files?.[0] ?? null} /></label>
    <label class="check"><input bind:checked={importReplace} type="checkbox" /> Replace existing configuration</label>
    <button class="primary" disabled={!importFile} onclick={onImport}>Import configuration</button>
  </div>
</section>
{#if message}<p class="settings-message">{message}</p>{/if}
