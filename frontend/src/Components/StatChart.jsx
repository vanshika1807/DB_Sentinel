export default function StatCard({ label, value, icon }) {
  return (
    <div style={{border:'1px solid #ddd', borderRadius:12, padding:16, display:'flex', alignItems:'center', gap:12, background:'linear-gradient(135deg,#fdfdfd,#f7faff)'}}>
      {icon && <img src={icon} alt="" style={{width:32, height:32, opacity:0.9}} />}
      <div className="rounded-2xl shadow-md bg-white p-4 hover:shadow-lg transition">
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-2xl font-semibold text-gray-800 mt-1">{value ?? '—'}</div>
      </div>
    </div>
  )
}