"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Home, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function GanttTemplatePage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 h-16">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
              <Home size={20} />
            </Link>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <Link href="/excel" className="text-blue-600 hover:text-blue-700">Excel函数与工具</Link>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>甘特图项目进度表</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/excel#templates" className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-700 border'}`}>
          <ArrowLeft size={20} /> 返回模板库
        </Link>

        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 甘特图项目进度表</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            适用于项目进度管理 | 可视化时间轴 | 自动计算工期
          </p>
        </div>

        <div className="grid gap-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <CardTitle className="text-lg">模板说明</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className={`grid md:grid-cols-3 gap-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">核心功能</h4>
                  <ul className="text-xs space-y-1">
                    <li>• 可视化时间轴展示</li>
                    <li>• 任务依赖关系管理</li>
                    <li>• 进度自动计算</li>
                    <li>• 关键路径识别</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">关键函数</h4>
                  <ul className="text-xs space-y-1">
                    <li>• DATEDIF (工期计算)</li>
                    <li>• 条件格式 (进度条)</li>
                    <li>• IF (延期预警)</li>
                    <li>• TODAY (当前进度)</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                  <h4 className="font-bold mb-2 text-amber-600 dark:text-amber-400">使用技巧</h4>
                  <p className="text-xs">使用条件格式创建甘特图进度条,自动标识延期任务。支持按周/月视图切换。</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">项目进度主表</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className={`w-full text-xs border-collapse ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <thead>
                    <tr className={theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50'}>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-orange-700 dark:text-orange-400">任务名称</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-orange-700 dark:text-orange-400">负责人</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-orange-700 dark:text-orange-400">开始日期</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-orange-700 dark:text-orange-400">结束日期</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-orange-700 dark:text-orange-400">工期(天)</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-orange-700 dark:text-orange-400">完成度</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-orange-700 dark:text-orange-400">状态</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-orange-700 dark:text-orange-400" colSpan={10}>时间轴(3月)</th>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50/50'}>
                      <th className="border border-gray-300 dark:border-gray-600 p-1" colSpan={7}></th>
                      {[1,5,10,15,20,25,30].map(d => (
                        <th key={d} className="border border-gray-300 dark:border-gray-600 p-1 text-orange-600 dark:text-orange-400 text-center">{d}日</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 font-bold">需求分析</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">张产品</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-01</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-07</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">7</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-green-600 dark:text-green-400">100%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">已完成</span>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1 bg-green-500" colSpan={2}></td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1" colSpan={5}></td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 font-bold">UI设计</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">李设计</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-05</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-15</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">11</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-green-600 dark:text-green-400">100%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">已完成</span>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1"></td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1 bg-green-500" colSpan={2}></td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1" colSpan={4}></td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 font-bold">前端开发</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">王前端</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-10</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-25</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">16</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-blue-600 dark:text-blue-400">60%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">进行中</span>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1" colSpan={2}></td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1 bg-blue-500" colSpan={2}></td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1 bg-blue-300" colSpan={1}></td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1" colSpan={2}></td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 font-bold">后端开发</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">刘后端</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-12</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-28</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">17</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-blue-600 dark:text-blue-400">50%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">进行中</span>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1" colSpan={2}></td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1 bg-blue-500"></td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1 bg-blue-500" colSpan={2}></td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1 bg-blue-300"></td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1"></td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 font-bold">测试</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">陈测试</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-26</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-31</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">6</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">0%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400">未开始</span>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1" colSpan={5}></td>
                      <td className="border border-gray-300 dark:border-gray-600 p-1 bg-gray-300 dark:bg-gray-600" colSpan={2}></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Card className={theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}>
                  <CardContent className="pt-4">
                    <h4 className="font-bold mb-3 text-blue-600 dark:text-blue-400">项目整体进度</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span>项目开始:</span><strong>2024-03-01</strong></div>
                      <div className="flex justify-between"><span>预计完成:</span><strong>2024-03-31</strong></div>
                      <div className="flex justify-between"><span>总工期:</span><strong>31天</strong></div>
                      <div className="flex justify-between"><span>已完成任务:</span><strong className="text-green-600 dark:text-green-400">2个 (40%)</strong></div>
                      <div className="flex justify-between"><span>进行中:</span><strong className="text-blue-600 dark:text-blue-400">2个 (40%)</strong></div>
                      <div className="flex justify-between"><span>未开始:</span><strong>1个 (20%)</strong></div>
                      <div className="pt-2 border-t border-blue-300 dark:border-blue-700">
                        <div className="flex justify-between"><span>整体进度:</span><strong className="text-lg text-blue-600 dark:text-blue-400">62%</strong></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className={`p-4 rounded-lg text-xs ${theme === 'dark' ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
                  <p><strong>公式说明:</strong></p>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• 工期 = DATEDIF(开始日期,结束日期,D)</li>
                    <li>• 进度条 = 使用条件格式根据日期范围填充颜色</li>
                    <li>• 延期判断 = IF(TODAY()&gt;结束日期,延期,正常)</li>
                    <li>• 整体进度 = AVERAGE(各任务完成度)</li>
                    <li>• 深色=已完成时段, 浅色=计划时段</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${theme === 'dark' ? 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-700' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'} border-2`}>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>如何获取此模板?</h3>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>根据上述表格结构和公式说明,您可以在Excel中快速搭建此模板</p>
                <div className="flex justify-center gap-4">
                  <button className={`px-6 py-3 rounded-lg font-bold transition-colors ${theme === 'dark' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}>
                    <Download className="inline mr-2" size={20} />下载模板文件
                  </button>
                  <Link href="/excel#templates" className={`px-6 py-3 rounded-lg font-bold transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                    查看更多模板
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

