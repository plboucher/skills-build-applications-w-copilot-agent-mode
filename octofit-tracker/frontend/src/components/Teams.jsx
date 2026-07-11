import { useEffect, useState } from 'react'
import { getApiUrl, normalizeApiResponse, CODESPACE_NAME } from './api.js'

function Teams() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(getApiUrl('teams'))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load teams: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => setItems(normalizeApiResponse(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title mb-3">Teams</h2>
              <p className="text-muted mb-4">
                Fetching teams from <code>/api/teams/</code>.
              </p>
              {!CODESPACE_NAME && (
                <div className="alert alert-warning" role="alert">
                  VITE_CODESPACE_NAME is not defined. Using local backend fallback at <strong>http://localhost:8000</strong>.
                </div>
              )}

              {loading && <div className="alert alert-info">Loading teams...</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              {!loading && !error && items.length === 0 && (
                <div className="alert alert-secondary">No teams available.</div>
              )}

              {!loading && !error && items.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Sport</th>
                        <th>Captain</th>
                        <th>Members</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((team, index) => (
                        <tr key={team._id || team.id || index}>
                          <td>{team.name}</td>
                          <td>{team.sport}</td>
                          <td>{team.captain}</td>
                          <td>{Array.isArray(team.members) ? team.members.join(', ') : team.members}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Teams
