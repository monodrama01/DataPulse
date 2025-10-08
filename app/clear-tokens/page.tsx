"use client"

import { useEffect, useState } from 'react'
import { clearAuth } from '@/lib/auth'

export default function ClearTokensPage() {
  const [cleared, setCleared] = useState(false)

  useEffect(() => {
    // 清除所有认证信息
    clearAuth()
    
    // 清除所有localStorage
    if (typeof window !== 'undefined') {
      localStorage.clear()
      sessionStorage.clear()
      
      // 清除所有cookies
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      });
    }
    
    setCleared(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">🧹 清除认证信息</h1>
        
        {cleared ? (
          <div className="text-center">
            <div className="mb-4 text-green-600">
              ✅ 已清除所有认证信息
            </div>
            <p className="text-sm text-gray-600 mb-4">
              所有token、cookies和缓存已清除
            </p>
            <div className="space-y-2">
              <a 
                href="/admin" 
                className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center"
              >
                重新登录
              </a>
              <a 
                href="/working-test" 
                className="block w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 text-center"
              >
                测试页面
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">正在清除...</p>
          </div>
        )}
      </div>
    </div>
  )
}
