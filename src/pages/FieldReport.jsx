import { useState } from 'react'
import { supabase } from '../supabase'

const DISTRICTS = ['HYDERABAD','WARANGAL','KARIMNAGAR','KHAMMAM','RANGAREDDI','NIZAMABAD','MEDAK','MAHABUBNAGAR','ADILABAD','NALGONDA','Others']

export default function FieldReport() {
  const [form, setForm] = useState({
    staff_name: '', visit_date: '', district: '', school_name: '',
    event_done: false, event_reason: '', certificates_distributed: false,
    ecf_uploaded: false, ecf_reason: '', gcf_uploaded: false,
    wsf_uploaded: false, gifts_distributed: false, comments: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async () => {
    if (!form.staff_name || !form.district || !form.school_name) {
      setError('Please fill in Name, District and School Name')
      return
    }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.from('field_reports').insert([{
      staff_name: form.staff_name,
      visit_date: form.visit_date || new Date().toISOString().split('T')[0],
      district: form.district,
      school_name: form.school_name,
      event_done: form.event_done,
      event_reason: form.event_reason,
      ecf_uploaded: form.ecf_uploaded,
      ecf_reason: form.ecf_reason,
      gcf_uploaded: form.gcf_uploaded,
      wsf_uploaded: form.wsf_uploaded,
      gifts_distributed: form.gifts_distributed,
      certificates_distributed: form.certificates_distributed,
      comments: form.comments,
      created_at: new Date().toISOString()
    }])
    setLoading(false)
    if (err) { setError('Error saving. Please try again.'); return }
    setSubmitted(true)
  }

  if (submitted) return (
    <div style={{ maxWidth: '500px', margin: '60px auto', textAlign: 'center', background: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
      <h2 style={{ color: '#006644', fontWeight: '800', marginBottom: '8px' }}>Report Submitted!</h2>
      <p style={{ color: '#888', marginBottom: '24px' }}>Visit report for <strong>{form.school_name}</strong> saved successfully.</p>
      <button onClick={() => { setSubmitted(false); setForm({ staff_name:'',visit_date:'',district:'',school_name:'',event_done:false,event_reason:'',certificates_distributed:false,ecf_uploaded:false,ecf_reason:'',gcf_uploaded:false,wsf_uploaded:false,gifts_distributed:false,comments:'' }) }}
        style={{ padding: '12px 28px', background: '#0065FF', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>
        Submit Another Report
      </button>
    </div>
  )

  const inputStyle = { width: '100%', padding: '10px 13px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'sans-serif' }
  const labelStyle = { fontSize: '11px', fontWeight: '700', color: '#666', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '6px' }
  const checkStyle = { display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 13px', border: '2px solid #ddd', borderRadius: '8px', cursor: 'pointer', background: '#f8f9fa', marginBottom: '8px' }

  return (
    <div style={{ maxWidth: '660px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0D1117', margin: 0 }}>📝 Field Report</h1>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '3px' }}>Submit after every school visit — takes 2 minutes</p>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ background: '#0A1628', padding: '20px 24px', borderBottom: '3px solid #0065FF' }}>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>School Visit Report</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '3px' }}>All fields marked * are required</div>
        </div>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div><label style={labelStyle}>Your Name *</label><input style={inputStyle} value={form.staff_name} onChange={e => update('staff_name', e.target.value)} placeholder="Full name" /></div>
            <div><label style={labelStyle}>Visit Date</label><input type="date" style={inputStyle} value={form.visit_date} onChange={e => update('visit_date', e.target.value)} /></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>District *</label>
              <select style={inputStyle} value={form.district} onChange={e => update('district', e.target.value)}>
                <option value="">Select District</option>
                {DISTRICTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>School Name *</label><input style={inputStyle} value={form.school_name} onChange={e => update('school_name', e.target.value)} placeholder="School name or UDISE code" /></div>
          </div>

          <div style={{ fontSize: '11px', fontWeight: '800', color: '#666', textTransform: 'uppercase', letterSpacing: '1.5px', paddingBottom: '10px', borderBottom: '1px solid #eee', marginBottom: '14px' }}>Checklist</div>

          {[
            ['event_done', '📅 Essay Event Conducted'],
            ['ecf_uploaded', '📋 ECF Uploaded to TBI Portal'],
            ['certificates_distributed', '🎖️ Certificates Distributed (6 winners)'],
            ['gcf_uploaded', '🎁 Gift Confirmation Form Uploaded'],
            ['wsf_uploaded', '🏆 Winner Shortlisting Form Uploaded'],
            ['gifts_distributed', '🎁 Gifts Distributed to School Authority'],
          ].map(([key, label]) => (
            <label key={key} style={checkStyle}>
              <input type="checkbox" checked={form[key]} onChange={e => update(key, e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#0065FF' }} />
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#333' }}>{label}</span>
            </label>
          ))}

          {!form.event_done && (
            <div style={{ marginTop: '8px', marginBottom: '8px' }}>
              <label style={labelStyle}>Reason event not conducted</label>
              <select style={inputStyle} value={form.event_reason} onChange={e => update('event_reason', e.target.value)}>
                <option value="">Select reason</option>
                <option>Principal unavailable</option>
                <option>School holiday / exam</option>
                <option>No response from school</option>
                <option>Rescheduled by school</option>
                <option>Other — see comments</option>
              </select>
            </div>
          )}

          {form.event_done && !form.ecf_uploaded && (
            <div style={{ marginTop: '8px', marginBottom: '8px' }}>
              <label style={labelStyle}>⚠ ECF not uploaded — reason</label>
              <input style={{ ...inputStyle, borderColor: '#FF8B00' }} value={form.ecf_reason} onChange={e => update('ecf_reason', e.target.value)} placeholder="Why ECF not uploaded yet?" />
            </div>
          )}

          <div style={{ marginTop: '16px' }}>
            <label style={labelStyle}>Comments / Escalations</label>
            <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.comments} onChange={e => update('comments', e.target.value)} placeholder="Any issues, feedback, or notes for Project Lead..." />
          </div>

          {error && <p style={{ color: 'red', fontSize: '12px', marginTop: '10px' }}>{error}</p>}

          <button onClick={handleSubmit} disabled={loading}
            style={{ width: '100%', padding: '13px', marginTop: '16px', background: loading ? '#aaa' : '#0065FF', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Submitting...' : 'Submit Visit Report →'}
          </button>
        </div>
      </div>
    </div>
  )
}
