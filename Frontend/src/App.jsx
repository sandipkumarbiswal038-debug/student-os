import { useState, useEffect } from 'react'

function App() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/user/', {
      headers: {
        'Authorization': 'Token 3bee9d24ad79c6ff053c0d64a59420e4308ea346'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`)
        return res.json()
      })
      .then(data => setUser(data))
      .catch(err => setError(err.message))
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>studentOS</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.college_email}</p>
          <p><strong>Roll Number:</strong> {user.roll_number}</p>
          <p><strong>Batch:</strong> {user.batch}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : !error ? (
        <p>Loading...</p>
      ) : null}
    </div>
  )
}

export default App