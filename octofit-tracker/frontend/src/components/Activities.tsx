import ResourcePage from './ResourcePage'

function Activities() {
  return (
    <ResourcePage
      title="Activities"
      endpoint="activities"
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
