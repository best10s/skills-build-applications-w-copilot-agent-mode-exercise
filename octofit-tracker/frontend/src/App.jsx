import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigation = [
  { label: 'Users', to: '/users' },
  { label: 'Activities', to: '/activities' },
  { label: 'Teams', to: '/teams' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Workouts', to: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/users">
            <img src={logo} width="40" height="40" alt="" />
            OctoFit Tracker
          </NavLink>
          <nav className="navbar-nav flex-row flex-wrap gap-1" aria-label="Main navigation">
            {navigation.map(({ label, to }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-3${isActive ? ' active fw-semibold' : ''}`
                }
                key={to}
                to={to}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4 py-md-5 flex-grow-1">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>

      <footer className="border-top py-3 text-center text-body-secondary small">
        OctoFit Tracker · Move together, achieve more.
      </footer>
    </div>
  )
}

export default App
