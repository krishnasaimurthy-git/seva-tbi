import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    { path: '/', label: '📊 Dashboard' },
    { path: '/schools', label: '🏫 Schools' },
    { path: '/field-report', label: '📝 Field Report' },
  ]

  return (
    <div>
      <div style={{ background: '#0A1628', height: '52px', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '16px' }}>
        <div style={{ fontFamily: 'sans-serif', fontSize: '20px', fontWeight: '800', color: '#fff' }}>
          SE<span style={{ color: '#4C9AFF' }}>VA</span>
        </div>
        <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>TBI 2026 · Telangana</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.08)', padding: '5px 12px', borderRadius: '6px' }}>
          {user.name} · {user.role}
        </div>
        <button onClick={() => setUser(null)}
          style={{ padding: '6px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '12px' }}>
          Sign Out
        </button>
      </div>
      <div style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', display: 'flex', padding: '0 24px' }}>
        {tabs.map(tab => (
          <button key={tab.path} onClick={() => navigate(tab.path)}
            style={{ padding: '14px 18px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600',
              color: location.pathname === tab.path ? '#0065FF' : '#888',
              borderBottom: location.pathname === tab.path ? '2px solid #0065FF' : '2px solid transparent' }}>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}