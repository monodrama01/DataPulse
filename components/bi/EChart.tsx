"use client"
import React, { useEffect, useRef } from "react"
// 使用完整包，避免模块路径解析错误
import * as echarts from "echarts"

type Props = { option: any, height?: number }

export default function EChart({ option, height = 300 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const chart = echarts.init(ref.current, undefined, { renderer: "svg" })
    chart.setOption(option)
    const onResize = () => chart.resize()
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      chart.dispose()
    }
  }, [option])
  return <div ref={ref} style={{ width: "100%", height }} />
}


