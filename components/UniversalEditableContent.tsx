"use client"

import React, { useState, useEffect } from 'react'
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Save, X, Plus, Trash2, BarChart3, FileText, Code, Image, List } from 'lucide-react'
import ReactECharts from 'echarts-for-react'
import { isAdminMode } from '@/lib/auth'

interface UniversalEditableProps {
  positionKey: string
  contentType: 'text' | 'code' | 'chart' | 'list' | 'image' | 'heading'
  fallbackContent?: string
  className?: string
  pagePath?: string
  placeholder?: string
}

// ECharts预设模板
const CHART_TEMPLATES = {
  line: {
    title: { text: '折线图示例' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'] },
    yAxis: { type: 'value' },
    series: [{ data: [120, 200, 150, 80, 70, 110], type: 'line' }]
  },
  bar: {
    title: { text: '柱状图示例' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['产品A', '产品B', '产品C', '产品D', '产品E'] },
    yAxis: { type: 'value' },
    series: [{ data: [320, 302, 301, 334, 390], type: 'bar' }]
  },
  pie: {
    title: { text: '饼图示例' },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' }
      ]
    }]
  }
}

export function UniversalEditableContent({
  positionKey,
  contentType,
  fallbackContent = '',
  className = '',
  pagePath = '',
  placeholder = ''
}: UniversalEditableProps) {
  const { theme } = useTheme()
  const [content, setContent] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [adminMode, setAdminMode] = useState(false)

  const normalizeChartOption = (value: any) => {
    if (!value) return null
    if (typeof value === 'string') {
      try { return JSON.parse(value) } catch { return null }
    }
    return value
  }

  useEffect(() => {
    setAdminMode(isAdminMode())
    fetchContent()
  }, [positionKey, contentType])

  const fetchContent = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/public/content?position_key=${positionKey}&type=${contentType}`
      )
      if (response.ok) {
        const data = await response.json()
        
        // 根据内容类型获取数据
        if (contentType === 'text' && data.texts?.length > 0) {
          setContent(data.texts[0])
        } else if (contentType === 'code' && data.codes?.length > 0) {
          setContent(data.codes[0])
        } else if (contentType === 'chart' && data.charts?.length > 0) {
          const chart = data.charts[0]
          setContent({ ...chart, chart_data: normalizeChartOption(chart.chart_data) })
        }
      }
    } catch (error) {
      console.error('获取内容失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      let endpoint = ''
      let payload = {}

      switch (contentType) {
        case 'text':
        case 'heading':
        case 'list':
          endpoint = '/api/texts'
          payload = {
            position_key: positionKey,
            title: editData.title || `内容-${positionKey}`,
            content: editData.content || editData.text || '',
            page_path: pagePath || window.location.pathname,
            status: 'published'
          }
          break
        
        case 'code':
          endpoint = '/api/codes'
          payload = {
            position_key: positionKey,
            title: editData.title || `代码-${positionKey}`,
            language: editData.language || 'python',
            code: editData.code || '',
            description: editData.description || '',
            page_path: pagePath || window.location.pathname,
            status: 'published'
          }
          break
        
        case 'chart':
          endpoint = '/api/charts/generate'
          payload = {
            position_key: positionKey,
            title: editData.title || `图表-${positionKey}`,
            chart_type: editData.chart_type || 'line',
            chart_data: editData.chart_data || CHART_TEMPLATES.line,
            chart_config: { theme: theme },
            display_size: editData.display_size || 'medium',
            page_path: pagePath || window.location.pathname
          }
          break
      }

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        await fetchContent()
        setIsEditing(false)
        alert('保存成功！页面将刷新以显示最新内容')
        // 延迟刷新让用户看到成功消息
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        alert('保存失败')
      }
    } catch (error) {
      alert('保存失败')
    }
  }

  const startEdit = () => {
    if (content) {
      // 编辑现有内容
      switch (contentType) {
        case 'text':
        case 'heading':
        case 'list':
          setEditData({
            title: content.title || '',
            content: content.content || '',
            text: content.content || ''
          })
          break
        case 'code':
          setEditData({
            title: content.title || '',
            language: content.language || 'python',
            code: content.code || '',
            description: content.description || ''
          })
          break
        case 'chart':
          setEditData({
            title: content.title || '',
            chart_type: content.chart_type || 'line',
            chart_data: normalizeChartOption(content.chart_data) || CHART_TEMPLATES.line,
            display_size: content.display_size || 'medium'
          })
          break
      }
    } else {
      // 创建新内容
      switch (contentType) {
        case 'text':
          setEditData({ title: '', content: '<p>新的文本内容</p>' })
          break
        case 'heading':
          setEditData({ title: '', content: '<h2>新标题</h2>' })
          break
        case 'list':
          setEditData({ title: '', content: '<ul><li>列表项1</li><li>列表项2</li></ul>' })
          break
        case 'code':
          setEditData({ title: '', language: 'python', code: '# 新的代码示例\nprint("Hello, World!")', description: '' })
          break
        case 'chart':
          setEditData({ title: '', chart_type: 'line', chart_data: CHART_TEMPLATES.line, display_size: 'medium' })
          break
      }
    }
    setIsEditing(true)
  }

  const renderEditForm = () => {
    switch (contentType) {
      case 'text':
      case 'heading':
      case 'list':
        return (
          <div className="space-y-4">
            <Input
              value={editData.title || ''}
              onChange={(e) => setEditData({...editData, title: e.target.value})}
              placeholder="标题"
            />
            <textarea
              className={`w-full h-32 p-3 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
              value={editData.content || editData.text || ''}
              onChange={(e) => setEditData({...editData, content: e.target.value, text: e.target.value})}
              placeholder={placeholder || "支持HTML: <h1>标题</h1> <p>段落</p> <strong>加粗</strong>"}
            />
          </div>
        )

      case 'code':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                value={editData.title || ''}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                placeholder="代码标题"
              />
              <select
                className={`p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                value={editData.language || 'python'}
                onChange={(e) => setEditData({...editData, language: e.target.value})}
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="sql">SQL</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="bash">Bash</option>
                <option value="json">JSON</option>
              </select>
            </div>
            <textarea
              className={`w-full h-40 p-3 border rounded-md font-mono text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
              value={editData.code || ''}
              onChange={(e) => setEditData({...editData, code: e.target.value})}
              placeholder="输入代码..."
            />
            <Input
              value={editData.description || ''}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              placeholder="代码说明（可选）"
            />
          </div>
        )

      case 'chart':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                value={editData.title || ''}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                placeholder="图表标题"
              />
              <select
                className={`p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                value={editData.chart_type || 'line'}
                onChange={(e) => {
                  const newType = e.target.value as keyof typeof CHART_TEMPLATES
                  setEditData({
                    ...editData, 
                    chart_type: newType,
                    chart_data: CHART_TEMPLATES[newType]
                  })
                }}
              >
                <option value="line">折线图</option>
                <option value="bar">柱状图</option>
                <option value="pie">饼图</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">图表配置 (JSON格式)</label>
              <textarea
                className={`w-full h-40 p-3 border rounded-md font-mono text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                value={JSON.stringify(editData.chart_data, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value)
                    setEditData({...editData, chart_data: parsed})
                  } catch (err) {
                    // 忽略JSON解析错误，用户还在输入中
                  }
                }}
                placeholder="ECharts配置..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">图表尺寸</label>
              <select
                className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                value={editData.display_size || 'medium'}
                onChange={(e) => setEditData({...editData, display_size: e.target.value})}
              >
                <option value="small">小 (300px)</option>
                <option value="medium">中 (400px)</option>
                <option value="large">大 (500px)</option>
              </select>
            </div>
            {/* 图表预览 */}
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium mb-2">预览</h4>
              <div style={{ height: '200px' }}>
                <ReactECharts
                  option={editData.chart_data || CHART_TEMPLATES.line}
                  style={{ height: '100%', width: '100%' }}
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderContent = () => {
    if (!content && !fallbackContent) return null

    switch (contentType) {
      case 'text':
      case 'heading':
      case 'list':
        return (
          <div 
            dangerouslySetInnerHTML={{ 
              __html: content?.content || fallbackContent 
            }}
          />
        )

      case 'code':
        return (
          <div>
            {content?.title && (
              <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                {content.title}
              </h4>
            )}
            <pre className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'} p-4 rounded-lg overflow-x-auto text-sm`}>
              <code>{content?.code || fallbackContent}</code>
            </pre>
            {content?.description && (
              <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {content.description}
              </p>
            )}
          </div>
        )

      case 'chart':
        if (!content?.chart_data) return null
        
        const sizeMap = {
          small: '300px',
          medium: '400px',
          large: '500px'
        }
        
        const chartOption = normalizeChartOption(content.chart_data)

        return (
          <div className="w-full">
            {content.title && (
              <h4 className={`text-lg font-semibold mb-4 text-center ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                {content.title}
              </h4>
            )}
            <div style={{ height: sizeMap[content.display_size as keyof typeof sizeMap] || '400px' }}>
              <ReactECharts
                option={chartOption || CHART_TEMPLATES.line}
                style={{ height: '100%', width: '100%' }}
                theme={theme === 'dark' ? 'dark' : 'light'}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const getIcon = () => {
    switch (contentType) {
      case 'text': return <FileText size={12} />
      case 'code': return <Code size={12} />
      case 'chart': return <BarChart3 size={12} />
      case 'list': return <List size={12} />
      case 'heading': return <FileText size={12} />
      default: return <Edit size={12} />
    }
  }

  const getColor = () => {
    switch (contentType) {
      case 'text': return 'bg-blue-500 hover:bg-blue-600 border-blue-500'
      case 'code': return 'bg-green-500 hover:bg-green-600 border-green-500'
      case 'chart': return 'bg-purple-500 hover:bg-purple-600 border-purple-500'
      case 'list': return 'bg-orange-500 hover:bg-orange-600 border-orange-500'
      case 'heading': return 'bg-red-500 hover:bg-red-600 border-red-500'
      default: return 'bg-gray-500 hover:bg-gray-600 border-gray-500'
    }
  }

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className={`h-8 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
        <div className={`h-20 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
      </div>
    )
  }

  return (
    <div className={`relative group ${className}`}>
      {/* 管理员编辑按钮 */}
      {adminMode && !isEditing && (
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            size="sm"
            variant="outline"
            onClick={startEdit}
            className={`h-6 w-6 p-0 text-white ${getColor()}`}
          >
            {getIcon()}
          </Button>
        </div>
      )}

      {/* 编辑模式 */}
      {isEditing ? (
        <div className={`border-2 rounded-lg p-4 ${
          contentType === 'text' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' :
          contentType === 'code' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
          contentType === 'chart' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' :
          'border-gray-500 bg-gray-50 dark:bg-gray-900/20'
        }`}>
          {renderEditForm()}
          <div className="flex gap-2 mt-4">
            <Button size="sm" onClick={saveContent}>
              <Save size={14} className="mr-1" />
              保存
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
              <X size={14} className="mr-1" />
              取消
            </Button>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            类型: {contentType} | 位置: {positionKey} | 页面: {pagePath || window.location.pathname}
          </div>
        </div>
      ) : content || fallbackContent ? (
        /* 显示模式 */
        <div className={adminMode ? 'border border-dashed border-gray-300 hover:border-blue-400 transition-colors min-h-[2rem] p-2 rounded' : ''}>
          {renderContent()}
        </div>
      ) : adminMode ? (
        /* 空内容提示 */
        <div className="border border-dashed border-gray-400 p-4 rounded-lg text-center text-gray-500">
          <Plus size={16} className="mx-auto mb-2" />
          <p className="text-sm">点击添加{
            contentType === 'text' ? '文本' :
            contentType === 'code' ? '代码' :
            contentType === 'chart' ? '图表' :
            contentType === 'list' ? '列表' :
            contentType === 'heading' ? '标题' : '内容'
          }</p>
          <p className="text-xs">位置: {positionKey}</p>
          <Button size="sm" onClick={startEdit} className="mt-2">
            添加内容
          </Button>
        </div>
      ) : null}
    </div>
  )
}
