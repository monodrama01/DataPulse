/**
 * 动态内容组件
 * 用于在前端页面中显示后台管理的动态内容
 */

"use client"

import React, { useEffect, useState } from 'react'
import { useTheme } from "@/components/theme-provider"
// @ts-ignore - react-syntax-highlighter 缺少类型定义
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-ignore
import { tomorrow, prism } from 'react-syntax-highlighter/dist/esm/styles/prism'

// 类型定义
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

interface DynamicContentProps {
  positionKey: string
  fallbackContent?: string
  className?: string
}

// API函数
const API_BASE_URL = 'http://localhost:5000/api'

async function getContentByPosition(positionKey: string, contentType: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/public/content?position_key=${encodeURIComponent(positionKey)}&type=${contentType}`,
      { 
        method: 'GET',
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('获取内容失败:', error)
    return {}
  }
}

/**
 * 动态文本内容组件
 */
export function DynamicText({ 
  positionKey, 
  fallbackContent = '', 
  className = '' 
}: DynamicContentProps) {
  const [content, setContent] = useState<string>(fallbackContent)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    async function fetchContent() {
      try {
        const result = await getContentByPosition(positionKey, 'text')
        if (result.texts && result.texts.length > 0) {
          setContent(result.texts[0].content)
        }
      } catch (error) {
        console.error('获取文本内容失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [positionKey])

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className={`h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4 mb-2`}></div>
        <div className={`h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/2`}></div>
      </div>
    )
  }

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

/**
 * 动态代码组件
 */
export function DynamicCode({ 
  positionKey, 
  fallbackContent = '', 
  className = '' 
}: DynamicContentProps) {
  const [code, setCode] = useState<ContentCode | null>(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    async function fetchContent() {
      try {
        const result = await getContentByPosition(positionKey, 'code')
        if (result.codes && result.codes.length > 0) {
          setCode(result.codes[0])
        }
      } catch (error) {
        console.error('获取代码内容失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [positionKey])

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className={`h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/4 mb-2`}></div>
        <div className={`h-32 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
      </div>
    )
  }

  if (!code) {
    return fallbackContent ? (
      <pre className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'} p-4 rounded-lg overflow-x-auto ${className}`}>
        <code>{fallbackContent}</code>
      </pre>
    ) : null
  }

  return (
    <div className={className}>
      {code.title && (
        <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          {code.title}
        </h4>
      )}
      <SyntaxHighlighter
        language={code.language}
        style={theme === 'dark' ? tomorrow : prism}
        customStyle={{
          borderRadius: '0.5rem',
          fontSize: '0.875rem'
        }}
      >
        {code.code}
      </SyntaxHighlighter>
      {code.description && (
        <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {code.description}
        </p>
      )}
    </div>
  )
}

/**
 * 动态图表组件
 */
export function DynamicChart({ 
  positionKey, 
  fallbackContent = '', 
  className = '' 
}: DynamicContentProps) {
  const [chart, setChart] = useState<ContentChart | null>(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    async function fetchContent() {
      try {
        const result = await getContentByPosition(positionKey, 'chart')
        if (result.charts && result.charts.length > 0) {
          setChart(result.charts[0])
        }
      } catch (error) {
        console.error('获取图表内容失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [positionKey])

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className={`h-64 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
      </div>
    )
  }

  if (!chart) {
    return fallbackContent ? (
      <div className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'} p-4 rounded-lg ${className}`}>
        {fallbackContent}
      </div>
    ) : null
  }

  const sizeClasses = {
    small: 'h-48',
    medium: 'h-64',
    large: 'h-96'
  }

  return (
    <div className={className}>
      {chart.title && (
        <h4 className={`text-lg font-semibold mb-4 text-center ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          {chart.title}
        </h4>
      )}
      <div className={`${sizeClasses[chart.display_size]} flex items-center justify-center rounded-lg border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
        {chart.data_source === 'upload' && chart.file_path ? (
          <img 
            src={`http://localhost:5000/${chart.file_path}`}
            alt={chart.title}
            className="max-w-full max-h-full object-contain"
          />
        ) : chart.data_source === 'generated' && chart.chart_data ? (
          // 这里可以集成图表库如Chart.js或Recharts来渲染生成的图表
          <div className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>图表类型: {chart.chart_type}</p>
            <p className="text-sm mt-2">生成的图表数据</p>
            <pre className="text-xs mt-2 max-w-xs overflow-hidden">
              {JSON.stringify(chart.chart_data, null, 2).substring(0, 200)}...
            </pre>
          </div>
        ) : (
          <div className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>图表加载中...</p>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 通用动态内容组件
 * 自动根据位置标识获取并显示所有类型的内容
 */
export function DynamicContent({ 
  positionKey, 
  fallbackContent = '', 
  className = '' 
}: DynamicContentProps) {
  const [content, setContent] = useState<{
    texts: ContentText[]
    codes: ContentCode[]
    charts: ContentChart[]
  }>({ texts: [], codes: [], charts: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContent() {
      try {
        const result = await getContentByPosition(positionKey, 'all')
        setContent({
          texts: result.texts || [],
          codes: result.codes || [],
          charts: result.charts || []
        })
      } catch (error) {
        console.error('获取内容失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [positionKey])

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  const hasContent = content.texts.length > 0 || content.codes.length > 0 || content.charts.length > 0

  if (!hasContent && !fallbackContent) {
    return null
  }

  return (
    <div className={className}>
      {/* 渲染文本内容 */}
      {content.texts.map((text) => (
        <div 
          key={text.id} 
          dangerouslySetInnerHTML={{ __html: text.content }}
          className="mb-4"
        />
      ))}

      {/* 渲染代码片段 */}
      {content.codes.map((code) => (
        <DynamicCode 
          key={code.id}
          positionKey={`code_${code.id}`}
          className="mb-4"
        />
      ))}

      {/* 渲染图表 */}
      {content.charts.map((chart) => (
        <DynamicChart 
          key={chart.id}
          positionKey={`chart_${chart.id}`}
          className="mb-4"
        />
      ))}

      {/* 如果没有内容，显示fallback */}
      {!hasContent && fallbackContent && (
        <div dangerouslySetInnerHTML={{ __html: fallbackContent }} />
      )}
    </div>
  )
}

// 便捷的导出
export { DynamicText as Text, DynamicCode as Code, DynamicChart as Chart }
