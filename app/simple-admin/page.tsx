"use client"

import { useState, useEffect } from 'react'

export default function SimpleAdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 检查是否已登录
    const token = localStorage.getItem('admin_token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('admin_token', data.access_token)
        localStorage.setItem('admin_user', data.user.username)
        setIsLoggedIn(true)
        setMessage('✅ 登录成功！')
      } else {
        setMessage('❌ 登录失败: ' + data.error)
      }
    } catch (error) {
      setMessage('❌ 连接错误: ' + error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setIsLoggedIn(false)
    setMessage('已登出')
  }

  const testSave = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        setMessage('❌ 请先登录')
        return
      }

      const payload = {
        position_key: 'simple_test_' + Date.now(),
        title: '简单测试',
        content: '这是一个测试内容',
        page_path: '/simple-admin',
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

      const data = await response.json()

      if (response.ok) {
        setMessage('✅ 保存成功！')
      } else {
        setMessage('❌ 保存失败: ' + JSON.stringify(data))
      }
    } catch (error) {
      setMessage('❌ 保存错误: ' + error)
    }
  }

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">🔧 简单管理页面</h1>
        
        {!isLoggedIn ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin123"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              登录
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <div className="text-green-800 font-medium">✅ 已登录</div>
              <div className="text-green-600 text-sm">
                用户: {localStorage.getItem('admin_user')}
              </div>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={testSave}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
              >
                测试保存
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
              >
                登出
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              <a href="/working-test" className="block text-blue-600 hover:underline">
                → 访问工作测试页面
              </a>
              <a href="/clear-tokens" className="block text-red-600 hover:underline">
                → 清除所有认证信息
              </a>
            </div>
          </div>
        )}
        
        {message && (
          <div className="mt-4 p-3 bg-gray-50 border rounded">
            <div className="text-sm font-mono break-all">{message}</div>
          </div>
        )}
        
        <div className="mt-6 text-xs text-gray-500 space-y-1">
          <div>🔧 这是一个无依赖的简单版本</div>
          <div>🎯 用于快速测试认证和保存功能</div>
          <div>🚀 后端应该在 localhost:5000 运行</div>
        </div>
      </div>
    </div>
  )
}
