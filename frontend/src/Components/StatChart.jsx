export default function StatCard({ label, value }) {
  return (
    <div style={{border:'1px solid #ddd', borderRadius:8, padding:16}}>
      <div style={{opacity:.7, fontSize:14}}>{label}</div>
      <div style={{fontSize:28, marginTop:6}}>{value ?? '—'}</div>
    </div>
  )
}
