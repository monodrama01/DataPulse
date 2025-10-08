"use client"

import { UniversalEditableContent } from "@/components/UniversalEditableContent"
import { AdminToolbar } from "@/components/AdminToolbar"
import { useTheme } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"

export default function TestEditPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8`}>
          
          {/* 页面标题 */}
          <h1 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            全功能编辑测试页面
          </h1>

          {/* 测试文本编辑 */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              📝 文本内容测试
            </h2>
            <UniversalEditableContent
              positionKey="test_text_1"
              contentType="text"
              fallbackContent="<p>这是一个测试文本。你可以在管理员模式下编辑这段内容。支持<strong>加粗</strong>、<em>斜体</em>等HTML标签。</p>"
              pagePath="/test-edit"
            />
          </div>

          {/* 测试标题编辑 */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              📋 标题测试
            </h2>
            <UniversalEditableContent
              positionKey="test_heading_1"
              contentType="heading"
              fallbackContent="<h3>这是一个可编辑的标题</h3>"
              pagePath="/test-edit"
            />
          </div>

          {/* 测试列表编辑 */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              📋 列表测试
            </h2>
            <UniversalEditableContent
              positionKey="test_list_1"
              contentType="list"
              fallbackContent={`
                <ul>
                  <li>列表项目1</li>
                  <li>列表项目2</li>
                  <li>列表项目3</li>
                </ul>
              `}
              pagePath="/test-edit"
            />
          </div>

          {/* 测试代码编辑 */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              💻 代码测试
            </h2>
            <UniversalEditableContent
              positionKey="test_code_1"
              contentType="code"
              fallbackContent={`# Python示例代码
import pandas as pd
import numpy as np

# 创建数据
data = {'A': [1, 2, 3], 'B': [4, 5, 6]}
df = pd.DataFrame(data)
print(df)`}
              pagePath="/test-edit"
            />
          </div>

          {/* 测试图表 */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              📊 图表测试
            </h2>
            
            {/* 折线图 */}
            <div className="mb-6">
              <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                折线图示例
              </h3>
              <UniversalEditableContent
                positionKey="test_line_chart"
                contentType="chart"
                pagePath="/test-edit"
              />
            </div>

            {/* 柱状图 */}
            <div className="mb-6">
              <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                柱状图示例
              </h3>
              <UniversalEditableContent
                positionKey="test_bar_chart"
                contentType="chart"
                pagePath="/test-edit"
              />
            </div>

            {/* 饼图 */}
            <div className="mb-6">
              <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                饼图示例
              </h3>
              <UniversalEditableContent
                positionKey="test_pie_chart"
                contentType="chart"
                pagePath="/test-edit"
              />
            </div>
          </div>

          {/* 使用说明 */}
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
              🎯 测试说明
            </h3>
            <UniversalEditableContent
              positionKey="test_instructions"
              contentType="text"
              fallbackContent={`
                <ol>
                  <li><strong>登录管理员</strong>：访问 <a href="/admin">/admin</a> 页面</li>
                  <li><strong>开启编辑模式</strong>：在URL后添加 <code>?admin=true</code></li>
                  <li><strong>编辑内容</strong>：悬停在内容上，点击彩色编辑按钮</li>
                  <li><strong>测试功能</strong>：
                    <ul>
                      <li>蓝色按钮 = 文本/标题/列表编辑</li>
                      <li>绿色按钮 = 代码编辑</li>
                      <li>紫色按钮 = 图表编辑</li>
                    </ul>
                  </li>
                  <li><strong>保存测试</strong>：编辑后保存，刷新页面查看效果</li>
                </ol>
              `}
              pagePath="/test-edit"
            />
          </div>
        </div>
      </div>
      
      <AdminToolbar />
    </div>
  )
}
