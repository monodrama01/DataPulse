import React from 'react'
import { getLucideIcon } from "@/components/LucideIcon";

// 正态分布曲线
export const NormalDistributionChart = ({ theme = 'light' }: { theme?: string }) => {
  const strokeColor = theme === 'dark' ? '#60a5fa' : '#3b82f6'
  const fillColor = theme === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)'
  const textColor = theme === 'dark' ? '#9ca3af' : '#6b7280'
  
  // 正态分布曲线路径 (使用简化的近似)
  const path = "M 20,150 Q 50,20 150,10 T 280,150"
  const areaPath = "M 20,150 Q 50,20 150,10 T 280,150 L 280,160 L 20,160 Z"
  
  return (
    <svg viewBox="0 0 300 180" className="w-full h-auto">
      {/* 坐标轴 */}
      <line x1="20" y1="160" x2="280" y2="160" stroke={textColor} strokeWidth="1" />
      <line x1="150" y1="10" x2="150" y2="165" stroke={textColor} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
      
      {/* 标准差标记 */}
      <line x1="90" y1="155" x2="90" y2="165" stroke={textColor} strokeWidth="1" />
      <line x1="210" y1="155" x2="210" y2="165" stroke={textColor} strokeWidth="1" />
      
      {/* 曲线下方填充 */}
      <path d={areaPath} fill={fillColor} />
      
      {/* 正态分布曲线 */}
      <path d={path} fill="none" stroke={strokeColor} strokeWidth="2.5" />
      
      {/* 标签 */}
      <text x="150" y="175" textAnchor="middle" fill={textColor} fontSize="11" fontWeight="600">μ</text>
      <text x="90" y="175" textAnchor="middle" fill={textColor} fontSize="10">-σ</text>
      <text x="210" y="175" textAnchor="middle" fill={textColor} fontSize="10">+σ</text>
      
      {/* 百分比标注 */}
      <text x="150" y="90" textAnchor="middle" fill={strokeColor} fontSize="12" fontWeight="bold">68.3%</text>
      <text x="70" y="130" textAnchor="middle" fill={textColor} fontSize="10">13.6%</text>
      <text x="230" y="130" textAnchor="middle" fill={textColor} fontSize="10">13.6%</text>
    </svg>
  )
}

// 箱线图
export const BoxPlotChart = ({ theme = 'light' }: { theme?: string }) => {
  const strokeColor = theme === 'dark' ? '#60a5fa' : '#3b82f6'
  const fillColor = theme === 'dark' ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.15)'
  const textColor = theme === 'dark' ? '#9ca3af' : '#6b7280'
  const lineColor = theme === 'dark' ? '#4b5563' : '#d1d5db'
  
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {/* 背景网格 */}
      <line x1="50" y1="40" x2="50" y2="160" stroke={lineColor} strokeWidth="1" opacity="0.3" />
      <line x1="250" y1="40" x2="250" y2="160" stroke={lineColor} strokeWidth="1" opacity="0.3" />
      
      {/* 须线（whiskers） */}
      <line x1="70" y1="100" x2="110" y2="100" stroke={strokeColor} strokeWidth="2" />
      <line x1="70" y1="90" x2="70" y2="110" stroke={strokeColor} strokeWidth="2" />
      <line x1="190" y1="100" x2="230" y2="100" stroke={strokeColor} strokeWidth="2" />
      <line x1="230" y1="90" x2="230" y2="110" stroke={strokeColor} strokeWidth="2" />
      
      {/* 箱体 */}
      <rect x="110" y="70" width="80" height="60" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
      
      {/* 中位数线 */}
      <line x1="110" y1="100" x2="190" y2="100" stroke={strokeColor} strokeWidth="3" />
      
      {/* 异常值 */}
      <circle cx="45" cy="100" r="3" fill="#ef4444" />
      <circle cx="255" cy="95" r="3" fill="#ef4444" />
      
      {/* 标签 */}
      <text x="70" y="130" textAnchor="middle" fill={textColor} fontSize="10">最小值</text>
      <text x="110" y="60" textAnchor="middle" fill={textColor} fontSize="10">Q1</text>
      <text x="150" y="55" textAnchor="middle" fill={strokeColor} fontSize="11" fontWeight="bold">中位数</text>
      <text x="190" y="60" textAnchor="middle" fill={textColor} fontSize="10">Q3</text>
      <text x="230" y="130" textAnchor="middle" fill={textColor} fontSize="10">最大值</text>
      <text x="45" y="125" textAnchor="middle" fill="#ef4444" fontSize="9">异常</text>
      <text x="255" y="115" textAnchor="middle" fill="#ef4444" fontSize="9">异常</text>
      
      {/* IQR标注 */}
      <line x1="110" y1="145" x2="190" y2="145" stroke={textColor} strokeWidth="1" opacity="0.5" />
      <line x1="110" y1="140" x2="110" y2="150" stroke={textColor} strokeWidth="1" opacity="0.5" />
      <line x1="190" y1="140" x2="190" y2="150" stroke={textColor} strokeWidth="1" opacity="0.5" />
      <text x="150" y="160" textAnchor="middle" fill={textColor} fontSize="10" fontWeight="600">IQR (四分位距)</text>
      
      {/* 标题 */}
      <text x="150" y="25" textAnchor="middle" fill={textColor} fontSize="13" fontWeight="bold">箱线图结构</text>
    </svg>
  )
}

// 散点图 + 回归线
export const ScatterRegressionChart = ({ theme = 'light' }: { theme?: string }) => {
  const strokeColor = theme === 'dark' ? '#60a5fa' : '#3b82f6'
  const pointColor = theme === 'dark' ? '#93c5fd' : '#60a5fa'
  const textColor = theme === 'dark' ? '#9ca3af' : '#6b7280'
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb'
  
  // 模拟数据点 (正相关)
  const points = [
    [40, 140], [60, 125], [80, 110], [100, 100], [120, 85],
    [140, 75], [160, 65], [180, 55], [200, 45], [220, 35],
    [50, 135], [90, 105], [130, 80], [170, 60], [210, 40]
  ]
  
  return (
    <svg viewBox="0 0 280 180" className="w-full h-auto">
      {/* 网格线 */}
      <line x1="30" y1="30" x2="30" y2="150" stroke={gridColor} strokeWidth="2" />
      <line x1="30" y1="150" x2="250" y2="150" stroke={gridColor} strokeWidth="2" />
      
      {/* 回归线 */}
      <line x1="30" y1="145" x2="250" y2="30" stroke={strokeColor} strokeWidth="2.5" strokeDasharray="5,3" />
      
      {/* 散点 */}
      {points.map((point, i) => (
        <circle key={i} cx={point[0]} cy={point[1]} r="4" fill={pointColor} opacity="0.7" />
      ))}
      
      {/* 坐标轴标签 */}
      <text x="140" y="172" textAnchor="middle" fill={textColor} fontSize="11" fontWeight="600">自变量 X</text>
      <text x="15" y="90" textAnchor="middle" fill={textColor} fontSize="11" fontWeight="600" transform="rotate(-90, 15, 90)">因变量 Y</text>
      
      {/* 相关系数标注 */}
      <text x="200" y="120" fill={strokeColor} fontSize="12" fontWeight="bold">r = 0.95</text>
      <text x="200" y="135" fill={textColor} fontSize="10">强正相关</text>
      
      {/* 标题 */}
      <text x="140" y="18" textAnchor="middle" fill={textColor} fontSize="13" fontWeight="bold">线性回归</text>
    </svg>
  )
}

// 时间序列分解
export const TimeSeriesDecomposition = ({ theme = 'light' }: { theme?: string }) => {
  const strokeColor = theme === 'dark' ? '#60a5fa' : '#3b82f6'
  const trendColor = theme === 'dark' ? '#34d399' : '#10b981'
  const seasonalColor = theme === 'dark' ? '#f59e0b' : '#f59e0b'
  const textColor = theme === 'dark' ? '#9ca3af' : '#6b7280'
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb'
  
  return (
    <svg viewBox="0 0 320 280" className="w-full h-auto">
      {/* 原始序列 */}
      <text x="10" y="20" fill={textColor} fontSize="11" fontWeight="bold">原始序列</text>
      <line x1="30" y1="50" x2="290" y2="50" stroke={gridColor} strokeWidth="1" />
      <path d="M 30,45 Q 80,30 130,40 T 230,35 L 290,50" fill="none" stroke={strokeColor} strokeWidth="2" />
      <path d="M 230,35 Q 250,40 270,30 L 290,35" fill="none" stroke={strokeColor} strokeWidth="2" />
      
      {/* 趋势项 */}
      <text x="10" y="90" fill={textColor} fontSize="11" fontWeight="bold">趋势 (T)</text>
      <line x1="30" y1="120" x2="290" y2="120" stroke={gridColor} strokeWidth="1" />
      <line x1="30" y1="125" x2="290" y2="105" stroke={trendColor} strokeWidth="2.5" strokeDasharray="4,2" />
      
      {/* 季节项 */}
      <text x="10" y="160" fill={textColor} fontSize="11" fontWeight="bold">季节性 (S)</text>
      <line x1="30" y1="190" x2="290" y2="190" stroke={gridColor} strokeWidth="1" />
      <path d="M 30,190 Q 50,180 70,190 T 110,190 T 150,190 T 190,190 T 230,190 T 270,190 L 290,190" 
            fill="none" stroke={seasonalColor} strokeWidth="2" />
      
      {/* 残差项 */}
      <text x="10" y="230" fill={textColor} fontSize="11" fontWeight="bold">随机项 (I)</text>
      <line x1="30" y1="260" x2="290" y2="260" stroke={gridColor} strokeWidth="1" />
      {[40,60,80,100,120,140,160,180,200,220,240,260,280].map((x, i) => (
        <line key={i} x1={x} y1={260 - (Math.random() * 8 - 4)} x2={x} y2={260} 
              stroke={textColor} strokeWidth="1.5" opacity="0.5" />
      ))}
      
      {/* 等号标注 */}
      <text x="300" y="50" fill={textColor} fontSize="14" fontWeight="bold">=</text>
      <text x="300" y="120" fill={trendColor} fontSize="14" fontWeight="bold">+</text>
      <text x="300" y="190" fill={seasonalColor} fontSize="14" fontWeight="bold">+</text>
      <text x="300" y="260" fill={textColor} fontSize="14" fontWeight="bold">+</text>
    </svg>
  )
}

// 假设检验 p值图解
export const HypothesisTestChart = ({ theme = 'light' }: { theme?: string }) => {
  const strokeColor = theme === 'dark' ? '#60a5fa' : '#3b82f6'
  const rejectColor = theme === 'dark' ? '#f87171' : '#ef4444'
  const acceptColor = theme === 'dark' ? '#34d399' : '#10b981'
  const textColor = theme === 'dark' ? '#9ca3af' : '#6b7280'
  
  return (
    <svg viewBox="0 0 300 180" className="w-full h-auto">
      {/* 坐标轴 */}
      <line x1="20" y1="140" x2="280" y2="140" stroke={textColor} strokeWidth="1" />
      
      {/* 正态分布曲线 */}
      <path d="M 20,140 Q 50,30 150,20 T 280,140" fill="none" stroke={strokeColor} strokeWidth="2" />
      
      {/* 拒绝域（左尾） */}
      <path d="M 20,140 Q 35,90 50,80 L 50,140 Z" fill={rejectColor} opacity="0.3" />
      
      {/* 拒绝域（右尾） */}
      <path d="M 250,80 Q 265,90 280,140 L 250,140 Z" fill={rejectColor} opacity="0.3" />
      
      {/* 接受域 */}
      <path d="M 50,80 Q 150,20 250,80 L 250,140 L 50,140 Z" fill={acceptColor} opacity="0.15" />
      
      {/* 临界值标记 */}
      <line x1="60" y1="75" x2="60" y2="145" stroke={rejectColor} strokeWidth="2" strokeDasharray="3,3" />
      <line x1="240" y1="75" x2="240" y2="145" stroke={rejectColor} strokeWidth="2" strokeDasharray="3,3" />
      
      {/* α标注 */}
      <text x="35" y="120" fill={rejectColor} fontSize="10" fontWeight="bold">α/2</text>
      <text x="265" y="120" fill={rejectColor} fontSize="10" fontWeight="bold">α/2</text>
      
      {/* 置信区间标注 */}
      <line x1="60" y1="160" x2="240" y2="160" stroke={acceptColor} strokeWidth="2" />
      <line x1="60" y1="155" x2="60" y2="165" stroke={acceptColor} strokeWidth="2" />
      <line x1="240" y1="155" x2="240" y2="165" stroke={acceptColor} strokeWidth="2" />
      <text x="150" y="175" textAnchor="middle" fill={acceptColor} fontSize="11" fontWeight="bold">1-α 置信区间 (95%)</text>
      
      {/* 标签 */}
      <text x="30" y="165" fill={rejectColor} fontSize="9">拒绝H₀</text>
      <text x="255" y="165" fill={rejectColor} fontSize="9">拒绝H₀</text>
      <text x="150" y="100" textAnchor="middle" fill={acceptColor} fontSize="10">接受H₀</text>
      
      {/* 标题 */}
      <text x="150" y="15" textAnchor="middle" fill={textColor} fontSize="12" fontWeight="bold">双尾检验 (α=0.05)</text>
    </svg>
  )
}

// A/B测试统计功效
export const ABTestPowerChart = ({ theme = 'light' }: { theme?: string }) => {
  const h0Color = theme === 'dark' ? '#60a5fa' : '#3b82f6'
  const h1Color = theme === 'dark' ? '#34d399' : '#10b981'
  const alphaColor = theme === 'dark' ? '#f87171' : '#ef4444'
  const betaColor = theme === 'dark' ? '#fbbf24' : '#f59e0b'
  const textColor = theme === 'dark' ? '#9ca3af' : '#6b7280'
  
  return (
    <svg viewBox="0 0 320 200" className="w-full h-auto">
      {/* 坐标轴 */}
      <line x1="20" y1="160" x2="300" y2="160" stroke={textColor} strokeWidth="1" />
      
      {/* H0分布（原假设） */}
      <path d="M 20,160 Q 50,40 120,30 T 220,160" fill="none" stroke={h0Color} strokeWidth="2.5" />
      <path d="M 180,70 Q 195,50 210,60 L 210,160 L 180,160 Z" fill={alphaColor} opacity="0.3" />
      
      {/* H1分布（备择假设） */}
      <path d="M 100,160 Q 130,40 200,30 T 300,160" fill="none" stroke={h1Color} strokeWidth="2.5" strokeDasharray="5,3" />
      <path d="M 100,160 L 100,120 Q 115,80 130,70 L 130,160 Z" fill={betaColor} opacity="0.3" />
      <path d="M 130,70 Q 165,40 200,30 T 300,160 L 300,160 L 130,160 Z" fill={h1Color} opacity="0.2" />
      
      {/* 临界值线 */}
      <line x1="210" y1="30" x2="210" y2="165" stroke={textColor} strokeWidth="2" strokeDasharray="4,4" />
      
      {/* 标注 */}
      <text x="120" y="20" fill={h0Color} fontSize="12" fontWeight="bold">H₀ (对照组)</text>
      <text x="240" y="20" fill={h1Color} fontSize="12" fontWeight="bold">H₁ (实验组)</text>
      
      <text x="195" y="110" fill={alphaColor} fontSize="10" fontWeight="bold">α</text>
      <text x="180" y="125" fill={alphaColor} fontSize="8">Type I</text>
      <text x="180" y="135" fill={alphaColor} fontSize="8">Error</text>
      
      <text x="115" y="110" fill={betaColor} fontSize="10" fontWeight="bold">β</text>
      <text x="100" y="125" fill={betaColor} fontSize="8">Type II</text>
      <text x="100" y="135" fill={betaColor} fontSize="8">Error</text>
      
      <text x="250" y="100" fill={h1Color} fontSize="11" fontWeight="bold">1-β</text>
      <text x="240" y="115" fill={h1Color} fontSize="9">统计功效</text>
      <text x="240" y="127" fill={h1Color} fontSize="9">(Power)</text>
      
      {/* 临界值标注 */}
      <text x="215" y="175" fill={textColor} fontSize="9">临界值</text>
      
      {/* MDE标注 */}
      <line x1="120" y1="185" x2="200" y2="185" stroke={textColor} strokeWidth="1.5" />
      <line x1="120" y1="180" x2="120" y2="190" stroke={textColor} strokeWidth="1.5" />
      <line x1="200" y1="180" x2="200" y2="190" stroke={textColor} strokeWidth="1.5" />
      <text x="160" y="198" textAnchor="middle" fill={textColor} fontSize="10" fontWeight="bold">MDE (最小可检测效应)</text>
    </svg>
  )
}

// 直方图分布形态
export const HistogramShapes = ({ theme = 'light' }: { theme?: string }) => {
  const fillColor = theme === 'dark' ? '#60a5fa' : '#3b82f6'
  const strokeColor = theme === 'dark' ? '#93c5fd' : '#2563eb'
  const textColor = theme === 'dark' ? '#9ca3af' : '#6b7280'
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb'
  
  return (
    <svg viewBox="0 0 700 550" className="w-full h-auto">
      {/* 标准型（钟形）*/}
      <g>
        <text x="85" y="20" fill={textColor} fontSize="14" fontWeight="bold" textAnchor="middle">🔔 标准型（钟形）</text>
        <line x1="10" y1="130" x2="160" y2="130" stroke={gridColor} strokeWidth="1" />
        {/* 钟形柱子 */}
        <rect x="25" y="110" width="12" height="20" fill={fillColor} opacity="0.7" stroke={strokeColor} />
        <rect x="38" y="90" width="12" height="40" fill={fillColor} opacity="0.8" stroke={strokeColor} />
        <rect x="51" y="60" width="12" height="70" fill={fillColor} opacity="0.9" stroke={strokeColor} />
        <rect x="64" y="40" width="12" height="90" fill={fillColor} stroke={strokeColor} />
        <rect x="77" y="35" width="12" height="95" fill={fillColor} stroke={strokeColor} />
        <rect x="90" y="40" width="12" height="90" fill={fillColor} stroke={strokeColor} />
        <rect x="103" y="60" width="12" height="70" fill={fillColor} opacity="0.9" stroke={strokeColor} />
        <rect x="116" y="90" width="12" height="40" fill={fillColor} opacity="0.8" stroke={strokeColor} />
        <rect x="129" y="110" width="12" height="20" fill={fillColor} opacity="0.7" stroke={strokeColor} />
        <text x="85" y="150" fill={textColor} fontSize="10" textAnchor="middle">左右对称</text>
      </g>

      {/* 偏锋型（右偏）*/}
      <g transform="translate(180, 0)">
        <text x="85" y="20" fill={textColor} fontSize="14" fontWeight="bold" textAnchor="middle">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 偏锋型（拖尾）</text>
        <line x1="10" y1="130" x2="160" y2="130" stroke={gridColor} strokeWidth="1" />
        {/* 右偏柱子 */}
        <rect x="15" y="40" width="12" height="90" fill={fillColor} stroke={strokeColor} />
        <rect x="28" y="50" width="12" height="80" fill={fillColor} stroke={strokeColor} />
        <rect x="41" y="65" width="12" height="65" fill={fillColor} opacity="0.9" stroke={strokeColor} />
        <rect x="54" y="80" width="12" height="50" fill={fillColor} opacity="0.8" stroke={strokeColor} />
        <rect x="67" y="95" width="12" height="35" fill={fillColor} opacity="0.7" stroke={strokeColor} />
        <rect x="80" y="105" width="12" height="25" fill={fillColor} opacity="0.6" stroke={strokeColor} />
        <rect x="93" y="112" width="12" height="18" fill={fillColor} opacity="0.5" stroke={strokeColor} />
        <rect x="106" y="118" width="12" height="12" fill={fillColor} opacity="0.4" stroke={strokeColor} />
        <rect x="119" y="122" width="12" height="8" fill={fillColor} opacity="0.3" stroke={strokeColor} />
        <text x="85" y="150" fill={textColor} fontSize="10" textAnchor="middle">右偏常见</text>
      </g>

      {/* 双峰型 */}
      <g transform="translate(360, 0)">
        <text x="85" y="20" fill={textColor} fontSize="14" fontWeight="bold" textAnchor="middle">⛰ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 双峰型</text>
        <line x1="10" y1="130" x2="160" y2="130" stroke={gridColor} strokeWidth="1" />
        {/* 双峰柱子 */}
        <rect x="15" y="80" width="12" height="50" fill={fillColor} opacity="0.7" stroke={strokeColor} />
        <rect x="28" y="50" width="12" height="80" fill={fillColor} stroke={strokeColor} />
        <rect x="41" y="60" width="12" height="70" fill={fillColor} opacity="0.9" stroke={strokeColor} />
        <rect x="54" y="85" width="12" height="45" fill={fillColor} opacity="0.6" stroke={strokeColor} />
        <rect x="67" y="100" width="12" height="30" fill={fillColor} opacity="0.5" stroke={strokeColor} />
        <rect x="80" y="90" width="12" height="40" fill={fillColor} opacity="0.6" stroke={strokeColor} />
        <rect x="93" y="60" width="12" height="70" fill={fillColor} opacity="0.9" stroke={strokeColor} />
        <rect x="106" y="45" width="12" height="85" fill={fillColor} stroke={strokeColor} />
        <rect x="119" y="75" width="12" height="55" fill={fillColor} opacity="0.7" stroke={strokeColor} />
        <text x="85" y="150" fill={textColor} fontSize="10" textAnchor="middle">两个高峰</text>
      </g>

      {/* 锯齿型 */}
      <g transform="translate(540, 0)">
        <text x="85" y="20" fill={textColor} fontSize="14" fontWeight="bold" textAnchor="middle">🦷 锯齿型</text>
        <line x1="10" y1="130" x2="160" y2="130" stroke={gridColor} strokeWidth="1" />
        {/* 锯齿柱子 */}
        <rect x="15" y="80" width="12" height="50" fill={fillColor} opacity="0.7" stroke={strokeColor} />
        <rect x="28" y="100" width="12" height="30" fill={fillColor} opacity="0.5" stroke={strokeColor} />
        <rect x="41" y="60" width="12" height="70" fill={fillColor} opacity="0.9" stroke={strokeColor} />
        <rect x="54" y="90" width="12" height="40" fill={fillColor} opacity="0.6" stroke={strokeColor} />
        <rect x="67" y="50" width="12" height="80" fill={fillColor} stroke={strokeColor} />
        <rect x="80" y="75" width="12" height="55" fill={fillColor} opacity="0.7" stroke={strokeColor} />
        <rect x="93" y="95" width="12" height="35" fill={fillColor} opacity="0.6" stroke={strokeColor} />
        <rect x="106" y="70" width="12" height="60" fill={fillColor} opacity="0.8" stroke={strokeColor} />
        <rect x="119" y="105" width="12" height="25" fill={fillColor} opacity="0.5" stroke={strokeColor} />
        <text x="85" y="150" fill={textColor} fontSize="10" textAnchor="middle">不规则波动</text>
      </g>

      {/* 应用说明 */}
      <g transform="translate(0, 180)">
        <rect x="10" y="0" width="680" height="360" fill={theme === 'dark' ? '#1f2937' : '#f9fafb'} rx="8" opacity="0.5" />
        
        <text x="350" y="25" fill={textColor} fontSize="13" fontWeight="bold" textAnchor="middle">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 分布形态应用指南</text>
        
        {/* 标准型说明 */}
        <g transform="translate(20, 50)">
          <circle cx="5" cy="5" r="4" fill="#10b981" />
          <text x="15" y="9" fill={textColor} fontSize="11" fontWeight="bold">标准型（钟形）</text>
          <text x="15" y="25" fill={textColor} fontSize="9">• 特征：左右对称，均值=中位数=众数</text>
          <text x="15" y="40" fill={textColor} fontSize="9">• 场景：身高、考试分数、测量误差</text>
          <text x="15" y="55" fill={textColor} fontSize="9">• 分析：可用正态分布进行统计推断</text>
          <text x="15" y="70" fill={textColor} fontSize="9">• 工具：均值±标准差、Z-score、置信区间</text>
        </g>

        {/* 偏锋型说明 */}
        <g transform="translate(190, 50)">
          <circle cx="5" cy="5" r="4" fill="#f59e0b" />
          <text x="15" y="9" fill={textColor} fontSize="11" fontWeight="bold">偏锋型（拖尾）</text>
          <text x="15" y="25" fill={textColor} fontSize="9">• 特征：长尾分布，均值&gt;中位数（右偏）</text>
          <text x="15" y="40" fill={textColor} fontSize="9">• 场景：收入、消费金额、停留时长</text>
          <text x="15" y="55" fill={textColor} fontSize="9">• 分析：用中位数而非均值更稳健</text>
          <text x="15" y="70" fill={textColor} fontSize="9">• 处理：对数变换、分位数分析</text>
        </g>

        {/* 双峰型说明 */}
        <g transform="translate(360, 50)">
          <circle cx="5" cy="5" r="4" fill="#8b5cf6" />
          <text x="15" y="9" fill={textColor} fontSize="11" fontWeight="bold">双峰型</text>
          <text x="15" y="25" fill={textColor} fontSize="9">• 特征：两个明显高峰</text>
          <text x="15" y="40" fill={textColor} fontSize="9">• 场景：男女身高混合、新老用户混合</text>
          <text x="15" y="55" fill={textColor} fontSize="9">• 分析：需要分群分析，不能用整体均值</text>
          <text x="15" y="70" fill={textColor} fontSize="9">• 方法：聚类分析、分层统计</text>
        </g>

        {/* 锯齿型说明 */}
        <g transform="translate(530, 50)">
          <circle cx="5" cy="5" r="4" fill="#ef4444" />
          <text x="15" y="9" fill={textColor} fontSize="11" fontWeight="bold">锯齿型</text>
          <text x="15" y="25" fill={textColor} fontSize="9">• 特征：波动大、不规则</text>
          <text x="15" y="40" fill={textColor} fontSize="9">• 原因：样本量过小、数据质量问题</text>
          <text x="15" y="55" fill={textColor} fontSize="9">• 处理：增加样本量、检查数据清洗</text>
          <text x="15" y="70" fill={textColor} fontSize="9">• 调整：合并箱数、过滤异常值</text>
        </g>

        {/* 实战案例 */}
        <g transform="translate(20, 140)">
          <rect x="0" y="0" width="660" height="100" fill={theme === 'dark' ? '#374151' : '#ffffff'} rx="6" stroke={theme === 'dark' ? '#4b5563' : '#e5e7eb'} strokeWidth="1" />
          <text x="10" y="20" fill={textColor} fontSize="12" fontWeight="bold">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 实战案例：电商平台用户消费金额分析</text>
          
          <text x="20" y="40" fill={textColor} fontSize="10">• <tspan fontWeight="bold">观察结果：</tspan>直方图呈现明显右偏分布（偏锋型）</text>
          <text x="20" y="55" fill={textColor} fontSize="10">• <tspan fontWeight="bold">数据特征：</tspan>均值500元，中位数280元，众数150元 → 少数大R用户拉高均值</text>
          <text x="20" y="70" fill={textColor} fontSize="10">• <tspan fontWeight="bold">分析策略：</tspan>采用中位数和分位数(P25/P50/P75/P90)描述，避免均值误导</text>
          <text x="20" y="85" fill={textColor} fontSize="10">• <tspan fontWeight="bold">业务决策：</tspan>按分位数分层用户(小额/中等/大额/超大额)，制定差异化运营策略</text>
        </g>

        {/* 工具提示 */}
        <g transform="translate(20, 260)">
          <rect x="0" y="0" width="320" height="70" fill={theme === 'dark' ? '#1e3a8a' : '#dbeafe'} rx="6" opacity="0.8" />
          <text x="10" y="20" fill={theme === 'dark' ? '#93c5fd' : '#1e40af'} fontSize="11" fontWeight="bold">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Excel 快速绘制</text>
          <text x="10" y="35" fill={textColor} fontSize="9">1. 选中数据 → 数据分析 → 直方图</text>
          <text x="10" y="48" fill={textColor} fontSize="9">2. 设置箱数：√n 或手动（通常10-30）</text>
          <text x="10" y="61" fill={textColor} fontSize="9">3. 勾选"图表输出"，查看分布形态</text>
        </g>

        <g transform="translate(360, 260)">
          <rect x="0" y="0" width="320" height="70" fill={theme === 'dark' ? '#134e4a' : '#d1fae5'} rx="6" opacity="0.8" />
          <text x="10" y="20" fill={theme === 'dark' ? '#6ee7b7' : '#065f46'} fontSize="11" fontWeight="bold">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Python 实现</text>
          <text x="10" y="35" fill={textColor} fontSize="9" fontFamily="monospace">plt.hist(data, bins=30, edgecolor='black')</text>
          <text x="10" y="48" fill={textColor} fontSize="9" fontFamily="monospace">sns.histplot(df['col'], kde=True)</text>
          <text x="10" y="61" fill={textColor} fontSize="9">参数bins控制柱子数量，kde=True显示密度曲线</text>
        </g>
      </g>
    </svg>
  )
}

