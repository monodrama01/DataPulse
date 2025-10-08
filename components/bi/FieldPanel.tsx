"use client"
import React from "react"

type Column = { name: string, type: string }

export default function FieldPanel({ columns, onAdd }:{ columns: Column[], onAdd:(role:"dimension"|"measure"|"filter", col: Column)=>void }){
  return (
    <div className="w-full md:w-64 border-r pr-3 space-y-2">
      <div className="font-semibold text-sm">字段 Fields</div>
      <div className="space-y-1">
        {columns.map(c => (
          <button key={c.name} onClick={()=>onAdd(c.type==='number'?'measure':'dimension', c)} className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
            <span className="text-xs w-5">{icon(c.type)}</span>
            <span className="text-sm">{c.name}</span>
            <span className="ml-auto text-xs text-gray-400">{c.type}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function icon(t: string){
  if(t==='number') return '#'
  if(t==='date') return '📅'
  if(t==='category') return '🔤'
  return '∑'
}


