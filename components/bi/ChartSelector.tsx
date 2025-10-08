"use client"
import React from 'react'

export type ChartType = 
  | 'line' | 'bar' | 'pie' | 'scatter' | 'area' 
  | 'histogram' | 'horizontal-bar' | 'rose' | 'funnel' | 'radar'
  | 'wordcloud'

const CHART_TYPES = [
  { type: 'line', name: '折线图', icon: '📈', desc: '展示趋势变化' },
  { type: 'bar', name: '柱状图', icon: '📊', desc: '对比数值大小' },
  { type: 'horizontal-bar', name: '条形图', icon: '📊', desc: '横向对比数值' },
  { type: 'pie', name: '饼图', icon: '🥧', desc: '展示占比分布' },
  { type: 'rose', name: '玫瑰图', icon: '🌹', desc: '极坐标饼图' },
  { type: 'scatter', name: '散点图', icon: '🔵', desc: '展示相关性' },
  { type: 'area', name: '面积图', icon: '📉', desc: '堆叠面积展示' },
  { type: 'histogram', name: '直方图', icon: '📊', desc: '数值分布频率' },
  { type: 'funnel', name: '漏斗图', icon: '🔻', desc: '流程转化率' },
  { type: 'radar', name: '雷达图', icon: '🎯', desc: '多维度对比' },
  { type: 'wordcloud', name: '词云图', icon: '☁️', desc: '文本关键词' },
] as const

interface ChartSelectorProps {
  onSelect: (type: ChartType) => void
  selectedType?: ChartType
}

export default function ChartSelector({ onSelect, selectedType }: ChartSelectorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">选择图表类型</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {CHART_TYPES.map(chart => (
          <button
            key={chart.type}
            onClick={() => onSelect(chart.type as ChartType)}
            className={`
              group relative p-4 rounded-lg border-2 transition-all duration-200
              ${selectedType === chart.type 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg' 
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }
            `}
          >
            <div className="text-3xl mb-2">{chart.icon}</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {chart.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {chart.desc}
            </div>
            {selectedType === chart.type && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
