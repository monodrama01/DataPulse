"use client"

import { useState, useEffect } from 'react'
import { getAuthToken, isAuthenticated, getUser } from '@/lib/auth'

export default function DebugAuthPage() {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [authStatus, setAuthStatus] = useState<boolean>(false)
  const [testResult, setTestResult] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setToken(getAuthToken())
    setUser(getUser())
    setAuthStatus(isAuthenticated())
  }, [])

  const testAuth = async () => {
    try {
      const token = getAuthToken()
      if (!token) {
        setTestResult('❌ 没有找到认证令牌')
        return
      }

      const response = await fetch('http://localhost:5000/api/test-auth', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      
      if (response.ok) {
        setTestResult(`✅ 认证测试成功: ${JSON.stringify(data, null, 2)}`)
      } else {
        setTestResult(`❌ 认证测试失败 (${response.status}): ${JSON.stringify(data, null, 2)}`)
      }
    } catch (error) {
      setTestResult(`❌ 请求错误: ${error}`)
    }
  }

  const testSaveText = async () => {
    try {
      const token = getAuthToken()
      if (!token) {
        setTestResult('❌ 没有找到认证令牌')
        return
      }

      const payload = {
        position_key: 'debug_test_' + Date.now(),
        title: '调试测试文本',
        content: '这是一个调试测试内容',
        page_path: '/debug-auth',
        status: 'published'
      }

      console.log('发送数据:', payload)

      const response = await fetch('http://localhost:5000/api/texts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      
      if (response.ok) {
        setTestResult(`✅ 保存测试成功: ${JSON.stringify(data, null, 2)}`)
      } else {
        setTestResult(`❌ 保存测试失败 (${response.status}): ${JSON.stringify(data, null, 2)}`)
      }
    } catch (error) {
      setTestResult(`❌ 请求错误: ${error}`)
    }
  }

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 认证调试页面</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">认证状态</h2>
          <div className="space-y-2">
            <p><strong>已认证:</strong> {authStatus ? '✅ 是' : '❌ 否'}</p>
            <p><strong>用户:</strong> {user || '未登录'}</p>
            <p><strong>Token:</strong> {token ? `${token.substring(0, 20)}...` : '无'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">测试功能</h2>
          <div className="space-x-4 mb-4">
            <button
              onClick={testAuth}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              测试认证
            </button>
            <button
              onClick={testSaveText}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              测试保存文本
            </button>
          </div>
        </div>

        {testResult && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">测试结果</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {testResult}
            </pre>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">使用说明</h2>
          <ol className="list-decimal list-inside space-y-2 text-yellow-700">
            <li>首先访问 <a href="/admin" className="underline text-blue-600">/admin</a> 页面登录</li>
            <li>登录成功后回到这个页面</li>
            <li>点击"测试认证"检查JWT是否正常工作</li>
            <li>点击"测试保存文本"检查保存功能是否正常</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
