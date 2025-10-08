"use client"

import React, { useState, useEffect } from 'react'
import { useTheme } from "@/components/theme-provider"
import { FloatingContentToolbar } from "./FloatingContentToolbar"
import { isAdminMode } from '@/lib/auth'
import ReactECharts from 'echarts-for-react'

interface SimpleEditableContentProps {
  positionKey: string
  contentType: 'text' | 'code' | 'chart' | 'list' | 'heading'
  fallbackContent?: string
  className?: string
  pagePath: string
}

export function SimpleEditableContent({
  positionKey,
  contentType,
  fallbackContent = '',
  className = '',
  pagePath
}: SimpleEditableContentProps) {
  const { theme } = useTheme()
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    fetchContent()
  }, [positionKey, contentType, refreshKey])

  const fetchContent = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/public/content?position_key=${positionKey}&type=${contentType}`
      )
      if (response.ok) {
        const data = await response.json()
        
        if (contentType === 'text' && data.texts?.length > 0) {
          setContent(data.texts[0])
        } else if (contentType === 'code' && data.codes?.length > 0) {
          setContent(data.codes[0])
        } else if (contentType === 'chart' && data.charts?.length > 0) {
          setContent(data.charts[0])
        }
      }
    } catch (error) {
      console.error('获取内容失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleContentChange = () => {
    setRefreshKey(prev => prev + 1)
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className={`animate-pulse ${className}`}>
          <div className={`h-8 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
          <div className={`h-20 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
        </div>
      )
    }

    if (!content && !fallbackContent) {
      if (isAdminMode()) {
        return (
          <div className={`border-2 border-dashed border-gray-400 p-6 rounded-lg text-center ${className}`}>
            <p className="text-gray-500 mb-2">暂无内容</p>
            <p className="text-xs text-gray-400">悬停并点击设置按钮开始编辑</p>
          </div>
        )
      }
      return null
    }

    switch (contentType) {
      case 'text':
      case 'heading':
      case 'list':
        return (
          <div 
            className={className}
            dangerouslySetInnerHTML={{ 
              __html: content?.content || fallbackContent 
            }}
          />
        )

      case 'code':
        return (
          <div className={className}>
            {content?.title && (
              <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                {content.title}
              </h4>
            )}
            <pre className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'} p-4 rounded-lg overflow-x-auto text-sm`}>
              <code>{content?.code || fallbackContent}</code>
            </pre>
            {content?.description && (
              <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {content.description}
              </p>
            )}
          </div>
        )

      case 'chart':
        if (!content?.chart_data) return null
        
        const sizeMap = {
          small: '300px',
          medium: '400px',
          large: '500px'
        }
        
        return (
          <div className={`w-full ${className}`}>
            {content.title && (
              <h4 className={`text-lg font-semibold mb-4 text-center ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                {content.title}
              </h4>
            )}
            <div style={{ height: sizeMap[content.display_size as keyof typeof sizeMap] || '400px' }}>
              <ReactECharts
                option={content.chart_data}
                style={{ height: '100%', width: '100%' }}
                theme={theme === 'dark' ? 'dark' : 'light'}
              />
            </div>
          </div>
        )

      default:
        return (
          <div className={className}>
            {content?.content || fallbackContent}
          </div>
        )
    }
  }

  return (
    <div className={`relative group ${isAdminMode() ? 'hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50 rounded' : ''}`}>
      {renderContent()}
      
      {/* 管理员工具栏 */}
      {isAdminMode() && (
        <FloatingContentToolbar
          positionKey={positionKey}
          contentType={contentType}
          pagePath={pagePath}
          onContentChange={handleContentChange}
        />
      )}
    </div>
  )
}
