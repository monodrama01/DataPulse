"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Home, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function CRMTemplatePage() {
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
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>CRM客户管理表</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/excel#templates" className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-700 border'}`}>
          <ArrowLeft size={20} /> 返回模板库
        </Link>

        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} CRM客户管理表</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            适用于客户关系管理 | 销售漏斗分析 | 跟进提醒
          </p>
        </div>

        <div className="grid gap-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
              <CardTitle className="text-lg">模板说明</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className={`grid md:grid-cols-3 gap-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">核心功能</h4>
                  <ul className="text-xs space-y-1">
                    <li>• 客户全生命周期管理</li>
                    <li>• 销售阶段自动跟踪</li>
                    <li>• 跟进提醒自动生成</li>
                    <li>• 成交转化率分析</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">关键函数</h4>
                  <ul className="text-xs space-y-1">
                    <li>• COUNTIFS (分阶段统计)</li>
                    <li>• SUMIF (销售额汇总)</li>
                    <li>• TODAY (跟进提醒)</li>
                    <li>• DATEDIF (客户年龄)</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                  <h4 className="font-bold mb-2 text-amber-600 dark:text-amber-400">使用技巧</h4>
                  <p className="text-xs">使用数据验证限制阶段选择。超过7天未跟进的客户自动标红提醒。配合漏斗图展示销售转化。</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">客户管理主表</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className={`w-full text-xs border-collapse ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <thead>
                    <tr className={theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'}>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">客户名称</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">联系人</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">行业</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">销售阶段</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">预计金额(万)</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">成交概率</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">最后跟进</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">提醒</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">阿里云科技</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">张总</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">互联网</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">
                        <span className="px-2 py-1 rounded text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">合同谈判</span>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold">150</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-orange-600 dark:text-orange-400">80%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-18</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">正常</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">腾讯科技</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">李经理</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">互联网</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">
                        <span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">需求确认</span>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold">200</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-blue-600 dark:text-blue-400">50%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-red-600 dark:text-red-400">2024-03-08</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">需跟进</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">字节跳动</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">王总监</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">互联网</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">已成交</span>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold text-green-600 dark:text-green-400">180</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center text-green-600 dark:text-green-400">100%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-15</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">已成交</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">百度AI</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">刘主管</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">互联网</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">
                        <span className="px-2 py-1 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400">初次接触</span>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold">80</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">30%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-17</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">正常</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Card className={theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}>
                  <CardContent className="pt-4">
                    <h4 className="font-bold mb-3 text-blue-600 dark:text-blue-400">销售漏斗统计</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span>初次接触:</span><strong>1家 (25%)</strong></div>
                      <div className="flex justify-between"><span>需求确认:</span><strong>1家 (25%)</strong></div>
                      <div className="flex justify-between"><span>方案报价:</span><strong>0家 (0%)</strong></div>
                      <div className="flex justify-between"><span>合同谈判:</span><strong>1家 (25%)</strong></div>
                      <div className="flex justify-between"><span>已成交:</span><strong className="text-green-600 dark:text-green-400">1家 (25%)</strong></div>
                      <div className="pt-2 border-t border-blue-300 dark:border-blue-700">
                        <div className="flex justify-between"><span>预计销售额:</span><strong className="text-lg text-blue-600 dark:text-blue-400">610万</strong></div>
                        <div className="flex justify-between"><span>已成交金额:</span><strong className="text-lg text-green-600 dark:text-green-400">180万</strong></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className={`p-4 rounded-lg text-xs ${theme === 'dark' ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
                  <p><strong>公式说明:</strong></p>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• 阶段统计 = COUNTIF(阶段列,初次接触)</li>
                    <li>• 预计销售额 = SUMIF(阶段列,&lt;&gt;已成交,金额列)</li>
                    <li>• 已成交 = SUMIF(阶段列,已成交,金额列)</li>
                    <li>• 跟进提醒 = IF(TODAY()-最后跟进&gt;7,需跟进,正常)</li>
                    <li>• 条件格式自动标红超期客户</li>
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

