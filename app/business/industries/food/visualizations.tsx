import React from 'react'
import { getLucideIcon } from "@/components/LucideIcon";

interface ChartProps {
  theme: string | undefined
}

export const DeliveryTimeChart: React.FC<ChartProps> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <defs>
        <linearGradient id="deliveryGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="deliveryGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* 标题 */}
      <text x="400" y="30" textAnchor="middle" fill={isDark ? '#e5e7eb' : '#374151'} fontSize="18" fontWeight="bold">
        配送时长分布对比（高峰 vs 非高峰）
      </text>

      {/* Y轴 */}
      <line x1="80" y1="80" x2="80" y2="340" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2" />
      <text x="50" y="85" textAnchor="end" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="12">100%</text>
      <text x="50" y="145" textAnchor="end" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="12">75%</text>
      <text x="50" y="205" textAnchor="end" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="12">50%</text>
      <text x="50" y="265" textAnchor="end" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="12">25%</text>
      <text x="50" y="325" textAnchor="end" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="12">0%</text>

      {/* X轴 */}
      <line x1="80" y1="340" x2="760" y2="340" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2" />

      {/* 非高峰时段数据（橙色） */}
      <polygon
        points="120,280 200,220 280,200 360,240 440,260 520,280 600,300 680,320 680,340 120,340"
        fill="url(#deliveryGradient1)"
        stroke="#f59e0b"
        strokeWidth="3"
      />

      {/* 高峰时段数据（红色） */}
      <polygon
        points="120,200 200,140 280,100 360,120 440,160 520,180 600,200 680,220 680,340 120,340"
        fill="url(#deliveryGradient2)"
        stroke="#ef4444"
        strokeWidth="3"
      />

      {/* X轴标签 */}
      <text x="120" y="360" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">&lt;15分钟</text>
      <text x="200" y="360" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">15-20</text>
      <text x="280" y="360" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">20-25</text>
      <text x="360" y="360" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">25-30</text>
      <text x="440" y="360" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">30-35</text>
      <text x="520" y="360" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">35-40</text>
      <text x="600" y="360" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">40-45</text>
      <text x="680" y="360" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">&gt;45分钟</text>

      {/* 图例 */}
      <rect x="550" y="50" width="20" height="12" fill="#f59e0b" />
      <text x="575" y="60" fill={isDark ? '#e5e7eb' : '#374151'} fontSize="12">非高峰时段（平均28分钟）</text>

      <rect x="550" y="70" width="20" height="12" fill="#ef4444" />
      <text x="575" y="80" fill={isDark ? '#e5e7eb' : '#374151'} fontSize="12">高峰时段（平均35分钟）</text>

      {/* 关键数据点标注 */}
      <circle cx="280" cy="100" r="5" fill="#ef4444" />
      <text x="290" y="95" fill="#ef4444" fontSize="12" fontWeight="bold">峰值</text>

      <circle cx="600" cy="300" r="5" fill="#f59e0b" />
      <text x="610" y="295" fill="#f59e0b" fontSize="12" fontWeight="bold">85%准时</text>
    </svg>
  )
}

export const CourierEfficiencyChart: React.FC<ChartProps> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  return (
    <svg viewBox="0 0 800 450" className="w-full h-auto">
      <defs>
        <linearGradient id="courierGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>

      {/* 标题 */}
      <text x="400" y="30" textAnchor="middle" fill={isDark ? '#e5e7eb' : '#374151'} fontSize="18" fontWeight="bold">
        骑手效率分析（日均订单量 vs 准时率）
      </text>

      {/* 坐标轴 */}
      <line x1="80" y1="80" x2="80" y2="380" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2" />
      <line x1="80" y1="380" x2="720" y2="380" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2" />

      {/* Y轴标签（准时率） */}
      <text x="40" y="85" textAnchor="end" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">100%</text>
      <text x="40" y="155" textAnchor="end" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">90%</text>
      <text x="40" y="225" textAnchor="end" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">80%</text>
      <text x="40" y="295" textAnchor="end" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">70%</text>
      <text x="40" y="365" textAnchor="end" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">60%</text>
      <text x="30" y="220" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="13" fontWeight="bold" transform="rotate(-90, 30, 220)">
        准时率
      </text>

      {/* X轴标签（日均订单量） */}
      <text x="120" y="400" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">10单</text>
      <text x="220" y="400" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">15单</text>
      <text x="320" y="400" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">20单</text>
      <text x="420" y="400" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">25单</text>
      <text x="520" y="400" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">30单</text>
      <text x="620" y="400" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">35单</text>
      <text x="400" y="430" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="13" fontWeight="bold">
        日均订单量
      </text>

      {/* 数据点 */}
      {/* 高效骑手（绿色） */}
      <circle cx="420" cy="120" r="10" fill="#10b981" opacity="0.7" />
      <circle cx="380" cy="140" r="9" fill="#10b981" opacity="0.7" />
      <circle cx="340" cy="130" r="8" fill="#10b981" opacity="0.7" />
      <circle cx="400" cy="135" r="8" fill="#10b981" opacity="0.7" />
      
      {/* 中等效率（橙色） */}
      <circle cx="220" cy="200" r="8" fill="#f59e0b" opacity="0.7" />
      <circle cx="260" cy="220" r="9" fill="#f59e0b" opacity="0.7" />
      <circle cx="300" cy="190" r="8" fill="#f59e0b" opacity="0.7" />
      <circle cx="280" cy="210" r="8" fill="#f59e0b" opacity="0.7" />
      <circle cx="320" cy="200" r="8" fill="#f59e0b" opacity="0.7" />
      
      {/* 低效骑手（红色） */}
      <circle cx="120" cy="280" r="8" fill="#ef4444" opacity="0.7" />
      <circle cx="150" cy="300" r="9" fill="#ef4444" opacity="0.7" />
      <circle cx="180" cy="290" r="8" fill="#ef4444" opacity="0.7" />
      <circle cx="160" cy="310" r="8" fill="#ef4444" opacity="0.7" />

      {/* 趋势线 */}
      <polyline
        points="120,300 220,230 320,180 420,140 520,120 620,110"
        fill="none"
        stroke="url(#courierGradient)"
        strokeWidth="3"
        strokeDasharray="5,5"
        opacity="0.6"
      />

      {/* 分区标注 */}
      <rect x="560" y="100" width="140" height="80" fill={isDark ? '#1f2937' : '#f3f4f6'} stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="1" rx="5" />
      <text x="630" y="120" textAnchor="middle" fill={isDark ? '#e5e7eb' : '#374151'} fontSize="12" fontWeight="bold">效率分区</text>
      <circle cx="575" cy="135" r="5" fill="#10b981" />
      <text x="585" y="140" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">高效骑手（20%）</text>
      <circle cx="575" cy="155" r="5" fill="#f59e0b" />
      <text x="585" y="160" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">中等效率（60%）</text>
      <circle cx="575" cy="175" r="5" fill="#ef4444" />
      <text x="585" y="180" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">待提升（20%）</text>

      {/* 关键标注 */}
      <text x="420" y="105" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">最优区间</text>
      <line x1="420" y1="110" x2="420" y2="120" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)" />
    </svg>
  )
}

export const OrderHeatmapChart: React.FC<ChartProps> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  // 热力图数据（模拟订单密度，值越大颜色越深）
  const heatmapData = [
    [2, 1, 1, 3, 5, 8, 9, 8, 5, 3, 8, 9, 9, 8, 5, 4, 3, 8, 9, 9, 8, 5, 3, 2],  // 区域A
    [1, 1, 2, 4, 6, 9, 9, 8, 6, 4, 7, 9, 9, 7, 4, 3, 4, 7, 9, 9, 7, 4, 2, 1],  // 区域B
    [3, 2, 2, 5, 7, 9, 9, 9, 7, 5, 9, 9, 9, 9, 6, 5, 5, 9, 9, 9, 9, 6, 3, 2],  // 区域C（CBD）
    [2, 1, 1, 3, 5, 7, 8, 7, 5, 3, 7, 8, 8, 7, 5, 4, 3, 7, 8, 8, 7, 5, 3, 2],  // 区域D
    [1, 1, 1, 2, 4, 5, 6, 5, 4, 2, 5, 6, 6, 5, 4, 3, 2, 5, 6, 6, 5, 4, 2, 1],  // 区域E
  ]

  const areas = ['商圈A', '商圈B', 'CBD区', '商圈D', '郊区E']
  const hours = ['0', '', '', '', '', '', '6', '', '', '', '', '', '12', '', '', '', '', '', '18', '', '', '', '', '']

  const getColor = (value: number) => {
    if (value >= 9) return isDark ? '#dc2626' : '#ef4444'
    if (value >= 7) return isDark ? '#ea580c' : '#f97316'
    if (value >= 5) return isDark ? '#f59e0b' : '#fbbf24'
    if (value >= 3) return isDark ? '#84cc16' : '#a3e635'
    return isDark ? '#22c55e' : '#86efac'
  }

  return (
    <svg viewBox="0 0 900 400" className="w-full h-auto">
      {/* 标题 */}
      <text x="450" y="30" textAnchor="middle" fill={isDark ? '#e5e7eb' : '#374151'} fontSize="18" fontWeight="bold">
        订单热力图（时段 × 区域）
      </text>

      {/* Y轴标签（区域） */}
      {areas.map((area, i) => (
        <text key={i} x="70" y={85 + i * 50} textAnchor="end" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="12">
          {area}
        </text>
      ))}

      {/* X轴标签（时段） */}
      {hours.map((hour, i) => (
        hour && (
          <text key={i} x={95 + i * 30} y="315" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11">
            {hour}时
          </text>
        )
      ))}

      {/* 热力方块 */}
      {heatmapData.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <rect
            key={`${rowIndex}-${colIndex}`}
            x={90 + colIndex * 30}
            y={65 + rowIndex * 50}
            width={28}
            height={38}
            fill={getColor(value)}
            stroke={isDark ? '#374151' : '#e5e7eb'}
            strokeWidth="1"
            opacity="0.9"
          />
        ))
      )}

      {/* 颜色图例 */}
      <text x="820" y="80" textAnchor="middle" fill={isDark ? '#e5e7eb' : '#374151'} fontSize="12" fontWeight="bold">
        订单密度
      </text>
      <rect x="800" y="90" width="40" height="20" fill={isDark ? '#dc2626' : '#ef4444'} />
      <text x="845" y="105" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="10">极高</text>
      
      <rect x="800" y="115" width="40" height="20" fill={isDark ? '#ea580c' : '#f97316'} />
      <text x="845" y="130" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="10">很高</text>
      
      <rect x="800" y="140" width="40" height="20" fill={isDark ? '#f59e0b' : '#fbbf24'} />
      <text x="845" y="155" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="10">较高</text>
      
      <rect x="800" y="165" width="40" height="20" fill={isDark ? '#84cc16' : '#a3e635'} />
      <text x="845" y="180" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="10">中等</text>
      
      <rect x="800" y="190" width="40" height="20" fill={isDark ? '#22c55e' : '#86efac'} />
      <text x="845" y="205" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="10">较低</text>

      {/* 关键标注 */}
      <rect x="300" y="130" width="120" height="40" fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray="5,3" />
      <text x="360" y="185" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="bold">
        午高峰CBD区
      </text>

      <rect x="540" y="130" width="120" height="40" fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray="5,3" />
      <text x="600" y="185" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="bold">
        晚高峰CBD区
      </text>

      {/* 说明文字 */}
      <text x="450" y="355" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="11" fontStyle="italic">
        提示：CBD区在11-13点、17-20点订单密度极高，建议提前调配运力
      </text>
    </svg>
  )
}
