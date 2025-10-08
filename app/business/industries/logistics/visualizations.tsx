import React from 'react'

// 配送准时率分析
export const DeliveryTimelinessChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const regions = [
    { name: '华东区', onTime: 92, delayed: 6, lost: 2, color: '#22c55e' },
    { name: '华南区', onTime: 88, delayed: 9, lost: 3, color: '#3b82f6' },
    { name: '华北区', onTime: 85, delayed: 11, lost: 4, color: '#f59e0b' },
    { name: '西南区', onTime: 78, delayed: 16, lost: 6, color: '#ef4444' },
    { name: '西北区', onTime: 72, delayed: 20, lost: 8, color: '#991b1b' }
  ]

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        各区域配送准时率分析
      </text>

      {regions.map((region, i) => {
        const y = 70 + i * 65
        const onTimeWidth = region.onTime * 5
        const delayedWidth = region.delayed * 5
        const lostWidth = region.lost * 5

        return (
          <g key={i}>
            <text x="100" y={y + 25} textAnchor="end" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
              {region.name}
            </text>
            
            {/* 准时 */}
            <rect x="120" y={y} width={onTimeWidth} height="40" fill="#22c55e" opacity="0.8" rx="4"/>
            <text x={120 + onTimeWidth / 2} y={y + 25} textAnchor="middle" className="text-sm fill-white font-bold">
              {region.onTime}%
            </text>
            
            {/* 延迟 */}
            <rect x={120 + onTimeWidth} y={y} width={delayedWidth} height="40" fill="#f59e0b" opacity="0.8" rx="4"/>
            <text x={120 + onTimeWidth + delayedWidth / 2} y={y + 25} textAnchor="middle" className="text-xs fill-white font-bold">
              {region.delayed}%
            </text>
            
            {/* 丢失 */}
            <rect x={120 + onTimeWidth + delayedWidth} y={y} width={lostWidth} height="40" fill="#ef4444" opacity="0.8" rx="4"/>
            <text x={120 + onTimeWidth + delayedWidth + lostWidth / 2} y={y + 25} textAnchor="middle" className="text-xs fill-white font-bold">
              {region.lost}%
            </text>
            
            {/* 评级标签 */}
            <rect x="640" y={y + 10} width="100" height="20" fill={region.color} rx="4" opacity="0.9"/>
            <text x="690" y={y + 24} textAnchor="middle" className="text-xs fill-white font-bold">
              {region.onTime >= 90 ? '优秀' : region.onTime >= 85 ? '良好' : region.onTime >= 80 ? '一般' : '待改进'}
            </text>
          </g>
        )
      })}

      {/* 图例 */}
      <g transform="translate(120, 360)">
        <rect x="0" y="0" width="20" height="15" fill="#22c55e" opacity="0.8" rx="3"/>
        <text x="25" y="12" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>准时</text>
        
        <rect x="70" y="0" width="20" height="15" fill="#f59e0b" opacity="0.8" rx="3"/>
        <text x="95" y="12" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>延迟</text>
        
        <rect x="140" y="0" width="20" height="15" fill="#ef4444" opacity="0.8" rx="3"/>
        <text x="165" y="12" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>丢失/损坏</text>
      </g>
    </svg>
  )
}

// 运输成本结构分析
export const CostStructureChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const costs = [
    { item: '运输费用', amount: 4500, percentage: 45, color: '#3b82f6' },
    { item: '人工成本', amount: 2500, percentage: 25, color: '#8b5cf6' },
    { item: '仓储费用', amount: 1500, percentage: 15, color: '#ec4899' },
    { item: '包装材料', amount: 1000, percentage: 10, color: '#f59e0b' },
    { item: '其他费用', amount: 500, percentage: 5, color: '#6b7280' }
  ]

  let currentAngle = -Math.PI / 2

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        物流成本结构分析
      </text>

      {/* 饼图 */}
      {costs.map((item, i) => {
        const angle = (item.percentage / 100) * 2 * Math.PI
        const startAngle = currentAngle
        const endAngle = currentAngle + angle
        const largeArcFlag = angle > Math.PI ? 1 : 0
        
        const x1 = 250 + 120 * Math.cos(startAngle)
        const y1 = 220 + 120 * Math.sin(startAngle)
        const x2 = 250 + 120 * Math.cos(endAngle)
        const y2 = 220 + 120 * Math.sin(endAngle)
        
        const labelAngle = startAngle + angle / 2
        const labelX = 250 + 80 * Math.cos(labelAngle)
        const labelY = 220 + 80 * Math.sin(labelAngle)
        
        currentAngle = endAngle

        return (
          <g key={i}>
            <path
              d={`M 250 220 L ${x1} ${y1} A 120 120 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
              fill={item.color}
              opacity="0.8"
              stroke={isDark ? '#1f2937' : '#ffffff'}
              strokeWidth="2"
            />
            <text x={labelX} y={labelY} textAnchor="middle" className="text-sm font-bold fill-white">
              {item.percentage}%
            </text>
          </g>
        )
      })}

      {/* 详细列表 */}
      <g transform="translate(450, 80)">
        {costs.map((item, i) => (
          <g key={i} transform={`translate(0, ${i * 60})`}>
            <rect x="0" y="0" width="300" height="50" fill={isDark ? '#1e293b' : '#f8fafc'} rx="6" opacity="0.9"/>
            
            <rect x="10" y="10" width="30" height="30" fill={item.color} rx="4" opacity="0.8"/>
            
            <text x="50" y="22" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
              {item.item}
            </text>
            <text x="50" y="38" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
              ¥{item.amount}万
            </text>
            
            <text x="280" y="30" textAnchor="end" className="text-xl font-bold fill-purple-500">
              {item.percentage}%
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}

// 配送时效趋势图
export const DeliveryTrendChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  const avgDuration = [52, 50, 48, 46, 45, 44, 43, 42, 41, 40, 39, 38]
  const target = 40

  const maxDuration = 55
  const minDuration = 35

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        配送时效改进趋势（小时）
      </text>

      {/* 坐标轴 */}
      <line x1="80" y1="60" x2="80" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      <line x1="80" y1="320" x2="750" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>

      {/* Y轴刻度 */}
      {[35, 40, 45, 50, 55].map((val, i) => (
        <g key={i}>
          <line x1="75" y1={60 + (55 - val) / (maxDuration - minDuration) * 260} x2="80" y2={60 + (55 - val) / (maxDuration - minDuration) * 260} stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="1"/>
          <text x="65" y={60 + (55 - val) / (maxDuration - minDuration) * 260 + 5} textAnchor="end" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
            {val}h
          </text>
        </g>
      ))}

      {/* 目标线 */}
      <line x1="80" y1={60 + (55 - target) / (maxDuration - minDuration) * 260} x2="750" y2={60 + (55 - target) / (maxDuration - minDuration) * 260} stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5"/>
      <text x="690" y={60 + (55 - target) / (maxDuration - minDuration) * 260 - 5} className="text-xs font-bold fill-green-500">目标:40h</text>

      {/* 趋势线 */}
      <path
        d={avgDuration.map((duration, i) => {
          const x = 100 + i * 55
          const y = 60 + (55 - duration) / (maxDuration - minDuration) * 260
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')}
        stroke="#3b82f6"
        strokeWidth="3"
        fill="none"
      />

      {/* 数据点 */}
      {avgDuration.map((duration, i) => {
        const x = 100 + i * 55
        const y = 60 + (55 - duration) / (maxDuration - minDuration) * 260
        
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="#3b82f6"/>
            {i % 2 === 0 && (
              <text x={x} y={y - 10} textAnchor="middle" className="text-xs fill-blue-600 font-bold">
                {duration}h
              </text>
            )}
            <text x={x} y="340" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
              {months[i]}
            </text>
          </g>
        )
      })}

      {/* 改进说明 */}
      <rect x="550" y="60" width="180" height="70" fill={isDark ? '#1e293b' : '#dbeafe'} rx="8" opacity="0.9"/>
      <text x="640" y="80" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-blue-400' : 'fill-blue-600'}`}>
        ✨ 优化成果
      </text>
      <text x="640" y="100" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        年初52h → 年末38h
      </text>
      <text x="640" y="118" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        改进27%，达成目标
      </text>
    </svg>
  )
}

