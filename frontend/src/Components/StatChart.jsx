export default function StatCard({ label, value, icon }) {
  return (
    <div style={{border:'1px solid #ddd', borderRadius:12, padding:16, display:'flex', alignItems:'center', gap:12, background:'linear-gradient(135deg,#fdfdfd,#f7faff)'}}>
      {icon && <img src={icon} alt="" style={{width:32, height:32, opacity:0.9}} />}
      <div>
        <div style={{opacity:.7, fontSize:14}}>{label}</div>
        <div style={{fontSize:28, marginTop:6}}>{value ?? '—'}</div>
      </div>
    </div>
  )
}