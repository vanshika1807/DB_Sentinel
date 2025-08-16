import { Line } from 'react-chartjs-2'
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip } from 'chart.js'
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip)

export default function LineChart({ labels, data, title }) {
  return (
    <div style={{border:'1px solid #ddd', borderRadius:8, padding:16}}>
      <div style={{marginBottom:8, opacity:.8}}>{title}</div>
      <Line data={{
        labels,
        datasets: [{ label: title, data }]
      }} options={{ responsive:true, maintainAspectRatio:false }} height={220}/>
    </div>
  )
}
