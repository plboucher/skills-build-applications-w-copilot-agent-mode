import { useEffect, useState } from 'react'
import { getApiUrl, normalizeApiResponse, CODESPACE_NAME } from './api.js'

function Users() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    const url = getApiUrl('users')
    // show actual URL used for debugging
    // eslint-disable-next-line no-console
    console.info('[Users] fetching', url)
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load users: ${response.status} ${response.statusText}`)
        }
        return response.json()
      })
      .then((data) => setItems(normalizeApiResponse(data)))
      .catch((err) => {
        // capture full error for display
        const msg = err?.message || String(err)
        setError(msg)
        // eslint-disable-next-line no-console
        console.error('[Users] fetch error', err)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title mb-3">Users</h2>
              <p className="text-muted mb-4">
                Fetching users from <code>{getApiUrl('users')}</code>.
              </p>
              {!CODESPACE_NAME && (
                <div className="alert alert-warning" role="alert">
                  VITE_CODESPACE_NAME is not defined. Using local backend fallback at <strong>http://localhost:8000</strong>.
                </div>
              )}

              {loading && <div className="alert alert-info">Loading users...</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              {!loading && !error && items.length === 0 && (
                <div className="alert alert-secondary">No users available.</div>
              )}

              {!loading && !error && items.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Fitness Goal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((user, index) => (
                        <tr key={user._id || user.id || index}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>{user.fitnessGoal}</td>
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

export default Users
