"use client"

import { Navigation } from "@/components/navigation"
import { UniversalEditableContent } from "@/components/UniversalEditableContent"
import { SimpleContentAdder } from "@/components/SimpleContentAdder"
import { AdminToolbar } from "@/components/AdminToolbar"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react"

type ContentType = 'text' | 'code' | 'heading' | 'list' | 'image'

export default function TestNewFeaturesPage() {
  const { theme } = useTheme()
  const [contentBlocks, setContentBlocks] = useState<Array<{ id: string; type: ContentType }>>([
    { id: 'welcome', type: 'text' },
    { id: 'example_code', type: 'code' }
  ])

  const addContent = (type: string) => {
    const newId = `${type}_${Date.now()}`
    setContentBlocks(prev => [...prev, { id: newId, type: type as ContentType }])
  }

  const removeContent = (id: string) => {
    if (confirm('确定要删除这个内容块吗？')) {
      setContentBlocks(prev => prev.filter(block => block.id !== id))
    }
  }

  const moveContent = (id: string, direction: 'up' | 'down') => {
    setContentBlocks(prev => {
      const index = prev.findIndex(block => block.id === id)
      if (index === -1) return prev
      
      const newBlocks = [...prev]
      if (direction === 'up' && index > 0) {
        [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]]
      } else if (direction === 'down' && index < newBlocks.length - 1) {
        [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]]
      }
      
      return newBlocks
    })
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8`}>
          
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              🧪 新功能测试页面
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              测试保存功能、登录保持和内容添加功能
            </p>
          </div>

          {/* 功能说明 */}
          <div className={`p-6 rounded-lg mb-8 ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
              🎯 测试步骤
            </h2>
            <div className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <p><strong>1. 登录测试：</strong>访问 /admin 页面登录，然后回到这里，应该保持登录状态</p>
              <p><strong>2. 编辑测试：</strong>在URL后添加 ?admin=true，悬停内容编辑并保存</p>
              <p><strong>3. 添加测试：</strong>点击下方的"添加内容"按钮，选择内容类型</p>
              <p><strong>4. 管理测试：</strong>使用上移、下移、删除按钮管理内容</p>
            </div>
          </div>

          {/* 页面顶部添加按钮 */}
          <SimpleContentAdder 
            onAddContent={addContent}
            position="top"
          />

          {/* 动态内容块 */}
          <div className="space-y-6 my-8">
            {contentBlocks.map((block, index) => (
              <div key={block.id} className="relative">
                
                {/* 内容块控制 */}
                <SimpleContentAdder
                  showControls={true}
                  onMoveUp={() => moveContent(block.id, 'up')}
                  onMoveDown={() => moveContent(block.id, 'down')}
                  onDelete={() => removeContent(block.id)}
                  canMoveUp={index > 0}
                  canMoveDown={index < contentBlocks.length - 1}
                  position="top"
                />
                
                {/* 内容块 */}
                <div className="p-4 border rounded-lg">
                  <UniversalEditableContent
                    positionKey={block.id}
                    contentType={block.type}
                    fallbackContent={
                      block.type === 'text' ? '<p>这是一个文本内容块，点击编辑按钮进行修改</p>' :
                      block.type === 'code' ? 'print("Hello, World!")' :
                      block.type === 'heading' ? '<h2>这是一个标题</h2>' :
                      block.type === 'list' ? '<ul><li>列表项1</li><li>列表项2</li></ul>' :
                      ''
                    }
                    pagePath="/test-new-features"
                    className="min-h-[60px]"
                  />
                </div>

                {/* 内容块底部添加按钮 */}
                <SimpleContentAdder 
                  onAddContent={(type) => {
                    const newId = `${type}_${Date.now()}`
                    setContentBlocks(prev => {
                      const newBlocks = [...prev]
                      newBlocks.splice(index + 1, 0, { id: newId, type: type as ContentType })
                      return newBlocks
                    })
                  }}
                  position="bottom"
                />
              </div>
            ))}
          </div>

          {/* 页面底部添加按钮 */}
          <SimpleContentAdder 
            onAddContent={addContent}
            position="bottom"
          />

          {/* 调试信息 */}
          <div className={`mt-12 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              🔧 调试信息
            </h3>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>当前内容块数量: {contentBlocks.length}</p>
              <p>内容块ID: {contentBlocks.map(b => b.id).join(', ')}</p>
              <p>页面路径: /test-new-features</p>
            </div>
          </div>
        </div>
      </div>
      
      <AdminToolbar />
    </div>
  )
}
