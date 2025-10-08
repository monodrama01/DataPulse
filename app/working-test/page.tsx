"use client"

import { Navigation } from "@/components/navigation"
import { AdminToolbar } from "@/components/AdminToolbar"
import { useTheme } from "@/components/theme-provider"
import { useState, useEffect } from "react"
import { getAuthToken, isAuthenticated, getUser, User } from '@/lib/auth'

export default function WorkingTestPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [authStatus, setAuthStatus] = useState<boolean>(false)
  const [testResult, setTestResult] = useState<string>('')

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
        position_key: 'working_test_' + Date.now(),
        title: '工作测试文本',
        content: '这是一个工作测试内容',
        page_path: '/working-test',
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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8`}>
          
          <h1 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            ✅ 可工作的测试页面
          </h1>

          <div className={`p-6 rounded-lg mb-6 ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
              📋 使用说明
            </h2>
            <div className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <p><strong>1. 登录：</strong>访问 <a href="/admin" className="underline text-blue-600">/admin</a> 页面登录（admin/admin123）</p>
              <p><strong>2. 回到此页：</strong>登录后刷新此页面</p>
              <p><strong>3. 测试认证：</strong>点击下面的测试按钮</p>
            </div>
          </div>

          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow p-6 mb-6`}>
            <h2 className="text-xl font-semibold mb-4">认证状态</h2>
            <div className="space-y-2 mb-4">
              <p><strong>已认证:</strong> {authStatus ? '✅ 是' : '❌ 否'}</p>
              <p><strong>用户:</strong> {user ? user.username : '未登录'}</p>
              <p><strong>Token:</strong> {token ? `${token.substring(0, 20)}...` : '无'}</p>
            </div>
            
            <div className="space-x-4">
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
                测试保存
              </button>
            </div>
          </div>

          {testResult && (
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow p-6`}>
              <h2 className="text-xl font-semibold mb-4">测试结果</h2>
              <pre className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded text-sm overflow-x-auto`}>
                {testResult}
              </pre>
            </div>
          )}

          <div className={`mt-8 p-6 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'}`}>
              🎯 当前状态
            </h2>
            <div className={`space-y-2 ${theme === 'dark' ? 'text-yellow-200' : 'text-yellow-700'}`}>
              <p>✅ 修复了 window.innerWidth 错误</p>
              <p>✅ 修复了 JWT "Subject must be a string" 错误</p>
              <p>✅ 修复了重复 import 错误</p>
              <p>🔄 测试认证和保存功能</p>
            </div>
          </div>
        </div>
      </div>
      
      <AdminToolbar />
    </div>
  )
}
