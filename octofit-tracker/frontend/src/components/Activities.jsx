import { getApiUrl } from '../api'
import ResourcePage from './ResourcePage'

const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/activities/`
  : getApiUrl('activities')

function Activities() {
  return (
    <ResourcePage
      title="Activities"
      endpoint={endpoint}
      columns={[
        { key: 'type', label: 'Activity' },
        { key: 'user', label: 'User' },
        { key: 'durationMinutes', label: 'Duration (min)' },
        { key: 'distanceKm', label: 'Distance (km)' },
        { key: 'date', label: 'Date' },
      ]}
    />
  )
}

export default Activities
