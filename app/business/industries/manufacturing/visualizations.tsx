import React from 'react'

// OEE综合效率分析
export const OEEAnalysisChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const data = {
    availability: 85,
    performance: 92,
    quality: 96,
    oee: 75  // 85% * 92% * 96% = 75%
  }

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        OEE设备综合效率分析
      </text>

      {/* 三个组成部分 */}
      {[
        { name: '时间开动率', value: data.availability, x: 150, color: '#3b82f6', desc: 'Availability' },
        { name: '性能稼动率', value: data.performance, x: 350, color: '#8b5cf6', desc: 'Performance' },
        { name: '良品率', value: data.quality, x: 550, color: '#22c55e', desc: 'Quality' }
      ].map((item, i) => (
        <g key={i}>
          <rect x={item.x - 60} y="70" width="120" height="120" fill={item.color} opacity="0.1" rx="8"/>
          <circle cx={item.x} cy="130" r="50" fill={item.color} opacity="0.8"/>
          <text x={item.x} y="140" textAnchor="middle" className="text-3xl fill-white font-bold">
            {item.value}%
          </text>
          
          <text x={item.x} y="220" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
            {item.name}
          </text>
          <text x={item.x} y="240" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
            ({item.desc})
          </text>
        </g>
      ))}

      {/* 乘法符号 */}
      <text x="250" y="140" textAnchor="middle" className={`text-3xl ${isDark ? 'fill-gray-500' : 'fill-gray-400'}`}>×</text>
      <text x="450" y="140" textAnchor="middle" className={`text-3xl ${isDark ? 'fill-gray-500' : 'fill-gray-400'}`}>×</text>

      {/* OEE结果 */}
      <rect x="250" y="280" width="300" height="90" fill={isDark ? '#1e293b' : '#fef3c7'} rx="12"/>
      <text x="400" y="310" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-amber-400' : 'fill-amber-600'}`}>
        OEE综合效率
      </text>
      <text x="400" y="345" textAnchor="middle" className="text-4xl font-bold fill-amber-500">
        {data.oee}%
      </text>
    </svg>
  )
}

// 质量缺陷帕累托图
export const QualityParetoChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const defects = [
    { type: '尺寸偏差', count: 450, percentage: 45 },
    { type: '表面划伤', count: 250, percentage: 25 },
    { type: '装配不良', count: 150, percentage: 15 },
    { type: '材料缺陷', count: 80, percentage: 8 },
    { type: '其他', count: 70, percentage: 7 }
  ]

  let cumulative = 0
  const defectsWithCum = defects.map(d => {
    cumulative += d.percentage
    return { ...d, cumulative }
  })

  const maxCount = Math.max(...defects.map(d => d.count))

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        质量缺陷帕累托分析
      </text>

      {/* 坐标轴 */}
      <line x1="80" y1="60" x2="80" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      <line x1="80" y1="320" x2="750" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      <line x1="750" y1="60" x2="750" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>

      {/* 柱状图 */}
      {defectsWithCum.map((defect, i) => {
        const x = 130 + i * 130
        const barHeight = (defect.count / maxCount) * 220
        const y = 320 - barHeight

        return (
          <g key={i}>
            <rect x={x} y={y} width="90" height={barHeight} fill="#3b82f6" opacity="0.7" rx="4"/>
            <text x={x + 45} y={y - 5} textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
              {defect.count}
            </text>
            <text x={x + 45} y="340" textAnchor="middle" className={`text-xs font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
              {defect.type}
            </text>
          </g>
        )
      })}

      {/* 累积百分比折线 */}
      <path
        d={defectsWithCum.map((d, i) => {
          const x = 130 + i * 130 + 45
          const y = 60 + (100 - d.cumulative) / 100 * 260
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')}
        stroke="#ef4444"
        strokeWidth="3"
        fill="none"
      />

      {/* 累积百分比数据点 */}
      {defectsWithCum.map((d, i) => {
        const x = 130 + i * 130 + 45
        const y = 60 + (100 - d.cumulative) / 100 * 260
        
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="#ef4444"/>
            <text x={x + 15} y={y + 5} className="text-sm fill-red-600 font-bold">
              {d.cumulative}%
            </text>
          </g>
        )
      })}

      {/* 80%参考线 */}
      <line x1="80" y1={60 + 20} x2="750" y2={60 + 20} stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5"/>
      <text x="680" y="75" className="text-xs font-bold fill-green-500">80%线</text>

      {/* 右侧Y轴标签 */}
      <text x="760" y="65" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>100%</text>
      <text x="760" y="195" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>50%</text>
      <text x="760" y="325" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>0%</text>

      {/* 说明 */}
      <rect x="550" y="360" width="180" height="30" fill={isDark ? '#1e293b' : '#dbeafe'} rx="6" opacity="0.9"/>
      <text x="640" y="380" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        前3项占85%，重点改善
      </text>
    </svg>
  )
}

// 产能利用率趋势
export const CapacityUtilizationChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  const utilization = [72, 75, 78, 80, 82, 85, 87, 88, 90, 91, 92, 93]
  const target = 85

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        产能利用率提升趋势
      </text>

      {/* 坐标轴 */}
      <line x1="80" y1="60" x2="80" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      <line x1="80" y1="320" x2="750" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>

      {/* Y轴刻度 */}
      {[70, 75, 80, 85, 90, 95].map((val, i) => (
        <g key={i}>
          <line x1="75" y1={60 + (95 - val) / 25 * 260} x2="80" y2={60 + (95 - val) / 25 * 260} stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="1"/>
          <text x="65" y={60 + (95 - val) / 25 * 260 + 5} textAnchor="end" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
            {val}%
          </text>
        </g>
      ))}

      {/* 目标线 */}
      <line x1="80" y1={60 + (95 - target) / 25 * 260} x2="750" y2={60 + (95 - target) / 25 * 260} stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5"/>
      <text x="690" y={60 + (95 - target) / 25 * 260 - 5} className="text-xs font-bold fill-green-500">目标:85%</text>

      {/* 趋势线 */}
      <path
        d={utilization.map((val, i) => {
          const x = 100 + i * 55
          const y = 60 + (95 - val) / 25 * 260
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')}
        stroke="#3b82f6"
        strokeWidth="3"
        fill="none"
      />

      {/* 数据点 */}
      {utilization.map((val, i) => {
        const x = 100 + i * 55
        const y = 60 + (95 - val) / 25 * 260
        const isAboveTarget = val >= target
        
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill={isAboveTarget ? '#22c55e' : '#3b82f6'}/>
            {i % 2 === 0 && (
              <text x={x} y={y - 10} textAnchor="middle" className={`text-xs font-bold ${isAboveTarget ? 'fill-green-600' : 'fill-blue-600'}`}>
                {val}%
              </text>
            )}
            <text x={x} y="340" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
              {months[i]}
            </text>
          </g>
        )
      })}

      {/* 改进说明 */}
      <rect x="550" y="60" width="180" height="80" fill={isDark ? '#1e293b' : '#dbeafe'} rx="8" opacity="0.9"/>
      <text x="640" y="85" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-blue-400' : 'fill-blue-600'}`}>
        ✨ 年度提升
      </text>
      <text x="640" y="105" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        72% → 93%
      </text>
      <text x="640" y="125" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        提升29%，超额达标
      </text>
    </svg>
  )
}

