"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Settings, 
  Edit, 
  Save, 
  X, 
  FileText, 
  Code, 
  BarChart3, 
  List, 
  Type,
  Plus,
  Trash2,
  Move,
  Minimize2,
  Maximize2
} from 'lucide-react'
import { isAdminMode, getAuthToken } from '@/lib/auth'

interface DraggableAdminPanelProps {
  currentContent?: {
    positionKey: string
    contentType: 'text' | 'code' | 'chart' | 'list' | 'heading'
    pagePath: string
  }
  onContentChange?: () => void
}

export function DraggableAdminPanel({ currentContent, onContentChange }: DraggableAdminPanelProps) {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 800, y: 100 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<any>({})
  const [mounted, setMounted] = useState(false)
  
  const panelRef = useRef<HTMLDivElement>(null)
  const dragHandleRef = useRef<HTMLDivElement>(null)

  // 避免hydration错误
  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      setPosition({ x: window.innerWidth - 320, y: 100 })
    }
  }, [])

  // 拖拽功能
  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y
        
        // 边界检查
        const maxX = (typeof window !== 'undefined' ? window.innerWidth : 1200) - 300
        const maxY = (typeof window !== 'undefined' ? window.innerHeight : 800) - 100
        
        setPosition({
          x: Math.max(0, Math.min(maxX, newX)),
          y: Math.max(0, Math.min(maxY, newY))
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset, mounted])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!panelRef.current) return
    
    const rect = panelRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    setIsDragging(true)
  }

  const handleEdit = () => {
    if (!currentContent) return
    
    // 重置编辑数据
    setEditData({
      title: '',
      content: '',
      code: '',
      language: 'python',
      description: '',
      chart_type: 'line',
      chart_data: {},
      display_size: 'medium'
    })
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!currentContent) return

    try {
      const token = getAuthToken()
      if (!token) {
        alert('请先登录')
        return
      }

      let endpoint = ''
      let payload = {}

      switch (currentContent.contentType) {
        case 'text':
        case 'heading':
        case 'list':
          endpoint = '/api/texts'
          payload = {
            position_key: currentContent.positionKey,
            title: editData.title || `${currentContent.contentType}-${currentContent.positionKey}`,
            content: editData.content || '',
            page_path: currentContent.pagePath,
            status: 'published'
          }
          break
        
        case 'code':
          endpoint = '/api/codes'
          payload = {
            position_key: currentContent.positionKey,
            title: editData.title || `代码-${currentContent.positionKey}`,
            language: editData.language || 'python',
            code: editData.code || '',
            description: editData.description || '',
            page_path: currentContent.pagePath,
            status: 'published'
          }
          break
        
        case 'chart':
          endpoint = '/api/charts/generate'
          payload = {
            position_key: currentContent.positionKey,
            title: editData.title || `图表-${currentContent.positionKey}`,
            chart_type: editData.chart_type || 'line',
            chart_data: editData.chart_data || {},
            chart_config: { theme: theme },
            display_size: editData.display_size || 'medium',
            page_path: currentContent.pagePath,
            status: 'published'
          }
          break
      }

      console.log('发送数据:', payload)

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

  const handleDelete = async () => {
    if (!currentContent) return

    if (!confirm('确定要删除这个内容吗？')) {
      return
    }

    try {
      const token = getAuthToken()
      if (!token) {
        alert('请先登录')
        return
      }

      // 这里需要根据内容类型调用不同的删除API
      // 暂时先显示提示
      alert('删除功能正在开发中...')
      
    } catch (error) {
      console.error('删除出错:', error)
      alert('删除出错: ' + error)
    }
  }

  const renderEditForm = () => {
    if (!currentContent) return null

    switch (currentContent.contentType) {
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
              placeholder={`输入${currentContent.contentType === 'heading' ? '标题' : currentContent.contentType === 'list' ? '列表' : '文本'}内容...`}
              value={editData.content || ''}
              onChange={(e) => setEditData({...editData, content: e.target.value})}
            />
          </div>
        )

      case 'code':
        return (
          <div className="space-y-3">
            <Input
              placeholder="代码标题"
              value={editData.title || ''}
              onChange={(e) => setEditData({...editData, title: e.target.value})}
            />
            <select
              className={`w-full p-2 border rounded text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
              value={editData.language || 'python'}
              onChange={(e) => setEditData({...editData, language: e.target.value})}
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="sql">SQL</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>
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
              placeholder='图表数据JSON格式'
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

  // 避免hydration错误
  if (!mounted || !isAdminMode()) return null

  return (
    <>
      {/* 可拖动的管理面板 */}
      <div
        ref={panelRef}
        className={`fixed z-50 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl border transition-all duration-200 ${
          isMinimized ? 'w-12 h-12' : 'w-80'
        }`}
        style={{ 
          left: position.x, 
          top: position.y,
          cursor: isDragging ? 'grabbing' : 'default'
        }}
      >
        {/* 拖拽手柄 */}
        <div
          ref={dragHandleRef}
          className={`flex items-center justify-between p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-t-lg cursor-grab active:cursor-grabbing`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <Move size={14} />
            {!isMinimized && <span className="text-xs font-medium">管理面板</span>}
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-6 w-6 p-0"
            >
              {isMinimized ? <Maximize2 size={10} /> : <Minimize2 size={10} />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0"
            >
              <X size={10} />
            </Button>
          </div>
        </div>

        {/* 面板内容 */}
        {!isMinimized && (
          <div className="p-4">
            {currentContent ? (
              <div className="space-y-3">
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  当前内容: {currentContent.contentType}
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  位置: {currentContent.positionKey}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleEdit}
                    className="flex-1"
                  >
                    <Edit size={12} className="mr-1" />
                    编辑
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={handleDelete}
                  >
                    <Trash2 size={12} className="mr-1" />
                    删除
                  </Button>
                </div>
                
                <div className="border-t pt-3">
                  <div className="text-xs font-medium mb-2">快速添加</div>
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      { type: 'text', icon: FileText, label: '文本' },
                      { type: 'code', icon: Code, label: '代码' },
                      { type: 'chart', icon: BarChart3, label: '图表' },
                      { type: 'list', icon: List, label: '列表' }
                    ].map((item) => (
                      <Button
                        key={item.type}
                        size="sm"
                        variant="ghost"
                        className="text-xs h-8"
                      >
                        <item.icon size={10} className="mr-1" />
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`text-center py-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <Settings size={24} className="mx-auto mb-2 opacity-50" />
                <p>悬停在内容上选择</p>
              </div>
            )}
          </div>
        )}
      </div>

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
          </div>
        </div>
      )}

      {/* 显示/隐藏切换按钮 */}
      {!isVisible && (
        <div className="fixed bottom-4 right-4 z-40">
          <Button
            onClick={() => setIsVisible(true)}
            className="rounded-full w-12 h-12 p-0 bg-blue-500 hover:bg-blue-600"
          >
            <Settings size={20} />
          </Button>
        </div>
      )}
    </>
  )
}
