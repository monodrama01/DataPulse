"use client"

import React from "react"

interface VisualizationProps {
  theme: "light" | "dark"
}

export const BarChartDemo: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === "dark"
  const values = [60, 95, 40, 80, 120, 70]
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  return (
    <svg viewBox="0 0 520 220" className="w-full h-auto">
      <text x="260" y="18" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>分组柱状图（示意）</text>
      <line x1="50" y1="200" x2="500" y2="200" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="2"/>
      <line x1="50" y1="30" x2="50" y2="200" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="2"/>
      {values.map((v, i) => {
        const x = 70 + i * 70
        const h = v
        const y = 200 - h
        return (
          <g key={i}>
            <rect x={x} y={y} width="28" height={h} fill={isDark ? '#60a5fa' : '#3b82f6'} rx="4" />
            <text x={x + 14} y={210} textAnchor="middle" className={`text-[10px] ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>{labels[i]}</text>
            <text x={x + 14} y={y - 6} textAnchor="middle" className={`text-[10px] ${isDark ? 'fill-blue-200' : 'fill-blue-700'}`}>{v}</text>
          </g>
        )
      })}
    </svg>
  )
}

export const LineChartDemo: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === "dark"
  return (
    <svg viewBox="0 0 520 220" className="w-full h-auto">
      <text x="260" y="18" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>折线图（示意）</text>
      <line x1="50" y1="200" x2="500" y2="200" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="2"/>
      <line x1="50" y1="30" x2="50" y2="200" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="2"/>
      <polyline points="50,180 120,150 190,120 260,140 330,100 400,130 470,90" fill="none" stroke={isDark ? '#22d3ee' : '#06b6d4'} strokeWidth="3" />
      {[{x:50,y:180},{x:120,y:150},{x:190,y:120},{x:260,y:140},{x:330,y:100},{x:400,y:130},{x:470,y:90}].map((p,i)=> (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={isDark ? '#22d3ee' : '#06b6d4'} />
      ))}
    </svg>
  )
}

export const PieDonutDemo: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === "dark"
  const colors = isDark ? ["#60a5fa", "#22d3ee", "#a78bfa", "#f59e0b"] : ["#2563eb", "#06b6d4", "#7c3aed", "#f59e0b"]
  return (
    <svg viewBox="0 0 520 220" className="w-full h-auto">
      <text x="260" y="18" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>甜甜圈图（示意）</text>
      <g transform="translate(260,120)">
        <circle r="70" fill={isDark ? '#1f2937' : '#ffffff'} stroke={isDark ? '#374151' : '#e5e7eb'} />
        <path d="M0,0 L70,0 A70,70 0 0 1 0,-70 Z" fill={colors[0]} />
        <path d="M0,0 L0,-70 A70,70 0 0 1 -61.7,-35 Z" fill={colors[1]} />
        <path d="M0,0 L-61.7,-35 A70,70 0 0 1 35,61.7 Z" fill={colors[2]} />
        <path d="M0,0 L35,61.7 A70,70 0 0 1 70,0 Z" fill={colors[3]} />
        <circle r="35" fill={isDark ? '#0b1220' : '#f9fafb'} />
      </g>
    </svg>
  )
}

export const StackedBarDemo: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === "dark"
  const colors = isDark ? ["#60a5fa", "#34d399", "#fbbf24"] : ["#3b82f6", "#10b981", "#f59e0b"]
  return (
    <svg viewBox="0 0 520 220" className="w-full h-auto">
      <text x="260" y="18" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>堆叠柱状图（示意）</text>
      <line x1="50" y1="200" x2="500" y2="200" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="2"/>
      {[0,1,2,3].map(i => {
        const baseX = 80 + i*100
        return (
          <g key={i}>
            <rect x={baseX} y={120} width="40" height="80" fill={colors[0]} rx="4"/>
            <rect x={baseX} y={80} width="40" height="40" fill={colors[1]} rx="4"/>
            <rect x={baseX} y={60} width="40" height="20" fill={colors[2]} rx="4"/>
          </g>
        )
      })}
    </svg>
  )
}

export const PivotTableDiagram: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === "dark"
  return (
    <svg viewBox="0 0 520 220" className="w-full h-auto">
      <text x="260" y="18" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>透视表结构（示意）</text>
      <rect x="40" y="40" width="440" height="140" fill={isDark ? '#0b1220' : '#ffffff'} stroke={isDark ? '#374151' : '#e5e7eb'} />
      <rect x="40" y="40" width="110" height="24" fill={isDark ? '#111827' : '#f3f4f6'} />
      <text x="50" y="57" className={`text-[11px] ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>行标签（地区）</text>
      <rect x="150" y="40" width="110" height="24" fill={isDark ? '#111827' : '#f3f4f6'} />
      <text x="160" y="57" className={`text-[11px] ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>列标签（产品）</text>
      <rect x="260" y="40" width="220" height="24" fill={isDark ? '#111827' : '#f3f4f6'} />
      <text x="270" y="57" className={`text-[11px] ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>值（销售额、数量）</text>
      {[0,1,2,3].map(r => (
        <line key={r} x1="40" y1={80+r*25} x2="480" y2={80+r*25} stroke={isDark ? '#374151' : '#e5e7eb'} />
      ))}
      {[0,1,2,3].map(c => (
        <line key={c} x1={150+c*90} y1="64" x2={150+c*90} y2="180" stroke={isDark ? '#374151' : '#e5e7eb'} />
      ))}
    </svg>
  )
}

export const BIFlowDiagram: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === "dark"
  return (
    <svg viewBox="0 0 700 220" className="w-full h-auto">
      <text x="350" y="18" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>数据可视化流程（ETL → 模型 → 可视化 → 发布）</text>
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={isDark ? '#6b7280' : '#9ca3af'} />
        </marker>
      </defs>
      {[
        {x:60,label:'数据源\nDB/Excel/API'},
        {x:210,label:'ETL/建模\nPower Query/Pandas'},
        {x:360,label:'分析/度量\nDAX/计算字段'},
        {x:510,label:'可视化\nPower BI/Tableau/ECharts'}
      ].map((b,i)=> (
        <g key={i}>
          <rect x={b.x} y={70} width="120" height="70" rx="10" fill={isDark ? '#111827' : '#ffffff'} stroke={isDark ? '#374151' : '#e5e7eb'} />
          <text x={b.x+60} y={95} textAnchor="middle" className={`text-[11px] ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>{b.label.split('\n')[0]}</text>
          <text x={b.x+60} y={115} textAnchor="middle" className={`text-[11px] ${isDark ? 'fill-gray-400' : 'fill-gray-500'}`}>{b.label.split('\n')[1]}</text>
        </g>
      ))}
      {[0,1,2].map(i => (
        <line key={i} x1={180+i*150} y1="105" x2={210+i*150} y2="105" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="2" markerEnd="url(#arrow)" />
      ))}
    </svg>
  )
}

export default {}


