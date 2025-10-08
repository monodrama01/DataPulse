"use client"

import React, { useState, useEffect } from 'react'
import { UniversalEditableContent } from "@/components/UniversalEditableContent"
import { ContentAdder } from "@/components/ContentAdder"
import { useTheme } from "@/components/theme-provider"

interface ContentBlock {
  id: string
  positionKey: string
  contentType: 'text' | 'code' | 'chart' | 'list' | 'heading'
  order: number
}

interface DynamicContentContainerProps {
  pagePath: string
  className?: string
}

export function DynamicContentContainer({ pagePath, className = '' }: DynamicContentContainerProps) {
  const { theme } = useTheme()
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 检查是否为管理员模式
  const isAdminMode = () => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('admin_token') && window.location.search.includes('admin=true')
  }

  // 从本地存储加载内容块配置
  useEffect(() => {
    const storageKey = `content_blocks_${pagePath}`
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        setContentBlocks(JSON.parse(saved))
      } catch (e) {
        console.error('解析内容块配置失败:', e)
      }
    }
    setIsLoading(false)
  }, [pagePath])

  // 保存内容块配置到本地存储
  const saveContentBlocks = (blocks: ContentBlock[]) => {
    const storageKey = `content_blocks_${pagePath}`
    localStorage.setItem(storageKey, JSON.stringify(blocks))
    setContentBlocks(blocks)
  }

  // 添加新内容块
  const handleAddContent = (contentType: string, positionKey: string) => {
    const newBlock: ContentBlock = {
      id: positionKey,
      positionKey,
      contentType: contentType as ContentBlock['contentType'],
      order: contentBlocks.length
    }
    
    const updatedBlocks = [...contentBlocks, newBlock].sort((a, b) => a.order - b.order)
    saveContentBlocks(updatedBlocks)
  }

  // 删除内容块
  const handleDeleteContent = (blockId: string) => {
    if (confirm('确定要删除这个内容块吗？')) {
      const updatedBlocks = contentBlocks.filter(block => block.id !== blockId)
      saveContentBlocks(updatedBlocks)
    }
  }

  // 移动内容块
  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const blockIndex = contentBlocks.findIndex(block => block.id === blockId)
    if (blockIndex === -1) return

    const newBlocks = [...contentBlocks]
    if (direction === 'up' && blockIndex > 0) {
      [newBlocks[blockIndex], newBlocks[blockIndex - 1]] = [newBlocks[blockIndex - 1], newBlocks[blockIndex]]
    } else if (direction === 'down' && blockIndex < newBlocks.length - 1) {
      [newBlocks[blockIndex], newBlocks[blockIndex + 1]] = [newBlocks[blockIndex + 1], newBlocks[blockIndex]]
    }

    // 重新分配order
    newBlocks.forEach((block, index) => {
      block.order = index
    })

    saveContentBlocks(newBlocks)
  }

  if (isLoading) {
    return (
      <div className={`${className} space-y-4`}>
        <div className={`animate-pulse h-8 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
        <div className={`animate-pulse h-32 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
      </div>
    )
  }

  return (
    <div className={`${className} relative`}>
      {/* 内容块列表 */}
      <div className="space-y-6">
        {contentBlocks.map((block, index) => (
          <div key={block.id} className="relative group">
            {/* 管理员控制按钮 */}
            {isAdminMode() && (
              <div className="absolute -left-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 z-10">
                {index > 0 && (
                  <button
                    onClick={() => moveBlock(block.id, 'up')}
                    className="w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs flex items-center justify-center"
                    title="上移"
                  >
                    ↑
                  </button>
                )}
                {index < contentBlocks.length - 1 && (
                  <button
                    onClick={() => moveBlock(block.id, 'down')}
                    className="w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs flex items-center justify-center"
                    title="下移"
                  >
                    ↓
                  </button>
                )}
                <button
                  onClick={() => handleDeleteContent(block.id)}
                  className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded text-xs flex items-center justify-center"
                  title="删除"
                >
                  ×
                </button>
              </div>
            )}
            
            {/* 内容块 */}
            <UniversalEditableContent
              positionKey={block.positionKey}
              contentType={block.contentType}
              pagePath={pagePath}
              className="min-h-[50px]"
            />
          </div>
        ))}
      </div>

      {/* 空状态提示 */}
      {contentBlocks.length === 0 && isAdminMode() && (
        <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-medium mb-2">还没有内容块</h3>
          <p className="text-sm mb-4">点击左下角的 + 按钮开始添加内容</p>
        </div>
      )}

      {/* 内容添加器 */}
      <ContentAdder 
        onAdd={handleAddContent}
        pagePath={pagePath}
      />
    </div>
  )
}
