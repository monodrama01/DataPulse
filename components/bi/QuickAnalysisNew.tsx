"use client"
import React, { useState, useMemo } from 'react'
import * as XLSX from 'xlsx'
import ChartSelector, { ChartType } from './ChartSelector'
import DataCleanPanel, { CleanOperation } from './DataCleanPanel'
import FieldOperationPanel, { FieldOperation } from './FieldOperationPanel'
import ChartConfigPanel, { ChartConfig } from './ChartConfigPanel'
import ChartRenderer from './ChartRenderer'

export default function QuickAnalysisNew() {
  const [file, setFile] = useState<File | null>(null)
  const [rawData, setRawData] = useState<any[]>([])
  const [processedData, setProcessedData] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [originalColumns, setOriginalColumns] = useState<string[]>([])
  const [selectedChartType, setSelectedChartType] = useState<ChartType | null>(null)
  const [chartConfig, setChartConfig] = useState<ChartConfig>({})
  const [charts, setCharts] = useState<Array<{ id: string, type: ChartType, config: ChartConfig }>>([])
  const [activeTab, setActiveTab] = useState<'upload' | 'clean' | 'transform' | 'chart'>('upload')
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [keywordResult, setKeywordResult] = useState<Array<{word: string, count: number}> | null>(null)

  // 计算数值列和文本列
  const { numericColumns, stringColumns } = useMemo(() => {
    if (processedData.length === 0 || columns.length === 0) {
      return { numericColumns: [], stringColumns: [] }
    }

    const numeric: string[] = []
    const text: string[] = []

    columns.forEach(col => {
      const sample = processedData.slice(0, 100).map(row => row[col])
      const numericCount = sample.filter(val => !isNaN(Number(val)) && val !== null && val !== '').length
      
      if (numericCount / sample.length > 0.8) {
        numeric.push(col)
      } else {
        text.push(col)
      }
    })

    return { numericColumns: numeric, stringColumns: text }
  }, [processedData, columns])

  // 处理文件上传
  const handleFileUpload = async (uploadedFile: File) => {
    if (!uploadedFile) return
    
    setIsLoading(true)
    setFile(uploadedFile)
    
    try {
      const arrayBuffer = await uploadedFile.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer)
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(firstSheet)

      if (jsonData.length > 0) {
        const cols = Object.keys(jsonData[0] as any)
        setColumns(cols)
        setOriginalColumns(cols) // 保存原始列名
        setRawData(jsonData)
        setProcessedData(jsonData)
        setActiveTab('clean')
      } else {
        alert('文件中没有数据')
      }
    } catch (error) {
      console.error('文件读取错误:', error)
      alert('文件读取失败，请确保文件格式正确（支持 .csv, .xlsx）')
    } finally {
      setIsLoading(false)
    }
  }

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      console.log('选择的文件:', selectedFile.name)
      handleFileUpload(selectedFile)
    }
  }

  // 处理拖放
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer?.files?.[0]
    if (droppedFile) {
      console.log('拖放的文件:', droppedFile.name)
      handleFileUpload(droppedFile)
    }
  }

  // 执行数据清洗
  const handleDataClean = (operations: CleanOperation[]) => {
    let cleaned = [...processedData]

    operations.forEach(op => {
      switch (op.type) {
        case 'remove_duplicates':
          const seen = new Set()
          cleaned = cleaned.filter(row => {
            const key = JSON.stringify(row)
            if (seen.has(key)) return false
            seen.add(key)
            return true
          })
          break

        case 'fill_missing':
          cleaned = cleaned.map(row => {
            const newRow = { ...row }
            if (row[op.column] === null || row[op.column] === undefined || row[op.column] === '') {
              switch (op.method) {
                case 'mean':
                  const values = cleaned.map(r => Number(r[op.column])).filter(v => !isNaN(v))
                  newRow[op.column] = values.reduce((a, b) => a + b, 0) / values.length
                  break
                case 'median':
                  const sorted = cleaned.map(r => Number(r[op.column])).filter(v => !isNaN(v)).sort((a, b) => a - b)
                  newRow[op.column] = sorted[Math.floor(sorted.length / 2)]
                  break
                case 'custom':
                  newRow[op.column] = op.value || 0
                  break
                case 'drop':
                  return null
              }
            }
            return newRow
          }).filter(Boolean) as any[]
          break

        case 'remove_outliers':
          if (op.method === 'iqr') {
            const values = cleaned.map(r => Number(r[op.column])).filter(v => !isNaN(v)).sort((a, b) => a - b)
            const q1 = values[Math.floor(values.length * 0.25)]
            const q3 = values[Math.floor(values.length * 0.75)]
            const iqr = q3 - q1
            const lower = q1 - 1.5 * iqr
            const upper = q3 + 1.5 * iqr
            cleaned = cleaned.filter(row => {
              const val = Number(row[op.column])
              return val >= lower && val <= upper
            })
          }
          break

        case 'convert_type':
          cleaned = cleaned.map(row => {
            const newRow = { ...row }
            switch (op.targetType) {
              case 'number':
                newRow[op.column] = Number(row[op.column]) || 0
                break
              case 'string':
                newRow[op.column] = String(row[op.column])
                break
              case 'date':
                newRow[op.column] = new Date(row[op.column]).toISOString()
                break
            }
            return newRow
          })
          break
      }
    })

    setProcessedData(cleaned)
    alert(`数据清洗完成！剩余 ${cleaned.length} 行数据`)
  }

  // 执行字段操作
  const handleFieldOperation = (operation: FieldOperation) => {
    let transformed = [...processedData]

    switch (operation.type) {
      case 'split_column':
        transformed = transformed.map(row => {
          const value = String(row[operation.column] || '')
          const newRow = { ...row }
          
          if (operation.direction === 'left') {
            // 保留左边（第一个分隔符之前）
            const firstIndex = value.indexOf(operation.delimiter)
            newRow[operation.newColumns[0]] = firstIndex !== -1 ? value.substring(0, firstIndex) : value
          } else if (operation.direction === 'right') {
            // 保留右边（第一个分隔符之后）
            const firstIndex = value.indexOf(operation.delimiter)
            newRow[operation.newColumns[0]] = firstIndex !== -1 ? value.substring(firstIndex + operation.delimiter.length) : ''
          } else {
            // 全部分割（默认）
            const parts = value.split(operation.delimiter)
            operation.newColumns.forEach((newCol, i) => {
              newRow[newCol] = parts[i] || ''
            })
          }
          
          return newRow
        })
        setColumns(prev => [...prev, ...operation.newColumns])
        break

      case 'split_in_row':
        const expanded: any[] = []
        transformed.forEach(row => {
          const value = String(row[operation.column] || '')
          const parts = value.split(operation.delimiter)
          parts.forEach(part => {
            expanded.push({ ...row, [operation.column]: part.trim() })
          })
        })
        transformed = expanded
        break

      case 'extract_keywords':
        const wordCount: Record<string, number> = {}
        transformed.forEach(row => {
          const text = String(row[operation.column] || '')
          const words = text.split(/[\s,，;；、/]+/).filter(w => {
            const trimmed = w.trim()
            if (trimmed.length < (operation.minLength || 1)) return false
            if (operation.stopwords?.includes(trimmed)) return false
            return true
          })
          words.forEach(word => {
            const trimmed = word.trim()
            if (trimmed) {
              wordCount[trimmed] = (wordCount[trimmed] || 0) + 1
            }
          })
        })
        // 转换为数组并排序
        const sortedKeywords = Object.entries(wordCount)
          .map(([word, count]) => ({ word, count }))
          .sort((a, b) => b.count - a.count)
        
        console.log('关键词统计:', sortedKeywords)
        setKeywordResult(sortedKeywords)
        alert(`关键词提取完成！共找到 ${sortedKeywords.length} 个关键词`)
        break

      case 'delete_columns':
        // 删除指定的列
        transformed = transformed.map(row => {
          const newRow = { ...row }
          operation.columns.forEach(col => {
            delete newRow[col]
          })
          return newRow
        })
        // 更新列名列表
        setColumns(prev => prev.filter(col => !operation.columns.includes(col)))
        alert(`已删除 ${operation.columns.length} 列`)
        break
    }

    setProcessedData(transformed)
  }

  // 创建图表
  const handleCreateChart = () => {
    if (!selectedChartType) {
      alert('请先选择图表类型')
      return
    }

    const newChart = {
      id: Date.now().toString(),
      type: selectedChartType,
      config: { ...chartConfig }
    }

    setCharts(prev => [...prev, newChart])
    setChartConfig({})
    alert('图表创建成功！')
  }

  // 删除图表
  const handleDeleteChart = (id: string) => {
    setCharts(prev => prev.filter(c => c.id !== id))
  }

  // 重置到原始数据
  const handleResetData = () => {
    if (confirm('确定要重置到原始数据吗？所有清洗和转换操作都将丢失。')) {
      setProcessedData([...rawData])
      setColumns([...originalColumns]) // 同时重置列名
      alert('已重置到原始数据')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section - 参考旧页面设计 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-12 h-12 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h1 className="text-4xl md:text-5xl font-bold">快捷分析</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 opacity-90">智能数据分析平台</p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            上传CSV或Excel文件，快速完成数据清洗、字段操作、可视化分析
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">文件上传</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">支持CSV、Excel格式</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">数据清洗</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">缺失值、异常值处理</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">字段操作</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">分列、拆分、关键词</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">图表生成</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">11种专业图表类型</p>
          </div>
        </div>

        {/* 标签页导航 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 flex gap-2 mb-6">
          {[
            { key: 'upload', label: '📁 上传数据', icon: '📁' },
            { key: 'clean', label: '🧹 数据清洗', icon: '🧹', disabled: !rawData.length },
            { key: 'transform', label: '🔧 字段操作', icon: '🔧', disabled: !processedData.length },
            { key: 'chart', label: '📊 图表创建', icon: '📊', disabled: !processedData.length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              disabled={tab.disabled}
              className={`
                flex-1 py-3 px-4 rounded-lg font-medium transition-all
                ${activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : tab.disabled
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 上传数据面板 */}
        {activeTab === 'upload' && (
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-dashed transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                ) : (
                  <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                )}
              </div>
              <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                {isLoading ? '正在读取文件...' : '上传数据文件'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                {isLoading ? '请稍候...' : '支持 CSV、Excel (.xlsx) 格式'}
              </p>
              {!isLoading && (
                <div className="relative inline-block">
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-xl">
                    选择文件或拖拽到此处
                  </button>
                </div>
              )}
              {file && (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700 inline-block">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-green-700 dark:text-green-300 font-medium text-lg">{file.name}</span>
                    <span className="text-green-600 dark:text-green-400">({processedData.length} 行)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 数据预览 */}
        {processedData.length > 0 && activeTab !== 'upload' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">数据预览</h3>
                {(processedData.length !== rawData.length || columns.length !== originalColumns.length) && (
                  <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                    ⚠️ 数据已被修改
                    {processedData.length !== rawData.length && ` (行数: ${rawData.length} → ${processedData.length})`}
                    {columns.length !== originalColumns.length && ` (列数: ${originalColumns.length} → ${columns.length})`}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2 text-sm">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
                    {processedData.length} 行
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-medium">
                    {columns.length} 列
                  </span>
                </div>
                {(processedData.length !== rawData.length || columns.length !== originalColumns.length) && (
                  <button
                    onClick={handleResetData}
                    className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
                    title="重置到原始数据和列结构"
                  >
                    🔄 重置
                  </button>
                )}
              </div>
            </div>
            <div className="overflow-x-auto max-h-64">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
                  <tr>
                    {columns.map(col => (
                      <th key={col} className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {processedData.slice(0, 10).map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      {columns.map(col => (
                        <td key={col} className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                          {String(row[col] || '')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 数据清洗面板 */}
        {activeTab === 'clean' && processedData.length > 0 && (
          <>
            {/* 原始数据安全提示 */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                    ✅ 原始数据受保护
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    所有清洗操作只会修改副本数据，原始数据 ({rawData.length} 行) 始终保持不变。
                    如需恢复，点击上方的"🔄 重置"按钮即可。
                  </p>
                </div>
              </div>
            </div>
            <DataCleanPanel columns={columns} data={processedData} onClean={handleDataClean} />
          </>
        )}

        {/* 字段操作面板 */}
        {activeTab === 'transform' && processedData.length > 0 && (
          <>
            <FieldOperationPanel columns={columns} data={processedData} onOperation={handleFieldOperation} />
            
            {/* 关键词提取结果 */}
            {keywordResult && keywordResult.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">关键词提取结果</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full font-medium">
                      共 {keywordResult.length} 个关键词
                    </span>
                    <button
                      onClick={() => setKeywordResult(null)}
                      className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                    >
                      关闭
                    </button>
                  </div>
                </div>

                {/* 前20个关键词大卡片展示 */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">🔥 Top 20 高频关键词</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {keywordResult.slice(0, 20).map((item, index) => (
                      <div
                        key={item.word}
                        className="relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-200 dark:border-purple-700 rounded-lg p-4 hover:shadow-lg transition-all"
                      >
                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 truncate" title={item.word}>
                            {item.word}
                          </div>
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {item.count}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">次</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 完整列表 */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">📋 完整关键词列表</h4>
                  <div className="overflow-x-auto max-h-96">
                    <table className="min-w-full text-sm">
                      <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">排名</th>
                          <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">关键词</th>
                          <th className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-gray-100">出现次数</th>
                          <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-100">频率条</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {keywordResult.map((item, index) => {
                          const maxCount = keywordResult[0].count
                          const percentage = (item.count / maxCount) * 100
                          return (
                            <tr key={item.word} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                              <td className="px-4 py-2 text-gray-900 dark:text-gray-100 font-medium">#{index + 1}</td>
                              <td className="px-4 py-2 text-gray-900 dark:text-gray-100 font-medium">{item.word}</td>
                              <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-100 font-bold">{item.count}</td>
                              <td className="px-4 py-2">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                    <div
                                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 w-12 text-right">
                                    {percentage.toFixed(0)}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* 图表创建面板 */}
        {activeTab === 'chart' && processedData.length > 0 && (
          <div className="space-y-6">
            <ChartSelector onSelect={setSelectedChartType} selectedType={selectedChartType || undefined} />
            
            {selectedChartType && (
              <>
                <ChartConfigPanel
                  chartType={selectedChartType}
                  columns={columns}
                  numericColumns={numericColumns}
                  config={chartConfig}
                  onConfigChange={setChartConfig}
                />
                
                <div className="flex justify-center">
                  <button
                    onClick={handleCreateChart}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-xl"
                  >
                    ✨ 创建图表
                  </button>
                </div>
              </>
            )}

            {/* 已创建的图表 */}
            {charts.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">已创建图表</h2>
                  <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full font-medium">
                    共 {charts.length} 个
                  </span>
                </div>
                
                {charts.map(chart => (
                  <div key={chart.id} className="relative">
                    <button
                      onClick={() => handleDeleteChart(chart.id)}
                      className="absolute top-4 right-4 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      title="删除图表"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <ChartRenderer chartType={chart.type} config={chart.config} data={processedData} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}