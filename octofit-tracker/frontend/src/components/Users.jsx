import { getApiUrl } from '../api'
import ResourcePage from './ResourcePage'

const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/users/`
  : getApiUrl('users')

function Users() {
  return (
    <ResourcePage
      title="Users"
      endpoint={endpoint}
      columns={[
        { key: 'displayName', label: 'Name' },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
      ]}
    />
  )
}

export default Users
