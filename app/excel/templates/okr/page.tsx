"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Home, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function OKRTemplatePage() {
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
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>OKR目标管理表</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/excel#templates" className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-700 border'}`}>
          <ArrowLeft size={20} /> 返回模板库
        </Link>

        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} OKR目标管理表</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            适用于团队目标管理 | 关键结果跟踪 | 自动计算完成度
          </p>
        </div>

        <div className="grid gap-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardTitle className="text-lg">模板说明</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className={`grid md:grid-cols-3 gap-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">核心功能</h4>
                  <ul className="text-xs space-y-1">
                    <li>• O目标+KR关键结果结构</li>
                    <li>• 进度自动汇总</li>
                    <li>• 目标完成度可视化</li>
                    <li>• 季度/年度对比</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">关键函数</h4>
                  <ul className="text-xs space-y-1">
                    <li>• AVERAGE (目标完成度)</li>
                    <li>• IF (达成判断)</li>
                    <li>• 条件格式 (进度条)</li>
                    <li>• CONCATENATE (目标描述)</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                  <h4 className="font-bold mb-2 text-amber-600 dark:text-amber-400">使用技巧</h4>
                  <p className="text-xs">每个Objective(目标)配3-5个Key Result(关键结果)。目标完成度=所有KR平均值，自动判断是否达成。</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">OKR主表 (2024 Q1)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className={`w-full text-xs border-collapse ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <thead>
                    <tr className={theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-blue-700 dark:text-blue-400">类型</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-blue-700 dark:text-blue-400">目标/关键结果</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-blue-700 dark:text-blue-400">负责人</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-blue-700 dark:text-blue-400">目标值</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-blue-700 dark:text-blue-400">当前值</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-blue-700 dark:text-blue-400">完成度</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-blue-700 dark:text-blue-400">信心指数</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-blue-700 dark:text-blue-400">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={`font-bold ${theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-100'}`}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">O1</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-indigo-700 dark:text-indigo-400">提升用户增长和留存</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">张产品</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">-</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">-</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center font-bold text-green-600 dark:text-green-400">88%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">8/10</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">优秀</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 pl-6">KR1</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">新增用户达到50万</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">李运营</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">50万</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">48万</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-green-600 dark:text-green-400">96%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">9/10</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 pl-6">KR2</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">用户留存率提升至75%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">王数据</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">75%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">73%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-blue-600 dark:text-blue-400">97%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">8/10</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 pl-6">KR3</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">DAU达到15万</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">刘增长</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">15万</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">11万</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-yellow-600 dark:text-yellow-400">73%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">6/10</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
                    </tr>
                    <tr className={`font-bold ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">O2</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-purple-700 dark:text-purple-400">优化产品体验和性能</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">陈技术</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">-</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">-</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center font-bold text-blue-600 dark:text-blue-400">82%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">7/10</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">良好</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 pl-6">KR1</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">页面加载速度&lt;2秒</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">赵前端</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">2秒</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">1.8秒</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-green-600 dark:text-green-400">100%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">10/10</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 pl-6">KR2</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">Bug数量降至50以下</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">孙测试</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">50</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">62</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-yellow-600 dark:text-yellow-400">65%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">5/10</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Card className={theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}>
                  <CardContent className="pt-4">
                    <h4 className="font-bold mb-3 text-blue-600 dark:text-blue-400">季度OKR总览</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span>总目标数:</span><strong>2个</strong></div>
                      <div className="flex justify-between"><span>关键结果数:</span><strong>5个</strong></div>
                      <div className="flex justify-between"><span>整体完成度:</span><strong className="text-lg text-green-600 dark:text-green-400">85%</strong></div>
                      <div className="flex justify-between"><span>优秀目标:</span><strong className="text-green-600 dark:text-green-400">1个</strong></div>
                      <div className="flex justify-between"><span>良好目标:</span><strong className="text-blue-600 dark:text-blue-400">1个</strong></div>
                      <div className="flex justify-between"><span>平均信心指数:</span><strong>7.5/10</strong></div>
                    </div>
                  </CardContent>
                </Card>

                <div className={`p-4 rounded-lg text-xs ${theme === 'dark' ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
                  <p><strong>公式说明:</strong></p>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• KR完成度 = 当前值 / 目标值 × 100%</li>
                    <li>• O完成度 = AVERAGE(所有KR完成度)</li>
                    <li>• 状态判断 = IF(完成度≥85%,优秀, IF(≥70%,良好,待改进))</li>
                    <li>• 信心指数1-10分主观评分</li>
                    <li>• 季度结束自动生成总结报告</li>
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

