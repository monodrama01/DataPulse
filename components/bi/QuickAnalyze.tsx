"use client"
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Board from '@/components/bi/Board'
import Explore from '@/components/bi/Explore'

async function fetchJSON(url: string, opts?: RequestInit){
  try{
    const res = await fetch(url, { ...opts, headers: { 'Content-Type': 'application/json', ...(opts?.headers||{}) } })
    if(!res.ok) throw new Error(await res.text())
    return await res.json()
  }catch(e:any){
    return { __error: e?.message || String(e) }
  }
}

export default function QuickAnalyze(){
  const [uid, setUid] = React.useState('')
  const [version, setVersion] = React.useState('')
  const [kpis, setKpis] = React.useState<any[]>([])
  const [charts, setCharts] = React.useState<any[]>([])
  const [mode, setMode] = React.useState<'board'|'explore'>('board')
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string>('')

  const handleUpload = async (file: File)=>{
    setBusy(true)
    try{
      const fd = new FormData(); fd.append('file', file)
      const u = await fetch('http://localhost:8000/bi/upload', { method: 'POST', body: fd }).then(r=>r.json())
      setUid(u.uid)
      const fd2 = new FormData(); fd2.append('uid', u.uid); fd2.append('file', file)
      const cleanRes = await fetch('http://localhost:8000/bi/clean', { method: 'POST', body: fd2 }).then(r=>r.json())
      const { taskId } = cleanRes
      let result:any
      for(let i=0;i<60;i++){
        const s = await fetchJSON(`http://localhost:8000/bi/status/${taskId}`)
        if(s.status==='done'){ result=s.result; break }
        if(s.status==='error') throw new Error(s.error)
        await new Promise(r=>setTimeout(r, 250))
      }
      const v = result.version
      setVersion(v)
      const b = await fetchJSON(`http://localhost:8000/bi/board/${u.uid}?v=${v}`)
      if((b as any).__error){ setError((b as any).__error); return }
      setKpis((b as any).kpis||[]) 
      setCharts((b as any).charts||[])
      setMode('board')
      setError('')
    }catch(e:any){
      setError(e?.message || String(e))
    }finally{
      setBusy(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <div className="text-xl font-bold">快捷分析 Quick Analyze</div>
            <div className="text-sm text-gray-500">上传-清洗-分流：Board 看板 / Explore 探索</div>
          </div>
          <div className="flex gap-2">
            <label className={`px-4 py-2 ${busy?'bg-gray-400':'bg-blue-600 hover:bg-blue-700'} text-white rounded cursor-pointer`}>
              {busy? '处理中…' : '上传 Upload'}
              <input type="file" className="hidden" onChange={(e)=>{ const f=e.target.files?.[0]; if(f) handleUpload(f) }} disabled={busy} />
            </label>
            <Button variant={mode==='board'?'default':'outline'} onClick={()=>setMode('board')}>Board</Button>
            <Button variant={mode==='explore'?'default':'outline'} onClick={()=>setMode('explore')} disabled={!uid || !version}>Explore</Button>
          </div>
        </CardContent>
      </Card>
      {error && (
        <Card><CardContent className="py-3 text-red-600 text-sm">{error}</CardContent></Card>
      )}

      {mode==='board' ? (
        charts.length>0 || kpis.length>0 ? (
          <Board kpis={kpis} charts={charts} />
        ) : (
          <Card><CardContent className="py-10 text-center text-gray-500">请上传数据文件，系统会自动生成看板 / Upload a CSV or Excel to auto-generate dashboard.</CardContent></Card>
        )
      ) : (
        uid && version ? <Explore uid={uid} version={version} /> : (
          <Card><CardContent className="py-8 text-center text-gray-500">请先上传并清洗数据以进入探索模式</CardContent></Card>
        )
      )}
    </div>
  )
}


