import ResourcePage from './ResourcePage'

function Teams() {
  return (
    <ResourcePage
      title="Teams"
      endpoint="teams"
      columns={[
        { key: 'name', label: 'Team' },
        { key: 'members', label: 'Members' },
      ]}
    />
  )
}

export default Teams
