import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { CODESPACE_NAME } from './components/api.js'

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="display-6 mb-3">OctoFit Tracker</h1>
              <p className="lead">
                A modern multi-tier fitness tracking experience for teams and individuals.
              </p>
              <p className="text-muted">
                Use the navigation to browse users, teams, activities, leaderboard, and workouts.
              </p>
              {!CODESPACE_NAME && (
                <div className="alert alert-info mt-4">
                  <strong>Note:</strong> Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for the GitHub Codespaces backend URL.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
