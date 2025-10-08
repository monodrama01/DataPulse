/**
 * 前端内容获取API工具函数
 * 用于在前端页面中获取后台管理的动态内容
 */

const API_BASE_URL = 'http://localhost:5000/api'

// 内容类型定义
export interface ContentText {
  id: number
  position_key: string
  title: string
  content: string
  page_path: string
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export interface ContentCode {
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

export interface ContentChart {
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

export interface ContentResponse {
  texts?: ContentText[]
  codes?: ContentCode[]
  charts?: ContentChart[]
}

/**
 * 根据位置标识获取内容
 * @param positionKey 位置标识，如 'homepage_intro'
 * @param contentType 内容类型：'text' | 'code' | 'chart' | 'all'
 * @returns Promise<ContentResponse>
 */
export async function getContentByPosition(
  positionKey: string,
  contentType: 'text' | 'code' | 'chart' | 'all' = 'all'
): Promise<ContentResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/public/content?position_key=${encodeURIComponent(positionKey)}&type=${contentType}`,
      { 
        method: 'GET',
        cache: 'no-store' // 确保获取最新内容
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
 * 根据页面路径获取内容
 * @param pagePath 页面路径，如 '/machine-learning/svm'
 * @param contentType 内容类型：'text' | 'code' | 'chart' | 'all'
 * @returns Promise<ContentResponse>
 */
export async function getContentByPage(
  pagePath: string,
  contentType: 'text' | 'code' | 'chart' | 'all' = 'all'
): Promise<ContentResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/public/content?page_path=${encodeURIComponent(pagePath)}&type=${contentType}`,
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
    console.error('获取页面内容失败:', error)
    return {}
  }
}

/**
 * 获取特定文本内容
 * @param positionKey 位置标识
 * @returns Promise<string> 返回HTML内容
 */
export async function getTextContent(positionKey: string): Promise<string> {
  const content = await getContentByPosition(positionKey, 'text')
  if (content.texts && content.texts.length > 0) {
    return content.texts[0].content
  }
  return ''
}

/**
 * 获取特定代码片段
 * @param positionKey 位置标识
 * @returns Promise<ContentCode | null>
 */
export async function getCodeContent(positionKey: string): Promise<ContentCode | null> {
  const content = await getContentByPosition(positionKey, 'code')
  if (content.codes && content.codes.length > 0) {
    return content.codes[0]
  }
  return null
}

/**
 * 获取特定图表
 * @param positionKey 位置标识
 * @returns Promise<ContentChart | null>
 */
export async function getChartContent(positionKey: string): Promise<ContentChart | null> {
  const content = await getContentByPosition(positionKey, 'chart')
  if (content.charts && content.charts.length > 0) {
    return content.charts[0]
  }
  return null
}

/**
 * 动态内容组件的Props类型
 */
export interface DynamicContentProps {
  positionKey: string
  fallbackContent?: string
  className?: string
}

// React Hook需要在组件中单独实现，这里只提供API函数
