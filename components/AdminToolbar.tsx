"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Edit, Eye, Settings, LogOut, User } from 'lucide-react'
import { isAuthenticated, getUser, clearAuth, isAdminMode } from '@/lib/auth'

export function AdminToolbar() {
  const { theme } = useTheme()
  const [isAdmin, setIsAdmin] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // 简化认证状态检查
    const checkAuth = () => {
      const authenticated = isAuthenticated()
      const currentUser = getUser()
      
      setIsAdmin(authenticated)
      setUser(currentUser)
      setEditMode(authenticated) // 简化：如果认证了就是编辑模式
    }
    
    checkAuth()
    
    // 监听URL变化
    const handleUrlChange = () => {
      checkAuth()
    }
    
    window.addEventListener('popstate', handleUrlChange)
    return () => window.removeEventListener('popstate', handleUrlChange)
  }, [])

  const toggleEditMode = () => {
    const url = new URL(window.location.href)
    if (editMode) {
      url.searchParams.delete('admin')
    } else {
      url.searchParams.set('admin', 'true')
    }
    window.location.href = url.toString()
  }

  const goToAdmin = () => {
    window.open('/admin', '_blank')
  }

  const logout = () => {
    clearAuth()
    window.location.href = '/'
  }

  if (!isAdmin) return null

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg border p-3`}>
      <div className="flex items-center space-x-2">
        <div className="flex items-center text-xs text-gray-500 mr-2">
          <User size={12} className="mr-1" />
          {user?.username || 'Admin'}
        </div>
        
        <Button
          size="sm"
          variant={editMode ? "default" : "outline"}
          onClick={toggleEditMode}
          className={editMode ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {editMode ? <Eye size={14} /> : <Edit size={14} />}
          <span className="ml-1 text-xs">
            {editMode ? '预览模式' : '编辑模式'}
          </span>
        </Button>

        <Button size="sm" variant="outline" onClick={goToAdmin}>
          <Settings size={14} />
          <span className="ml-1 text-xs">后台</span>
        </Button>

        <Button size="sm" variant="outline" onClick={logout}>
          <LogOut size={14} />
          <span className="ml-1 text-xs">退出</span>
        </Button>
      </div>
      
      {editMode && (
        <div className="mt-2 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 p-2 rounded">
          🎯 编辑模式已开启！将鼠标悬停在内容上即可编辑
        </div>
      )}
    </div>
  )
}
