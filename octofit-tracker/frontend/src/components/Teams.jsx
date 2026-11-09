import { getApiUrl } from '../api'
import ResourcePage from './ResourcePage'

const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/teams/`
  : getApiUrl('teams')

function Teams() {
  return (
    <ResourcePage
      title="Teams"
      endpoint={endpoint}
      columns={[
        { key: 'name', label: 'Team' },
        { key: 'members', label: 'Members' },
      ]}
    />
  )
}

export default Teams
