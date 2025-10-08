"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SimpleAdmin() {
  const [texts, setTexts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [newText, setNewText] = useState({
    position_key: '',
    title: '',
    content: '',
    page_path: '/'
  })

  // 获取认证token
  const getToken = () => localStorage.getItem('admin_token')

  // 加载文本列表
  const loadTexts = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/texts', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setTexts(data.data || [])
      } else {
        alert('获取数据失败')
      }
    } catch (error) {
      alert('网络错误')
    } finally {
      setLoading(false)
    }
  }

  // 添加新文本
  const addText = async () => {
    if (!newText.title || !newText.content) {
      alert('请填写标题和内容')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/texts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(newText)
      })

      if (response.ok) {
        alert('添加成功！')
        setNewText({ position_key: '', title: '', content: '', page_path: '/' })
        loadTexts()
      } else {
        alert('添加失败')
      }
    } catch (error) {
      alert('网络错误')
    }
  }

  // 删除文本
  const deleteText = async (id: number) => {
    if (!confirm('确定要删除吗？')) return

    try {
      const response = await fetch(`http://localhost:5000/api/texts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })

      if (response.ok) {
        alert('删除成功！')
        loadTexts()
      } else {
        alert('删除失败')
      }
    } catch (error) {
      alert('网络错误')
    }
  }

  // 页面加载时获取数据
  useEffect(() => {
    const token = getToken()
    if (token) {
      loadTexts()
    } else {
      alert('请先登录')
      window.location.href = '/admin'
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">简化版后台管理</h1>
        
        {/* 添加新文本表单 */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">添加新文本内容</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">位置标识</label>
              <Input
                value={newText.position_key}
                onChange={(e) => setNewText({...newText, position_key: e.target.value})}
                placeholder="如: homepage_intro"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">页面路径</label>
              <Input
                value={newText.page_path}
                onChange={(e) => setNewText({...newText, page_path: e.target.value})}
                placeholder="如: /machine-learning/svm"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">标题</label>
            <Input
              value={newText.title}
              onChange={(e) => setNewText({...newText, title: e.target.value})}
              placeholder="请输入标题"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">内容 (支持HTML)</label>
            <textarea
              className="w-full h-24 p-3 border rounded-md"
              value={newText.content}
              onChange={(e) => setNewText({...newText, content: e.target.value})}
              placeholder="如: <h2>标题</h2><p>段落内容</p>"
            />
          </div>
          <Button onClick={addText}>添加内容</Button>
        </div>

        {/* 文本列表 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">文本内容列表</h2>
            <Button onClick={loadTexts} disabled={loading}>
              {loading ? '加载中...' : '刷新列表'}
            </Button>
          </div>

          {texts.length === 0 ? (
            <p className="text-gray-500">暂无内容</p>
          ) : (
            <div className="space-y-4">
              {texts.map((text) => (
                <div key={text.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{text.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        位置: {text.position_key} | 页面: {text.page_path}
                      </p>
                      <div 
                        className="text-sm bg-gray-50 p-2 rounded"
                        dangerouslySetInnerHTML={{__html: text.content.substring(0, 200) + '...'}}
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => deleteText(text.id)}
                      className="ml-4 text-red-600 hover:text-red-700"
                    >
                      删除
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">💡 使用说明</h3>
          <div className="text-blue-700 text-sm space-y-1">
            <p><strong>位置标识</strong>：用于在前端页面中引用，如 homepage_intro</p>
            <p><strong>页面路径</strong>：内容所属的页面，如 /machine-learning/svm</p>
            <p><strong>HTML标签</strong>：支持 &lt;h1&gt;、&lt;p&gt;、&lt;strong&gt; 等基础HTML标签</p>
            <p><strong>前端使用</strong>：在页面中使用 &lt;DynamicText positionKey="位置标识" /&gt;</p>
          </div>
        </div>
      </div>
    </div>
  )
}
