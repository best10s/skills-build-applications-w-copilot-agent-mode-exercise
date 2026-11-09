import ResourcePage from './ResourcePage'

function Users() {
  return (
    <ResourcePage
      title="Users"
      endpoint="users"
      columns={[
        { key: 'displayName', label: 'Name' },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
      ]}
    />
  )
}

export default Users
