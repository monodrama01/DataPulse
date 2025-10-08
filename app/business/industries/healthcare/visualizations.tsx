import React from 'react'

// 问诊转化漏斗图
export const ConsultationFunnelChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const stages = [
    { name: '访问用户', value: 10000, rate: 100, color: '#ef4444' },
    { name: '注册用户', value: 6000, rate: 60, color: '#f97316' },
    { name: '问诊用户', value: 3000, rate: 30, color: '#eab308' },
    { name: '购药用户', value: 1500, rate: 15, color: '#22c55e' },
    { name: '复诊用户', value: 600, rate: 6, color: '#3b82f6' }
  ]

  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <defs>
        <linearGradient id="funnelGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="funnelGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="funnelGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#eab308" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="funnelGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="funnelGradient5" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.6"/>
        </linearGradient>
      </defs>

      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        问诊转化漏斗分析
      </text>

      {stages.map((stage, i) => {
        const width = 600 * (stage.value / 10000)
        const x = (800 - width) / 2
        const y = 60 + i * 65
        
        return (
          <g key={i}>
            {/* 梯形漏斗 */}
            <path
              d={`M ${x} ${y} L ${x + width} ${y} L ${x + width * 0.85} ${y + 50} L ${x + width * 0.15} ${y + 50} Z`}
              fill={`url(#funnelGradient${i + 1})`}
              stroke={stage.color}
              strokeWidth="2"
            />
            
            {/* 阶段名称 */}
            <text x={x + width / 2} y={y + 25} textAnchor="middle" className="fill-white font-bold text-sm">
              {stage.name}
            </text>
            
            {/* 数值 */}
            <text x={x + width / 2} y={y + 42} textAnchor="middle" className="fill-white text-xs">
              {stage.value.toLocaleString()}人 ({stage.rate}%)
            </text>
            
            {/* 转化率箭头 */}
            {i < stages.length - 1 && (
              <>
                <line
                  x1="400" y1={y + 55}
                  x2="400" y2={y + 60}
                  stroke={isDark ? '#9ca3af' : '#6b7280'}
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <text x="420" y={y + 58} className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
                  {((stages[i + 1].value / stage.value) * 100).toFixed(1)}%
                </text>
              </>
            )}
          </g>
        )
      })}

      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0 0, 10 5, 0 10" fill={isDark ? '#9ca3af' : '#6b7280'} />
        </marker>
      </defs>
    </svg>
  )
}

// 医生工作效率对比图
export const DoctorEfficiencyChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const doctors = [
    { name: '张医生', consultations: 45, rating: 4.9, responseTime: 3 },
    { name: '李医生', consultations: 38, rating: 4.7, responseTime: 5 },
    { name: '王医生', consultations: 42, rating: 4.8, responseTime: 4 },
    { name: '赵医生', consultations: 35, rating: 4.6, responseTime: 6 },
    { name: '刘医生', consultations: 40, rating: 4.8, responseTime: 4 }
  ]

  const maxConsultations = Math.max(...doctors.map(d => d.consultations))

  return (
    <svg viewBox="0 0 800 450" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        医生工作效率对比分析
      </text>

      {/* Y轴标签 */}
      <text x="50" y="200" textAnchor="middle" transform="rotate(-90 50 200)" className={`text-sm ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
        日均问诊量
      </text>

      {/* X轴 */}
      <line x1="100" y1="350" x2="750" y2="350" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      
      {/* Y轴 */}
      <line x1="100" y1="60" x2="100" y2="350" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>

      {/* 刻度 */}
      {[0, 10, 20, 30, 40, 50].map((val, i) => (
        <g key={i}>
          <line x1="95" y1={350 - val * 5.8} x2="100" y2={350 - val * 5.8} stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="1"/>
          <text x="85" y={350 - val * 5.8 + 5} textAnchor="end" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
            {val}
          </text>
        </g>
      ))}

      {doctors.map((doctor, i) => {
        const x = 150 + i * 120
        const barHeight = (doctor.consultations / maxConsultations) * 280
        const y = 350 - barHeight

        return (
          <g key={i}>
            {/* 柱状图 */}
            <rect
              x={x}
              y={y}
              width="80"
              height={barHeight}
              fill={`url(#barGradient${i})`}
              rx="4"
            />
            
            {/* 问诊量 */}
            <text x={x + 40} y={y - 5} textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
              {doctor.consultations}
            </text>
            
            {/* 评分标签 */}
            <rect x={x + 10} y={y + 10} width="60" height="20" fill={isDark ? '#1f2937' : '#ffffff'} rx="4" opacity="0.9"/>
            <text x={x + 40} y={y + 24} textAnchor="middle" className="text-xs fill-yellow-500 font-bold">
              ⭐ {doctor.rating}
            </text>
            
            {/* 响应时间 */}
            <text x={x + 40} y={350 - barHeight / 2} textAnchor="middle" className="text-xs fill-white font-semibold">
              {doctor.responseTime}min
            </text>
            
            {/* 医生名称 */}
            <text x={x + 40} y="375" textAnchor="middle" className={`text-sm font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
              {doctor.name}
            </text>
          </g>
        )
      })}

      {/* 渐变定义 */}
      <defs>
        {doctors.map((_, i) => (
          <linearGradient key={i} id={`barGradient${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#db2777" stopOpacity="0.9"/>
          </linearGradient>
        ))}
      </defs>

      {/* 图例 */}
      <g transform="translate(600, 30)">
        <rect x="0" y="0" width="15" height="15" fill="#ec4899" rx="2"/>
        <text x="20" y="12" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>问诊量</text>
        
        <text x="0" y="35" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>⭐ 评分</text>
        <text x="0" y="50" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>响应时间(min)</text>
      </g>
    </svg>
  )
}

// 患者画像分布图
export const PatientProfileChart: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <text x="400" y="25" textAnchor="middle" className={`text-lg font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        患者画像分布分析
      </text>

      {/* 年龄分布 */}
      <g transform="translate(50, 60)">
        <text x="120" y="0" textAnchor="middle" className={`text-sm font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
          年龄分布
        </text>
        {[
          { label: '18-25岁', value: 15, color: '#3b82f6' },
          { label: '26-35岁', value: 35, color: '#8b5cf6' },
          { label: '36-45岁', value: 28, color: '#ec4899' },
          { label: '46-60岁', value: 18, color: '#f59e0b' },
          { label: '60岁+', value: 4, color: '#6b7280' }
        ].map((item, i) => (
          <g key={i} transform={`translate(0, ${i * 40 + 20})`}>
            <rect x="0" y="0" width={item.value * 2} height="25" fill={item.color} rx="4" opacity="0.8"/>
            <text x={item.value * 2 + 10} y="17" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
              {item.label}: {item.value}%
            </text>
          </g>
        ))}
      </g>

      {/* 疾病类型 */}
      <g transform="translate(350, 60)">
        <text x="200" y="0" textAnchor="middle" className={`text-sm font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
          高频疾病类型
        </text>
        {[
          { label: '感冒发烧', value: 32, color: '#ef4444' },
          { label: '消化系统', value: 23, color: '#f97316' },
          { label: '皮肤问题', value: 18, color: '#eab308' },
          { label: '心血管', value: 15, color: '#22c55e' },
          { label: '其他', value: 12, color: '#6366f1' }
        ].map((item, i) => {
          const angle = (i / 5) * 2 * Math.PI - Math.PI / 2
          const radius = 80
          const x = 200 + Math.cos(angle) * radius
          const y = 120 + Math.sin(angle) * radius
          
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={item.value * 0.8} fill={item.color} opacity="0.7"/>
              <text x={x} y={y + 5} textAnchor="middle" className="text-xs fill-white font-bold">
                {item.value}%
              </text>
              <text x={x} y={y + item.value * 0.8 + 18} textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
                {item.label}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

