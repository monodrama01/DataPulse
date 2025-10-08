"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Edit, 
  Save, 
  X, 
  FileText, 
  Code, 
  BarChart3, 
  List, 
  Type,
  ChevronUp,
  ChevronDown,
  Trash2,
  Settings
} from 'lucide-react'
import { isAdminMode, getAuthToken } from '@/lib/auth'

interface FloatingContentToolbarProps {
  positionKey: string
  contentType: 'text' | 'code' | 'chart' | 'list' | 'heading'
  pagePath: string
  onContentChange?: () => void
}

export function FloatingContentToolbar({ 
  positionKey, 
  contentType, 
  pagePath,
  onContentChange 
}: FloatingContentToolbarProps) {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<any>({})
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const toolbarRef = useRef<HTMLDivElement>(null)

  // 跟随鼠标位置
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isOpen) {
        setPosition({ x: e.clientX + 10, y: e.clientY + 10 })
      }
    }

    if (isOpen) {
      document.addEventListener('mousemove', handleMouseMove)
      return () => document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isOpen])

  if (!isAdminMode()) return null

  const contentTypes = [
    { type: 'text', label: '文本', icon: <FileText size={14} />, color: 'bg-blue-500' },
    { type: 'heading', label: '标题', icon: <Type size={14} />, color: 'bg-red-500' },
    { type: 'list', label: '列表', icon: <List size={14} />, color: 'bg-orange-500' },
    { type: 'code', label: '代码', icon: <Code size={14} />, color: 'bg-green-500' },
    { type: 'chart', label: '图表', icon: <BarChart3 size={14} />, color: 'bg-purple-500' }
  ]

  const handleEdit = () => {
    setIsEditing(true)
    setIsOpen(false)
  }

  const handleSave = async () => {
    try {
      const token = getAuthToken()
      if (!token) {
        alert('请先登录')
        return
      }

      let endpoint = ''
      let payload = {}

      switch (contentType) {
        case 'text':
        case 'heading':
        case 'list':
          endpoint = '/api/texts'
          payload = {
            position_key: positionKey,
            title: editData.title || `${contentType}-${positionKey}`,
            content: editData.content || '',
            page_path: pagePath,
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
            page_path: pagePath,
            status: 'published'
          }
          break
        
        case 'chart':
          endpoint = '/api/charts/generate'
          payload = {
            position_key: positionKey,
            title: editData.title || `图表-${positionKey}`,
            chart_type: editData.chart_type || 'line',
            chart_data: editData.chart_data || {},
            chart_config: { theme: theme },
            display_size: editData.display_size || 'medium',
            page_path: pagePath,
            status: 'published'
          }
          break
      }

      console.log('发送数据:', payload) // 调试日志

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        alert('保存成功！')
        setIsEditing(false)
        onContentChange?.()
      } else {
        const error = await response.text()
        console.error('保存失败:', error)
        alert('保存失败: ' + error)
      }
    } catch (error) {
      console.error('保存出错:', error)
      alert('保存出错: ' + error)
    }
  }

  const renderEditForm = () => {
    switch (contentType) {
      case 'text':
      case 'heading':
      case 'list':
        return (
          <div className="space-y-3">
            <Input
              placeholder="标题"
              value={editData.title || ''}
              onChange={(e) => setEditData({...editData, title: e.target.value})}
            />
            <textarea
              className={`w-full h-32 p-2 border rounded text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
              placeholder={`输入${contentType === 'heading' ? '标题' : contentType === 'list' ? '列表' : '文本'}内容...`}
              value={editData.content || ''}
              onChange={(e) => setEditData({...editData, content: e.target.value})}
            />
          </div>
        )

      case 'code':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="代码标题"
                value={editData.title || ''}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
              />
              <select
                className={`p-2 border rounded text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                value={editData.language || 'python'}
                onChange={(e) => setEditData({...editData, language: e.target.value})}
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="sql">SQL</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
              </select>
            </div>
            <textarea
              className={`w-full h-32 p-2 border rounded font-mono text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
              placeholder="输入代码..."
              value={editData.code || ''}
              onChange={(e) => setEditData({...editData, code: e.target.value})}
            />
            <Input
              placeholder="代码说明（可选）"
              value={editData.description || ''}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
            />
          </div>
        )

      case 'chart':
        return (
          <div className="space-y-3">
            <Input
              placeholder="图表标题"
              value={editData.title || ''}
              onChange={(e) => setEditData({...editData, title: e.target.value})}
            />
            <select
              className={`w-full p-2 border rounded text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
              value={editData.chart_type || 'line'}
              onChange={(e) => setEditData({...editData, chart_type: e.target.value})}
            >
              <option value="line">折线图</option>
              <option value="bar">柱状图</option>
              <option value="pie">饼图</option>
            </select>
            <textarea
              className={`w-full h-24 p-2 border rounded font-mono text-xs ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
              placeholder='图表数据JSON格式，例如: {"data": [1,2,3]}'
              value={JSON.stringify(editData.chart_data || {}, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value)
                  setEditData({...editData, chart_data: parsed})
                } catch (err) {
                  // 忽略JSON解析错误
                }
              }}
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      {/* 主工具栏 */}
      {isOpen && (
        <div
          ref={toolbarRef}
          className={`fixed z-50 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl border p-3 min-w-[200px]`}
          style={{ left: position.x, top: position.y }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">内容工具</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="h-5 w-5 p-0"
            >
              <X size={12} />
            </Button>
          </div>
          
          <div className="space-y-2">
            <Button
              size="sm"
              onClick={handleEdit}
              className="w-full justify-start text-xs"
            >
              <Edit size={12} className="mr-2" />
              编辑内容
            </Button>
            
            <div className="border-t pt-2">
              <div className="text-xs text-gray-500 mb-1">添加新内容</div>
              {contentTypes.map((item) => (
                <Button
                  key={item.type}
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    // 这里可以添加新内容的逻辑
                    console.log('添加', item.type)
                  }}
                  className="w-full justify-start text-xs"
                >
                  <div className={`w-3 h-3 rounded ${item.color} mr-2`}></div>
                  {item.label}
                </Button>
              ))}
            </div>
            
            <div className="border-t pt-2">
              <Button
                size="sm"
                variant="ghost"
                className="w-full justify-start text-xs text-red-600"
              >
                <Trash2 size={12} className="mr-2" />
                删除内容
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑对话框 */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">编辑内容</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(false)}
              >
                <X size={16} />
              </Button>
            </div>
            
            {renderEditForm()}
            
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSave} className="flex-1">
                <Save size={14} className="mr-1" />
                保存
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                取消
              </Button>
            </div>
            
            <div className="text-xs text-gray-500 mt-2">
              位置: {positionKey} | 页面: {pagePath}
            </div>
          </div>
        </div>
      )}

      {/* 触发按钮 - 悬停显示 */}
      <div 
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseEnter={() => setIsOpen(true)}
      >
        <Button
          size="sm"
          className="h-6 w-6 p-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
        >
          <Settings size={10} />
        </Button>
      </div>
    </>
  )
}
