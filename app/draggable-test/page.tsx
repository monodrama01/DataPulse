"use client"

import { Navigation } from "@/components/navigation"
import { DraggableAdminPanel } from "@/components/DraggableAdminPanel"
import { ContentSelector } from "@/components/ContentSelector"
import { AdminToolbar } from "@/components/AdminToolbar"
import { useTheme } from "@/components/theme-provider"
import { useState, useEffect } from "react"
import ReactECharts from 'echarts-for-react'

export default function DraggableTestPage() {
  const { theme } = useTheme()
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleContentSelect = (content: any) => {
    setSelectedContent(content)
  }

  const handleContentChange = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8`}>
          
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              🎯 可拖动管理面板测试
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              点击内容选择，使用右侧可拖动面板进行编辑
            </p>
          </div>

          {/* 使用说明 */}
          <div className={`p-6 rounded-lg mb-8 ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
              📋 使用说明
            </h2>
            <div className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <p><strong>1. 登录：</strong>访问 /admin 页面登录</p>
              <p><strong>2. 启用编辑：</strong>在URL后添加 ?admin=true</p>
              <p><strong>3. 选择内容：</strong>点击下方任意内容块</p>
              <p><strong>4. 拖动面板：</strong>抓住右侧面板顶部拖动到任意位置</p>
              <p><strong>5. 编辑内容：</strong>在面板中点击编辑按钮</p>
            </div>
          </div>

          {/* 测试内容区域 */}
          <div className="space-y-8">
            
            {/* 文本内容测试 */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                📝 文本内容
              </h3>
              <ContentSelector
                positionKey="draggable_text_1"
                contentType="text"
                pagePath="/draggable-test"
                onSelect={handleContentSelect}
              >
                <div className="p-4 border rounded-lg">
                  <p>这是一个可编辑的文本段落。点击我来选择，然后使用右侧面板编辑！</p>
                </div>
              </ContentSelector>
            </div>

            {/* 标题测试 */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                🏷️ 标题
              </h3>
              <ContentSelector
                positionKey="draggable_heading_1"
                contentType="heading"
                pagePath="/draggable-test"
                onSelect={handleContentSelect}
              >
                <div className="p-4 border rounded-lg">
                  <h2>这是一个可编辑的标题</h2>
                </div>
              </ContentSelector>
            </div>

            {/* 代码测试 */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                💻 代码
              </h3>
              <ContentSelector
                positionKey="draggable_code_1"
                contentType="code"
                pagePath="/draggable-test"
                onSelect={handleContentSelect}
              >
                <div className="p-4 border rounded-lg">
                  <pre className={`${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'} p-4 rounded-lg overflow-x-auto text-sm`}>
                    <code>{`# Python示例代码
print("Hello, World!")
for i in range(5):
    print(f"数字: {i}")`}</code>
                  </pre>
                </div>
              </ContentSelector>
            </div>

            {/* 列表测试 */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                📋 列表
              </h3>
              <ContentSelector
                positionKey="draggable_list_1"
                contentType="list"
                pagePath="/draggable-test"
                onSelect={handleContentSelect}
              >
                <div className="p-4 border rounded-lg">
                  <ul className="list-disc list-inside space-y-1">
                    <li>第一个列表项</li>
                    <li>第二个列表项</li>
                    <li>第三个列表项</li>
                  </ul>
                </div>
              </ContentSelector>
            </div>

            {/* 图表测试 */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                📊 图表
              </h3>
              <ContentSelector
                positionKey="draggable_chart_1"
                contentType="chart"
                pagePath="/draggable-test"
                onSelect={handleContentSelect}
              >
                <div className="p-4 border rounded-lg">
                  <div style={{ height: '300px' }}>
                    <ReactECharts
                      option={{
                        title: { text: '示例图表' },
                        tooltip: { trigger: 'axis' },
                        xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月'] },
                        yAxis: { type: 'value' },
                        series: [{ data: [120, 200, 150, 80, 70], type: 'line' }]
                      }}
                      style={{ height: '100%', width: '100%' }}
                      theme={theme === 'dark' ? 'dark' : 'light'}
                    />
                  </div>
                </div>
              </ContentSelector>
            </div>
          </div>

          {/* 当前选择显示 */}
          {selectedContent && (
            <div className={`mt-8 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                ✅ 当前选择
              </h3>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <p>类型: {selectedContent.contentType}</p>
                <p>位置: {selectedContent.positionKey}</p>
                <p>页面: {selectedContent.pagePath}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 可拖动管理面板 */}
      <DraggableAdminPanel
        currentContent={selectedContent}
        onContentChange={handleContentChange}
      />
      
      <AdminToolbar />
    </div>
  )
}
