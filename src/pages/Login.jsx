import { useState } from 'react'

const USERS = [
  { id: 1, name: 'Pammi Sai Krishna', role: 'Project Lead', username: 'Pammi', password: 'seva2026' },
  { id: 2, name: 'Project Team', role: 'Project Team', username: 'ProjectTeam', password: 'seva2026' },
]

export default function Login({ setUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleLogin = () => {
    const found = USERS.find(u => u.username === username && u.password === password)
    if (found) { setUser(found) }
    else { setError('Invalid username or password') }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', width: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#0A1628', margin: 0 }}>
            SE<span style={{ color: '#0065FF' }}>VA</span>
          </h1>
          <p style={{ color: '#888', fontSize: '11px', marginTop: '4px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            School Event & Visit Analytics
          </p>
          <p style={{ color: '#aaa', fontSize: '11px', fontStyle: 'italic', marginTop: '4px' }}>
            Love all, Serve all — Sri Sathya Sai Baba
          </p>
        </div>

        <div style={{ marginBottom: '14px' }}>
          <label style={{ fontSize: '11px', fontWeight: '700', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
            Username
          </label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your username"
            style={{ width: '100%', padding: '11px 14px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '11px', fontWeight: '700', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{ width: '100%', padding: '11px 40px 11px 14px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#888' }}>
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {error && (
          <p style={{ color: 'red', fontSize: '12px', marginBottom: '12px', textAlign: 'center' }}>{error}</p>
        )}

        <button
          onClick={handleLogin}
          style={{ width: '100%', padding: '13px', background: '#0065FF', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
          Sign In to SEVA
        </button>

        <div style={{ marginTop: '20px', padding: '14px', background: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ fontSize: '10px', fontWeight: '800', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
            Select Your Role
          </div>
          {USERS.map(u => (
            <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #eee' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#333' }}>{u.role}</div>
                <div style={{ fontSize: '11px', color: '#aaa' }}>{u.username}</div>
              </div>
              <button
                onClick={() => { setUsername(u.username); setPassword('seva2026') }}
                style={{ padding: '5px 12px', background: '#0065FF', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}>
                Select
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
```

Ctrl+S → then in terminal:
```
npm run build
```

Then:
```
npx vercel --prod
