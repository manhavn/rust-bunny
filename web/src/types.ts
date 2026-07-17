export type Operation = {
  id: string
  group: string
  method: string
  path: string
  summary: string
  destructive: boolean
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
