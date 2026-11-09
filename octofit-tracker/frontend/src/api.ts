const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

function getApiBaseUrl(): string {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  const codespaceHost = window.location.hostname.match(/^(.*)-\d+\.app\.github\.dev$/)
  if (codespaceHost) {
    return `https://${codespaceHost[1]}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

export const API_BASE_URL = getApiBaseUrl()

export function getApiUrl(resource: string): string {
  const normalizedResource = resource.replace(/^\/+|\/+$/g, '')
  return `${API_BASE_URL}/api/${normalizedResource}/`
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function extractRecords(payload: unknown): unknown[] | undefined {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!isRecord(payload)) {
    return undefined
  }

  for (const key of ['results', 'data', 'items', 'docs', 'records']) {
    if (key in payload) {
      const records = extractRecords(payload[key])
      if (records) {
        return records
      }
    }
  }

  return undefined
}

export async function fetchCollection(resource: string): Promise<Record<string, unknown>[]> {
  const url = /^https?:\/\//i.test(resource) ? resource : getApiUrl(resource)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText})`)
  }

  const payload: unknown = await response.json()
  const records = extractRecords(payload)
  if (!records || !records.every(
    (record) => typeof record === 'object' && record !== null && !Array.isArray(record),
  )) {
    throw new Error('The API response must contain a collection of records')
  }

  return records as Record<string, unknown>[]
}

export function formatCell(value: unknown): string {
  if (value === null || value === undefined || value === '') {
    return '—'
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  if (Array.isArray(value)) {
    return value.map(formatCell).join(', ')
  }
  if (isRecord(value)) {
    const record = value
    for (const key of ['displayName', 'username', 'name', 'title', '_id', 'id']) {
      if (record[key] !== undefined && record[key] !== null) {
        return String(record[key])
      }
    }
    return JSON.stringify(value)
  }
  return String(value)
}
