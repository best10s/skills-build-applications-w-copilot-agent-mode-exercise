import { useEffect, useState } from 'react'
import { fetchCollection, formatCell } from '../api'

type ResourcePageProps = {
  title: string
  endpoint: string
  columns: { key: string; label: string }[]
}

function ResourcePage({ title, endpoint, columns }: ResourcePageProps) {
  const [records, setRecords] = useState<Record<string, unknown>[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetchCollection(endpoint)
      .then((items) => {
        if (active) {
          setRecords(items)
          setError('')
        }
      })
      .catch((requestError: unknown) => {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Unable to load records from the API',
          )
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [endpoint])

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4 p-md-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
          <div>
            <p className="text-uppercase text-primary fw-semibold small mb-1">OctoFit Tracker</p>
            <h1 className="h2 mb-0">{title}</h1>
          </div>
          {!loading && !error && (
            <span className="badge rounded-pill text-bg-light">{records.length} records</span>
          )}
        </div>

        {loading && <p className="text-body-secondary mb-0">Loading {title.toLowerCase()}…</p>}
        {error && <div className="alert alert-danger mb-0" role="alert">{error}</div>}
        {!loading && !error && records.length === 0 && (
          <p className="text-body-secondary mb-0">No {title.toLowerCase()} found.</p>
        )}
        {!loading && !error && records.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={formatCell(record._id ?? record.id) || `${endpoint}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.key}>{formatCell(record[column.key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default ResourcePage
