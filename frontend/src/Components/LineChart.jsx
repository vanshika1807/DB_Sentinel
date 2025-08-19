import { Line } from 'react-chartjs-2'
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from 'chart.js'

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip)

export default function LineChart({ labels, data, title }) {
  return (
    <div className="rounded-2xl shadow-md bg-white p-4">
      <div className="mb-2 text-gray-600 font-medium">{title}</div>

      {/* Fixed height container so chart doesn't keep growing */}
      <div style={{ height: "300px" }}>
        <Line
          data={{
            labels,
            datasets: [
              {
                label: title,
                data,
                borderColor: "#3b82f6", // Tailwind blue-500
                backgroundColor: "rgba(59,130,246,0.2)",
                fill: true,
                tension: 0.3,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 400, // smooth transition
              easing: "easeOutQuart",
            },
            scales: {
              x: {
                ticks: {
                  maxTicksLimit: 6, // keep x-axis readable
                },
              },
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
                labels: {
                  usePointStyle: true,
                },
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
          }}
        />
      </div>
    </div>
  )
}
