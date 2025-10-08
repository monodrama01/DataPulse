import React from 'react'

// 留存率曲线
export const RetentionCurveChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const days = ['D1', 'D3', 'D7', 'D14', 'D30']
  const retention = [45, 28, 18, 12, 8]

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        用户留存率分析
      </text>

      <line x1="80" y1="60" x2="80" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      <line x1="80" y1="320" x2="750" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>

      <path
        d={retention.map((val, i) => {
          const x = 150 + i * 150
          const y = 320 - (val / 50) * 240
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')}
        stroke="#ec4899"
        strokeWidth="3"
        fill="none"
      />

      {retention.map((val, i) => {
        const x = 150 + i * 150
        const y = 320 - (val / 50) * 240
        
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill="#ec4899"/>
            <text x={x} y={y - 15} textAnchor="middle" className="text-sm fill-pink-600 font-bold">
              {val}%
            </text>
            <text x={x} y="340" textAnchor="middle" className={`text-sm font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
              {days[i]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// 付费用户分布
export const PayingUserChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const segments = [
    { name: '鲸鱼用户', count: 500, revenue: 5000000, percentage: 50, color: '#ef4444' },
    { name: '大R用户', count: 2000, revenue: 3000000, percentage: 30, color: '#f59e0b' },
    { name: '中R用户', count: 5000, revenue: 1500000, percentage: 15, color: '#eab308' },
    { name: '小R用户', count: 12500, revenue: 500000, percentage: 5, color: '#22c55e' }
  ]

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        付费用户分布与贡献
      </text>

      {segments.map((seg, i) => {
        const y = 60 + i * 80
        const barWidth = seg.percentage * 6

        return (
          <g key={i}>
            <rect x="150" y={y} width={barWidth} height="60" fill={seg.color} opacity="0.8" rx="6"/>
            
            <text x="130" y={y + 35} textAnchor="end" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
              {seg.name}
            </text>
            
            <text x={160} y={y + 25} className="text-sm fill-white font-bold">
              {seg.count.toLocaleString()}人
            </text>
            <text x={160} y={y + 45} className="text-xs fill-white">
              贡献{seg.percentage}% (¥{(seg.revenue / 10000).toFixed(0)}万)
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ARPU趋势
export const ARPUTrendChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const months = ['1月', '2月', '3月', '4月', '5月', '6月']
  const arpu = [8.5, 9.2, 10.1, 11.5, 12.8, 14.2]
  const arppu = [85, 92, 98, 105, 112, 118]

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        ARPU与ARPPU趋势
      </text>

      <line x1="80" y1="60" x2="80" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      <line x1="80" y1="320" x2="750" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>

      {/* ARPU */}
      <path
        d={arpu.map((val, i) => {
          const x = 120 + i * 110
          const y = 320 - (val / 20) * 200
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')}
        stroke="#3b82f6"
        strokeWidth="3"
        fill="none"
      />

      {/* ARPPU */}
      <path
        d={arppu.map((val, i) => {
          const x = 120 + i * 110
          const y = 320 - (val / 150) * 200
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')}
        stroke="#22c55e"
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
        <line x1="0" y1="0" x2="30" y2="0" stroke="#3b82f6" strokeWidth="3"/>
        <text x="35" y="5" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>ARPU</text>
        
        <line x1="0" y1="20" x2="30" y2="20" stroke="#22c55e" strokeWidth="3" strokeDasharray="5,5"/>
        <text x="35" y="25" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>ARPPU</text>
      </g>
    </svg>
  )
}

