/* global console, process, URL */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const source = process.argv[2]
const output = process.argv[3] ?? new URL('../src/generated/requestExamples.ts', import.meta.url)

if (!source) {
  console.error('Usage: node scripts/generate-request-examples.mjs <openapi.json> [output.ts]')
  process.exit(1)
}

const document = JSON.parse(await readFile(source, 'utf8'))
const schemas = document.components?.schemas ?? {}

function signature(method, path) {
  return `${method} ${path}`.toLowerCase().replace(/\{[^}]+\}/g, '{}')
}

function resolve(schema) {
  if (!schema) return {}
  if (schema.$ref) return schemas[schema.$ref.split('/').at(-1)] ?? {}
  if (schema.allOf) {
    return schema.allOf.reduce((merged, entry) => {
      const resolved = resolve(entry)
      return {
        ...merged,
        ...resolved,
        properties: { ...merged.properties, ...resolved.properties },
        required: [...new Set([...(merged.required ?? []), ...(resolved.required ?? [])])],
      }
    }, {})
  }
  if (schema.oneOf?.length) return resolve(schema.oneOf[0])
  if (schema.anyOf?.length) return resolve(schema.anyOf[0])
  return schema
}

function stringExample(name, format) {
  const key = name.toLowerCase()
  if (format === 'date-time') return '2026-01-01T00:00:00Z'
  if (format === 'date') return '2026-01-01'
  if (format === 'uuid') return '00000000-0000-0000-0000-000000000000'
  if (key.includes('email')) return 'admin@example.com'
  if (key.includes('hostname') || key === 'host') return 'cdn.example.com'
  if (key.includes('domain')) return 'example.com'
  if (key.includes('url')) return 'https://example.com'
  if (key.includes('ip')) return '203.0.113.10'
  if (key.includes('password')) return 'change-me'
  if (key.includes('token') || key.includes('key')) return 'replace-me'
  if (key === 'name') return 'example'
  return 'string'
}

function exampleFor(input, name = 'value', depth = 0) {
  if (depth > 8) return null
  const schema = resolve(input)
  if (schema.example !== undefined) return schema.example
  if (schema.default !== undefined) return schema.default
  if (schema.enum?.length) return schema.enum[0]

  if (schema.type === 'object' || schema.properties) {
    return Object.fromEntries(
      Object.entries(schema.properties ?? {}).map(([key, value]) => [
        key,
        exampleFor(value, key, depth + 1),
      ]),
    )
  }
  if (schema.type === 'array') return []
  if (schema.type === 'boolean') return false
  if (schema.type === 'integer' || schema.type === 'number') return schema.minimum ?? 0
  return stringExample(name, schema.format)
}

function formSchemaFor(input) {
  const schema = resolve(input)
  const required = new Set(schema.required ?? [])
  return {
    fields: Object.entries(schema.properties ?? {}).map(([name, inputProperty]) => {
      const property = resolve(inputProperty)
      const enumValues = property.enum ?? []
      const enumNames = property['x-enumNames'] ?? []
      return {
        name,
        type: property.type ?? (property.properties ? 'object' : 'string'),
        ...(property.format ? { format: property.format } : {}),
        ...(inputProperty.description ?? property.description
          ? { description: inputProperty.description ?? property.description }
          : {}),
        required: required.has(name),
        nullable: Boolean(inputProperty.nullable ?? property.nullable),
        ...(property.minimum !== undefined ? { minimum: property.minimum } : {}),
        ...(property.maximum !== undefined ? { maximum: property.maximum } : {}),
        ...(enumValues.length
          ? {
              options: enumValues.map((value, index) => ({
                value,
                label: enumNames[index] ?? String(value),
              })),
            }
          : {}),
      }
    }),
  }
}

const examples = {}
const formSchemas = {}
for (const [path, pathItem] of Object.entries(document.paths ?? {})) {
  for (const [method, operation] of Object.entries(pathItem)) {
    const schema = operation?.requestBody?.content?.['application/json']?.schema
    if (!schema) continue
    examples[signature(method, path)] = JSON.stringify(
      exampleFor(schema),
      null,
      2,
    )
    formSchemas[signature(method, path)] = formSchemaFor(schema)
  }
}

const generated = `// Generated from bunny.net Core API OpenAPI. Do not edit by hand.
// Source: https://core-api-public-docs.b-cdn.net/docs/v3/public.json
import type { Operation, RequestBodySchema } from '../types'

const REQUEST_EXAMPLES: Record<string, string> = ${JSON.stringify(examples, null, 2)}
const REQUEST_SCHEMAS: Record<string, RequestBodySchema> = ${JSON.stringify(formSchemas, null, 2)}

function operationSignature(operation: Operation) {
  const signature = \`\${operation.method} \${operation.path}\`
    .toLowerCase()
    .replace(/\\{[^}]+\\}/g, '{}')
  return signature
}

export function requestBodyExample(operation: Operation): string | null {
  return REQUEST_EXAMPLES[operationSignature(operation)] ?? null
}

export function requestBodySchema(operation: Operation): RequestBodySchema | null {
  return REQUEST_SCHEMAS[operationSignature(operation)] ?? null
}
`

const outputPath = output instanceof URL ? fileURLToPath(output) : output
await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, generated)
console.log(`Generated ${Object.keys(examples).length} request examples`)
