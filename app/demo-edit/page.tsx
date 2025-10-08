"use client"

import { Navigation } from "@/components/navigation"
import { UniversalEditableContent } from "@/components/UniversalEditableContent"
import { AdminToolbar } from "@/components/AdminToolbar"
import { useTheme } from "@/components/theme-provider"

export default function DemoEditPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8`}>
          
          {/* 页面标题 - 可编辑 */}
          <UniversalEditableContent
            positionKey="demo_page_title"
            contentType="heading"
            fallbackContent="<h1>可视化编辑演示页面</h1>"
            className="mb-8"
            pagePath="/demo-edit"
          />

          {/* 介绍文本 - 可编辑 */}
          <UniversalEditableContent
            positionKey="demo_intro_text"
            contentType="text"
            fallbackContent="<p>这是一个演示页面，展示如何使用可视化编辑功能。登录管理员后，在URL后添加 <code>?admin=true</code> 即可进入编辑模式。</p>"
            className="mb-8"
            pagePath="/demo-edit"
          />

          {/* 特性列表 - 可编辑 */}
          <UniversalEditableContent
            positionKey="demo_features_list"
            contentType="list"
            fallbackContent={`
              <h3>主要特性：</h3>
              <ul>
                <li>✨ 可视化编辑：直接在页面上编辑内容</li>
                <li>📝 多种内容类型：文本、代码、图表、列表、标题</li>
                <li>📊 ECharts图表：支持折线图、柱状图、饼图</li>
                <li>🎯 精确定位：通过positionKey控制显示位置</li>
                <li>💾 实时保存：编辑后立即保存到数据库</li>
              </ul>
            `}
            className="mb-8"
            pagePath="/demo-edit"
          />

          {/* 代码示例 - 可编辑 */}
          <div className="mb-8">
            <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              代码示例
            </h3>
            <UniversalEditableContent
              positionKey="demo_code_example"
              contentType="code"
              fallbackContent={`# Python数据分析示例
import pandas as pd
import numpy as np

# 创建示例数据
data = {
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'score': [85, 92, 78]
}

df = pd.DataFrame(data)
print(df.head())`}
              className="mb-4"
              pagePath="/demo-edit"
            />
          </div>

          {/* 图表展示区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* 折线图 */}
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                数据趋势图
              </h3>
              <UniversalEditableContent
                positionKey="demo_line_chart"
                contentType="chart"
                className="mb-4"
                pagePath="/demo-edit"
              />
            </div>

            {/* 柱状图 */}
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                销售数据
              </h3>
              <UniversalEditableContent
                positionKey="demo_bar_chart"
                contentType="chart"
                className="mb-4"
                pagePath="/demo-edit"
              />
            </div>
          </div>

          {/* 饼图 - 全宽 */}
          <div className="mb-8">
            <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              市场份额分析
            </h3>
            <UniversalEditableContent
              positionKey="demo_pie_chart"
              contentType="chart"
              className="mb-4"
              pagePath="/demo-edit"
            />
          </div>

          {/* 使用说明 */}
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
              💡 使用说明
            </h3>
            <UniversalEditableContent
              positionKey="demo_usage_instructions"
              contentType="text"
              fallbackContent={`
                <ol>
                  <li><strong>登录管理员</strong>：访问 /admin 页面，使用 admin / admin123 登录</li>
                  <li><strong>开启编辑模式</strong>：在任何页面URL后添加 <code>?admin=true</code></li>
                  <li><strong>编辑内容</strong>：将鼠标悬停在内容上，点击出现的编辑按钮</li>
                  <li><strong>保存更改</strong>：编辑完成后点击保存按钮</li>
                  <li><strong>查看效果</strong>：内容立即更新，刷新页面查看最终效果</li>
                </ol>
              `}
              pagePath="/demo-edit"
            />
          </div>

          {/* 更多示例内容区域 */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <UniversalEditableContent
              positionKey="demo_card_1"
              contentType="text"
              fallbackContent="<h4>卡片1</h4><p>这里可以放置任何文本内容</p>"
              className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
              pagePath="/demo-edit"
            />
            
            <UniversalEditableContent
              positionKey="demo_card_2"
              contentType="list"
              fallbackContent="<h4>功能列表</h4><ul><li>功能1</li><li>功能2</li><li>功能3</li></ul>"
              className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
              pagePath="/demo-edit"
            />
            
            <UniversalEditableContent
              positionKey="demo_card_3"
              contentType="text"
              fallbackContent="<h4>说明文档</h4><p>详细的使用说明和注意事项</p>"
              className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
              pagePath="/demo-edit"
            />
          </div>
        </div>
      </div>
      
      {/* 管理员工具栏 */}
      <AdminToolbar />
    </div>
  )
}
