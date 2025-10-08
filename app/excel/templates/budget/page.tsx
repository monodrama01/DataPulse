"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Home, FileSpreadsheet, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function BudgetTemplatePage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      {/* 面包屑导航 */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 h-16">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
              <Home size={20} />
              <span className="font-medium">主页</span>
            </Link>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <Link href="/excel" className="text-blue-600 hover:text-blue-700 transition-colors">
              <span className="font-medium">Excel函数与工具</span>
            </Link>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>年度预算表模板</span>
          </div>
        </div>
      </div>

      {/* 主内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 返回按钮 */}
        <Link 
          href="/excel#templates"
          className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-colors ${
            theme === 'dark' 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
              : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
          }`}
        >
          <ArrowLeft size={20} />
          返回模板库
        </Link>

        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 年度预算表模板
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            适用于部门预算编制、项目预算规划 | 自动计算预算执行率 | 超支自动预警
          </p>
        </div>

        <div className="grid gap-6">
          {/* 模板说明 */}
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
              <CardTitle className="text-lg">模板说明</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className={`grid md:grid-cols-3 gap-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">核心功能</h4>
                  <ul className="text-xs space-y-1">
                    <li>• 自动计算各部门预算汇总</li>
                    <li>• 预算vs实际对比分析</li>
                    <li>• 预算执行率可视化</li>
                    <li>• 支持多部门、多项目分类</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">关键函数</h4>
                  <ul className="text-xs space-y-1">
                    <li>• SUMIF (分类汇总)</li>
                    <li>• IF (预算预警)</li>
                    <li>• 条件格式 (超支标红)</li>
                    <li>• 数据透视表 (多维分析)</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                  <h4 className="font-bold mb-2 text-amber-600 dark:text-amber-400">使用技巧</h4>
                  <p className="text-xs">
                    在预算设置工作表中定义部门和科目,主表自动引用。超支项目会自动标红,方便管理层快速发现问题。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 模板预览 - 主表 */}
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">预算主表预览</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className={`w-full text-xs border-collapse ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <thead>
                    <tr className={theme === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-50'}>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-emerald-700 dark:text-emerald-400">部门</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-emerald-700 dark:text-emerald-400">预算科目</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-emerald-700 dark:text-emerald-400">年度预算(万元)</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-emerald-700 dark:text-emerald-400">实际支出(万元)</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-emerald-700 dark:text-emerald-400">预算差异</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-emerald-700 dark:text-emerald-400">执行率</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-emerald-700 dark:text-emerald-400">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">销售部</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">人员工资</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">500</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">420</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-green-600 dark:text-green-400">80</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">84%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">正常</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">销售部</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">市场推广费</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">200</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">235</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-red-600 dark:text-red-400">-35</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-red-600 dark:text-red-400">118%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">超支</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">销售部</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">差旅费</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">150</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">142</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-green-600 dark:text-green-400">8</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">95%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">正常</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 font-bold">销售部小计</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold">850</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold">797</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold">53</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold">94%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">技术部</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">人员工资</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">600</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">580</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-green-600 dark:text-green-400">20</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">97%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">正常</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">技术部</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">研发费用</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">300</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">280</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-green-600 dark:text-green-400">20</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">93%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">正常</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 font-bold">技术部小计</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold">900</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold">860</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold">40</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold">96%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
                    </tr>
                    <tr className={`font-bold ${theme === 'dark' ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-emerald-700 dark:text-emerald-400">总计</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-emerald-700 dark:text-emerald-400">1750</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-emerald-700 dark:text-emerald-400">1657</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-emerald-700 dark:text-emerald-400">93</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-emerald-700 dark:text-emerald-400">95%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={`mt-4 p-3 rounded-lg text-xs ${theme === 'dark' ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
                <p><strong>公式说明:</strong></p>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>• 预算差异 = 年度预算 - 实际支出</li>
                  <li>• 执行率 = 实际支出 / 年度预算 * 100%</li>
                  <li>• 状态判断: IF(执行率 &gt; 100%, 超支, 正常)</li>
                  <li>• 条件格式: 超支项自动标红预警</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 使用步骤 */}
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">使用步骤</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  { step: 1, title: "准备基础数据", desc: "在预算设置工作表中定义部门列表和预算科目分类" },
                  { step: 2, title: "录入预算数据", desc: "在主表中录入各部门各科目的年度预算金额" },
                  { step: 3, title: "定期更新实际", desc: "每月更新实际支出列,系统自动计算预算差异和执行率" },
                  { step: 4, title: "分析预警情况", desc: "查看标红的超支项目,分析原因并采取相应措施" },
                  { step: 5, title: "生成分析报告", desc: "使用数据透视表进行多维度分析,生成管理层报告" }
                ].map((item) => (
                  <div key={item.step} className={`p-4 rounded-lg border-l-4 ${
                    theme === 'dark' ? 'bg-blue-900/10 border-blue-500' : 'bg-blue-50 border-blue-400'
                  }`}>
                    <h4 className={`font-bold mb-1 text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                      步骤{item.step}: {item.title}
                    </h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 下载提示 */}
          <Card className={`${theme === 'dark' ? 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-700' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'} border-2`}>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                  如何获取此模板?
                </h3>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  根据上述表格结构和公式说明,您可以在Excel中快速搭建此模板
                </p>
                <div className="flex justify-center gap-4">
                  <button className={`px-6 py-3 rounded-lg font-bold transition-colors ${
                    theme === 'dark' 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}>
                    <Download className="inline mr-2" size={20} />
                    下载模板文件
                  </button>
                  <Link 
                    href="/excel#templates"
                    className={`px-6 py-3 rounded-lg font-bold transition-colors ${
                      theme === 'dark' 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
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

