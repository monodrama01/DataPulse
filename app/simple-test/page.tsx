"use client"

import { Navigation } from "@/components/navigation"
import { SimpleEditableContent } from "@/components/SimpleEditableContent"
import { AdminToolbar } from "@/components/AdminToolbar"
import { useTheme } from "@/components/theme-provider"

export default function SimpleTestPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8`}>
          
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              🔧 简化测试页面
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              测试新的浮动工具栏和简化编辑功能
            </p>
          </div>

          {/* 使用说明 */}
          <div className={`p-6 rounded-lg mb-8 ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
              📋 操作指南
            </h2>
            <div className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <p><strong>1. 登录：</strong>访问 /admin 页面登录</p>
              <p><strong>2. 启用编辑：</strong>在URL后添加 ?admin=true</p>
              <p><strong>3. 编辑内容：</strong>悬停在内容上，点击右上角设置按钮</p>
              <p><strong>4. 跟随光标：</strong>工具栏会跟随鼠标移动</p>
              <p><strong>5. 保存测试：</strong>编辑内容并保存，查看控制台日志</p>
            </div>
          </div>

          {/* 测试内容区域 */}
          <div className="space-y-8">
            
            {/* 文本内容测试 */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                📝 文本内容测试
              </h3>
              <SimpleEditableContent
                positionKey="simple_text_1"
                contentType="text"
                fallbackContent="<p>这是一个可编辑的文本段落。悬停并点击设置按钮来编辑我！</p>"
                className="p-4 border rounded-lg"
                pagePath="/simple-test"
              />
            </div>

            {/* 标题测试 */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                🏷️ 标题测试
              </h3>
              <SimpleEditableContent
                positionKey="simple_heading_1"
                contentType="heading"
                fallbackContent="<h2>这是一个可编辑的标题</h2>"
                className="p-4 border rounded-lg"
                pagePath="/simple-test"
              />
            </div>

            {/* 代码测试 */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                💻 代码测试
              </h3>
              <SimpleEditableContent
                positionKey="simple_code_1"
                contentType="code"
                fallbackContent={`# Python示例代码
print("Hello, World!")
for i in range(5):
    print(f"数字: {i}")`}
                className="p-4 border rounded-lg"
                pagePath="/simple-test"
              />
            </div>

            {/* 列表测试 */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                📋 列表测试
              </h3>
              <SimpleEditableContent
                positionKey="simple_list_1"
                contentType="list"
                fallbackContent={`
                  <ul>
                    <li>第一个列表项</li>
                    <li>第二个列表项</li>
                    <li>第三个列表项</li>
                  </ul>
                `}
                className="p-4 border rounded-lg"
                pagePath="/simple-test"
              />
            </div>

            {/* 图表测试 */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                📊 图表测试
              </h3>
              <SimpleEditableContent
                positionKey="simple_chart_1"
                contentType="chart"
                className="p-4 border rounded-lg"
                pagePath="/simple-test"
              />
            </div>
          </div>

          {/* 调试信息 */}
          <div className={`mt-12 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              🔍 调试信息
            </h3>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>页面路径: /simple-test</p>
              <p>内容键: simple_text_1, simple_heading_1, simple_code_1, simple_list_1, simple_chart_1</p>
              <p>打开浏览器开发者工具查看网络请求和控制台日志</p>
            </div>
          </div>
        </div>
      </div>
      
      <AdminToolbar />
    </div>
  )
}
