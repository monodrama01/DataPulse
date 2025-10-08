"use client"
import React from 'react'
import { ChartType } from './ChartSelector'

interface ChartConfigPanelProps {
  chartType: ChartType
  columns: string[]
  numericColumns: string[]
  config: ChartConfig
  onConfigChange: (config: ChartConfig) => void
}

export interface ChartConfig {
  xAxis?: string
  yAxis?: string | string[]
  seriesField?: string
  valueField?: string
  categoryField?: string
  title?: string
  showLegend?: boolean
  showGrid?: boolean
  aggregation?: 'sum' | 'avg' | 'count' | 'min' | 'max'
  top?: number // for pie/funnel top N
  textField?: string // for wordcloud
  delimiter?: string // for wordcloud split
  stopwords?: string // for wordcloud
  radarIndicators?: string[] // for radar chart
}

export default function ChartConfigPanel({ chartType, columns, numericColumns, config, onConfigChange }: ChartConfigPanelProps) {
  const updateConfig = (key: keyof ChartConfig, value: any) => {
    onConfigChange({ ...config, [key]: value })
  }

  const renderConfigForType = () => {
    switch (chartType) {
      case 'line':
      case 'area':
        return (
          <>
            <ConfigField label="X轴字段" desc="通常是时间或类别">
              <select
                value={config.xAxis || ''}
                onChange={e => updateConfig('xAxis', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              >
                <option value="">选择X轴字段</option>
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
            <ConfigField label="Y轴字段" desc="可多选，按住Ctrl">
              <select
                multiple
                value={Array.isArray(config.yAxis) ? config.yAxis : config.yAxis ? [config.yAxis] : []}
                onChange={e => updateConfig('yAxis', Array.from(e.target.selectedOptions).map(o => o.value))}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 h-24"
              >
                {numericColumns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
            <ConfigField label="聚合方式" desc="如何聚合相同类别的数据">
              <select
                value={config.aggregation || 'sum'}
                onChange={e => updateConfig('aggregation', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              >
                <option value="sum">求和</option>
                <option value="avg">平均值</option>
                <option value="count">计数</option>
                <option value="min">最小值</option>
                <option value="max">最大值</option>
              </select>
            </ConfigField>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-sm text-blue-900 dark:text-blue-100">
              <div className="font-semibold mb-1">💡 提示：</div>
              <div className="text-xs text-blue-800 dark:text-blue-200">
                如果X轴类别有重复值，系统会自动按所选聚合方式合并数据。例如：3个"新制"类别的数据会根据聚合方式合并成1个点。
              </div>
            </div>
          </>
        )

      case 'bar':
      case 'horizontal-bar':
        return (
          <>
            <ConfigField label="类别字段（X轴）" desc="分组类别">
              <select
                value={config.xAxis || ''}
                onChange={e => updateConfig('xAxis', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              >
                <option value="">选择类别字段</option>
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
            <ConfigField label="数值字段（Y轴）" desc="可多选">
              <select
                multiple
                value={Array.isArray(config.yAxis) ? config.yAxis : config.yAxis ? [config.yAxis] : []}
                onChange={e => updateConfig('yAxis', Array.from(e.target.selectedOptions).map(o => o.value))}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 h-24"
              >
                {numericColumns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
            <ConfigField label="聚合方式" desc="如何聚合数据">
              <select
                value={config.aggregation || 'sum'}
                onChange={e => updateConfig('aggregation', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              >
                <option value="sum">求和</option>
                <option value="avg">平均值</option>
                <option value="count">计数</option>
                <option value="min">最小值</option>
                <option value="max">最大值</option>
              </select>
            </ConfigField>
          </>
        )

      case 'pie':
      case 'rose':
        return (
          <>
            <ConfigField label="类别字段" desc="饼图分类">
              <select
                value={config.categoryField || ''}
                onChange={e => updateConfig('categoryField', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              >
                <option value="">选择类别字段</option>
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
            <ConfigField label="数值字段" desc="饼图值">
              <select
                value={config.valueField || ''}
                onChange={e => updateConfig('valueField', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              >
                <option value="">选择数值字段</option>
                {numericColumns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
            <ConfigField label="显示前N项" desc="其余合并为其他">
              <input
                type="number"
                min="3"
                max="50"
                value={config.top || 10}
                onChange={e => updateConfig('top', Number(e.target.value))}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              />
            </ConfigField>
          </>
        )

      case 'scatter':
        return (
          <>
            <ConfigField label="X轴字段" desc="散点图X轴">
              <select
                value={config.xAxis || ''}
                onChange={e => updateConfig('xAxis', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              >
                <option value="">选择X轴字段</option>
                {numericColumns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
            <ConfigField label="Y轴字段" desc="散点图Y轴">
              <select
                value={typeof config.yAxis === 'string' ? config.yAxis : ''}
                onChange={e => updateConfig('yAxis', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              >
                <option value="">选择Y轴字段</option>
                {numericColumns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
            <ConfigField label="系列字段（可选）" desc="用于着色分类">
              <select
                value={config.seriesField || ''}
                onChange={e => updateConfig('seriesField', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              >
                <option value="">不分类</option>
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
          </>
        )

      case 'histogram':
        return (
          <>
            <ConfigField label="数值字段" desc="分析分布">
              <select
                value={typeof config.yAxis === 'string' ? config.yAxis : ''}
                onChange={e => updateConfig('yAxis', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              >
                <option value="">选择数值字段</option>
                {numericColumns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
          </>
        )

      case 'funnel':
        return (
          <>
            <ConfigField label="阶段字段" desc="漏斗各阶段">
              <select
                value={config.categoryField || ''}
                onChange={e => updateConfig('categoryField', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              >
                <option value="">选择阶段字段</option>
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
            <ConfigField label="数值字段" desc="各阶段值">
              <select
                value={config.valueField || ''}
                onChange={e => updateConfig('valueField', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              >
                <option value="">选择数值字段</option>
                {numericColumns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
          </>
        )

      case 'radar':
        return (
          <>
            <ConfigField label="维度字段" desc="雷达图各维度（多选）">
              <select
                multiple
                value={config.radarIndicators || []}
                onChange={e => updateConfig('radarIndicators', Array.from(e.target.selectedOptions).map(o => o.value))}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 h-32"
              >
                {numericColumns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
            <ConfigField label="分组字段（可选）" desc="多个主体对比">
              <select
                value={config.seriesField || ''}
                onChange={e => updateConfig('seriesField', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              >
                <option value="">不分组</option>
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
          </>
        )

      case 'wordcloud':
        return (
          <>
            <ConfigField label="文本字段" desc="包含文本的列">
              <select
                value={config.textField || ''}
                onChange={e => updateConfig('textField', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              >
                <option value="">选择文本字段</option>
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </ConfigField>
            <ConfigField label="分隔符" desc="如何拆分文本">
              <input
                type="text"
                value={config.delimiter || '[,，;；\\s|]+'}
                onChange={e => updateConfig('delimiter', e.target.value)}
                placeholder="正则表达式"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              />
            </ConfigField>
            <ConfigField label="停用词（可选）" desc="逗号分隔">
              <textarea
                value={config.stopwords || ''}
                onChange={e => updateConfig('stopwords', e.target.value)}
                placeholder="的,是,在,有,和,了"
                rows={3}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
              />
            </ConfigField>
          </>
        )

      default:
        return <div className="text-gray-500">请先选择图表类型</div>
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">图表配置</h3>
      </div>

      {/* 通用配置 */}
      <ConfigField label="图表标题" desc="可选">
        <input
          type="text"
          value={config.title || ''}
          onChange={e => updateConfig('title', e.target.value)}
          placeholder="输入图表标题"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700"
        />
      </ConfigField>

      {/* 特定图表配置 */}
      {renderConfigForType()}

      {/* 显示选项 */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.showLegend !== false}
            onChange={e => updateConfig('showLegend', e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">显示图例</span>
        </label>
        {['line', 'bar', 'scatter', 'area', 'horizontal-bar'].includes(chartType) && (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.showGrid !== false}
              onChange={e => updateConfig('showGrid', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">显示网格线</span>
          </label>
        )}
      </div>
    </div>
  )
}

function ConfigField({ label, desc, children }: { label: string, desc?: string, children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
        <span>{label}</span>
        {desc && <span className="text-xs text-gray-500 dark:text-gray-400">{desc}</span>}
      </label>
      {children}
    </div>
  )
}
