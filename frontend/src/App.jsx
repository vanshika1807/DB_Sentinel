import React, { useEffect, useMemo, useRef, useState } from 'react'
import StatCard from './Components/StatCard.jsx'
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
    <div style={{padding:24, fontFamily:'system-ui, sans-serif'}}>
      <h2>DB Sentinel</h2>
      <p style={{marginTop:-8, opacity:.7}}>Real-time MySQL monitoring • Gmail alerts</p>

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:12, marginTop:16}}>
        <StatCard label="QPS" value={fmt(latest?.qps,2)} />
        <StatCard label="Active Connections" value={latest?.threadsConnected} />
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
