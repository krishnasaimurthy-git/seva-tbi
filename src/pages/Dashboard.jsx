import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

const SUMMARY = {
  total: 1299, event_done: 1235, eval_done: 1157, proj_done: 1115,
  on_time: 211, delayed: 460, early: 564, not_conducted: 64,
  ecf_uploaded: 1235, gcf_complete: 1098, gcf_partial: 20, gcf_missing: 117,
  wsf_complete: 1140, wsf_partial: 17, wsf_missing: 78,
  p1: 57, p2: 8, p3: 177, total_students: 229665
}

function MetricCard({ icon, number, label, color, badge }) {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid #eee', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderTop: `3px solid ${color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{icon}</div>
        {badge && <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '100px', background: color + '20', color }}>{badge}</span>}
      </div>
      <div style={{ fontSize: '28px', fontWeight: '800', color: '#0D1117', lineHeight: 1, marginBottom: '3px' }}>{number?.toLocaleString()}</div>
      <div style={{ fontSize: '11px', color: '#888', fontWeight: '500' }}>{label}</div>
    </div>
  )
}

function ProgressBar({ label, value, total, color }) {
  const pct = Math.round(value / total * 100)
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '11px', fontWeight: '600', color: '#333' }}>{label}</span>
        <span style={{ fontSize: '11px', color: '#888' }}>{value?.toLocaleString()} / {total?.toLocaleString()}</span>
      </div>
      <div style={{ height: '6px', background: '#eee', borderRadius: '100px', overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', background: color, borderRadius: '100px', transition: 'width 1s ease' }} />
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
    const sub = supabase.channel('submissions').on('postgres_changes',
      { event: '*', schema: 'public', table: 'field_reports' },
      () => fetchSubmissions()
    ).subscribe()
    return () => supabase.removeChannel(sub)
  }, [])

  async function fetchSubmissions() {
    const { data } = await supabase.from('field_reports').select('*').order('created_at', { ascending: false }).limit(10)
    setSubmissions(data || [])
    setLoading(false)
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0D1117', margin: 0 }}>Operations Dashboard</h1>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '3px' }}>TBI 2025 · Telangana · 1,299 schools · Real data</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <MetricCard icon="🏫" number={SUMMARY.total} label="Schools Registered" color="#0052CC" badge="Total" />
        <MetricCard icon="✅" number={SUMMARY.event_done} label="Events Conducted" color="#006644" badge="95.1%" />
        <MetricCard icon="🎯" number={SUMMARY.on_time} label="On Time (Planned=Actual)" color="#36B37E" badge="17.1%" />
        <MetricCard icon="⚠️" number={SUMMARY.delayed} label="Delayed Events" color="#FF8B00" badge="35.4%" />
        <MetricCard icon="❌" number={SUMMARY.not_conducted} label="Not Conducted" color="#C9372C" badge="4.9%" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', padding: '18px' }}>
          <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '16px' }}>Pipeline Completion</div>
          <ProgressBar label="Events Conducted" value={SUMMARY.event_done} total={SUMMARY.total} color="#006644" />
          <ProgressBar label="ECF Uploaded" value={SUMMARY.ecf_uploaded} total={SUMMARY.event_done} color="#FF8B00" />
          <ProgressBar label="GCF Complete" value={SUMMARY.gcf_complete} total={SUMMARY.event_done} color="#5243AA" />
          <ProgressBar label="WSF Complete" value={SUMMARY.wsf_complete} total={SUMMARY.event_done} color="#0052CC" />
          <ProgressBar label="Project Complete" value={SUMMARY.proj_done} total={SUMMARY.total} color="#C9372C" />
        </div>

        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', padding: '18px' }}>
          <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '16px' }}>🔴 Live Field Submissions</div>
          {loading ? <p style={{ color: '#888', fontSize: '13px' }}>Loading...</p> :
            submissions.length === 0 ?
              <p style={{ color: '#888', fontSize: '13px' }}>No submissions yet. Ground staff submissions will appear here in real time.</p> :
              submissions.map(s => (
                <div key={s.id} style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0', fontSize: '12px' }}>
                  <div style={{ fontWeight: '700', color: '#0D1117' }}>{s.school_name}</div>
                  <div style={{ color: '#888', marginTop: '2px' }}>{s.district} · Event: {s.event_done ? '✅' : '❌'} · ECF: {s.ecf_uploaded ? '✅' : '❌'}</div>
                </div>
              ))
          }
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
        <MetricCard icon="🏆" number={SUMMARY.p1} label="Priority 1 Schools" color="#006644" badge="High ROI" />
        <MetricCard icon="🎁" number={SUMMARY.gcf_missing} label="GCF Missing" color="#C9372C" badge="Urgent" />
        <MetricCard icon="📋" number={SUMMARY.wsf_missing} label="WSF Missing" color="#FF8B00" badge="Urgent" />
        <MetricCard icon="👥" number={SUMMARY.total_students} label="Total Students Written" color="#0052CC" badge="2025" />
      </div>
    </div>
  )
}
