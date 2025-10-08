"use client"

import React from "react"
import ReactECharts from "echarts-for-react"
import * as echarts from "echarts"

// 动态导入 echarts-wordcloud，避免 SSR 错误
if (typeof window !== 'undefined') {
  import('echarts-wordcloud')
}

interface ChartCardProps {
  title: string
  option: any
  height?: number
  fetchUrl?: string
  fallbackUrls?: string[]
  transformData?: (raw: any, echarts?: typeof import('echarts')) => any | Promise<any>
}

export default function ChartCard({ title, option, height = 224, fetchUrl, fallbackUrls, transformData }: ChartCardProps) {
  const [chartOption, setChartOption] = React.useState<any>(option)
  const chartRef = React.useRef<ReactECharts | null>(null)

  React.useEffect(() => {
    let cancelled = false
    async function load() {
      if (!fetchUrl) return
      const urls = [fetchUrl, ...(fallbackUrls ?? [])]
      for (const url of urls) {
        try {
          const res = await fetch(url)
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const data = await res.json()
          if (cancelled) return
          const transformed = transformData ? await Promise.resolve(transformData(data, echarts)) : data
          setChartOption(transformed)
          return
        } catch (e) {
          console.warn("ChartCard fetch failed", url, e)
          continue
        }
      }
      // 全部失败则保持默认 option
    }
    load()
    return () => { cancelled = true }
  }, [fetchUrl, JSON.stringify(fallbackUrls ?? []), transformData])

  function handleDownloadPng() {
    const inst = chartRef.current?.getEchartsInstance?.()
    if (!inst) return
    const url = inst.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: '#ffffff' })
    const a = document.createElement('a')
    a.href = url
    a.download = `${title}.png`
    a.click()
  }

  function handleDownloadCsv() {
    // 简易 CSV 导出：遍历 series 数据
    const series = (chartOption?.series ?? []) as any[]
    const rows: string[] = []
    series.forEach((s, idx) => {
      if (Array.isArray(s.data)) {
        rows.push([`series_${idx}`].concat(s.data).join(','))
      }
    })
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-white/5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
        <div className="flex gap-2">
          <button onClick={handleDownloadPng} className="px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">下载PNG</button>
          <button onClick={handleDownloadCsv} className="px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">下载CSV</button>
        </div>
      </div>
      <ReactECharts echarts={echarts as any} ref={chartRef as any} option={chartOption} style={{ height }} notMerge lazyUpdate />
    </div>
  )
}



