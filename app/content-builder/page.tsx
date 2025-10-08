"use client"

import { Navigation } from "@/components/navigation"
import { DynamicContentContainer } from "@/components/DynamicContentContainer"
import { AdminToolbar } from "@/components/AdminToolbar"
import { useTheme } from "@/components/theme-provider"

export default function ContentBuilderPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8`}>
          
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              📝 内容构建器
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              在这里你可以自由添加和编辑各种类型的内容块
            </p>
          </div>

          {/* 使用说明 */}
          <div className={`p-6 rounded-lg mb-8 ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
              🎯 如何使用
            </h2>
            <div className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <p><strong>1. 登录管理员：</strong>访问 /admin 页面，使用 admin / admin123 登录</p>
              <p><strong>2. 开启编辑模式：</strong>在URL后添加 ?admin=true</p>
              <p><strong>3. 添加内容：</strong>点击左下角绿色 + 按钮，选择内容类型</p>
              <p><strong>4. 编辑内容：</strong>悬停在内容上，点击彩色编辑按钮</p>
              <p><strong>5. 管理内容：</strong>悬停在内容左侧可以上移、下移、删除</p>
            </div>
          </div>

          {/* 动态内容容器 */}
          <DynamicContentContainer 
            pagePath="/content-builder"
            className="min-h-[400px]"
          />

          {/* 功能说明 */}
          <div className={`mt-12 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              💡 支持的内容类型
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">📄</div>
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>文本内容</span>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  段落、介绍文字，支持HTML格式
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mr-2">H</div>
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>标题</span>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  各级标题，H1-H6
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mr-2">📋</div>
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>列表</span>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  有序或无序列表
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2">💻</div>
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>代码片段</span>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  支持多种编程语言语法高亮
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-2">📊</div>
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>图表</span>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  ECharts图表：折线图、柱状图、饼图
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AdminToolbar />
    </div>
  )
}
