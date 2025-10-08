"use client"
import React, { useState, useMemo } from 'react'

interface DataCleanPanelProps {
  columns: string[]
  data: any[]
  onClean: (operations: CleanOperation[]) => void
}

export type CleanOperation = 
  | { type: 'remove_duplicates' }
  | { type: 'fill_missing', column: string, method: 'mean' | 'median' | 'mode' | 'drop' | 'forward' | 'backward' | 'custom', value?: string }
  | { type: 'remove_outliers', column: string, method: 'iqr' | 'zscore', threshold?: number }
  | { type: 'convert_type', column: string, targetType: 'number' | 'string' | 'date' }

export default function DataCleanPanel({ columns, data, onClean }: DataCleanPanelProps) {
  const [operations, setOperations] = useState<CleanOperation[]>([])
  const [showMissing, setShowMissing] = useState(false)
  const [showOutliers, setShowOutliers] = useState(false)
  const [showTypeConvert, setShowTypeConvert] = useState(false)

  // 计算数据质量报告
  const dataQualityReport = useMemo(() => {
    if (!data.length) return null

    // 1. 字段类型分析
    const fieldTypes: Record<string, { type: string, sample: any }> = {}
    columns.forEach(col => {
      const sample = data.slice(0, 100).map(row => row[col])
      const numericCount = sample.filter(val => !isNaN(Number(val)) && val !== null && val !== '').length
      const datePattern = /^\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4}/
      const dateCount = sample.filter(val => datePattern.test(String(val))).length
      
      let type = 'string'
      if (numericCount / sample.length > 0.8) type = 'number'
      else if (dateCount / sample.length > 0.5) type = 'date'
      
      fieldTypes[col] = { type, sample: sample[0] }
    })

    // 2. 缺失值统计
    const missingStats: Record<string, { count: number, ratio: number }> = {}
    columns.forEach(col => {
      const missingCount = data.filter(row => 
        row[col] === null || row[col] === undefined || row[col] === ''
      ).length
      missingStats[col] = {
        count: missingCount,
        ratio: missingCount / data.length
      }
    })

    // 3. 重复行统计
    const uniqueRows = new Set(data.map(row => JSON.stringify(row)))
    const duplicateCount = data.length - uniqueRows.size

    // 4. 数值型字段的describe统计
    const numericDescribe: Record<string, any> = {}
    columns.forEach(col => {
      if (fieldTypes[col].type === 'number') {
        const values = data.map(row => Number(row[col])).filter(v => !isNaN(v))
        if (values.length > 0) {
          values.sort((a, b) => a - b)
          const sum = values.reduce((a, b) => a + b, 0)
          const mean = sum / values.length
          const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length
          const std = Math.sqrt(variance)
          
          numericDescribe[col] = {
            count: values.length,
            mean: mean.toFixed(2),
            std: std.toFixed(2),
            min: values[0].toFixed(2),
            '25%': values[Math.floor(values.length * 0.25)].toFixed(2),
            '50%': values[Math.floor(values.length * 0.50)].toFixed(2),
            '75%': values[Math.floor(values.length * 0.75)].toFixed(2),
            max: values[values.length - 1].toFixed(2),
          }
        }
      }
    })

    // 5. 异常值检测（IQR方法）
    const outlierStats: Record<string, { count: number, values: number[] }> = {}
    columns.forEach(col => {
      if (fieldTypes[col].type === 'number') {
        const values = data.map(row => Number(row[col])).filter(v => !isNaN(v)).sort((a, b) => a - b)
        if (values.length > 0) {
          const q1 = values[Math.floor(values.length * 0.25)]
          const q3 = values[Math.floor(values.length * 0.75)]
          const iqr = q3 - q1
          const lowerBound = q1 - 1.5 * iqr
          const upperBound = q3 + 1.5 * iqr
          
          const outliers = values.filter(v => v < lowerBound || v > upperBound)
          outlierStats[col] = {
            count: outliers.length,
            values: outliers.slice(0, 5) // 只显示前5个
          }
        }
      }
    })

    return { fieldTypes, missingStats, duplicateCount, numericDescribe, outlierStats }
  }, [data, columns])

  const addMissingOperation = (column: string, method: any, value?: string) => {
    const op: CleanOperation = { type: 'fill_missing', column, method, value }
    setOperations(prev => [...prev, op])
  }

  const addOutlierOperation = (column: string, method: any, threshold?: number) => {
    const op: CleanOperation = { type: 'remove_outliers', column, method, threshold }
    setOperations(prev => [...prev, op])
  }

  const addTypeConversion = (column: string, targetType: any) => {
    const op: CleanOperation = { type: 'convert_type', column, targetType }
    setOperations(prev => [...prev, op])
  }

  const removeOperation = (index: number) => {
    setOperations(prev => prev.filter((_, i) => i !== index))
  }

  if (!dataQualityReport) return null

  return (
    <div className="space-y-6">
      {/* 数据质量概览 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">数据质量报告</h3>
        </div>

        {/* 总体统计 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">总行数</div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{data.length}</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
            <div className="text-sm text-green-600 dark:text-green-400 mb-1">总列数</div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{columns.length}</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
            <div className="text-sm text-orange-600 dark:text-orange-400 mb-1">重复行数</div>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {dataQualityReport.duplicateCount}
              <span className="text-sm font-normal ml-2">
                ({((dataQualityReport.duplicateCount / data.length) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>

        {/* 字段类型统计 */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
            <span className="mr-2">📋</span>
            字段类型
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">字段名</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">类型</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">示例值</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {columns.map(col => (
                  <tr key={col} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">{col}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        dataQualityReport.fieldTypes[col].type === 'number' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : dataQualityReport.fieldTypes[col].type === 'date'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        {dataQualityReport.fieldTypes[col].type}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400 truncate max-w-xs">
                      {String(dataQualityReport.fieldTypes[col].sample || '')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 缺失值统计 */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
            <span className="mr-2">❓</span>
            缺失值统计
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">字段名</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">缺失数量</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">缺失比例</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">可视化</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {columns.map(col => {
                  const missing = dataQualityReport.missingStats[col]
                  return (
                    <tr key={col} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">{col}</td>
                      <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{missing.count}</td>
                      <td className="px-4 py-2">
                        <span className={`font-medium ${
                          missing.ratio > 0.5 ? 'text-red-600 dark:text-red-400' :
                          missing.ratio > 0.1 ? 'text-orange-600 dark:text-orange-400' :
                          'text-green-600 dark:text-green-400'
                        }`}>
                          {(missing.ratio * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              missing.ratio > 0.5 ? 'bg-red-500' :
                              missing.ratio > 0.1 ? 'bg-orange-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(missing.ratio * 100, 100)}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 数值型字段统计描述 */}
        {Object.keys(dataQualityReport.numericDescribe).length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
              <span className="mr-2">📊</span>
              数值字段统计 (describe)
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">字段</th>
                    <th className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-gray-100">count</th>
                    <th className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-gray-100">mean</th>
                    <th className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-gray-100">std</th>
                    <th className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-gray-100">min</th>
                    <th className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-gray-100">25%</th>
                    <th className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-gray-100">50%</th>
                    <th className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-gray-100">75%</th>
                    <th className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-gray-100">max</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {Object.entries(dataQualityReport.numericDescribe).map(([col, stats]: [string, any]) => (
                    <tr key={col} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">{col}</td>
                      <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-100">{stats.count}</td>
                      <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-100">{stats.mean}</td>
                      <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-100">{stats.std}</td>
                      <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-100">{stats.min}</td>
                      <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-100">{stats['25%']}</td>
                      <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-100">{stats['50%']}</td>
                      <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-100">{stats['75%']}</td>
                      <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-100">{stats.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 异常值检测 */}
        {Object.keys(dataQualityReport.outlierStats).length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
              <span className="mr-2">⚠️</span>
              异常值检测 (IQR方法)
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">字段名</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">异常值数量</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">异常值示例</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {Object.entries(dataQualityReport.outlierStats).map(([col, stats]: [string, any]) => (
                    <tr key={col} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">{col}</td>
                      <td className="px-4 py-2">
                        <span className={`font-medium ${
                          stats.count > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'
                        }`}>
                          {stats.count}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                        {stats.count > 0 ? stats.values.join(', ') : '无异常值'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 数据清洗操作 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">数据清洗操作</h3>
          </div>
          <button
            onClick={() => onClean(operations)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            disabled={operations.length === 0}
          >
            执行清洗 ({operations.length})
          </button>
        </div>

        {/* 快速操作 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => setOperations(prev => [...prev, { type: 'remove_duplicates' }])}
            className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
            disabled={dataQualityReport.duplicateCount === 0}
          >
            <div className="text-2xl mb-1">🔄</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">删除重复行</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">发现 {dataQualityReport.duplicateCount} 行</div>
          </button>

          <button
            onClick={() => setShowMissing(!showMissing)}
            className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
          >
            <div className="text-2xl mb-1">❓</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">处理缺失值</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {columns.filter(col => dataQualityReport.missingStats[col].count > 0).length} 列有缺失
            </div>
          </button>

          <button
            onClick={() => setShowOutliers(!showOutliers)}
            className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all"
          >
            <div className="text-2xl mb-1">📊</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">处理异常值</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {Object.values(dataQualityReport.outlierStats).filter((s: any) => s.count > 0).length} 列有异常
            </div>
          </button>

          <button
            onClick={() => setShowTypeConvert(!showTypeConvert)}
            className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
          >
            <div className="text-2xl mb-1">🔀</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">类型转换</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{columns.length} 列可转换</div>
          </button>
        </div>

        {/* 缺失值处理面板 */}
        {showMissing && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 space-y-3">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">处理缺失值</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" id="missing-column">
                <option value="">选择列</option>
                {columns.filter(col => dataQualityReport.missingStats[col].count > 0).map(c => (
                  <option key={c} value={c}>
                    {c} ({dataQualityReport.missingStats[c].count} 缺失)
                  </option>
                ))}
              </select>
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" id="missing-method">
                <option value="drop">删除行</option>
                <option value="mean">填充均值</option>
                <option value="median">填充中位数</option>
                <option value="mode">填充众数</option>
                <option value="forward">向前填充</option>
                <option value="backward">向后填充</option>
                <option value="custom">自定义值</option>
              </select>
            </div>
            <button
              onClick={() => {
                const col = (document.getElementById('missing-column') as HTMLSelectElement)?.value
                const method = (document.getElementById('missing-method') as HTMLSelectElement)?.value
                if (col && method) addMissingOperation(col, method as any)
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              添加操作
            </button>
          </div>
        )}

        {/* 异常值处理面板 */}
        {showOutliers && (
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700 space-y-3">
            <h4 className="font-semibold text-orange-900 dark:text-orange-100">处理异常值</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" id="outlier-column">
                <option value="">选择列</option>
                {Object.entries(dataQualityReport.outlierStats)
                  .filter(([_, stats]: [string, any]) => stats.count > 0)
                  .map(([col, stats]: [string, any]) => (
                    <option key={col} value={col}>
                      {col} ({stats.count} 异常值)
                    </option>
                  ))}
              </select>
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" id="outlier-method">
                <option value="iqr">IQR方法（四分位距）</option>
                <option value="zscore">Z-Score方法</option>
              </select>
            </div>
            <button
              onClick={() => {
                const col = (document.getElementById('outlier-column') as HTMLSelectElement)?.value
                const method = (document.getElementById('outlier-method') as HTMLSelectElement)?.value
                if (col && method) addOutlierOperation(col, method as any)
              }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
            >
              添加操作
            </button>
          </div>
        )}

        {/* 类型转换面板 */}
        {showTypeConvert && (
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700 space-y-3">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100">字段类型转换</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" id="convert-column">
                <option value="">选择列</option>
                {columns.map(c => (
                  <option key={c} value={c}>
                    {c} (当前: {dataQualityReport.fieldTypes[c].type})
                  </option>
                ))}
              </select>
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" id="convert-type">
                <option value="number">数值型</option>
                <option value="string">文本型</option>
                <option value="date">日期型</option>
              </select>
            </div>
            <button
              onClick={() => {
                const col = (document.getElementById('convert-column') as HTMLSelectElement)?.value
                const type = (document.getElementById('convert-type') as HTMLSelectElement)?.value
                if (col && type) addTypeConversion(col, type as any)
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              添加操作
            </button>
          </div>
        )}

        {/* 操作列表 */}
        {operations.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">待执行操作</h4>
            {operations.map((op, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  {op.type === 'remove_duplicates' && '删除重复行'}
                  {op.type === 'fill_missing' && `填充 ${op.column} 的缺失值 (${op.method})`}
                  {op.type === 'remove_outliers' && `移除 ${op.column} 的异常值 (${op.method})`}
                  {op.type === 'convert_type' && `转换 ${op.column} 为 ${op.targetType}`}
                </span>
                <button
                  onClick={() => removeOperation(index)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}