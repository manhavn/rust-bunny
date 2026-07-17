import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    svelte(),
    {
      name: 'trim-generated-assets',
      generateBundle(_options, bundle) {
        for (const output of Object.values(bundle)) {
          if (output.type === 'chunk') {
            output.code = `${output.code.trimEnd()}\n`
          } else if (typeof output.source === 'string') {
            output.source = `${output.source.trimEnd()}\n`
          }
        }
      },
    },
  ],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: asset => asset.names.some(name => name.endsWith('.css'))
          ? 'assets/app.css'
          : 'assets/[name][extname]',
      },
    },
  },
})
