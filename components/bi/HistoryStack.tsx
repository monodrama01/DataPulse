"use client"
import React from "react"

export type StackItem = { op: string, role?: string, col?: string, aggregate?: string }

export default function HistoryStack({ stack, onUndo, onRedo, onReset }:{ stack: StackItem[], onUndo:()=>void, onRedo:()=>void, onReset:()=>void }){
  return (
    <div className="w-full md:w-64 border-l pl-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-sm">历史栈 History</div>
        <div className="flex gap-2 text-xs">
          <button onClick={onUndo} className="px-2 py-1 border rounded">撤销</button>
          <button onClick={onRedo} className="px-2 py-1 border rounded">重做</button>
          <button onClick={onReset} className="px-2 py-1 border rounded">重置</button>
        </div>
      </div>
      <ol className="space-y-1 text-xs">
        {stack.map((s, idx) => (
          <li key={idx} className="px-2 py-1 rounded bg-gray-50 dark:bg-gray-800">{JSON.stringify(s)}</li>
        ))}
      </ol>
    </div>
  )
}


