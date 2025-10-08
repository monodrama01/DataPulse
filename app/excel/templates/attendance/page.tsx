"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Home, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function AttendanceTemplatePage() {
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
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>智能考勤表模板</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/excel#templates" className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-700 border'}`}>
          <ArrowLeft size={20} /> 返回模板库
        </Link>

        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>⏰ 智能考勤表模板</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            适用于员工考勤管理、工时统计 | 自动计算出勤天数 | 异常预警
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
                    <li>• 自动识别工作日/休息日</li>
                    <li>• 迟到/早退自动标红</li>
                    <li>• 月度出勤统计</li>
                    <li>• 加班工时自动计算</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">关键函数</h4>
                  <ul className="text-xs space-y-1">
                    <li>• NETWORKDAYS (工作日计算)</li>
                    <li>• COUNTIF (出勤统计)</li>
                    <li>• TEXT (时间格式化)</li>
                    <li>• 条件格式 (异常标红)</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                  <h4 className="font-bold mb-2 text-amber-600 dark:text-amber-400">使用技巧</h4>
                  <p className="text-xs">使用数据验证限制状态输入(正常/迟到/早退/请假/旷工),防止录入错误。月底自动生成统计报表。</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">考勤主表预览 (2024年3月)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className={`w-full text-xs border-collapse ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <thead>
                    <tr className={theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">姓名</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">部门</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">日期</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">上班打卡</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">下班打卡</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">工时(h)</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-purple-700 dark:text-purple-400">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">张三</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">技术部</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-01</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">09:00</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">18:00</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">8</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">正常</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">张三</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">技术部</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-04</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-red-600 dark:text-red-400">09:15</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">18:05</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">8</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">迟到</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">李四</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">销售部</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-01</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">08:55</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">19:30</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-blue-600 dark:text-blue-400">9.5</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">加班</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">王五</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">财务部</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-05</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">-</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">-</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">0</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">请假</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Card className={theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}>
                  <CardContent className="pt-4">
                    <h4 className="font-bold mb-3 text-blue-600 dark:text-blue-400">月度出勤统计</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span>应出勤天数:</span><strong>22天</strong></div>
                      <div className="flex justify-between"><span>实际出勤:</span><strong className="text-green-600 dark:text-green-400">20天</strong></div>
                      <div className="flex justify-between"><span>迟到次数:</span><strong className="text-red-600 dark:text-red-400">2次</strong></div>
                      <div className="flex justify-between"><span>请假天数:</span><strong className="text-yellow-600 dark:text-yellow-400">1天</strong></div>
                      <div className="flex justify-between"><span>加班工时:</span><strong className="text-blue-600 dark:text-blue-400">12小时</strong></div>
                    </div>
                  </CardContent>
                </Card>

                <div className={`p-4 rounded-lg text-xs ${theme === 'dark' ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
                  <p><strong>公式说明:</strong></p>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• 工时 = (下班时间 - 上班时间) - 1</li>
                    <li>• 应出勤 = NETWORKDAYS(开始,结束)</li>
                    <li>• 实际出勤 = COUNTIF(状态,正常)</li>
                    <li>• 迟到判断 = IF(上班时间&gt;09:00,迟到,正常)</li>
                    <li>• 条件格式自动标红异常项</li>
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

