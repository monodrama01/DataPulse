"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Home, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function RecruitmentTemplatePage() {
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
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>招聘进度跟踪表</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/excel#templates" className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-700 border'}`}>
          <ArrowLeft size={20} /> 返回模板库
        </Link>

        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 招聘进度跟踪表</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            适用于HR招聘管理 | 候选人漏斗分析 | 转化率自动计算
          </p>
        </div>

        <div className="grid gap-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardTitle className="text-lg">模板说明</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className={`grid md:grid-cols-3 gap-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">核心功能</h4>
                  <ul className="text-xs space-y-1">
                    <li>• 候选人状态自动跟踪</li>
                    <li>• 招聘漏斗转化率分析</li>
                    <li>• 招聘周期统计</li>
                    <li>• 面试提醒自动生成</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">关键函数</h4>
                  <ul className="text-xs space-y-1">
                    <li>• COUNTIFS (状态统计)</li>
                    <li>• TODAY (日期计算)</li>
                    <li>• DATEDIF (招聘周期)</li>
                    <li>• 条件格式 (逾期标红)</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                  <h4 className="font-bold mb-2 text-amber-600 dark:text-amber-400">使用技巧</h4>
                  <p className="text-xs">使用数据验证限制面试状态选择。配合漏斗图可清晰展示从简历筛选到录用的全流程转化。</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">候选人跟踪主表</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className={`w-full text-xs border-collapse ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <thead>
                    <tr className={theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">姓名</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">应聘岗位</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">投递日期</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">当前阶段</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">面试日期</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">面试官</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">评分</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">张晓明</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">前端工程师</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-01</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">终面</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-15</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">李总</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-green-600 dark:text-green-400">90</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">已录用</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">王丽华</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">数据分析师</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-05</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">二面</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-18</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">王经理</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">-</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">待面试</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">刘建国</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">产品经理</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-08</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">初筛</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">-</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">-</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">-</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400">简历筛选</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">陈雅婷</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">UI设计师</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-10</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">一面</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-12</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">张主管</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-red-600 dark:text-red-400">65</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">未通过</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Card className={theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}>
                  <CardContent className="pt-4">
                    <h4 className="font-bold mb-3 text-blue-600 dark:text-blue-400">招聘漏斗统计</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span>收到简历:</span><strong>120份</strong></div>
                      <div className="flex justify-between"><span>简历筛选通过:</span><strong>45份 (37.5%)</strong></div>
                      <div className="flex justify-between"><span>一面通过:</span><strong>20人 (44.4%)</strong></div>
                      <div className="flex justify-between"><span>二面通过:</span><strong>8人 (40%)</strong></div>
                      <div className="flex justify-between"><span>已录用:</span><strong className="text-green-600 dark:text-green-400">3人 (37.5%)</strong></div>
                      <div className="pt-2 border-t border-blue-300 dark:border-blue-700">
                        <div className="flex justify-between"><span>整体转化率:</span><strong className="text-lg text-blue-600 dark:text-blue-400">2.5%</strong></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className={`p-4 rounded-lg text-xs ${theme === 'dark' ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
                  <p><strong>公式说明:</strong></p>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• 简历数 = COUNTIF(状态列,已投递)</li>
                    <li>• 转化率 = 下一阶段人数/当前阶段*100%</li>
                    <li>• 招聘周期 = TODAY() - 投递日期</li>
                    <li>• 逾期提醒 = IF(面试日期&lt;TODAY(),逾期,正常)</li>
                    <li>• 条件格式自动标记逾期候选人</li>
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

