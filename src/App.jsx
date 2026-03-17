import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Schools from './pages/Schools'
import FieldReport from './pages/FieldReport'
import Navbar from './components/Navbar'
import { useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  if (!user) return <Login setUser={setUser} />

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/field-report" element={<FieldReport />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App