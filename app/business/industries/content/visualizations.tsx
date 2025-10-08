import React from 'react'

// 内容消费漏斗图
export const ContentFunnelChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const stages = [
    { name: '曝光', value: 100000, color: '#3b82f6', width: 100 },
    { name: '点击', value: 30000, color: '#8b5cf6', width: 80 },
    { name: '观看>3s', value: 18000, color: '#10b981', width: 60 },
    { name: '完播', value: 9000, color: '#f59e0b', width: 40 },
    { name: '互动', value: 3000, color: '#ef4444', width: 25 }
  ]

  return (
    <svg viewBox="0 0 500 400" className="w-full h-auto">
      <text x="250" y="30" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-100' : 'fill-gray-900'}`}>
        内容消费漏斗
      </text>

      {stages.map((stage, i) => {
        const y = 60 + i * 65
        const x = 250 - (stage.width * 2.5) / 2
        const rate = i === 0 ? 100 : ((stage.value / stages[i-1].value) * 100).toFixed(1)

        return (
          <g key={i}>
            {/* 漏斗块 */}
            <rect
              x={x}
              y={y}
              width={stage.width * 2.5}
              height="50"
              fill={stage.color}
              fillOpacity="0.8"
              rx="4"
            />
            
            {/* 阶段名称 */}
            <text
              x="250"
              y={y + 25}
              textAnchor="middle"
              className="text-sm font-bold fill-white"
            >
              {stage.name}
            </text>
            
            {/* 数值 */}
            <text
              x="250"
              y={y + 42}
              textAnchor="middle"
              className="text-xs fill-white"
            >
              {(stage.value / 1000).toFixed(1)}K
            </text>

            {/* 转化率 */}
            {i > 0 && (
              <text
                x={x + stage.width * 2.5 + 15}
                y={y + 30}
                className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}
              >
                {rate}%
              </text>
            )}
          </g>
        )
      })}

      {/* 底部说明 */}
      <text x="250" y="385" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-500' : 'fill-gray-600'}`}>
        💡 每个环节都需要优化，提升整体转化效率
      </text>
    </svg>
  )
}

// 内容生命周期曲线
export const ContentLifecycleChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const points = [
    { day: 0, value: 0 },
    { day: 1, value: 45 },
    { day: 2, value: 80 },
    { day: 3, value: 100 },
    { day: 7, value: 85 },
    { day: 14, value: 60 },
    { day: 30, value: 40 },
    { day: 60, value: 25 },
    { day: 90, value: 15 }
  ]

  const pathData = points.map((p, i) => {
    const x = 50 + (p.day / 90) * 400
    const y = 300 - (p.value / 100) * 220
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
  }).join(' ')

  return (
    <svg viewBox="0 0 550 370" className="w-full h-auto">
      <text x="275" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-100' : 'fill-gray-900'}`}>
        内容生命周期曲线
      </text>

      {/* 坐标轴 */}
      <line x1="50" y1="300" x2="480" y2="300" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2" />
      <line x1="50" y1="300" x2="50" y2="70" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2" />

      {/* Y轴标签 */}
      <text x="30" y="80" textAnchor="end" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>100%</text>
      <text x="30" y="190" textAnchor="end" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>50%</text>
      <text x="30" y="305" textAnchor="end" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>0%</text>

      {/* X轴标签 */}
      <text x="50" y="325" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>D0</text>
      <text x="161" y="325" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>D3</text>
      <text x="228" y="325" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>D7</text>
      <text x="317" y="325" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>D30</text>
      <text x="450" y="325" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>D90</text>

      {/* 曲线 */}
      <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />

      {/* 关键点标注 */}
      {[
        { day: 3, label: '峰值期', color: '#10b981' },
        { day: 7, label: '衰退期', color: '#f59e0b' },
        { day: 30, label: '长尾期', color: '#ef4444' }
      ].map((point, i) => {
        const p = points.find(pt => pt.day === point.day)
        if (!p) return null
        const x = 50 + (p.day / 90) * 400
        const y = 300 - (p.value / 100) * 220
        
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill={point.color} />
            <text x={x} y={y - 15} textAnchor="middle" className={`text-xs font-bold`} fill={point.color}>
              {point.label}
            </text>
          </g>
        )
      })}

      <text x="275" y="360" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-500' : 'fill-gray-600'}`}>
        💡 内容热度通常在3天内达到峰值，30天后进入长尾
      </text>
    </svg>
  )
}

// 用户参与度分层
export const UserEngagementChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const segments = [
    { name: '核心用户', ratio: 5, value: '日均30分钟+', color: '#ef4444', desc: '高频互动，内容贡献者' },
    { name: '活跃用户', ratio: 15, value: '日均15分钟', color: '#f59e0b', desc: '频繁访问，偶尔互动' },
    { name: '普通用户', ratio: 30, value: '周均3次', color: '#10b981', desc: '定期访问，被动消费' },
    { name: '沉默用户', ratio: 50, value: '月均1次', color: '#6b7280', desc: '低频访问，易流失' }
  ]

  let currentY = 80
  
  return (
    <svg viewBox="0 0 550 420" className="w-full h-auto">
      <text x="275" y="30" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-100' : 'fill-gray-900'}`}>
        用户参与度金字塔
      </text>

      {segments.map((seg, i) => {
        const height = seg.ratio * 3
        const width = 150 + (3 - i) * 60
        const x = 275 - width / 2
        const y = currentY
        currentY += height

        return (
          <g key={i}>
            {/* 金字塔层级 */}
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              fill={seg.color}
              fillOpacity="0.7"
              stroke={seg.color}
              strokeWidth="2"
            />
            
            {/* 层级名称 */}
            <text
              x="275"
              y={y + height / 2 + 5}
              textAnchor="middle"
              className="text-sm font-bold fill-white"
            >
              {seg.name} ({seg.ratio}%)
            </text>

            {/* 右侧说明 */}
            <text
              x={x + width + 15}
              y={y + height / 2 - 5}
              className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}
            >
              {seg.value}
            </text>
            <text
              x={x + width + 15}
              y={y + height / 2 + 10}
              className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}
            >
              {seg.desc}
            </text>
          </g>
        )
      })}

      {/* 策略建议 */}
      <g transform="translate(40, 330)">
        <rect x="0" y="0" width="470" height="75" fill={isDark ? '#1f2937' : '#f3f4f6'} rx="8" />
        <text x="235" y="20" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-blue-400' : 'fill-blue-600'}`}>
          💡 运营策略
        </text>
        <text x="235" y="38" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
          • 核心用户：深度运营，激励内容创作  • 活跃用户：提升互动，转化为核心
        </text>
        <text x="235" y="53" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
          • 普通用户：个性化推荐，增加使用频次  • 沉默用户：召回策略，防止流失
        </text>
      </g>
    </svg>
  )
}

// 创作者生态
export const CreatorEcosystemChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const creators = [
    { level: '头部创作者', percent: 1, contribution: 30, color: '#ef4444', earnings: '万元级' },
    { level: '腰部创作者', percent: 9, contribution: 40, color: '#f59e0b', earnings: '千元级' },
    { level: '长尾创作者', percent: 90, contribution: 30, color: '#10b981', earnings: '百元级' }
  ]

  return (
    <svg viewBox="0 0 600 350" className="w-full h-auto">
      <text x="300" y="30" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-100' : 'fill-gray-900'}`}>
        创作者生态结构
      </text>

      <g transform="translate(50, 60)">
        {/* 左侧：创作者数量分布 */}
        <text x="100" y="-5" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
          创作者数量占比
        </text>
        {creators.map((c, i) => {
          const y = i * 85
          const width = c.percent * 2.5
          return (
            <g key={i} transform={`translate(0, ${y})`}>
              <rect x="0" y="15" width={width} height="60" fill={c.color} fillOpacity="0.7" rx="4" />
              <text x={width / 2} y="50" textAnchor="middle" className="text-xs font-bold fill-white">
                {c.percent}%
              </text>
            </g>
          )
        })}

        {/* 中间：创作者层级 */}
        <g transform="translate(250, 0)">
          <text x="50" y="-5" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
            创作者层级
          </text>
          {creators.map((c, i) => (
            <g key={i} transform={`translate(0, ${i * 85})`}>
              <rect x="-30" y="15" width="160" height="60" fill={c.color} fillOpacity="0.2" stroke={c.color} strokeWidth="2" rx="6" />
              <text x="50" y="40" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-100' : 'fill-gray-900'}`}>
                {c.level}
              </text>
              <text x="50" y="58" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
                月均收入: {c.earnings}
              </text>
            </g>
          ))}
        </g>

        {/* 右侧：内容贡献度 */}
        <g transform="translate(400, 0)">
          <text x="75" y="-5" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
            内容贡献占比
          </text>
          {creators.map((c, i) => {
            const y = i * 85
            const width = c.contribution * 1.5
            return (
              <g key={i} transform={`translate(0, ${y})`}>
                <rect x="0" y="15" width={width} height="60" fill={c.color} fillOpacity="0.7" rx="4" />
                <text x={width / 2} y="50" textAnchor="middle" className="text-xs font-bold fill-white">
                  {c.contribution}%
                </text>
              </g>
            )
          })}
        </g>
      </g>

      <text x="300" y="335" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-500' : 'fill-gray-600'}`}>
        💡 1%的头部创作者贡献30%的优质内容，需要重点激励和扶持
      </text>
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
      skills: ['核心指标理解', '内容分析基础', '用户行为分析']
    },
    { 
      level: 'Level 2', 
      name: '数据分析', 
      duration: '2-3周',
      color: '#8b5cf6',
      x: 260,
      y: 140,
      skills: ['内容生命周期', '推荐算法理解', '数据可视化']
    },
    { 
      level: 'Level 3', 
      name: '深度分析', 
      duration: '3-4周',
      color: '#10b981',
      x: 440,
      y: 140,
      skills: ['创作者生态', 'AB测试', '商业化分析']
    },
    { 
      level: 'Level 4', 
      name: '战略洞察', 
      duration: '持续学习',
      color: '#f59e0b',
      x: 620,
      y: 200,
      skills: ['内容策略', '平台生态', '数据驱动决策']
    }
  ]

  return (
    <svg viewBox="0 0 750 380" className="w-full h-auto">
      <defs>
        <linearGradient id="path-gradient-content" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="33%" stopColor="#8b5cf6" />
          <stop offset="66%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      <text x="375" y="30" textAnchor="middle" className={`text-xl font-bold ${isDark ? 'fill-gray-100' : 'fill-gray-900'}`}>
        内容平台数据分析学习路径
      </text>

      {/* 连接路径 */}
      <path
        d={`M ${stages[0].x} ${stages[0].y} 
            Q ${stages[1].x - 60} ${stages[1].y + 80}, ${stages[1].x} ${stages[1].y}
            L ${stages[2].x} ${stages[2].y}
            Q ${stages[3].x - 60} ${stages[3].y - 60}, ${stages[3].x} ${stages[3].y}`}
        fill="none"
        stroke="url(#path-gradient-content)"
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

