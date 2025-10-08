"use client"

import { useMemo, useState } from "react"

const apiBase = process.env.NEXT_PUBLIC_ANALYSIS_API || "http://127.0.0.1:8000"

export default function AnalysisTool() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [columns, setColumns] = useState<string[]>([])
  const [numCols, setNumCols] = useState<string[]>([])
  const [strCols, setStrCols] = useState<string[]>([])
  const [preview, setPreview] = useState<any[]>([])
  const [describe, setDescribe] = useState<any>({})

  const [pivotIndex, setPivotIndex] = useState("")
  const [pivotColumns, setPivotColumns] = useState("")
  const [pivotValues, setPivotValues] = useState("")
  const [numCol, setNumCol] = useState("")
  const [textCol, setTextCol] = useState("")
  const [splitDelim, setSplitDelim] = useState<string>("[,，;；\\s\\|]+")
  const [stopwords, setStopwords] = useState<string>("")
  const [minTokenLen, setMinTokenLen] = useState<number | ''>('')
  const [topN, setTopN] = useState<number | ''>(60)
  const [histCol, setHistCol] = useState<string>("")
  const [timeCol, setTimeCol] = useState<string>("")
  const [xCol, setXCol] = useState<string>("")
  const [yCols, setYCols] = useState<string[]>([])
  const [seriesCol, setSeriesCol] = useState<string>("")
  const [chartType, setChartType] = useState<'line'|'bar'|'barh'|'pie'|''>('')

  const [pivot, setPivot] = useState<any | null>(null)
  const [boxplotPng, setBoxplotPng] = useState<string | null>(null)
  const [wordcloudPng, setWordcloudPng] = useState<string | null>(null)
  const [histPng, setHistPng] = useState<string | null>(null)
  const [linePng, setLinePng] = useState<string | null>(null)
  const [chart2dPng, setChart2dPng] = useState<string | null>(null)
  const [piePng, setPiePng] = useState<string | null>(null)
  const [insights, setInsights] = useState<any | null>(null)
  const [keywordCounts, setKeywordCounts] = useState<Array<{token:string, count:number, ratio:number}> | null>(null)
  const [loading, setLoading] = useState(false)

  const canAnalyze = useMemo(()=> !!file, [file])

  async function handleFileChange(f: File | null) {
    setFile(f)
    if (!f) return
    const form = new FormData()
    form.append("file", f)
    const res = await fetch(`${apiBase}/columns`, { method: 'POST', body: form })
    if (!res.ok) {
      try {
        const err = await res.json()
        alert(`列信息获取失败：${err?.error || res.status}`)
      } catch {
        alert('列信息获取失败')
      }
      return
    }
    const data = await res.json()
    setColumns(data.columns || [])
    setNumCols(data.numericColumns || [])
    setStrCols(data.stringColumns || [])
    setPreview(data.preview || [])
    setDescribe(data.describe || {})
  }

  async function handleAnalyze() {
    if (!file) return
    setLoading(true)
    try {
      const form = new FormData()
      form.append("file", file)
      if (pivotIndex) form.append("pivot_index", pivotIndex)
      if (pivotColumns) form.append("pivot_columns", pivotColumns)
      if (pivotValues) form.append("pivot_values", pivotValues)
      if (numCol) form.append("num_col", numCol)
      if (textCol) form.append("text_col", textCol)
      if (splitDelim) form.append("split_delim", splitDelim)
      if (stopwords) form.append("stopwords", stopwords)
      if (minTokenLen !== '' ) form.append("min_token_len", String(minTokenLen))
      if (topN !== '' ) form.append("top_n", String(topN))
      if (histCol) form.append("hist_col", histCol)
      if (timeCol) form.append("time_col", timeCol)
      if (xCol) form.append('x_col', xCol)
      if (yCols.length) form.append('y_cols', JSON.stringify(yCols))
      if (seriesCol) form.append('series_col', seriesCol)
      if (chartType) form.append('chart_type', chartType)
      const res = await fetch(`${apiBase}/analyze`, { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok || data.error) { alert(`分析失败：${data?.error || res.status}`); return }
      setPreview(data.preview || [])
      setDescribe(data.describe || {})
      setPivot(data.pivot || null)
      setBoxplotPng(data.boxplotPng || null)
      setWordcloudPng(data.wordcloudPng || null)
      setHistPng(data.histPng || null)
      setLinePng(data.linePng || null)
      // @ts-ignore 保存新增图
      setChart2dPng?.(data.chart2dPng || null)
      // @ts-ignore
      setPiePng?.(data.piePng || null)
      setInsights(data.insights || null)
      setKeywordCounts(data.keywordCounts || null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* 文件上传区域 */}
      <div 
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-dashed transition-colors ${
          isDragging ? 'border-blue-500 dark:border-blue-400' : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false)
          const dropped = e.dataTransfer?.files?.[0]
          if (dropped) {
            handleFileChange(dropped)
          }
        }}
      >
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">上传数据文件</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">支持 CSV 和 Excel 格式，最大 50MB</p>
          <div className="relative">
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={(e)=> handleFileChange(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
              选择文件或拖拽到此处
            </button>
          </div>
          {file && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-green-700 dark:text-green-300 font-medium">{file.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {columns.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">分析配置</h3>
          </div>
          
          {/* 透视表配置 */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
              </svg>
              透视表分析
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">行字段</label>
                <select value={pivotIndex} onChange={e=>setPivotIndex(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="">选择行字段</option>
                  {columns.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">列字段</label>
                <select value={pivotColumns} onChange={e=>setPivotColumns(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="">选择列字段</option>
                  {columns.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">值字段</label>
                <select value={pivotValues} onChange={e=>setPivotValues(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="">选择值字段</option>
                  {columns.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* 图表配置 */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              图表可视化
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">箱线图</label>
                <select value={numCol} onChange={e=>setNumCol(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                  <option value="">选择数值列</option>
                  {numCols.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">直方图</label>
                <select value={histCol} onChange={e=>setHistCol(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                  <option value="">选择数值列</option>
                  {numCols.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">折线图</label>
                <select value={timeCol} onChange={e=>setTimeCol(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                  <option value="">选择时间列</option>
                  {columns.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">词云图</label>
                <select value={textCol} onChange={e=>setTextCol(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                  <option value="">选择文本列</option>
                  {strCols.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            {/* 二维图参数 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">X 轴</label>
                <select value={xCol} onChange={e=>setXCol(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">选择列</option>
                  {columns.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Y 轴（多选）</label>
                <select multiple value={yCols} onChange={e=> setYCols(Array.from(e.target.selectedOptions).map(o=>o.value))} className="w-full h-28 border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  {numCols.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">系列（可选）</label>
                <select value={seriesCol} onChange={e=>setSeriesCol(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">不分系列</option>
                  {columns.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">图表类型</label>
                <select value={chartType} onChange={e=>setChartType(e.target.value as any)} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option value="">不生成</option>
                  <option value="line">折线图（多系列）</option>
                  <option value="bar">柱状图（分组）</option>
                  <option value="barh">条形图（分组）</option>
                  <option value="pie">饼图（Top12）</option>
                </select>
              </div>
            </div>
          </div>
          {/* 词云高级配置 */}
          {textCol && (
            <div className="space-y-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
              <h5 className="text-md font-semibold text-purple-800 dark:text-purple-300 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                词云高级设置
              </h5>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">分隔符规则（正则表达式）</label>
                  <input
                    value={splitDelim}
                    onChange={e=>setSplitDelim(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="例如：[,，;；\\s\\|]+"
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">示例：[,，;；\s\|]+ 表示按逗号/中文逗号/分号/空格/竖线分隔</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">停用词（过滤无意义词汇）</label>
                  <textarea
                    value={stopwords}
                    onChange={e=>setStopwords(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="用逗号或换行分隔，例如：的,是,在,有,和,了"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">最小词长</label>
                    <input
                      type="number"
                      min={0}
                      value={minTokenLen}
                      onChange={e=>setMinTokenLen(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">显示关键词数量</label>
                    <input
                      type="number"
                      min={1}
                      value={topN}
                      onChange={e=>setTopN(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="60"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 分析按钮 */}
          <div className="flex justify-center pt-4">
            <button 
              onClick={handleAnalyze} 
              disabled={!canAnalyze || loading} 
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                !canAnalyze || loading 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  分析中...
                </div>
              ) : (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  开始智能分析
                </div>
              )}
            </button>
          </div>
        </div>
      )}

      {preview.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 overflow-auto border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">数据预览</h3>
            <span className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              {preview.length} 行数据
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {Object.keys(preview[0] || {}).map(k => 
                    <th key={k} className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                      {k}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {preview.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    {Object.keys(preview[0] || {}).map(k => 
                      <td key={k} className="px-4 py-3 whitespace-nowrap text-gray-900 dark:text-gray-100">
                        {String(row[k])}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {pivot && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 overflow-auto border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-2">透视表</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1 border-b text-left">{pivot.indexLabel || 'Index'}</th>
                {pivot.columns.map((c: string) => <th key={c} className="px-2 py-1 border-b text-left">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {pivot.data.map((row: any[], i: number) => (
                <tr key={i}>
                  <td className="px-2 py-1 border-b">{pivot.index[i]}</td>
                  {row.map((v: any, j: number) => <td key={j} className="px-2 py-1 border-b">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {insights && (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow space-y-4">
          <h3 className="font-medium">自动洞察</h3>
          <div>
            <h4 className="text-sm font-semibold mb-1">缺失值统计</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              {Object.entries(insights.missing || {}).map(([k,v]) => (
                <div key={k} className="px-2 py-1 border rounded">{k}: {String(v)}</div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1">数值列统计</h4>
            <div className="overflow-auto">
              <table className="text-sm min-w-full">
                <thead>
                  <tr>
                    <th className="px-2 py-1 border-b text-left">列</th>
                    <th className="px-2 py-1 border-b text-left">count</th>
                    <th className="px-2 py-1 border-b text-left">min</th>
                    <th className="px-2 py-1 border-b text-left">max</th>
                    <th className="px-2 py-1 border-b text-left">mean</th>
                    <th className="px-2 py-1 border-b text-left">median</th>
                    <th className="px-2 py-1 border-b text-left">std</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(insights.numericStats || {}).map(([k,v]: any)=> (
                    <tr key={k}>
                      <td className="px-2 py-1 border-b">{k}</td>
                      <td className="px-2 py-1 border-b">{v.count}</td>
                      <td className="px-2 py-1 border-b">{v.min}</td>
                      <td className="px-2 py-1 border-b">{v.max}</td>
                      <td className="px-2 py-1 border-b">{v.mean}</td>
                      <td className="px-2 py-1 border-b">{v.median}</td>
                      <td className="px-2 py-1 border-b">{v.std}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1">分类占比（Top10）</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(insights.categoryRatios || {}).map(([k,v]: any) => (
                <div key={k} className="border rounded p-2">
                  <div className="font-medium mb-1">{k}</div>
                  <ul className="text-sm space-y-1">
                    {v.map((item: any[]) => (
                      <li key={item[0]} className="flex justify-between">
                        <span>{item[0]}</span>
                        <span>{(item[1]*100).toFixed(1)}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 图表展示区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {histPng && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">分布直方图</h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <img src={histPng} alt="直方图" className="w-full h-auto rounded-lg shadow-sm" />
            </div>
          </div>
        )}

      {linePng && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">趋势折线图</h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <img src={linePng} alt="折线图" className="w-full h-auto rounded-lg shadow-sm" />
            </div>
          </div>
        )}

      {boxplotPng && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">数据分布箱线图</h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <img src={boxplotPng} alt="箱线图" className="w-full h-auto rounded-lg shadow-sm" />
            </div>
          </div>
        )}

      {chart2dPng && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="font-medium mb-2">二维图表</h3>
          <img src={chart2dPng} alt="chart2d" />
        </div>
      )}

      {piePng && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="font-medium mb-2">饼图</h3>
          <img src={piePng} alt="pie" />
        </div>
      )}

        {wordcloudPng && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12h6m-6 4h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">关键词词云图</h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <img src={wordcloudPng} alt="词云图" className="w-full h-auto rounded-lg shadow-sm" />
            </div>
          </div>
        )}
      </div>

      {keywordCounts && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">关键词频率统计</h3>
            <span className="ml-auto bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm font-medium">
              Top {Math.min(keywordCounts.length, 60)}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {keywordCounts.slice(0,60).map((k, index)=> (
              <div key={k.token} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0 flex-1">
                    <span className="w-6 h-6 bg-indigo-500 text-white text-xs font-bold rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="truncate font-medium text-gray-900 dark:text-gray-100" title={k.token}>
                      {k.token}
                    </span>
                  </div>
                  <div className="text-right ml-2 flex-shrink-0">
                    <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{k.count}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{(k.ratio*100).toFixed(1)}%</div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(k.ratio * 100 * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


