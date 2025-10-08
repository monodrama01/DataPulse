"use client"

import React, { useState, useEffect } from 'react'
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react'

interface EditableContentProps {
  positionKey: string
  fallbackContent?: string
  className?: string
  contentType?: 'text' | 'code' | 'chart'
  pagePath?: string
}

// 检查是否为管理员模式
const isAdminMode = (): boolean => {
  if (typeof window === 'undefined') return false
  return !!(localStorage.getItem('admin_token') && window.location.search.includes('admin=true'))
}

export function EditableText({ 
  positionKey, 
  fallbackContent = '', 
  className = '',
  pagePath = ''
}: EditableContentProps) {
  const { theme } = useTheme()
  const [content, setContent] = useState<string>(fallbackContent)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [adminMode, setAdminMode] = useState(false)

  useEffect(() => {
    setAdminMode(isAdminMode())
    fetchContent()
  }, [positionKey])

  const fetchContent = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/public/content?position_key=${positionKey}&type=text`
      )
      if (response.ok) {
        const data = await response.json()
        if (data.texts && data.texts.length > 0) {
          setContent(data.texts[0].content)
          setTitle(data.texts[0].title)
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
      const response = await fetch('http://localhost:5000/api/texts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          position_key: positionKey,
          title: title || `内容-${positionKey}`,
          content: editContent,
          page_path: pagePath || window.location.pathname,
          status: 'published'
        })
      })

      if (response.ok) {
        setContent(editContent)
        setIsEditing(false)
        alert('保存成功！')
      } else {
        alert('保存失败')
      }
    } catch (error) {
      alert('保存失败')
    }
  }

  const startEdit = () => {
    setEditContent(content)
    setIsEditing(true)
  }

  const cancelEdit = () => {
    setEditContent('')
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className={`h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4 mb-2`}></div>
        <div className={`h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/2`}></div>
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
            className="h-6 w-6 p-0 bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
          >
            <Edit size={12} />
          </Button>
        </div>
      )}

      {/* 编辑模式 */}
      {isEditing ? (
        <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">标题</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="内容标题"
              className="mb-2"
            />
            <label className="block text-sm font-medium mb-1">内容 (支持HTML)</label>
            <textarea
              className={`w-full h-32 p-3 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="支持HTML: <h1>标题</h1> <p>段落</p> <strong>加粗</strong>"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={saveContent}>
              <Save size={14} className="mr-1" />
              保存
            </Button>
            <Button size="sm" variant="outline" onClick={cancelEdit}>
              <X size={14} className="mr-1" />
              取消
            </Button>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            位置标识: {positionKey} | 页面: {pagePath || window.location.pathname}
          </div>
        </div>
      ) : (
        /* 显示模式 */
        <div 
          className={adminMode ? 'border border-dashed border-gray-300 hover:border-blue-400 transition-colors min-h-[2rem] p-2 rounded' : ''}
          dangerouslySetInnerHTML={{ __html: content || fallbackContent }}
        />
      )}

      {/* 空内容提示 */}
      {adminMode && !content && !isEditing && (
        <div className="border border-dashed border-gray-400 p-4 rounded-lg text-center text-gray-500">
          <Plus size={16} className="mx-auto mb-2" />
          <p className="text-sm">点击添加内容</p>
          <p className="text-xs">位置: {positionKey}</p>
          <Button size="sm" onClick={startEdit} className="mt-2">
            添加内容
          </Button>
        </div>
      )}
    </div>
  )
}

export function EditableCode({ 
  positionKey, 
  fallbackContent = '', 
  className = '',
  pagePath = ''
}: EditableContentProps) {
  const { theme } = useTheme()
  const [code, setCode] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: '',
    language: 'python',
    code: '',
    description: ''
  })
  const [loading, setLoading] = useState(true)
  const [adminMode, setAdminMode] = useState(false)

  useEffect(() => {
    setAdminMode(isAdminMode())
    fetchContent()
  }, [positionKey])

  const fetchContent = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/public/content?position_key=${positionKey}&type=code`
      )
      if (response.ok) {
        const data = await response.json()
        if (data.codes && data.codes.length > 0) {
          setCode(data.codes[0])
        }
      }
    } catch (error) {
      console.error('获取代码失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveCode = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('http://localhost:5000/api/codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...editData,
          position_key: positionKey,
          page_path: pagePath || window.location.pathname,
          status: 'published'
        })
      })

      if (response.ok) {
        await fetchContent()
        setIsEditing(false)
        alert('保存成功！')
      } else {
        alert('保存失败')
      }
    } catch (error) {
      alert('保存失败')
    }
  }

  const startEdit = () => {
    setEditData({
      title: code?.title || '',
      language: code?.language || 'python',
      code: code?.code || '',
      description: code?.description || ''
    })
    setIsEditing(true)
  }

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className={`h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/4 mb-2`}></div>
        <div className={`h-32 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
      </div>
    )
  }

  return (
    <div className={`relative group ${className}`}>
      {adminMode && !isEditing && (
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            size="sm"
            variant="outline"
            onClick={startEdit}
            className="h-6 w-6 p-0 bg-green-500 hover:bg-green-600 text-white border-green-500"
          >
            <Edit size={12} />
          </Button>
        </div>
      )}

      {isEditing ? (
        <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">标题</label>
              <Input
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                placeholder="代码标题"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">语言</label>
              <select
                className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                value={editData.language}
                onChange={(e) => setEditData({...editData, language: e.target.value})}
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="sql">SQL</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">代码</label>
            <textarea
              className={`w-full h-40 p-3 border rounded-md font-mono text-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
              value={editData.code}
              onChange={(e) => setEditData({...editData, code: e.target.value})}
              placeholder="输入代码..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">描述</label>
            <Input
              value={editData.description}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              placeholder="代码说明（可选）"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={saveCode}>
              <Save size={14} className="mr-1" />
              保存
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
              <X size={14} className="mr-1" />
              取消
            </Button>
          </div>
        </div>
      ) : code ? (
        <div className={adminMode ? 'border border-dashed border-gray-300 hover:border-green-400 transition-colors p-2 rounded' : ''}>
          {code.title && (
            <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              {code.title}
            </h4>
          )}
          <pre className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'} p-4 rounded-lg overflow-x-auto text-sm`}>
            <code>{code.code}</code>
          </pre>
          {code.description && (
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {code.description}
            </p>
          )}
        </div>
      ) : adminMode ? (
        <div className="border border-dashed border-gray-400 p-4 rounded-lg text-center text-gray-500">
          <Plus size={16} className="mx-auto mb-2" />
          <p className="text-sm">点击添加代码片段</p>
          <p className="text-xs">位置: {positionKey}</p>
          <Button size="sm" onClick={startEdit} className="mt-2">
            添加代码
          </Button>
        </div>
      ) : (
        fallbackContent && (
          <pre className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'} p-4 rounded-lg overflow-x-auto`}>
            <code>{fallbackContent}</code>
          </pre>
        )
      )}
    </div>
  )
}
