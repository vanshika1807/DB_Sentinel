import React, { useEffect, useMemo, useRef, useState } from 'react'
import StatCard from './Components/StatChart.jsx'
import LineChart from './Components/LineChart.jsx'

export default function App() {
  const [latest, setLatest] = useState(null)
  const [history, setHistory] = useState([])
  const wsRef = useRef(null)

  useEffect(() => {
    // load initial history
    fetch('/api/metrics/history').then(r=>r.json()).then(setHistory).catch(()=>{})
    // live websocket
    const url = (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host + '/ws/metrics'
    const ws = new WebSocket(url); wsRef.current = ws
    ws.onmessage = (e) => { const s = JSON.parse(e.data); setLatest(s); setHistory(h => [...h.slice(-119), toRecord(s)]) }
    return () => ws.close()
  }, [])

  const labels = useMemo(()=>history.map(x=>new Date(x.ts).toLocaleTimeString()), [history])
  const qpsData = useMemo(()=>history.map(x=>x.qps), [history])
  const connData = useMemo(()=>history.map(x=>x.threadsConnected), [history])
  const avgData = useMemo(()=>history.map(x=>x.avgQueryTimeMs), [history])

  return (
    <div className="p-6 font-sans min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex items-center gap-3 mb-6">
      <img src="/assets/favicon.png" alt="DB Sentinel Logo" className="w-10 h-10" />
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">DB Sentinel</h2>
        <p className="text-sm text-gray-600">Real-time MySQL monitoring • Gmail alerts</p>
      </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:12, marginTop:16}}>
        <StatCard label="QPS" value={fmt(latest?.qps,2)} icon="/assets/database-storage.png"/>
        <StatCard label="Active Connections" value={latest?.threadsConnected} icon="/assets/alert.png"/>
        <StatCard label="Slow Queries (total)" value={latest?.slowQueriesTotal} />
        <StatCard label="Avg Query Time (ms)" value={fmt(latest?.avgQueryTimeMs,0)} />
        <StatCard label="CPU (%)" value={fmt(latest?.systemCpuLoadPct,1)} />
        <StatCard label="Free / Total" value={bytes(latest?.freeMemoryBytes)+' / '+bytes(latest?.totalMemoryBytes)} />
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:16}}>
        <LineChart title="Queries per second" labels={labels} data={qpsData} />
        <LineChart title="Active Connections" labels={labels} data={connData} />
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1fr', gap:12, marginTop:12}}>
        <LineChart title="Avg Query Time (ms)" labels={labels} data={avgData} />
      </div>
    </div>
  )
}

function toRecord(s){ return {
  ts:s.timestamp, qps:s.qps, threadsConnected:s.threadsConnected,
  slowQueriesTotal:s.slowQueriesTotal, avgQueryTimeMs:s.avgQueryTimeMs
}}

function fmt(v,d=2){ if(v==null) return '—'; return Number(v).toFixed(d) }
function bytes(b){
  if(b==null) return '—'; const u=['B','KB','MB','GB','TB']; let i=0;
  while(b>=1024 && i<u.length-1){ b/=1024; i++ } return `${b.toFixed(1)} ${u[i]}`
}
