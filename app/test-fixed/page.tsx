"use client"

import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import { DraggableAdminPanel } from "@/components/DraggableAdminPanel"
import { AdminToolbar } from "@/components/AdminToolbar"
import { useState, useEffect } from "react"

export default function TestFixedPage() {
  const { theme } = useTheme()
  const [content, setContent] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  // 简化的内容显示组件
  const SimpleEditableContent = ({ positionKey, title }: { positionKey: string, title: string }) => {
    const [localContent, setLocalContent] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState('')

    // 获取内容
    const fetchContent = async () => {
      try {
        const timestamp = new Date().getTime()
        const response = await fetch(`http://localhost:5000/api/public/content?position_key=${positionKey}&type=text&t=${timestamp}`)
        
        if (response.ok) {
          const data = await response.json()
          if (data.texts?.length > 0) {
            setLocalContent(data.texts[0].content)
            console.log('获取到内容:', data.texts[0].content)
          } else {
            setLocalContent('这是默认内容，点击编辑按钮修改')
          }
        }
      } catch (error) {
        console.error('获取内容失败:', error)
        setLocalContent('加载失败，点击编辑按钮修改')
      }
    }

    // 保存内容
    const saveContent = async () => {
      try {
        if (typeof window === 'undefined') return
        const token = localStorage.getItem('admin_token')
        if (!token) {
          alert('请先登录')
          return
        }

        const payload = {
          position_key: positionKey,
          title: title,
          content: editText,
          page_path: '/test-fixed',
          status: 'published'
        }

        const response = await fetch('http://localhost:5000/api/texts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        })

        if (response.ok) {
          alert('保存成功！即将刷新显示最新内容')
          setIsEditing(false)
          // 立即重新获取内容
          setTimeout(() => {
            fetchContent()
          }, 500)
        } else {
          const error = await response.text()
          alert('保存失败: ' + error)
        }
      } catch (error) {
        alert('保存出错: ' + error)
      }
    }

    useEffect(() => {
      fetchContent()
    }, [refreshKey])

    return (
      <div className={`p-4 border rounded ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">{title}</h3>
          <button
            onClick={() => {
              if (isEditing) {
                saveContent()
              } else {
                setIsEditing(true)
                setEditText(localContent)
              }
            }}
            className={`px-3 py-1 text-sm rounded ${
              isEditing 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isEditing ? '保存' : '编辑'}
          </button>
        </div>
        
        {isEditing ? (
          <div>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className={`w-full h-24 p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="输入内容..."
            />
            <button
              onClick={() => {
                setIsEditing(false)
                setEditText('')
              }}
              className="mt-2 px-3 py-1 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded"
            >
              取消
            </button>
          </div>
        ) : (
          <div 
            className={`min-h-16 p-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            dangerouslySetInnerHTML={{ __html: localContent }}
          />
        )}
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8`}>
          
          <h1 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            🔧 修复测试页面
          </h1>

          <div className="mb-6">
            <div className={`p-4 rounded ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <h2 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                测试说明
              </h2>
              <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>1. 先访问 <a href="/simple-admin" className="text-blue-600 underline">/simple-admin</a> 登录</li>
                <li>2. 回到这个页面，添加 ?admin=true 到URL</li>
                <li>3. 应该能看到可拖动的管理面板</li>
                <li>4. 编辑下面的内容，保存后应该立即显示新内容</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <SimpleEditableContent 
              positionKey="test_content_1" 
              title="测试内容 1" 
            />
            
            <SimpleEditableContent 
              positionKey="test_content_2" 
              title="测试内容 2" 
            />
            
            <SimpleEditableContent 
              positionKey="test_content_3" 
              title="测试内容 3" 
            />
          </div>

          <div className="mt-8">
            <button
              onClick={() => setRefreshKey(prev => prev + 1)}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              手动刷新所有内容
            </button>
          </div>

          <div className={`mt-8 p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="font-semibold mb-2">当前状态</h3>
            <div className="text-sm space-y-1">
              <div>登录状态: {typeof window !== 'undefined' && localStorage.getItem('admin_token') ? '✅ 已登录' : '❌ 未登录'}</div>
              <div>用户: {typeof window !== 'undefined' ? (localStorage.getItem('admin_user') || '无') : '无'}</div>
              <div>刷新计数: {refreshKey}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 管理员工具栏 */}
      <AdminToolbar />
      
      {/* 可拖动管理面板 */}
      <DraggableAdminPanel />
    </div>
  )
}
