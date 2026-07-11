import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
                The frontend is now running on port 5173 and connected to the backend API tier.
              </p>
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
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
