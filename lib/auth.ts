"use client"

// 认证相关工具函数
export const AUTH_KEY = 'admin_token'
export const USER_KEY = 'admin_user'

export interface User {
  username: string
  loginTime: number
}

// 保存登录状态
export const saveAuthToken = (token: string, username: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify({
      username,
      loginTime: Date.now()
    }))
  }
}

// 获取认证token
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_KEY)
  }
  return null
}

// 获取用户信息
export const getUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem(USER_KEY)
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch (e) {
        return null
      }
    }
  }
  return null
}

// 检查是否已登录
export const isAuthenticated = (): boolean => {
  const token = getAuthToken()
  const user = getUser()
  
  if (!token || !user) return false
  
  // 检查token是否过期（24小时）
  const now = Date.now()
  const loginTime = user.loginTime
  const maxAge = 24 * 60 * 60 * 1000 // 24小时
  
  if (now - loginTime > maxAge) {
    clearAuth()
    return false
  }
  
  return true
}

// 清除认证信息
export const clearAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(USER_KEY)
  }
}

// 检查管理员模式
export const isAdminMode = (): boolean => {
  if (typeof window === 'undefined') return false
  return isAuthenticated() && window.location.search.includes('admin=true')
}

// 验证token有效性（简化版，只检查本地存储）
export const verifyToken = async (): Promise<boolean> => {
  return isAuthenticated()
}
