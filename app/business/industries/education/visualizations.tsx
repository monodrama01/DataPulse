import React from 'react'

// 学习漏斗
export const LearningFunnelChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const stages = [
    { name: '报名', count: 10000, percentage: 100, color: '#3b82f6' },
    { name: '首次上课', count: 8500, percentage: 85, color: '#8b5cf6' },
    { name: '完成50%', count: 6000, percentage: 60, color: '#ec4899' },
    { name: '完课', count: 4200, percentage: 42, color: '#f59e0b' }
  ]

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        学习完课漏斗
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

// 续费率分析
export const RenewalRateChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const months = ['1月', '2月', '3月', '4月', '5月', '6月']
  const renewalRate = [65, 68, 72, 75, 78, 82]
  const avgRevenue = [3200, 3400, 3600, 3800, 4000, 4300]

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        续费率与客单价趋势
      </text>

      <line x1="80" y1="60" x2="80" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      <line x1="80" y1="320" x2="750" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>

      {/* 续费率曲线 */}
      <path
        d={renewalRate.map((val, i) => {
          const x = 120 + i * 110
          const y = 320 - ((val - 60) / 30) * 200
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')}
        stroke="#22c55e"
        strokeWidth="3"
        fill="none"
      />

      {/* 客单价曲线 */}
      <path
        d={avgRevenue.map((val, i) => {
          const x = 120 + i * 110
          const y = 320 - ((val - 3000) / 1500) * 200
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')}
        stroke="#3b82f6"
        strokeWidth="3"
        fill="none"
        strokeDasharray="5,5"
      />

      {months.map((month, i) => {
        const x = 120 + i * 110
        return (
          <text key={i} x={x} y="340" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
            {month}
          </text>
        )
      })}

      {/* 图例 */}
      <g transform="translate(600, 80)">
        <line x1="0" y1="0" x2="30" y2="0" stroke="#22c55e" strokeWidth="3"/>
        <text x="35" y="5" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>续费率</text>
        
        <line x1="0" y1="20" x2="30" y2="20" stroke="#3b82f6" strokeWidth="3" strokeDasharray="5,5"/>
        <text x="35" y="25" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>客单价</text>
      </g>
    </svg>
  )
}

// NPS分布
export const NPSDistributionChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const segments = [
    { name: '推荐者(9-10分)', count: 4500, percentage: 45, color: '#22c55e' },
    { name: '中立者(7-8分)', count: 3500, percentage: 35, color: '#eab308' },
    { name: '贬损者(0-6分)', count: 2000, percentage: 20, color: '#ef4444' }
  ]

  const nps = 45 - 20 // 推荐者% - 贬损者%

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        用户NPS净推荐值分布
      </text>

      {segments.map((seg, i) => {
        const y = 70 + i * 90
        const barWidth = seg.percentage * 6

        return (
          <g key={i}>
            <rect x="150" y={y} width={barWidth} height="60" fill={seg.color} opacity="0.8" rx="6"/>
            
            <text x="130" y={y + 35} textAnchor="end" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
              {seg.name}
            </text>
            
            <text x={160} y={y + 35} className="text-lg fill-white font-bold">
              {seg.count.toLocaleString()}人 ({seg.percentage}%)
            </text>
          </g>
        )
      })}

      {/* NPS值 */}
      <g transform="translate(550, 150)">
        <circle cx="60" cy="60" r="55" fill={isDark ? '#1f2937' : '#f3f4f6'} stroke="#22c55e" strokeWidth="4"/>
        <text x="60" y="50" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
          NPS
        </text>
        <text x="60" y="75" textAnchor="middle" className="text-3xl font-bold fill-green-500">
          {nps}
        </text>
      </g>
    </svg>
  )
}

