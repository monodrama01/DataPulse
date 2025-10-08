"use client"
import React, { useState } from 'react'

interface FieldOperationPanelProps {
  columns: string[]
  data: any[]
  onOperation: (operation: FieldOperation) => void
}

export type FieldOperation = 
  | { type: 'split_column', column: string, delimiter: string, newColumns: string[], direction?: 'left' | 'right' | 'all' }
  | { type: 'split_in_row', column: string, delimiter: string }
  | { type: 'extract_keywords', column: string, stopwords?: string[], minLength?: number }
  | { type: 'delete_columns', columns: string[] }

export default function FieldOperationPanel({ columns, data, onOperation }: FieldOperationPanelProps) {
  const [showSplit, setShowSplit] = useState(false)
  const [showRowSplit, setShowRowSplit] = useState(false)
  const [showKeywords, setShowKeywords] = useState(false)
  const [showDeleteColumns, setShowDeleteColumns] = useState(false)
  const [maxSplitCount, setMaxSplitCount] = useState<number>(0)
  const [selectedSplitColumn, setSelectedSplitColumn] = useState<string>('')
  const [splitDelimiter, setSplitDelimiter] = useState<string>('/')
  const [columnsToDelete, setColumnsToDelete] = useState<Set<string>>(new Set())

  // 分析最大分割列数
  const analyzeSplitCount = (column: string, delimiter: string) => {
    if (!column || !delimiter || !data.length) {
      setMaxSplitCount(0)
      return
    }
    
    let maxCount = 0
    data.forEach(row => {
      const value = String(row[column] || '')
      const parts = value.split(delimiter)
      maxCount = Math.max(maxCount, parts.length)
    })
    
    setMaxSplitCount(maxCount)
  }

  // 当选择列或分隔符改变时，重新分析
  const handleColumnOrDelimiterChange = (column?: string, delimiter?: string) => {
    const col = column || selectedSplitColumn
    const delim = delimiter || splitDelimiter
    
    if (column !== undefined) setSelectedSplitColumn(column)
    if (delimiter !== undefined) setSplitDelimiter(delimiter)
    
    analyzeSplitCount(col, delim)
  }

  const handleSplitColumn = () => {
    const col = selectedSplitColumn
    const delim = splitDelimiter
    const newCols = (document.getElementById('split-new-columns') as HTMLInputElement)?.value
    const direction = (document.getElementById('split-direction') as HTMLSelectElement)?.value as 'left' | 'right' | 'all' || 'all'
    
    if (!col) {
      alert('请选择要拆分的列')
      return
    }
    
    if (!newCols || !newCols.trim()) {
      alert('请输入新列名')
      return
    }
    
    // 分割列名，支持中英文逗号和分号
    const columnNames = newCols.split(/[,，;；]/).map(c => c.trim()).filter(c => c)
    
    if (columnNames.length === 0) {
      alert('请输入有效的列名')
      return
    }
    
    if (direction === 'all' && columnNames.length < maxSplitCount) {
      if (!confirm(`检测到数据最多可分成 ${maxSplitCount} 列，但您只提供了 ${columnNames.length} 个列名。\n缺少的列将被忽略。是否继续？`)) {
        return
      }
    }
    
    onOperation({
      type: 'split_column',
      column: col,
      delimiter: delim,
      newColumns: columnNames,
      direction
    })
    
    // 清空输入
    setSelectedSplitColumn('')
    setSplitDelimiter('/')
    setMaxSplitCount(0)
    const input = document.getElementById('split-new-columns') as HTMLInputElement
    if (input) input.value = ''
  }

  const handleRowSplit = () => {
    const col = (document.getElementById('row-split-column') as HTMLSelectElement)?.value
    const delim = (document.getElementById('row-split-delimiter') as HTMLInputElement)?.value || ','
    if (col) {
      onOperation({
        type: 'split_in_row',
        column: col,
        delimiter: delim
      })
    }
  }

  const handleExtractKeywords = () => {
    const col = (document.getElementById('keyword-column') as HTMLSelectElement)?.value
    const stopwords = (document.getElementById('keyword-stopwords') as HTMLTextAreaElement)?.value
    const minLen = (document.getElementById('keyword-minlen') as HTMLInputElement)?.value
    if (col) {
      onOperation({
        type: 'extract_keywords',
        column: col,
        stopwords: stopwords ? stopwords.split(/[,，\n]/).map(w => w.trim()).filter(Boolean) : undefined,
        minLength: minLen ? Number(minLen) : undefined
      })
    }
  }

  const handleDeleteColumns = () => {
    if (columnsToDelete.size === 0) {
      alert('请至少选择一列要删除')
      return
    }
    
    if (columnsToDelete.size === columns.length) {
      alert('不能删除所有列！')
      return
    }
    
    const confirmMsg = `确定要删除以下 ${columnsToDelete.size} 列吗？\n${Array.from(columnsToDelete).join(', ')}`
    if (confirm(confirmMsg)) {
      onOperation({
        type: 'delete_columns',
        columns: Array.from(columnsToDelete)
      })
      setColumnsToDelete(new Set())
      setShowDeleteColumns(false)
    }
  }

  const toggleColumnSelection = (column: string) => {
    const newSet = new Set(columnsToDelete)
    if (newSet.has(column)) {
      newSet.delete(column)
    } else {
      newSet.add(column)
    }
    setColumnsToDelete(newSet)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">字段操作</h3>
      </div>

      {/* 快速操作按钮 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={() => setShowSplit(!showSplit)}
          className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
        >
          <div className="text-2xl mb-1">✂️</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">分列</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">拆分为多列</div>
        </button>

        <button
          onClick={() => setShowRowSplit(!showRowSplit)}
          className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
        >
          <div className="text-2xl mb-1">📑</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">行内拆分</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">拆分为多行</div>
        </button>

        <button
          onClick={() => setShowKeywords(!showKeywords)}
          className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
        >
          <div className="text-2xl mb-1">🔑</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">提取关键词</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">词频统计</div>
        </button>

        <button
          onClick={() => setShowDeleteColumns(!showDeleteColumns)}
          className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <div className="text-2xl mb-1">🗑️</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">删除列</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">移除不需要的列</div>
        </button>
      </div>

      {/* 分列面板 */}
      {showSplit && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 space-y-3">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100">分列 - 将一列拆分为多列</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">选择列</label>
              <select 
                value={selectedSplitColumn}
                onChange={(e) => handleColumnOrDelimiterChange(e.target.value, undefined)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">选择要拆分的列</option>
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">分隔符</label>
                <input
                  type="text"
                  value={splitDelimiter}
                  onChange={(e) => handleColumnOrDelimiterChange(undefined, e.target.value)}
                  placeholder="例如: , 或 | 或 /"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">分割方向</label>
                <select id="split-direction" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="all">全部分割</option>
                  <option value="left">保留左边（第一个分隔符前）</option>
                  <option value="right">保留右边（第一个分隔符后）</option>
                </select>
              </div>
            </div>
            
            {/* 智能提示：最大分割列数 */}
            {maxSplitCount > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-green-800 dark:text-green-200">
                    <span className="font-semibold">检测结果：</span>
                    该列使用分隔符 "<span className="font-mono bg-green-100 dark:bg-green-800 px-1 rounded">{splitDelimiter}</span>" 最多可分成 
                    <span className="font-bold text-lg mx-1">{maxSplitCount}</span> 列
                  </div>
                </div>
                <div className="text-xs text-green-700 dark:text-green-300 mt-1 ml-7">
                  建议输入 {maxSplitCount} 个列名（用逗号分隔）
                </div>
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
                新列名（用逗号、分号分隔）
                {maxSplitCount > 0 && (
                  <span className="text-xs text-blue-600 dark:text-blue-400 ml-2">
                    * 建议输入 {maxSplitCount} 个列名
                  </span>
                )}
              </label>
              <input
                id="split-new-columns"
                type="text"
                placeholder={maxSplitCount > 0 ? `例如: 列1, 列2, 列3 ... (共${maxSplitCount}个)` : "例如: 列1, 列2, 列3"}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                支持用逗号(,)、中文逗号(，)、分号(;)或中文分号(；)分隔
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-800 rounded p-3 text-sm text-blue-900 dark:text-blue-100">
              <div className="font-semibold mb-1">💡 分割示例（"张三/李四/王五"，分隔符 "/"）：</div>
              <ul className="space-y-1 ml-4 list-disc">
                <li><strong>全部分割</strong>：拆分为 "张三", "李四", "王五" 三列 → 输入3个列名</li>
                <li><strong>保留左边</strong>：只保留 "张三" 一列 → 输入1个列名</li>
                <li><strong>保留右边</strong>：保留 "李四/王五" 一列 → 输入1个列名</li>
              </ul>
            </div>
          </div>
          <button
            onClick={handleSplitColumn}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!selectedSplitColumn || !splitDelimiter}
          >
            执行分列
          </button>
        </div>
      )}

      {/* 行内拆分面板 */}
      {showRowSplit && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700 space-y-3">
          <h4 className="font-semibold text-green-900 dark:text-green-100">行内拆分 - 将一行拆分为多行</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">选择列</label>
              <select id="row-split-column" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <option value="">选择要拆分的列</option>
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">分隔符</label>
              <input
                id="row-split-delimiter"
                type="text"
                defaultValue=","
                placeholder="例如: , 或 | 或 ;"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              示例：如果某行的值为 "A,B,C"，拆分后会变成3行，分别为 "A", "B", "C"
            </div>
          </div>
          <button
            onClick={handleRowSplit}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            执行拆分
          </button>
        </div>
      )}

      {/* 关键词提取面板 */}
      {showKeywords && (
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700 space-y-3">
          <h4 className="font-semibold text-purple-900 dark:text-purple-100">提取关键词 - 统计词频</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">选择文本列</label>
              <select id="keyword-column" className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <option value="">选择包含文本的列</option>
                {columns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">停用词（可选，逗号或换行分隔）</label>
              <textarea
                id="keyword-stopwords"
                placeholder="例如: 的,是,在,有,和,了"
                rows={3}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">最小词长</label>
              <input
                id="keyword-minlen"
                type="number"
                min="1"
                defaultValue="1"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <button
            onClick={handleExtractKeywords}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            提取关键词
          </button>
        </div>
      )}

      {/* 删除列面板 */}
      {showDeleteColumns && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700 space-y-3">
          <h4 className="font-semibold text-red-900 dark:text-red-100">删除列 - 移除不需要的字段</h4>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-3 mb-3">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="text-sm text-orange-800 dark:text-orange-200">
                <strong>注意：</strong>删除列后无法直接恢复，但可以点击上方的"🔄 重置"按钮恢复到原始数据。
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                选择要删除的列（已选 {columnsToDelete.size} 列）
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setColumnsToDelete(new Set(columns))}
                  className="text-xs px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
                >
                  全选
                </button>
                <button
                  onClick={() => setColumnsToDelete(new Set())}
                  className="text-xs px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
                >
                  清空
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
              {columns.map(col => (
                <label
                  key={col}
                  className={`
                    flex items-center gap-2 p-2 rounded cursor-pointer transition-all
                    ${columnsToDelete.has(col)
                      ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500'
                      : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={columnsToDelete.has(col)}
                    onChange={() => toggleColumnSelection(col)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-900 dark:text-gray-100 truncate" title={col}>
                    {col}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleDeleteColumns}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={columnsToDelete.size === 0}
          >
            删除选中的 {columnsToDelete.size} 列
          </button>
        </div>
      )}
    </div>
  )
}
