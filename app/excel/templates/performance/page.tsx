"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Home, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function PerformanceTemplatePage() {
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
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>员工绩效考核模板</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/excel#templates" className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-700 border'}`}>
          <ArrowLeft size={20} /> 返回模板库
        </Link>

        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 员工绩效考核模板</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            适用于季度/年度绩效评估 | KPI自动计算 | 等级自动评定
          </p>
        </div>

        <div className="grid gap-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <CardTitle className="text-lg">模板说明</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className={`grid md:grid-cols-3 gap-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">核心功能</h4>
                  <ul className="text-xs space-y-1">
                    <li>• 多维度考核(KPI+能力+态度)</li>
                    <li>• 权重自定义配置</li>
                    <li>• 自动计算总分和等级</li>
                    <li>• 360度评估汇总</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">关键函数</h4>
                  <ul className="text-xs space-y-1">
                    <li>• SUMPRODUCT (加权计算)</li>
                    <li>• VLOOKUP (等级查询)</li>
                    <li>• IF/IFS (等级判断)</li>
                    <li>• AVERAGE (多人评分)</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                  <h4 className="font-bold mb-2 text-amber-600 dark:text-amber-400">使用技巧</h4>
                  <p className="text-xs">在权重设置工作表配置各维度权重,主表自动按权重计算。支持ABCDE五级评分,结果可视化展示。</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">绩效考核主表 (2024 Q1)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className={`w-full text-xs border-collapse ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <thead>
                    <tr className={theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-50'}>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-indigo-700 dark:text-indigo-400" rowSpan={2}>姓名</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-indigo-700 dark:text-indigo-400" rowSpan={2}>部门</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-indigo-700 dark:text-indigo-400" colSpan={2}>KPI业绩(50%)</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-indigo-700 dark:text-indigo-400" colSpan={2}>工作能力(30%)</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-indigo-700 dark:text-indigo-400" colSpan={2}>工作态度(20%)</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-indigo-700 dark:text-indigo-400" rowSpan={2}>总分</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-indigo-700 dark:text-indigo-400" rowSpan={2}>等级</th>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-50/50'}>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 text-indigo-600 dark:text-indigo-400">得分</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 text-indigo-600 dark:text-indigo-400">加权</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 text-indigo-600 dark:text-indigo-400">得分</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 text-indigo-600 dark:text-indigo-400">加权</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 text-indigo-600 dark:text-indigo-400">得分</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 text-indigo-600 dark:text-indigo-400">加权</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">张三</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">销售部</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">95</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center bg-blue-50 dark:bg-blue-900/20">47.5</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">88</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center bg-blue-50 dark:bg-blue-900/20">26.4</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">90</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center bg-blue-50 dark:bg-blue-900/20">18.0</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center font-bold text-green-600 dark:text-green-400">91.9</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">A</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">李四</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">技术部</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">82</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center bg-blue-50 dark:bg-blue-900/20">41.0</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">85</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center bg-blue-50 dark:bg-blue-900/20">25.5</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">88</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center bg-blue-50 dark:bg-blue-900/20">17.6</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center font-bold text-blue-600 dark:text-blue-400">84.1</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">B</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">王五</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">财务部</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">78</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center bg-blue-50 dark:bg-blue-900/20">39.0</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">80</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center bg-blue-50 dark:bg-blue-900/20">24.0</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">75</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center bg-blue-50 dark:bg-blue-900/20">15.0</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center font-bold text-gray-600 dark:text-gray-400">78.0</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400">C</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Card className={theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}>
                  <CardContent className="pt-4">
                    <h4 className="font-bold mb-3 text-blue-600 dark:text-blue-400">绩效等级分布</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span>A级(优秀,90-100):</span><strong className="text-green-600 dark:text-green-400">1人 (33%)</strong></div>
                      <div className="flex justify-between"><span>B级(良好,80-89):</span><strong className="text-blue-600 dark:text-blue-400">1人 (33%)</strong></div>
                      <div className="flex justify-between"><span>C级(合格,70-79):</span><strong className="text-gray-600 dark:text-gray-400">1人 (33%)</strong></div>
                      <div className="flex justify-between"><span>D级(待改进,60-69):</span><strong>0人</strong></div>
                      <div className="flex justify-between"><span>E级(不合格,&lt;60):</span><strong className="text-red-600 dark:text-red-400">0人</strong></div>
                    </div>
                  </CardContent>
                </Card>

                <div className={`p-4 rounded-lg text-xs ${theme === 'dark' ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
                  <p><strong>公式说明:</strong></p>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• 加权得分 = 原始得分 × 权重</li>
                    <li>• 总分 = SUMPRODUCT(得分,权重)</li>
                    <li>• 等级 = IFS(总分≥90,A, 总分≥80,B, ...)</li>
                    <li>• 支持自定义权重配置</li>
                    <li>• 条件格式优秀标绿,不合格标红</li>
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

