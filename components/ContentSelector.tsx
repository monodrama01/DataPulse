"use client"

import React, { useState, useEffect } from 'react'
import { useTheme } from "@/components/theme-provider"
import { isAdminMode } from '@/lib/auth'

interface ContentSelectorProps {
  positionKey: string
  contentType: 'text' | 'code' | 'chart' | 'list' | 'heading'
  pagePath: string
  onSelect: (content: { positionKey: string; contentType: string; pagePath: string }) => void
  children: React.ReactNode
}

export function ContentSelector({ 
  positionKey, 
  contentType, 
  pagePath, 
  onSelect, 
  children 
}: ContentSelectorProps) {
  const { theme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = () => {
    onSelect({ positionKey, contentType, pagePath })
  }

  if (!mounted || !isAdminMode()) {
    return <>{children}</>
  }

  return (
    <div
      className={`relative transition-all duration-200 ${
        isHovered 
          ? `ring-2 ring-blue-400 ring-opacity-50 rounded ${theme === 'dark' ? 'bg-blue-900/10' : 'bg-blue-50/50'}` 
          : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {children}
      
      {/* 选择指示器 */}
      {isHovered && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer">
            ✓
          </div>
        </div>
      )}
      
      {/* 内容类型标签 */}
      {isHovered && (
        <div className="absolute -top-6 left-0 z-10">
          <div className={`px-2 py-1 rounded text-xs ${
            contentType === 'text' ? 'bg-blue-500' :
            contentType === 'code' ? 'bg-green-500' :
            contentType === 'chart' ? 'bg-purple-500' :
            contentType === 'list' ? 'bg-orange-500' :
            'bg-red-500'
          } text-white`}>
            {contentType}
          </div>
        </div>
      )}
    </div>
  )
}
