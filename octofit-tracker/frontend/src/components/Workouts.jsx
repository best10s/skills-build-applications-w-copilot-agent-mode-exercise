import { getApiUrl } from '../api'
import ResourcePage from './ResourcePage'

const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/workouts/`
  : getApiUrl('workouts')

function Workouts() {
  return (
    <ResourcePage
      title="Workouts"
      endpoint={endpoint}
      columns={[
        { key: 'title', label: 'Workout' },
        { key: 'difficulty', label: 'Difficulty' },
        { key: 'durationMinutes', label: 'Duration (min)' },
        { key: 'description', label: 'Description' },
        { key: 'exercises', label: 'Exercises' },
      ]}
    />
  )
}

export default Workouts
