import ResourcePage from './ResourcePage'

function Workouts() {
  return (
    <ResourcePage
      title="Workouts"
      endpoint="workouts"
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
