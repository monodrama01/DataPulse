"use client"
import React, { useEffect, useMemo, useState } from "react"
import FieldPanel from "@/components/bi/FieldPanel"
import HistoryStack, { StackItem } from "@/components/bi/HistoryStack"

type Column = { name: string, type: string }

async function fetchJSON(url: string, opts?: RequestInit){
  try{
    const res = await fetch(url, { ...opts, headers: { 'Content-Type': 'application/json', ...(opts?.headers||{}) } })
    if(!res.ok) throw new Error(await res.text())
    return await res.json()
  }catch(e:any){
    return { __error: e?.message || String(e) }
  }
}

export default function Explore({ uid, version }:{ uid: string, version: string }){
  const [columns, setColumns] = useState<Column[]>([])
  const [dims, setDims] = useState<string[]>([])
  const [measures, setMeasures] = useState<{col:string, aggregate:string}[]>([])
  const [stack, setStack] = useState<StackItem[]>([])
  const [table, setTable] = useState<any[]>([])
  const [error, setError] = useState<string>('')

  useEffect(()=>{
    fetchJSON(`http://localhost:8000/bi/meta/${uid}?v=${version}`).then(d=>setColumns(d.columns))
  }, [uid, version])

  const runQuery = async ()=>{
    if(!uid || !version) return
    const body = { uid, version, dims, measures, filters:{}, chartType: undefined }
    const res = await fetchJSON("http://localhost:8000/bi/explore/query", { method: 'POST', body: JSON.stringify(body) })
    if((res as any).__error){ setError((res as any).__error); return }
    const { taskId } = res as any
    if(!taskId){ setError('Explore: 无法获得任务ID'); return }
    // poll
    let result: any = null
    for(let i=0;i<30;i++){
      const s = await fetchJSON(`http://localhost:8000/bi/status/${taskId}`)
      if((s as any).__error){ setError((s as any).__error); return }
      if(s.status==='done'){ result = s.result; break }
      if(s.status==='error'){ setError(s.error||'执行错误'); return }
      await new Promise(r=>setTimeout(r, 200))
    }
    if(result){ setTable(result.table); setError('') }
  }

  const onAdd = (role:"dimension"|"measure"|"filter", col: Column)=>{
    const item: StackItem = { op: 'add_field', role, col: col.name }
    setStack(prev=>[...prev, item].slice(-50))
    if(role==='dimension') setDims(prev=>Array.from(new Set([...prev, col.name])))
    if(role==='measure') setMeasures(prev=>[...prev, { col: col.name, aggregate: 'sum' }])
  }

  useEffect(()=>{ runQuery() }, [dims, measures])

  return (
    <div className="flex gap-4">
      <FieldPanel columns={columns} onAdd={onAdd} />
      <div className="flex-1 space-y-3">
        {error && <div className="text-red-600 text-sm border border-red-200 rounded p-2">{error}</div>}
        <div className="rounded border p-3">
          <div className="text-sm text-gray-500 mb-2">维度 Dimensions: {dims.join(', ') || '—'} | 度量 Measures: {measures.map(m=>m.col+':'+m.aggregate).join(', ') || '—'}</div>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                {table[0] && (
                  <tr>
                    {Object.keys(table[0]).map(k=>(<th key={k} className="border px-2 py-1 text-left bg-gray-50 dark:bg-gray-800">{k}</th>))}
                  </tr>
                )}
              </thead>
              <tbody>
                {table.map((row, i)=>(
                  <tr key={i}>
                    {Object.values(row).map((v, j)=>(<td key={j} className="border px-2 py-1">{String(v)}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <HistoryStack stack={stack} onUndo={()=>{}} onRedo={()=>{}} onReset={()=>{ setDims([]); setMeasures([]); setStack([]) }} />
    </div>
  )
}


