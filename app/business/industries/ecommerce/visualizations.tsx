import React from 'react'

// 转化漏斗图
export const ConversionFunnelChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  const stages = [
    { name: '访问', count: 10000, rate: 100, color: '#3b82f6' },
    { name: '浏览商品', count: 6000, rate: 60, color: '#8b5cf6' },
    { name: '加入购物车', count: 2400, rate: 24, color: '#f59e0b' },
    { name: '提交订单', count: 1200, rate: 12, color: '#ec4899' },
    { name: '支付成功', count: 960, rate: 9.6, color: '#10b981' }
  ]

  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto">
      <defs>
        {stages.map((stage, i) => (
          <linearGradient key={i} id={`funnel-gradient-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={stage.color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={stage.color} stopOpacity="0.6" />
          </linearGradient>
        ))}
      </defs>

      <text x="300" y="30" textAnchor="middle" className={`text-xl font-bold ${isDark ? 'fill-gray-100' : 'fill-gray-900'}`}>
        电商转化漏斗分析
      </text>

      {stages.map((stage, i) => {
        const y = 60 + i * 65
        const width = 500 - i * 80
        const x = (600 - width) / 2
        const conversionRate = i > 0 ? ((stage.count / stages[i - 1].count) * 100).toFixed(1) : 100

        return (
          <g key={i}>
            {/* 漏斗层 */}
            <path
              d={`M ${x} ${y} L ${x + width} ${y} L ${x + width - 40} ${y + 50} L ${x + 40} ${y + 50} Z`}
              fill={`url(#funnel-gradient-${i})`}
              stroke={stage.color}
              strokeWidth="2"
              className="transition-all duration-300 hover:opacity-80"
            />
            
            {/* 阶段名称 */}
            <text x={x + width / 2} y={y + 25} textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-white' : 'fill-gray-900'}`}>
              {stage.name}
            </text>
            
            {/* 数量 */}
            <text x={x + width / 2} y={y + 42} textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-200' : 'fill-gray-700'}`}>
              {stage.count.toLocaleString()} 人
            </text>

            {/* 右侧转化率 */}
            <text x={x + width + 15} y={y + 30} className={`text-sm font-semibold ${isDark ? 'fill-green-400' : 'fill-green-600'}`}>
              {stage.rate}%
            </text>

            {/* 左侧环比转化率 */}
            {i > 0 && (
              <text x={x - 15} y={y + 30} textAnchor="end" className={`text-xs ${isDark ? 'fill-orange-400' : 'fill-orange-600'}`}>
                ↓ {conversionRate}%
              </text>
            )}
          </g>
        )
      })}

      {/* 图例 */}
      <g transform="translate(150, 380)">
        <text x="0" y="0" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
          右侧：整体转化率 | 左侧：环比转化率
        </text>
      </g>
    </svg>
  )
}

// RFM八象限图
export const RFMSegmentChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const segments = [
    { name: '重要价值', x: 150, y: 100, size: 80, color: '#10b981', users: '15%', value: '45%' },
    { name: '重要保持', x: 450, y: 100, size: 60, color: '#3b82f6', users: '10%', value: '20%' },
    { name: '重要发展', x: 150, y: 280, size: 70, color: '#8b5cf6', users: '12%', value: '15%' },
    { name: '重要挽留', x: 450, y: 280, size: 55, color: '#f59e0b', users: '8%', value: '12%' },
    { name: '一般价值', x: 150, y: 460, size: 50, color: '#06b6d4', users: '20%', value: '5%' },
    { name: '一般保持', x: 450, y: 460, size: 45, color: '#14b8a6', users: '15%', value: '2%' },
    { name: '一般发展', x: 150, y: 640, size: 40, color: '#6366f1', users: '12%', value: '1%' },
    { name: '一般挽留', x: 450, y: 640, size: 35, color: '#9ca3af', users: '8%', value: '0.5%' }
  ]

  return (
    <svg viewBox="0 0 600 720" className="w-full h-auto">
      <text x="300" y="30" textAnchor="middle" className={`text-xl font-bold ${isDark ? 'fill-gray-100' : 'fill-gray-900'}`}>
        RFM用户分层价值分布
      </text>

      <text x="300" y="55" textAnchor="middle" className={`text-sm ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
        (圆圈大小 = 用户占比，颜色深浅 = 价值贡献)
      </text>

      {/* 坐标轴标签 */}
      <text x="30" y="400" textAnchor="middle" transform="rotate(-90, 30, 400)" className={`text-sm font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        价值等级 (高 → 低)
      </text>
      <text x="300" y="710" textAnchor="middle" className={`text-sm font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        重要 ← → 一般
      </text>

      {/* 分隔线 */}
      <line x1="300" y1="80" x2="300" y2="690" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2" strokeDasharray="5,5" />
      <line x1="60" y1="385" x2="540" y2="385" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2" strokeDasharray="5,5" />

      {segments.map((seg, i) => (
        <g key={i} className="transition-all duration-300 hover:opacity-80">
          {/* 圆圈 */}
          <circle
            cx={seg.x}
            cy={seg.y}
            r={seg.size}
            fill={seg.color}
            fillOpacity="0.3"
            stroke={seg.color}
            strokeWidth="3"
          />
          <circle
            cx={seg.x}
            cy={seg.y}
            r={seg.size * 0.6}
            fill={seg.color}
            fillOpacity="0.5"
          />
          
          {/* 文字 */}
          <text x={seg.x} y={seg.y - 5} textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-white' : 'fill-gray-900'}`}>
            {seg.name}
          </text>
          <text x={seg.x} y={seg.y + 10} textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-200' : 'fill-gray-700'}`}>
            用户{seg.users}
          </text>
          <text x={seg.x} y={seg.y + 25} textAnchor="middle" className={`text-xs font-semibold`} fill={seg.color}>
            GMV{seg.value}
          </text>
        </g>
      ))}

      {/* 图例说明 */}
      <g transform="translate(60, 700)">
        <text x="0" y="0" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
          💡 重要价值客户占15%但贡献45%的GMV，应给予最高优先级
        </text>
      </g>
    </svg>
  )
}

// GMV增长拆解图
export const GMVGrowthChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const data = {
    lastMonth: { traffic: 100, conversion: 10, aov: 200, gmv: 2000 },
    thisMonth: { traffic: 120, conversion: 12, aov: 220, gmv: 3168 }
  }

  const trafficGrowth = ((data.thisMonth.traffic / data.lastMonth.traffic - 1) * 100).toFixed(1)
  const conversionGrowth = ((data.thisMonth.conversion / data.lastMonth.conversion - 1) * 100).toFixed(1)
  const aovGrowth = ((data.thisMonth.aov / data.lastMonth.aov - 1) * 100).toFixed(1)
  const gmvGrowth = ((data.thisMonth.gmv / data.lastMonth.gmv - 1) * 100).toFixed(1)

  return (
    <svg viewBox="0 0 700 450" className="w-full h-auto">
      <defs>
        <linearGradient id="bar-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="bar-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <text x="350" y="30" textAnchor="middle" className={`text-xl font-bold ${isDark ? 'fill-gray-100' : 'fill-gray-900'}`}>
        GMV增长拆解分析
      </text>

      <text x="350" y="55" textAnchor="middle" className={`text-sm ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
        GMV = 流量 × 转化率 × 客单价
      </text>

      {/* 三个因子柱状图 */}
      {[
        { name: '流量', last: 100, current: 120, x: 100, growth: trafficGrowth, unit: 'K' },
        { name: '转化率', last: 10, current: 12, x: 280, growth: conversionGrowth, unit: '%' },
        { name: '客单价', last: 200, current: 220, x: 460, growth: aovGrowth, unit: '¥' }
      ].map((item, i) => {
        const maxVal = Math.max(item.last, item.current)
        const scale = 150 / maxVal
        const lastHeight = item.last * scale
        const currentHeight = item.current * scale
        const growthNumber = parseFloat(String(item.growth))

        return (
          <g key={i}>
            {/* 上月柱 */}
            <rect
              x={item.x}
              y={280 - lastHeight}
              width="50"
              height={lastHeight}
              fill="url(#bar-gradient-1)"
              stroke="#3b82f6"
              strokeWidth="2"
              rx="4"
            />
            <text x={item.x + 25} y={295} textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
              上月
            </text>
            <text x={item.x + 25} y={265 - lastHeight} textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-blue-400' : 'fill-blue-600'}`}>
              {item.last}{item.unit}
            </text>

            {/* 本月柱 */}
            <rect
              x={item.x + 70}
              y={280 - currentHeight}
              width="50"
              height={currentHeight}
              fill="url(#bar-gradient-2)"
              stroke="#10b981"
              strokeWidth="2"
              rx="4"
            />
            <text x={item.x + 95} y={295} textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
              本月
            </text>
            <text x={item.x + 95} y={265 - currentHeight} textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-green-400' : 'fill-green-600'}`}>
              {item.current}{item.unit}
            </text>

            {/* 增长率标签 */}
            <rect
              x={item.x + 35}
              y={310}
              width="50"
              height="25"
              fill={growthNumber > 0 ? '#10b981' : '#ef4444'}
              rx="4"
            />
            <text x={item.x + 60} y={327} textAnchor="middle" className="text-sm font-bold fill-white">
              {growthNumber > 0 ? '+' : ''}{growthNumber}%
            </text>

            {/* 因子名称 */}
            <text x={item.x + 60} y={360} textAnchor="middle" className={`text-base font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
              {item.name}
            </text>
          </g>
        )
      })}

      {/* 底部公式和结果 */}
      <g transform="translate(50, 390)">
        <rect x="0" y="0" width="600" height="50" fill={isDark ? '#1f2937' : '#f3f4f6'} rx="8" />
        <text x="300" y="20" textAnchor="middle" className={`text-sm ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
          120K × 12% × ¥220 = <tspan className="font-bold text-base" fill="#10b981">¥3,168K</tspan>
        </text>
        <text x="300" y="40" textAnchor="middle" className="text-lg font-bold fill-green-500">
          GMV增长: +{gmvGrowth}%
        </text>
      </g>
    </svg>
  )
}

// 用户生命周期曲线
export const UserLifecycleChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const stages = [
    { stage: '新用户', month: 0, ltv: 100, retention: 100, color: '#3b82f6' },
    { stage: '活跃用户', month: 1, ltv: 250, retention: 60, color: '#8b5cf6' },
    { stage: '成熟用户', month: 3, ltv: 450, retention: 40, color: '#10b981' },
    { stage: '忠诚用户', month: 6, ltv: 650, retention: 25, color: '#f59e0b' },
    { stage: '沉睡用户', month: 9, ltv: 680, retention: 15, color: '#ef4444' },
    { stage: '流失用户', month: 12, ltv: 700, retention: 5, color: '#9ca3af' }
  ]

  return (
    <svg viewBox="0 0 700 400" className="w-full h-auto">
      <defs>
        <linearGradient id="ltv-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="40%" stopColor="#10b981" />
          <stop offset="80%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>

      <text x="350" y="30" textAnchor="middle" className={`text-xl font-bold ${isDark ? 'fill-gray-100' : 'fill-gray-900'}`}>
        用户生命周期价值曲线
      </text>

      {/* 坐标轴 */}
      <line x1="80" y1="320" x2="650" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2" />
      <line x1="80" y1="80" x2="80" y2="320" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2" />

      {/* Y轴标签 */}
      <text x="40" y="90" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>¥700</text>
      <text x="40" y="200" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>¥350</text>
      <text x="40" y="320" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>¥0</text>
      <text x="30" y="200" textAnchor="middle" transform="rotate(-90, 30, 200)" className={`text-sm font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        LTV (元)
      </text>

      {/* X轴标签 */}
      <text x="350" y="355" textAnchor="middle" className={`text-sm font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        时间 (月)
      </text>

      {/* LTV曲线 */}
      <path
        d={stages.map((s, i) => {
          const x = 80 + (s.month / 12) * 570
          const y = 320 - (s.ltv / 700) * 240
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')}
        fill="none"
        stroke="url(#ltv-gradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 数据点和标注 */}
      {stages.map((s, i) => {
        const x = 80 + (s.month / 12) * 570
        const y = 320 - (s.ltv / 700) * 240

        return (
          <g key={i}>
            <circle cx={x} cy={y} r="8" fill={s.color} stroke="white" strokeWidth="2" />
            <circle cx={x} cy={y} r="4" fill="white" />
            
            {/* 阶段标签 */}
            <text x={x} y={y - 20} textAnchor="middle" className={`text-xs font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
              {s.stage}
            </text>
            <text x={x} y={y - 6} textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
              ¥{s.ltv}
            </text>

            {/* X轴刻度 */}
            <line x1={x} y1="320" x2={x} y2="325" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="1" />
            <text x={x} y="340" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
              {s.month}月
            </text>
          </g>
        )
      })}

      {/* 说明文字 */}
      <g transform="translate(100, 370)">
        <text x="0" y="0" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
          💡 用户在前6个月快速创造价值，6个月后增长趋缓，需要重点运营前期用户
        </text>
      </g>
    </svg>
  )
}

// 商品ABC分类图
export const ProductABCChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'

  return (
    <svg viewBox="0 0 600 380" className="w-full h-auto">
      <text x="300" y="30" textAnchor="middle" className={`text-xl font-bold ${isDark ? 'fill-gray-100' : 'fill-gray-900'}`}>
        商品ABC分类（帕累托分析）
      </text>

      {/* 柱状图 + 累计曲线 */}
      <g transform="translate(50, 60)">
        {/* 坐标轴 */}
        <line x1="0" y1="220" x2="500" y2="220" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2" />
        <line x1="0" y1="0" x2="0" y2="220" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2" />

        {/* A类商品 (20%商品，80%销售额) */}
        {[0, 1, 2, 3].map(i => (
          <rect
            key={i}
            x={i * 25}
            y={20}
            width="20"
            height="200"
            fill="#10b981"
            fillOpacity="0.7"
            stroke="#10b981"
            strokeWidth="1"
          />
        ))}
        <text x="50" y="240" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-green-400' : 'fill-green-600'}`}>
          A类 (20%)
        </text>
        <text x="50" y="255" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
          80%销售额
        </text>

        {/* B类商品 (30%商品，15%销售额) */}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <rect
            key={i}
            x={100 + i * 25}
            y={95}
            width="20"
            height="125"
            fill="#f59e0b"
            fillOpacity="0.7"
            stroke="#f59e0b"
            strokeWidth="1"
          />
        ))}
        <text x="187.5" y="240" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-orange-400' : 'fill-orange-600'}`}>
          B类 (30%)
        </text>
        <text x="187.5" y="255" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
          15%销售额
        </text>

        {/* C类商品 (50%商品，5%销售额) */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
          <rect
            key={i}
            x={250 + i * 25}
            y={170}
            width="20"
            height="50"
            fill="#ef4444"
            fillOpacity="0.7"
            stroke="#ef4444"
            strokeWidth="1"
          />
        ))}
        <text x="375" y="240" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-red-400' : 'fill-red-600'}`}>
          C类 (50%)
        </text>
        <text x="375" y="255" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
          5%销售额
        </text>

        {/* 累计曲线 */}
        <path
          d="M 0 220 Q 50 20, 100 40 T 250 80 T 500 100"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="3"
          strokeDasharray="5,5"
        />

        {/* Y轴标签 */}
        <text x="-10" y="25" textAnchor="end" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
          100%
        </text>
        <text x="-10" y="120" textAnchor="end" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
          50%
        </text>
        <text x="-10" y="220" textAnchor="end" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
          0%
        </text>
      </g>

      {/* 分隔线 */}
      <line x1="50" y1="310" x2="550" y2="310" stroke={isDark ? '#374151' : '#e5e7eb'} strokeWidth="1" strokeDasharray="4,4" />

      {/* 策略建议 - 优化布局，避免重叠 */}
      <g transform="translate(0, 335)">
        {/* A类策略 */}
        <g transform="translate(50, 0)">
          <rect x="-5" y="-15" width="140" height="25" fill={isDark ? '#065f46' : '#d1fae5'} fillOpacity="0.3" rx="4" />
          <text x="0" y="0" className={`text-xs font-semibold ${isDark ? 'fill-green-400' : 'fill-green-700'}`}>
            ✅ A类：重点推广
          </text>
        </g>
        
        {/* B类策略 */}
        <g transform="translate(230, 0)">
          <rect x="-5" y="-15" width="140" height="25" fill={isDark ? '#92400e' : '#fed7aa'} fillOpacity="0.3" rx="4" />
          <text x="0" y="0" className={`text-xs font-semibold ${isDark ? 'fill-orange-400' : 'fill-orange-700'}`}>
            ⚠️ B类：适度库存
          </text>
        </g>
        
        {/* C类策略 */}
        <g transform="translate(410, 0)">
          <rect x="-5" y="-15" width="140" height="25" fill={isDark ? '#7f1d1d' : '#fecaca'} fillOpacity="0.3" rx="4" />
          <text x="0" y="0" className={`text-xs font-semibold ${isDark ? 'fill-red-400' : 'fill-red-700'}`}>
            ❌ C类：清仓处理
          </text>
        </g>
      </g>
    </svg>
  )
}

// 学习路径图
export const LearningPathChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const stages = [
    { 
      level: 'Level 1', 
      name: '基础入门', 
      duration: '1-2周',
      color: '#3b82f6',
      x: 80,
      y: 200,
      skills: ['核心指标理解', 'Excel/SQL基础', 'GMV分解']
    },
    { 
      level: 'Level 2', 
      name: '数据分析', 
      duration: '2-3周',
      color: '#8b5cf6',
      x: 260,
      y: 140,
      skills: ['转化漏斗', 'RFM模型', '数据可视化']
    },
    { 
      level: 'Level 3', 
      name: '深度分析', 
      duration: '3-4周',
      color: '#10b981',
      x: 440,
      y: 140,
      skills: ['用户分层', 'AB测试', '归因分析']
    },
    { 
      level: 'Level 4', 
      name: '战略洞察', 
      duration: '持续学习',
      color: '#f59e0b',
      x: 620,
      y: 200,
      skills: ['业务策略', '跨部门协作', '数据驱动决策']
    }
  ]

  return (
    <svg viewBox="0 0 750 380" className="w-full h-auto">
      <defs>
        <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="33%" stopColor="#8b5cf6" />
          <stop offset="66%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      <text x="375" y="30" textAnchor="middle" className={`text-xl font-bold ${isDark ? 'fill-gray-100' : 'fill-gray-900'}`}>
        电商数据分析学习路径
      </text>

      {/* 连接路径 */}
      <path
        d={`M ${stages[0].x} ${stages[0].y} 
            Q ${stages[1].x - 60} ${stages[1].y + 80}, ${stages[1].x} ${stages[1].y}
            L ${stages[2].x} ${stages[2].y}
            Q ${stages[3].x - 60} ${stages[3].y - 60}, ${stages[3].x} ${stages[3].y}`}
        fill="none"
        stroke="url(#path-gradient)"
        strokeWidth="4"
        strokeDasharray="8,4"
      />

      {/* 学习阶段 */}
      {stages.map((stage, i) => (
        <g key={i} className="transition-all duration-300 hover:opacity-80">
          {/* 外圈光晕 */}
          <circle
            cx={stage.x}
            cy={stage.y}
            r="70"
            fill={stage.color}
            fillOpacity="0.1"
          />
          
          {/* 主圆圈 */}
          <circle
            cx={stage.x}
            cy={stage.y}
            r="55"
            fill={stage.color}
            fillOpacity="0.2"
            stroke={stage.color}
            strokeWidth="3"
          />
          
          {/* Level标签 */}
          <text 
            x={stage.x} 
            y={stage.y - 20} 
            textAnchor="middle" 
            className="text-xs font-bold"
            fill={stage.color}
          >
            {stage.level}
          </text>
          
          {/* 阶段名称 */}
          <text 
            x={stage.x} 
            y={stage.y} 
            textAnchor="middle" 
            className="text-base font-bold"
            fill={isDark ? '#f3f4f6' : '#1f2937'}
          >
            {stage.name}
          </text>
          
          {/* 时长 */}
          <text 
            x={stage.x} 
            y={stage.y + 18} 
            textAnchor="middle" 
            className="text-xs"
            fill={isDark ? '#9ca3af' : '#6b7280'}
          >
            {stage.duration}
          </text>

          {/* 技能列表 */}
          <g transform={`translate(${stage.x}, ${stage.y + 80})`}>
            <rect
              x="-65"
              y="-5"
              width="130"
              height="65"
              fill={isDark ? '#1f2937' : '#ffffff'}
              stroke={stage.color}
              strokeWidth="2"
              rx="8"
              fillOpacity="0.95"
            />
            {stage.skills.map((skill, j) => (
              <text
                key={j}
                x="0"
                y={10 + j * 18}
                textAnchor="middle"
                className="text-xs"
                fill={isDark ? '#d1d5db' : '#374151'}
              >
                • {skill}
              </text>
            ))}
          </g>
        </g>
      ))}

      {/* 底部说明 */}
      <g transform="translate(375, 360)">
        <text x="0" y="0" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
          💡 建议每天学习1-2小时，配合实际项目练习效果最佳
        </text>
      </g>
    </svg>
  )
}

