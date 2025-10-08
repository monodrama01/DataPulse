"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Home, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function SalesTrackerPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 h-16">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"><Home size={20} /></Link>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <Link href="/excel" className="text-blue-600 hover:text-blue-700">Excel函数与工具</Link>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>销售业绩跟踪表</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/excel#templates" className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-700 border'}`}>
          <ArrowLeft size={20} /> 返回模板库
        </Link>
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 销售业绩跟踪表</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            适用于销售团队业绩管理 | 目标达成率 | 排名对比
          </p>
        </div>
        <div className="grid gap-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardTitle className="text-lg">业绩跟踪主表</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className={`w-full text-xs border-collapse ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <thead>
                    <tr className={theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'}>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">销售姓名</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">部门</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">月度目标(万)</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">实际完成(万)</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">完成率</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">排名</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-green-700 dark:text-green-400">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">张业绩王</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">华东区</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">100</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold text-green-600 dark:text-green-400">135</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-green-600 dark:text-green-400">135%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center font-bold">🥇 1</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">超额完成</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">李努力</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">华南区</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">80</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold text-green-600 dark:text-green-400">88</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-green-600 dark:text-green-400">110%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center font-bold">🥈 2</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">超额完成</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">王加油</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">华北区</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">90</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold">72</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-yellow-600 dark:text-yellow-400">80%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">3</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">待提升</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={`mt-4 p-3 rounded-lg text-xs ${theme === 'dark' ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
                <p><strong>公式：</strong>完成率=实际/目标×100% | 排名=RANK(完成额,区域) | 状态=IF(完成率≥100%,超额,待提升)</p>
              </div>
            </CardContent>
          </Card>
          <Card className={`${theme === 'dark' ? 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-700' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'} border-2`}>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>如何获取此模板?</h3>
                <div className="flex justify-center gap-4 mt-4">
                  <button className={`px-6 py-3 rounded-lg font-bold transition-colors ${theme === 'dark' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}>
                    <Download className="inline mr-2" size={20} />下载模板
                  </button>
                  <Link href="/excel#templates" className={`px-6 py-3 rounded-lg font-bold transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                    更多模板
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

