import React from 'react'
import { getLucideIcon } from "@/components/LucideIcon";

// 预订时间分布图
export const BookingDistributionChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const data = [
    { days: '30天以上', count: 2800, percentage: 28, color: '#3b82f6' },
    { days: '15-30天', count: 2200, percentage: 22, color: '#8b5cf6' },
    { days: '7-15天', count: 2500, percentage: 25, color: '#ec4899' },
    { days: '3-7天', count: 1500, percentage: 15, color: '#f59e0b' },
    { days: '3天内', count: 1000, percentage: 10, color: '#ef4444' }
  ]

  const maxCount = Math.max(...data.map(d => d.count))

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        用户预订时间分布分析
      </text>

      {/* Y轴 */}
      <line x1="100" y1="60" x2="100" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      {/* X轴 */}
      <line x1="100" y1="320" x2="750" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>

      {/* Y轴刻度 */}
      {[0, 1000, 2000, 3000].map((val, i) => (
        <g key={i}>
          <line x1="95" y1={320 - (val / maxCount) * 250} x2="100" y2={320 - (val / maxCount) * 250} stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="1"/>
          <text x="85" y={320 - (val / maxCount) * 250 + 5} textAnchor="end" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
            {val}
          </text>
        </g>
      ))}

      {data.map((item, i) => {
        const x = 150 + i * 125
        const barHeight = (item.count / maxCount) * 250
        const y = 320 - barHeight

        return (
          <g key={i}>
            {/* 柱状图 */}
            <rect
              x={x}
              y={y}
              width="80"
              height={barHeight}
              fill={item.color}
              opacity="0.8"
              rx="4"
            />
            
            {/* 数量 */}
            <text x={x + 40} y={y - 5} textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
              {item.count}
            </text>
            
            {/* 百分比标签 */}
            <rect x={x + 15} y={y + 15} width="50" height="24" fill={isDark ? '#1f2937' : '#ffffff'} rx="4" opacity="0.9"/>
            <text x={x + 40} y={y + 32} textAnchor="middle" className="text-sm font-bold fill-sky-500">
              {item.percentage}%
            </text>
            
            {/* X轴标签 */}
            <text x={x + 40} y="345" textAnchor="middle" className={`text-xs font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
              {item.days}
            </text>
          </g>
        )
      })}

      {/* Y轴标签 */}
      <text x="50" y="190" textAnchor="middle" transform="rotate(-90 50 190)" className={`text-sm ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
        订单数量
      </text>
    </svg>
  )
}

// 动态定价曲线图
export const DynamicPricingChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const priceData = [
    { day: -30, price: 800, demand: 20 },
    { day: -25, price: 820, demand: 25 },
    { day: -20, price: 850, demand: 35 },
    { day: -15, price: 920, demand: 50 },
    { day: -10, price: 1050, demand: 70 },
    { day: -7, price: 1200, demand: 85 },
    { day: -5, price: 1350, demand: 95 },
    { day: -3, price: 1500, demand: 98 },
    { day: -1, price: 1650, demand: 100 }
  ]

  const maxPrice = 1800
  const minPrice = 600

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        动态定价策略分析（出行前30天）
      </text>

      {/* 坐标轴 */}
      <line x1="100" y1="60" x2="100" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      <line x1="100" y1="320" x2="750" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>

      {/* 价格曲线 */}
      <path
        d={priceData.map((d, i) => {
          const x = 100 + ((30 + d.day) / 30) * 650
          const y = 60 + (1 - (d.price - minPrice) / (maxPrice - minPrice)) * 260
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')}
        stroke="#3b82f6"
        strokeWidth="3"
        fill="none"
      />

      {/* 需求曲线 */}
      <path
        d={priceData.map((d, i) => {
          const x = 100 + ((30 + d.day) / 30) * 650
          const y = 60 + (1 - d.demand / 100) * 260
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')}
        stroke="#22c55e"
        strokeWidth="3"
        fill="none"
        strokeDasharray="5,5"
      />

      {/* 数据点 */}
      {priceData.map((d, i) => {
        const x = 100 + ((30 + d.day) / 30) * 650
        const yPrice = 60 + (1 - (d.price - minPrice) / (maxPrice - minPrice)) * 260
        const yDemand = 60 + (1 - d.demand / 100) * 260
        
        return (
          <g key={i}>
            <circle cx={x} cy={yPrice} r="5" fill="#3b82f6"/>
            <circle cx={x} cy={yDemand} r="5" fill="#22c55e"/>
            
            {i % 2 === 0 && (
              <>
                <text x={x} y={yPrice - 10} textAnchor="middle" className="text-xs fill-blue-500 font-bold">
                  ¥{d.price}
                </text>
                <text x={x} y="340" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
                  {d.day}天
                </text>
              </>
            )}
          </g>
        )
      })}

      {/* 图例 */}
      <g transform="translate(600, 60)">
        <line x1="0" y1="0" x2="30" y2="0" stroke="#3b82f6" strokeWidth="3"/>
        <text x="35" y="5" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>价格(¥)</text>
        
        <line x1="0" y1="20" x2="30" y2="20" stroke="#22c55e" strokeWidth="3" strokeDasharray="5,5"/>
        <text x="35" y="25" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>需求指数</text>
      </g>

      {/* 标注区域 */}
      <rect x="120" y="240" width="200" height="60" fill={isDark ? '#1f2937' : '#eff6ff'} opacity="0.9" rx="4"/>
      <text x="220" y="260" textAnchor="middle" className="text-xs font-bold fill-blue-600">
        最优预订窗口期
      </text>
      <text x="220" y="280" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
        提前15-20天预订
      </text>
      <text x="220" y="295" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
        价格较优，可选性强
      </text>
    </svg>
  )
}

// 取消率分析图
export const CancellationAnalysisChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const reasons = [
    { reason: '价格波动', count: 320, percentage: 32, color: '#ef4444' },
    { reason: '行程变更', count: 280, percentage: 28, color: '#f59e0b' },
    { reason: '找到更优方案', count: 180, percentage: 18, color: '#eab308' },
    { reason: '取消政策不满', count: 120, percentage: 12, color: '#8b5cf6' },
    { reason: '其他原因', count: 100, percentage: 10, color: '#6b7280' }
  ]

  let currentAngle = -Math.PI / 2

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        订单取消原因分析
      </text>

      {/* 饼图 */}
      {reasons.map((item, i) => {
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

      {/* 图例 */}
      <g transform="translate(450, 80)">
        {reasons.map((item, i) => (
          <g key={i} transform={`translate(0, ${i * 50})`}>
            <rect x="0" y="0" width="30" height="30" fill={item.color} rx="4" opacity="0.8"/>
            <text x="40" y="15" className={`text-sm font-semibold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
              {item.reason}
            </text>
            <text x="40" y="30" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
              {item.count}单 ({item.percentage}%)
            </text>
          </g>
        ))}
      </g>

      {/* 总结框 */}
      <rect x="450" y="300" width="280" height="70" fill={isDark ? '#1e293b' : '#f1f5f9'} rx="8" opacity="0.9"/>
      <text x="590" y="325" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'} fill-current`}>
        ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 优化建议
      </text>
      <text x="590" y="345" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        1. 加强价格保护政策，锁定低价
      </text>
      <text x="590" y="360" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        2. 优化取消政策，提高灵活性
      </text>
    </svg>
  )
}

