'use client'

import React from 'react'
import { getLucideIcon } from "@/components/LucideIcon";

interface VisualizationProps {
  theme: 'light' | 'dark'
}

// 混淆矩阵可视化
export const ConfusionMatrixChart: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  return (
    <svg viewBox="0 0 400 350" className="w-full h-auto">
      {/* 标题 */}
      <text x="200" y="25" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        混淆矩阵示例
      </text>
      
      {/* 矩阵背景 */}
      <rect x="80" y="80" width="120" height="120" fill={isDark ? '#1e3a8a' : '#dbeafe'} stroke={isDark ? '#3b82f6' : '#2563eb'} strokeWidth="2"/>
      <rect x="200" y="80" width="120" height="120" fill={isDark ? '#7f1d1d' : '#fee2e2'} stroke={isDark ? '#ef4444' : '#dc2626'} strokeWidth="2"/>
      <rect x="80" y="200" width="120" height="120" fill={isDark ? '#7f1d1d' : '#fee2e2'} stroke={isDark ? '#ef4444' : '#dc2626'} strokeWidth="2"/>
      <rect x="200" y="200" width="120" height="120" fill={isDark ? '#1e3a8a' : '#dbeafe'} stroke={isDark ? '#3b82f6' : '#2563eb'} strokeWidth="2"/>
      
      {/* 数值 */}
      <text x="140" y="150" textAnchor="middle" className={`text-2xl font-bold ${isDark ? 'fill-blue-300' : 'fill-blue-700'}`}>850</text>
      <text x="260" y="150" textAnchor="middle" className={`text-2xl font-bold ${isDark ? 'fill-red-300' : 'fill-red-700'}`}>50</text>
      <text x="140" y="270" textAnchor="middle" className={`text-2xl font-bold ${isDark ? 'fill-red-300' : 'fill-red-700'}`}>30</text>
      <text x="260" y="270" textAnchor="middle" className={`text-2xl font-bold ${isDark ? 'fill-blue-300' : 'fill-blue-700'}`}>70</text>
      
      {/* 标签 */}
      <text x="140" y="60" textAnchor="middle" className={`text-xs font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>预测: 负类</text>
      <text x="260" y="60" textAnchor="middle" className={`text-xs font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>预测: 正类</text>
      <text x="50" y="145" textAnchor="middle" className={`text-xs font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`} transform="rotate(-90 50 145)">实际: 负类</text>
      <text x="50" y="265" textAnchor="middle" className={`text-xs font-semibold ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`} transform="rotate(-90 50 265)">实际: 正类</text>
      
      {/* 说明文字 */}
      <text x="140" y="175" textAnchor="middle" className={`text-xs ${isDark ? 'fill-blue-200' : 'fill-blue-600'}`}>TN (真负例)</text>
      <text x="260" y="175" textAnchor="middle" className={`text-xs ${isDark ? 'fill-red-200' : 'fill-red-600'}`}>FP (假正例)</text>
      <text x="140" y="295" textAnchor="middle" className={`text-xs ${isDark ? 'fill-red-200' : 'fill-red-600'}`}>FN (假负例)</text>
      <text x="260" y="295" textAnchor="middle" className={`text-xs ${isDark ? 'fill-blue-200' : 'fill-blue-600'}`}>TP (真正例)</text>
    </svg>
  )
}

// ROC曲线
export const ROCCurveChart: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  return (
    <svg viewBox="0 0 400 350" className="w-full h-auto">
      <text x="200" y="25" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        ROC曲线 (AUC = 0.92)
      </text>
      
      {/* 坐标轴 */}
      <line x1="50" y1="300" x2="350" y2="300" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="2"/>
      <line x1="50" y1="50" x2="50" y2="300" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="2"/>
      
      {/* 对角线（随机猜测）*/}
      <line x1="50" y1="300" x2="350" y2="50" stroke={isDark ? '#ef4444' : '#dc2626'} strokeWidth="2" strokeDasharray="5,5"/>
      
      {/* ROC曲线 */}
      <path d="M 50 300 Q 80 250, 100 200 T 150 100 T 250 60 T 350 50" 
            fill="none" 
            stroke={isDark ? '#3b82f6' : '#2563eb'} 
            strokeWidth="3"/>
      
      {/* 填充区域 */}
      <path d="M 50 300 Q 80 250, 100 200 T 150 100 T 250 60 T 350 50 L 350 300 Z" 
            fill={isDark ? '#1e3a8a' : '#dbeafe'} 
            opacity="0.3"/>
      
      {/* 坐标轴标签 */}
      <text x="200" y="330" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        假正例率 (FPR)
      </text>
      <text x="20" y="180" textAnchor="middle" transform="rotate(-90 20 180)" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        真正例率 (TPR)
      </text>
      
      {/* 图例 */}
      <line x1="260" y1="280" x2="290" y2="280" stroke={isDark ? '#3b82f6' : '#2563eb'} strokeWidth="3"/>
      <text x="295" y="285" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>模型ROC</text>
      
      <line x1="260" y1="295" x2="290" y2="295" stroke={isDark ? '#ef4444' : '#dc2626'} strokeWidth="2" strokeDasharray="5,5"/>
      <text x="295" y="300" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>随机猜测</text>
    </svg>
  )
}

// 特征重要性柱状图
export const FeatureImportanceChart: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark'
  const features = [
    { name: '购买频率', importance: 0.28 },
    { name: '累计金额', importance: 0.24 },
    { name: '最近购买', importance: 0.18 },
    { name: '浏览次数', importance: 0.12 },
    { name: '会员等级', importance: 0.10 },
    { name: '加购次数', importance: 0.08 }
  ]
  
  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto">
      <text x="200" y="25" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        特征重要性排序 (Top 6)
      </text>
      
      {features.map((feature, idx) => {
        const y = 50 + idx * 40
        const width = feature.importance * 280
        return (
          <g key={idx}>
            <rect 
              x="110" 
              y={y} 
              width={width} 
              height="25" 
              fill={`url(#gradient-${idx})`}
              rx="3"
            />
            <text x="105" y={y + 17} textAnchor="end" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
              {feature.name}
            </text>
            <text x={115 + width} y={y + 17} className={`text-xs font-bold ${isDark ? 'fill-blue-300' : 'fill-blue-700'}`}>
              {(feature.importance * 100).toFixed(0)}%
            </text>
          </g>
        )
      })}
      
      <defs>
        {features.map((_, idx) => (
          <linearGradient key={idx} id={`gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDark ? '#1e40af' : '#3b82f6'} />
            <stop offset="100%" stopColor={isDark ? '#3b82f6' : '#60a5fa'} />
          </linearGradient>
        ))}
      </defs>
    </svg>
  )
}

// 学习曲线
export const LearningCurveChart: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto">
      <text x="200" y="25" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        学习曲线 - 训练集 vs 验证集
      </text>
      
      {/* 坐标轴 */}
      <line x1="50" y1="270" x2="370" y2="270" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="2"/>
      <line x1="50" y1="50" x2="50" y2="270" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="2"/>
      
      {/* 训练集曲线 */}
      <path d="M 50 200 L 100 150 L 150 110 L 200 85 L 250 70 L 300 62 L 350 58" 
            fill="none" 
            stroke={isDark ? '#10b981' : '#059669'} 
            strokeWidth="3"/>
      
      {/* 验证集曲线 */}
      <path d="M 50 230 L 100 190 L 150 160 L 200 140 L 250 125 L 300 118 L 350 115" 
            fill="none" 
            stroke={isDark ? '#f59e0b' : '#d97706'} 
            strokeWidth="3"/>
      
      {/* 坐标轴标签 */}
      <text x="210" y="295" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        训练样本数
      </text>
      <text x="20" y="160" textAnchor="middle" transform="rotate(-90 20 160)" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        准确率
      </text>
      
      {/* 图例 */}
      <line x1="260" y1="240" x2="290" y2="240" stroke={isDark ? '#10b981' : '#059669'} strokeWidth="3"/>
      <text x="295" y="245" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>训练集得分</text>
      
      <line x1="260" y1="255" x2="290" y2="255" stroke={isDark ? '#f59e0b' : '#d97706'} strokeWidth="3"/>
      <text x="295" y="260" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>验证集得分</text>
    </svg>
  )
}

// 聚类可视化
export const ClusteringVisualization: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  // 聚类中心
  const centroids = [
    { x: 120, y: 100, color: isDark ? '#ef4444' : '#dc2626', label: 'C1' },
    { x: 280, y: 120, color: isDark ? '#3b82f6' : '#2563eb', label: 'C2' },
    { x: 200, y: 220, color: isDark ? '#10b981' : '#059669', label: 'C3' }
  ]
  
  // 数据点
  const points = [
    // Cluster 1
    ...Array.from({length: 15}, (_, i) => ({ 
      x: 120 + (Math.random() - 0.5) * 60, 
      y: 100 + (Math.random() - 0.5) * 60, 
      cluster: 0 
    })),
    // Cluster 2
    ...Array.from({length: 15}, (_, i) => ({ 
      x: 280 + (Math.random() - 0.5) * 60, 
      y: 120 + (Math.random() - 0.5) * 60, 
      cluster: 1 
    })),
    // Cluster 3
    ...Array.from({length: 15}, (_, i) => ({ 
      x: 200 + (Math.random() - 0.5) * 60, 
      y: 220 + (Math.random() - 0.5) * 60, 
      cluster: 2 
    }))
  ]
  
  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto">
      <text x="200" y="25" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        K-means聚类结果 (K=3)
      </text>
      
      {/* 坐标轴 */}
      <line x1="50" y1="270" x2="350" y2="270" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="1"/>
      <line x1="50" y1="50" x2="50" y2="270" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="1"/>
      
      {/* 数据点 */}
      {points.map((point, idx) => (
        <circle 
          key={idx}
          cx={point.x} 
          cy={point.y} 
          r="3" 
          fill={centroids[point.cluster].color}
          opacity="0.6"
        />
      ))}
      
      {/* 聚类中心 */}
      {centroids.map((centroid, idx) => (
        <g key={idx}>
          <circle cx={centroid.x} cy={centroid.y} r="8" fill={centroid.color} stroke="white" strokeWidth="2"/>
          <text x={centroid.x} y={centroid.y + 4} textAnchor="middle" className="text-xs fill-white font-bold">
            {centroid.label}
          </text>
        </g>
      ))}
      
      {/* 坐标轴标签 */}
      <text x="200" y="290" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        特征1 (标准化后)
      </text>
      <text x="20" y="160" textAnchor="middle" transform="rotate(-90 20 160)" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        特征2 (标准化后)
      </text>
    </svg>
  )
}

// 回归预测vs实际
export const RegressionScatterChart: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  // 生成数据点（预测vs实际）
  const points = Array.from({length: 30}, (_, i) => {
    const actual = 50 + i * 5 + (Math.random() - 0.5) * 20
    const predicted = actual + (Math.random() - 0.5) * 15
    return { actual, predicted }
  })
  
  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto">
      <text x="200" y="25" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        预测值 vs 实际值 (R² = 0.85)
      </text>
      
      {/* 坐标轴 */}
      <line x1="50" y1="270" x2="350" y2="270" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="2"/>
      <line x1="50" y1="50" x2="50" y2="270" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="2"/>
      
      {/* 理想线（y=x）*/}
      <line x1="50" y1="270" x2="350" y2="50" stroke={isDark ? '#ef4444' : '#dc2626'} strokeWidth="2" strokeDasharray="5,5"/>
      
      {/* 数据点 */}
      {points.map((point, idx) => {
        const x = 50 + (point.actual - 50) * 2
        const y = 270 - (point.predicted - 50) * 2
        return (
          <circle 
            key={idx}
            cx={x} 
            cy={y} 
            r="4" 
            fill={isDark ? '#3b82f6' : '#2563eb'}
            opacity="0.7"
          />
        )
      })}
      
      {/* 坐标轴标签 */}
      <text x="200" y="295" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        实际值
      </text>
      <text x="20" y="160" textAnchor="middle" transform="rotate(-90 20 160)" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        预测值
      </text>
      
      {/* 图例 */}
      <line x1="260" y1="240" x2="290" y2="240" stroke={isDark ? '#ef4444' : '#dc2626'} strokeWidth="2" strokeDasharray="5,5"/>
      <text x="295" y="245" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>理想拟合</text>
    </svg>
  )
}

// 特征编码效果对比图
export const EncodingComparisonChart: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  const categories = ['北京', '上海', '深圳', '杭州', '成都']
  const targetRates = [0.35, 0.42, 0.28, 0.38, 0.25] // 转化率
  const counts = [1200, 800, 600, 400, 300] // 出现次数
  
  return (
    <svg viewBox="0 0 500 320" className="w-full h-auto">
      <text x="250" y="25" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        城市特征编码效果对比
      </text>
      
      {/* One-Hot编码展示 */}
      <text x="20" y="55" className={`text-xs font-bold ${isDark ? 'fill-purple-400' : 'fill-purple-600'}`}>
        One-Hot: 稀疏向量（维度=5）
      </text>
      <rect x="20" y="60" width="460" height="30" fill={isDark ? '#1f2937' : '#f3f4f6'} stroke={isDark ? '#4b5563' : '#d1d5db'}/>
      {categories.map((city, i) => (
        <g key={i}>
          <rect x={20 + i * 92} y="60" width={88} height="30" fill={i === 1 ? (isDark ? '#7c3aed' : '#a78bfa') : 'transparent'} stroke={isDark ? '#6b7280' : '#9ca3af'}/>
          <text x={64 + i * 92} y="80" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
            {i === 1 ? '1' : '0'}
          </text>
        </g>
      ))}
      
      {/* 目标编码展示 */}
      <text x="20" y="115" className={`text-xs font-bold ${isDark ? 'fill-indigo-400' : 'fill-indigo-600'}`}>
        目标编码: 转化率映射（维度=1）
      </text>
      {categories.map((city, i) => (
        <g key={i}>
          <rect 
            x={20 + i * 92} 
            y={120} 
            width={88} 
            height={targetRates[i] * 100} 
            fill={isDark ? '#6366f1' : '#818cf8'}
            opacity="0.8"
          />
          <text x={64 + i * 92} y={135 + targetRates[i] * 100} textAnchor="middle" className={`text-xs font-bold ${isDark ? 'fill-indigo-200' : 'fill-indigo-900'}`}>
            {targetRates[i].toFixed(2)}
          </text>
          <text x={64 + i * 92} y={175} textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
            {city}
          </text>
        </g>
      ))}
      
      {/* 频率编码展示 */}
      <text x="20" y="200" className={`text-xs font-bold ${isDark ? 'fill-teal-400' : 'fill-teal-600'}`}>
        频率编码: 出现次数（维度=1）
      </text>
      {categories.map((city, i) => (
        <g key={i}>
          <rect 
            x={20 + i * 92} 
            y={205} 
            width={88} 
            height={counts[i] / 20} 
            fill={isDark ? '#14b8a6' : '#5eead4'}
            opacity="0.8"
          />
          <text x={64 + i * 92} y={220 + counts[i] / 20} textAnchor="middle" className={`text-xs font-bold ${isDark ? 'fill-teal-200' : 'fill-teal-900'}`}>
            {counts[i]}
          </text>
        </g>
      ))}
      
      {/* 对比总结 */}
      <rect x="20" y="280" width="460" height="30" fill={isDark ? '#1e293b' : '#f1f5f9'} rx="5"/>
      <text x="250" y="300" textAnchor="middle" className={`text-xs font-semibold ${isDark ? 'fill-emerald-400' : 'fill-emerald-700'}`}>
        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 目标编码保留业务信息且降维，适合高基数类别特征（如城市/商品ID）
      </text>
    </svg>
  )
}

// 交叉特征效果示意图
export const CrossFeatureChart: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark'
  
  return (
    <svg viewBox="0 0 500 300" className="w-full h-auto">
      <text x="250" y="25" textAnchor="middle" className={`text-sm font-bold ${isDark ? 'fill-gray-200' : 'fill-gray-800'}`}>
        交叉特征捕捉非线性关系
      </text>
      
      {/* 原始特征无法区分 */}
      <text x="120" y="55" textAnchor="middle" className={`text-xs font-bold ${isDark ? 'fill-red-400' : 'fill-red-600'}`}>
        ❌ 单特征无法区分
      </text>
      <rect x="20" y="65" width="200" height="100" fill={isDark ? '#1f2937' : '#f9fafb'} stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      
      {/* 正样本 */}
      <circle cx="60" cy="100" r="6" fill={isDark ? '#3b82f6' : '#2563eb'}/>
      <circle cx="90" cy="130" r="6" fill={isDark ? '#3b82f6' : '#2563eb'}/>
      <circle cx="180" cy="90" r="6" fill={isDark ? '#3b82f6' : '#2563eb'}/>
      
      {/* 负样本 */}
      <circle cx="120" cy="100" r="6" fill={isDark ? '#ef4444' : '#dc2626'}/>
      <circle cx="150" cy="130" r="6" fill={isDark ? '#ef4444' : '#dc2626'}/>
      <circle cx="70" cy="140" r="6" fill={isDark ? '#ef4444' : '#dc2626'}/>
      
      {/* 坐标轴 */}
      <text x="110" y="180" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
        特征1: 年龄
      </text>
      <text x="10" y="115" textAnchor="middle" transform="rotate(-90 10 115)" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
        特征2: 收入
      </text>
      
      {/* 箭头 */}
      <text x="250" y="120" textAnchor="middle" className={`text-3xl ${isDark ? 'fill-emerald-400' : 'fill-emerald-600'}`}>
        →
      </text>
      
      {/* 交叉特征后可区分 */}
      <text x="380" y="55" textAnchor="middle" className={`text-xs font-bold ${isDark ? 'fill-emerald-400' : 'fill-emerald-600'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 交叉特征线性可分
      </text>
      <rect x="280" y="65" width="200" height="100" fill={isDark ? '#1f2937' : '#f9fafb'} stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="2"/>
      
      {/* 左下角正样本 */}
      <circle cx="310" cy="140" r="6" fill={isDark ? '#3b82f6' : '#2563eb'}/>
      <circle cx="330" cy="145" r="6" fill={isDark ? '#3b82f6' : '#2563eb'}/>
      <circle cx="320" cy="130" r="6" fill={isDark ? '#3b82f6' : '#2563eb'}/>
      
      {/* 右上角正样本 */}
      <circle cx="440" cy="80" r="6" fill={isDark ? '#3b82f6' : '#2563eb'}/>
      <circle cx="460" cy="90" r="6" fill={isDark ? '#3b82f6' : '#2563eb'}/>
      
      {/* 中间负样本 */}
      <circle cx="370" cy="110" r="6" fill={isDark ? '#ef4444' : '#dc2626'}/>
      <circle cx="390" cy="115" r="6" fill={isDark ? '#ef4444' : '#dc2626'}/>
      <circle cx="410" cy="120" r="6" fill={isDark ? '#ef4444' : '#dc2626'}/>
      
      {/* 分隔线 */}
      <line x1="340" y1="65" x2="420" y2="165" stroke={isDark ? '#10b981' : '#059669'} strokeWidth="2" strokeDasharray="5,5"/>
      
      {/* 坐标轴 */}
      <text x="370" y="180" textAnchor="middle" className={`text-xs ${isDark ? 'fill-gray-400' : 'fill-gray-600'}`}>
        交叉: 年龄×收入
      </text>
      
      {/* 说明文字 */}
      <rect x="20" y="200" width="460" height="80" fill={isDark ? '#1e293b' : '#f1f5f9'} rx="8"/>
      <text x="250" y="225" textAnchor="middle" className={`text-xs font-bold ${isDark ? 'fill-purple-400' : 'fill-purple-700'}`}>
        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 交叉特征的价值
      </text>
      <text x="30" y="245" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        • 场景：低收入年轻人 vs 高收入老年人 都是高转化用户，中间段转化低
      </text>
      <text x="30" y="262" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        • 原始特征：线性模型无法区分（需要二次项或交叉项）
      </text>
      <text x="30" y="279" className={`text-xs ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}>
        • 交叉后：age×income 能够线性区分两个群体
      </text>
    </svg>
  )
}

