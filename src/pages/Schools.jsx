import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const LOZ = {
  green: { background: '#E3FCEF', color: '#006644' },
  red: { background: '#FFEDEB', color: '#C9372C' },
  amber: { background: '#FFF7D6', color: '#FF8B00' },
  blue: { background: '#E8F0FE', color: '#0052CC' },
  gray: { background: '#F4F5F7', color: '#6B778C' },
}

function Badge({ text, type = 'gray' }) {
  return <span style={{ ...LOZ[type], fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '3px', display: 'inline-block' }}>{text}</span>
}

const SCHOOLS_SAMPLE = [
  { seq: 'TBI044016', name: 'GAUTAMI VIDYA DHAMAM SCHOOL', city: 'HYDERABAD', lang: 'ENGLISH', spoc: 'K KAPIL', event: true, ecf: true, gcf: true, wsf: true, students: 158, delay: -1 },
  { seq: 'TBI044088', name: 'ZPHS JAPAL', city: 'HYDERABAD', lang: 'ENGLISH', spoc: 'Manoj Kumar', event: true, ecf: true, gcf: true, wsf: true, students: 209, delay: -8 },
  { seq: 'TBI044089', name: 'PUDAMI SCHOOL', city: 'HYDERABAD', lang: 'ENGLISH', spoc: 'K KAPIL', event: true, ecf: true, gcf: true, wsf: true, students: 150, delay: -1 },
  { seq: 'TBI045731', name: 'MJPTBCWRS G APPAJIPET', city: 'NALGONDA', lang: 'ENGLISH', spoc: 'P KASHAIAH', event: true, ecf: false, gcf: false, wsf: false, students: 667, delay: 6 },
  { seq: 'TBI045950', name: 'ZPHS BOYS BALANAGAR', city: 'HYDERABAD', lang: 'ENGLISH', spoc: 'SURENDER', event: true, ecf: false, gcf: false, wsf: false, students: 180, delay: 16 },
  { seq: 'TBI045692', name: 'ZPHCTHALLDHARUPALLI', city: 'KHAMMAM', lang: 'ENGLISH', spoc: 'BHARGAV THAMMARAPU', event: true, ecf: false, gcf: false, wsf: false, students: 141, delay: -58 },
]

export default function Schools() {
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [reports, setReports] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    supabase.from('field_reports').select('*').then(({ data }) => setReports(data || []))
  }, [])

  const filtered = SCHOOLS_SAMPLE.filter(s =>
    (!search || s.name.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase())) &&
    (!cityFilter || s.city === cityFilter)
  )

  const getReport = (name) => reports.find(r => r.school_name?.toLowerCase().includes(name.toLowerCase().split(' ')[0]))

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0D1117', margin: 0 }}>🏫 Schools</h1>
        <p style={{ fontSize: '12px', color: '#888', marginTop: '3px' }}>1,299 registered schools · Click any row for details</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search school or city..."
            style={{ width: '100%', padding: '8px 12px 8px 34px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}
          style={{ padding: '8px 12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '12px', outline: 'none' }}>
          <option value="">All Cities</option>
          {['HYDERABAD','WARANGAL','KARIMNAGAR','KHAMMAM','RANGAREDDI','NIZAMABAD','NALGONDA'].map(c => <option key={c}>{c}</option>)}
        </select>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#888', alignSelf: 'center' }}>{filtered.length} schools</span>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F4F5F7' }}>
                {['School','City','SPOC','Students','Delay','Event','ECF','GCF','WSF','Live Report'].map(h => (
                  <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: '2px solid #eee', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => {
                const report = getReport(s.name)
                return (
                  <tr key={s.seq} onClick={() => setSelected(s)} style={{ cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#F0F4FF'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ fontWeight: '700', fontSize: '12px', color: '#0D1117' }}>{s.name}</div>
                      <div style={{ fontSize: '10px', color: '#aaa', marginTop: '1px' }}>{s.seq}</div>
                    </td>
                    <td style={{ padding: '10px 12px', fontSize: '12px', color: '#555' }}>{s.city}</td>
                    <td style={{ padding: '10px 12px', fontSize: '11px', color: '#555', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.spoc}</td>
                    <td style={{ padding: '10px 12px', fontSize: '12px', fontWeight: '700', color: '#0D1117' }}>{s.students?.toLocaleString()}</td>
                    <td style={{ padding: '10px 12px' }}>
                      {s.delay === 0 ? <Badge text="On time" type="green" /> :
                       s.delay > 0 ? <Badge text={`+${s.delay}d`} type={s.delay > 5 ? 'red' : 'amber'} /> :
                       <Badge text={`${s.delay}d early`} type="blue" />}
                    </td>
                    <td style={{ padding: '10px 12px' }}><Badge text={s.event ? '✓' : '✗'} type={s.event ? 'green' : 'red'} /></td>
                    <td style={{ padding: '10px 12px' }}><Badge text={s.ecf ? '✓' : '✗'} type={s.ecf ? 'green' : 'red'} /></td>
                    <td style={{ padding: '10px 12px' }}><Badge text={s.gcf ? '✓' : '✗'} type={s.gcf ? 'green' : 'red'} /></td>
                    <td style={{ padding: '10px 12px' }}><Badge text={s.wsf ? '✓' : '✗'} type={s.wsf ? 'green' : 'red'} /></td>
                    <td style={{ padding: '10px 12px' }}>
                      {report ? <Badge text="✓ Live" type="green" /> : <Badge text="No report" type="gray" />}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500, padding: '20px' }}
          onClick={() => setSelected(null)}>
          <div style={{ background: '#fff', borderRadius: '12px', maxWidth: '480px', width: '100%', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ background: '#0A1628', padding: '18px 22px', borderBottom: '3px solid #0065FF' }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#fff' }}>{selected.name}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{selected.seq} · {selected.city} · {selected.lang}</div>
            </div>
            <div style={{ padding: '20px' }}>
              {[['Event Conducted', selected.event], ['ECF Uploaded', selected.ecf], ['GCF Uploaded', selected.gcf], ['WSF Uploaded', selected.wsf]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>{l}</span>
                  <Badge text={v ? '✓ Done' : '✗ Pending'} type={v ? 'green' : 'red'} />
                </div>
              ))}
              <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ padding: '8px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <div style={{ fontSize: '9px', color: '#888', textTransform: 'uppercase', fontWeight: '700' }}>Students</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#0D1117' }}>{selected.students?.toLocaleString()}</div>
                </div>
                <div style={{ padding: '8px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <div style={{ fontSize: '9px', color: '#888', textTransform: 'uppercase', fontWeight: '700' }}>SPOC</div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#0D1117', marginTop: '2px' }}>{selected.spoc}</div>
                </div>
              </div>
              <button onClick={() => setSelected(null)}
                style={{ width: '100%', marginTop: '16px', padding: '10px', background: '#0065FF', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
