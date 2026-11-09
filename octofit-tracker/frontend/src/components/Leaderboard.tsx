import ResourcePage from './ResourcePage'

function Leaderboard() {
  return (
    <ResourcePage
      title="Leaderboard"
      endpoint="leaderboard"
      columns={[
        { key: 'user', label: 'User' },
        { key: 'points', label: 'Points' },
      ]}
    />
  )
}

export default Leaderboard
