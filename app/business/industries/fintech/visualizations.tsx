import React from 'react'

// 转化漏斗图
export const ConversionFunnelChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const stages = [
    { name: '注册', count: 10000, percentage: 100, color: '#3b82f6' },
    { name: '实名认证', count: 7500, percentage: 75, color: '#8b5cf6' },
    { name: '首次投资', count: 3000, percentage: 30, color: '#ec4899' },
    { name: '复投', count: 1800, percentage: 18, color: '#f59e0b' }
  ]

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        用户转化漏斗分析
      </text>

      {stages.map((stage, i) => {
        const width = 600 * (stage.percentage / 100)
        const x = 400 - width / 2
        const y = 60 + i * 80
        const nextWidth = i < stages.length - 1 ? 600 * (stages[i + 1].percentage / 100) : width
        const nextX = 400 - nextWidth / 2

        return (
          <g key={i}>
            <path
              d={`M ${x} ${y} L ${x + width} ${y} L ${nextX + nextWidth} ${y + 60} L ${nextX} ${y + 60} Z`}
              fill={stage.color}
              opacity="0.8"
            />
            
            <text x="400" y={y + 30} textAnchor="middle" className="text-lg fill-white font-bold">
              {stage.name}
            </text>
            <text x="400" y={y + 50} textAnchor="middle" className="text-sm fill-white">
              {stage.count.toLocaleString()}人 ({stage.percentage}%)
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// 风险等级分布
export const RiskDistributionChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const risks = [
    { level: '低风险', count: 4500, percentage: 45, color: '#22c55e' },
    { level: '中风险', count: 3500, percentage: 35, color: '#eab308' },
    { level: '高风险', count: 2000, percentage: 20, color: '#ef4444' }
  ]

  let cumulative = 0

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        用户风险等级分布
      </text>

      {risks.map((risk, i) => {
        const y = 70 + i * 90
        const barWidth = risk.percentage * 5

        return (
          <g key={i}>
            <rect x="150" y={y} width={barWidth} height="60" fill={risk.color} opacity="0.8" rx="6"/>
            
            <text x="130" y={y + 35} textAnchor="end" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
              {risk.level}
            </text>
            
            <text x={160} y={y + 35} className="text-lg fill-white font-bold">
              {risk.count.toLocaleString()}人 ({risk.percentage}%)
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// LTV趋势图
export const LTVTrendChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const months = ['1M', '2M', '3M', '6M', '12M', '24M', '36M']
  const ltv = [1200, 2800, 4200, 7500, 12000, 18000, 22000]
  const maxLTV = 25000

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        用户LTV生命周期价值
      </text>

      <line x1="80" y1="60" x2="80" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      <line x1="80" y1="320" x2="750" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>

      <path
        d={ltv.map((val, i) => {
          const x = 100 + i * 100
          const y = 320 - (val / maxLTV) * 240
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')}
        stroke="#3b82f6"
        strokeWidth="3"
        fill="none"
      />

      {ltv.map((val, i) => {
        const x = 100 + i * 100
        const y = 320 - (val / maxLTV) * 240
        
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="#3b82f6"/>
            <text x={x} y={y - 10} textAnchor="middle" className="text-xs fill-blue-600 font-bold">
              ¥{(val / 1000).toFixed(1)}K
            </text>
            <text x={x} y="340" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
              {months[i]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

