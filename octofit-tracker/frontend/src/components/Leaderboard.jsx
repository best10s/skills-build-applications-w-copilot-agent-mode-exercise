import { getApiUrl } from '../api'
import ResourcePage from './ResourcePage'

const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/leaderboard/`
  : getApiUrl('leaderboard')

function Leaderboard() {
  return (
    <ResourcePage
      title="Leaderboard"
      endpoint={endpoint}
      columns={[
        { key: 'user', label: 'User' },
        { key: 'points', label: 'Points' },
      ]}
    />
  )
}

export default Leaderboard
