export type Operation = {
  id: string
  group: string
  method: string
  path: string
  summary: string
  destructive: boolean
}

export type RequestFieldOption = {
  label: string
  value: string | number | boolean
}

export type RequestFieldSchema = {
  name: string
  type: string
  format?: string
  description?: string
  required: boolean
  nullable: boolean
  minimum?: number
  maximum?: number
  defaultValue?: string | number | boolean
  options?: RequestFieldOption[]
}

export type RequestBodySchema = {
  fields: RequestFieldSchema[]
}

export type Credential = {
  id: string
  profile_id: string
  name: string
  is_active: boolean
}

export type WebToken = {
  id: string
  name: string
  scopes: string[]
  created_at: string
  expires_at: string | null
  revoked_at: string | null
}
