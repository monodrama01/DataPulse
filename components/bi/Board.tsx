"use client"
import React from "react"
import EChart from "@/components/bi/EChart"

type KPI = { name: string, value: number, aggregate: string }
type Chart = { type: string, title: string, xAxis: any[], series: any[], alt?: string }

export default function Board({ kpis, charts }: { kpis: KPI[], charts: Chart[] }) {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      {kpis?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(k => (
            <div key={k.name} className="rounded-lg border p-4 bg-white dark:bg-gray-900">
              <div className="text-sm text-gray-500">{k.name}</div>
              <div className="text-2xl font-bold">{k.value.toLocaleString()}</div>
              <div className="text-xs text-gray-400">agg: {k.aggregate}</div>
            </div>
          ))}
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts?.map((c, i) => (
          <div key={i} className="rounded-lg border p-3 bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{c.title}</div>
              <details className="text-xs text-blue-600 cursor-pointer select-none">
                <summary>option</summary>
                <pre className="max-h-60 overflow-auto text-[10px] whitespace-pre-wrap">{JSON.stringify(toOption(c), null, 2)}</pre>
              </details>
            </div>
            <EChart option={toOption(c)} height={300} />
          </div>
        ))}
      </div>
    </div>
  )
}

function toOption(c: Chart) {
  if (c.type === "pie") {
    return {
      tooltip: { trigger: 'item' },
      legend: { top: 20 },
      series: [{
        type: 'pie', radius: '60%',
        data: c.xAxis.map((x, idx) => ({ name: x, value: c.series[0].data[idx] }))
      }]
    }
  }
  return {
    tooltip: {},
    grid: { left: 40, right: 20, top: 30, bottom: 40 },
    xAxis: { type: 'category', data: c.xAxis },
    yAxis: { type: 'value' },
    series: c.series.map(s => ({ ...s, type: c.type === 'barh' ? 'bar' : c.type })),
  }
}


