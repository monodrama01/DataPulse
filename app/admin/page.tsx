"use client"

import { useState, useEffect } from 'react'
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// 已移除：复杂的Tabs与Badge组件
import { saveAuthToken, isAuthenticated, clearAuth, getUser } from '@/lib/auth'
import { LogIn, LogOut, Settings } from 'lucide-react'

// API基础URL
const API_BASE_URL = 'http://localhost:5000/api'

// 认证相关接口
interface AdminUser {
  id: number
  username: string
  email: string
}

interface LoginResponse {
  access_token: string
  user: AdminUser
  message: string
}

// 内容类型接口
interface ContentText {
  id: number
  position_key: string
  title: string
  content: string
  page_path: string
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

interface ContentCode {
  id: number
  title: string
  language: string
  code: string
  description: string
  position_key: string
  page_path: string
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

interface ContentChart {
  id: number
  title: string
  chart_type: 'line' | 'bar' | 'pie' | 'scatter'
  data_source: 'upload' | 'generated'
  file_path?: string
  chart_data?: any
  chart_config?: any
  display_size: 'small' | 'medium' | 'large'
  position_key: string
  page_path: string
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export default function AdminPage() {
  const { theme } = useTheme()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // 登录表单状态
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })
  const [loginError, setLoginError] = useState('')
  
  // 精简：不再维护文本/代码/图表的本地状态

  // API请求工具函数
  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token')
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  }

  const apiRequest = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers
      }
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || '请求失败')
    }
    
    return response.json()
  }

  // 检查认证状态
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated()
      const currentUser = getUser()
      
      if (authenticated && currentUser) {
        setIsLoggedIn(true)
        setUser(currentUser)
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [])

  // 精简：不再从后台加载内容列表
  const loadData = async () => {}

  // 登录处理
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    
    try {
      // 简化的本地认证
      const { username, password } = loginForm
      
      // 简单的用户名密码验证
      if (username === 'admin' && password === 'admin') {
        const token = 'simple-admin-token-' + Date.now()
        saveAuthToken(token, username)
        setIsLoggedIn(true)
        setUser({ username, loginTime: Date.now() })
      } else {
        throw new Error('用户名或密码错误')
      }
      
    } catch (error: any) {
      setLoginError(error.message)
    }
  }

  // 登出处理
  const handleLogout = () => {
    clearAuth()
    setIsLoggedIn(false)
    setUser(null)
  }

  // 精简：移除文本/代码/图表的CRUD逻辑

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>加载中...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center">
              <LogIn className="mr-2" size={24} />
              管理员登录
            </CardTitle>
            <CardDescription className="text-center">
              请使用管理员账户登录后台管理系统
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium">用户名</label>
                <Input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  placeholder="请输入用户名"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">密码</label>
                <Input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  placeholder="请输入密码"
                  required
                />
              </div>
              {loginError && (
                <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                  {loginError}
                </div>
              )}
              <Button type="submit" className="w-full">
                登录
              </Button>
            </form>
            <div className="mt-4 text-xs text-gray-500 text-center">
              默认账户：admin / admin123
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* 顶部导航栏 */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Settings className="mr-2" size={24} />
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                后台管理系统
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                欢迎，{typeof user === 'object' && user ? user.username || '管理员' : '管理员'}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2" size={16} />
                登出
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>欢迎，{user?.username}</CardTitle>
              <CardDescription>管理员后台，可以管理网站内容。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  当前为简化版后台，主要功能已集成在前端页面中。
                </div>
                <div>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="mr-2" size={16} /> 退出登录
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
