import { useEffect, useState } from 'react'
import { getApiUrl, normalizeApiResponse, CODESPACE_NAME } from './api.js'

function Leaderboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(getApiUrl('leaderboard'))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load leaderboard: ${response.status}`)
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
              <h2 className="card-title mb-3">Leaderboard</h2>
              <p className="text-muted mb-4">
                Fetching leaderboard entries from <code>/api/leaderboard/</code>.
              </p>
              {!CODESPACE_NAME && (
                <div className="alert alert-warning" role="alert">
                  VITE_CODESPACE_NAME is not defined. Using local backend fallback at <strong>http://localhost:8000</strong>.
                </div>
              )}

              {loading && <div className="alert alert-info">Loading leaderboard...</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              {!loading && !error && items.length === 0 && (
                <div className="alert alert-secondary">No leaderboard entries available.</div>
              )}

              {!loading && !error && items.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="table-light">
                      <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items
                        .sort((a, b) => (a.rank || 0) - (b.rank || 0))
                        .map((entry, index) => (
                          <tr key={entry._id || entry.id || index}>
                            <td>{entry.rank}</td>
                            <td>{entry.name}</td>
                            <td>{entry.score}</td>
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

export default Leaderboard
