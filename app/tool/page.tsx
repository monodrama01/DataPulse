'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ToolPage() {
  const router = useRouter()
  
  useEffect(() => {
    // 重定向到新的快速分析页面
    router.replace('/quick-analysis')
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">正在跳转到新版快速分析页面...</p>
      </div>
    </div>
  )
}