import React from 'react'
import { getLucideIcon } from "@/components/LucideIcon";

// 客流量与转化率分析
export const TrafficConversionChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const hours = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21']
  const traffic = [120, 180, 220, 280, 250, 200, 240, 320, 380, 420, 350, 280, 180]
  const conversion = [15, 18, 22, 28, 26, 21, 25, 32, 35, 38, 33, 27, 20]
  
  const maxTraffic = Math.max(...traffic)
  const maxConversion = Math.max(...conversion)

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        门店客流量与转化率分析
      </text>

      {/* 坐标轴 */}
      <line x1="80" y1="60" x2="80" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      <line x1="80" y1="320" x2="750" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>

      {/* 客流量柱状图 */}
      {traffic.map((count, i) => {
        const x = 110 + i * 48
        const barHeight = (count / maxTraffic) * 200
        const y = 320 - barHeight

        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="38"
            height={barHeight}
            fill="#3b82f6"
            opacity="0.7"
            rx="3"
          />
        )
      })}

      {/* 转化率折线图 */}
      <path
        d={conversion.map((rate, i) => {
          const x = 110 + i * 48 + 19
          const y = 320 - (rate / maxConversion) * 200
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')}
        stroke="#22c55e"
        strokeWidth="3"
        fill="none"
      />

      {/* 转化率数据点 */}
      {conversion.map((rate, i) => {
        const x = 110 + i * 48 + 19
        const y = 320 - (rate / maxConversion) * 200
        
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="#22c55e"/>
            {i % 2 === 0 && (
              <text x={x} y={y - 10} textAnchor="middle" className="text-xs fill-green-600 font-bold">
                {rate}%
              </text>
            )}
          </g>
        )
      })}

      {/* X轴标签 */}
      {hours.map((hour, i) => (
        <text key={i} x={110 + i * 48 + 19} y="340" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
          {hour}:00
        </text>
      ))}

      {/* 图例 */}
      <g transform="translate(600, 70)">
        <rect x="0" y="0" width="30" height="15" fill="#3b82f6" opacity="0.7" rx="3"/>
        <text x="35" y="12" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>客流量</text>
        
        <line x1="0" y1="30" x2="30" y2="30" stroke="#22c55e" strokeWidth="3"/>
        <text x="35" y="35" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>转化率</text>
      </g>

      {/* 高峰期标注 */}
      <rect x="550" y="240" width="160" height="60" fill={isDark ? '#1e293b' : '#fef3c7'} rx="6" opacity="0.9"/>
      <text x="630" y="260" textAnchor="middle" className="text-sm font-bold fill-amber-600">
        🔥 黄金时段
      </text>
      <text x="630" y="280" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        17:00-20:00
      </text>
      <text x="630" y="295" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
        客流最高，转化率35%+
      </text>
    </svg>
  )
}

// 商品ABC分类分析
export const ProductABCAnalysisChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const categories = [
    { name: 'A类商品', count: 200, sales: 8000000, percentage: 80, color: '#ef4444' },
    { name: 'B类商品', count: 500, sales: 1500000, percentage: 15, color: '#f59e0b' },
    { name: 'C类商品', count: 1300, sales: 500000, percentage: 5, color: '#3b82f6' }
  ]

  let currentAngle = -Math.PI / 2

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        商品ABC分类分析（销售额占比）
      </text>

      {/* 饼图 */}
      {categories.map((item, i) => {
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
            <text x={labelX} y={labelY} textAnchor="middle" className="text-lg font-bold fill-white">
              {item.percentage}%
            </text>
          </g>
        )
      })}

      {/* 详细数据 */}
      <g transform="translate(450, 80)">
        {categories.map((item, i) => (
          <g key={i} transform={`translate(0, ${i * 90})`}>
            <rect x="0" y="0" width="300" height="75" fill={isDark ? '#1e293b' : '#f8fafc'} rx="8" opacity="0.9"/>
            
            <rect x="10" y="10" width="40" height="40" fill={item.color} rx="6" opacity="0.8"/>
            <text x="30" y="35" textAnchor="middle" className="text-lg font-bold fill-white">
              {item.name.charAt(0)}
            </text>
            
            <text x="60" y="25" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
              {item.name}
            </text>
            <text x="60" y="45" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
              商品数：{item.count}个
            </text>
            <text x="60" y="62" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
              销售额：¥{(item.sales / 10000).toFixed(0)}万
            </text>
            
            <text x="280" y="40" textAnchor="end" className="text-2xl font-bold fill-amber-500">
              {item.percentage}%
            </text>
          </g>
        ))}
      </g>

      {/* 80/20法则标注 */}
      <rect x="450" y="300" width="300" height="60" fill={isDark ? '#1e293b' : '#fef3c7'} rx="8" opacity="0.9"/>
      <text x="600" y="325" textAnchor="middle" className="text-sm font-bold fill-amber-600">
        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 帕累托法则（80/20）
      </text>
      <text x="600" y="345" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        20%的A类商品贡献80%的销售额
      </text>
    </svg>
  )
}

// 库存周转分析
export const InventoryTurnoverChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const products = [
    { category: '快消品', turnover: 24, days: 15, status: 'excellent' },
    { category: '服装', turnover: 12, days: 30, status: 'good' },
    { category: '家电', turnover: 8, days: 45, status: 'normal' },
    { category: '家具', turnover: 4, days: 90, status: 'poor' },
    { category: '珠宝', turnover: 2, days: 180, status: 'warning' }
  ]

  const maxTurnover = 30

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        不同品类库存周转率分析
      </text>

      {/* 坐标轴 */}
      <line x1="120" y1="60" x2="120" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      <line x1="120" y1="320" x2="750" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>

      {/* Y轴刻度 */}
      {[0, 10, 20, 30].map((val, i) => (
        <g key={i}>
          <line x1="115" y1={320 - (val / maxTurnover) * 250} x2="120" y2={320 - (val / maxTurnover) * 250} stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="1"/>
          <text x="105" y={320 - (val / maxTurnover) * 250 + 5} textAnchor="end" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
            {val}
          </text>
        </g>
      ))}

      {products.map((product, i) => {
        const x = 180 + i * 120
        const barHeight = (product.turnover / maxTurnover) * 250
        const y = 320 - barHeight
        
        let barColor = '#22c55e'
        if (product.status === 'good') barColor = '#3b82f6'
        else if (product.status === 'normal') barColor = '#f59e0b'
        else if (product.status === 'poor') barColor = '#ef4444'
        else if (product.status === 'warning') barColor = '#991b1b'

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width="90"
              height={barHeight}
              fill={barColor}
              opacity="0.8"
              rx="4"
            />
            
            <text x={x + 45} y={y - 5} textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
              {product.turnover}次
            </text>
            
            <rect x={x + 10} y={y + 15} width="70" height="24" fill={isDark ? '#1f2937' : '#ffffff'} rx="4" opacity="0.9"/>
            <text x={x + 45} y={y + 32} textAnchor="middle" className="text-xs font-bold fill-purple-500">
              {product.days}天
            </text>
            
            <text x={x + 45} y="340" textAnchor="middle" className={`text-xs font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
              {product.category}
            </text>
          </g>
        )
      })}

      {/* 标准线 */}
      <line x1="120" y1="185" x2="750" y2="185" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5"/>
      <text x="670" y="180" className="text-xs font-bold fill-green-500">健康线(10次/年)</text>

      {/* Y轴标签 */}
      <text x="60" y="190" textAnchor="middle" transform="rotate(-90 60 190)" className={`text-sm ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
        周转次数（次/年）
      </text>

      {/* 评级说明 */}
      <g transform="translate(180, 360)">
        <circle cx="0" cy="0" r="5" fill="#22c55e" opacity="0.8"/>
        <text x="10" y="5" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>优秀(≥15)</text>
        
        <circle cx="80" cy="0" r="5" fill="#3b82f6" opacity="0.8"/>
        <text x="90" y="5" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>良好(10-15)</text>
        
        <circle cx="170" cy="0" r="5" fill="#f59e0b" opacity="0.8"/>
        <text x="180" y="5" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>一般(5-10)</text>
        
        <circle cx="250" cy="0" r="5" fill="#ef4444" opacity="0.8"/>
        <text x="260" y="5" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>较差(&lt;5)</text>
      </g>
    </svg>
  )
}

