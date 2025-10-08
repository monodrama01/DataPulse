"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Home, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function ProfitLossTemplatePage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

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
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>损益表模板</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 损益表(P&L)模板
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            适用于月度经营分析、年度财务报告 | 自动计算利润率 | 同比环比分析
          </p>
        </div>

        <div className="grid gap-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
              <CardTitle className="text-lg">模板说明</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className={`grid md:grid-cols-3 gap-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">核心功能</h4>
                  <ul className="text-xs space-y-1">
                    <li>• 自动计算毛利率、净利率</li>
                    <li>• 同比、环比增长率分析</li>
                    <li>• 收入/成本结构占比图</li>
                    <li>• 支持12个月滚动展示</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">关键函数</h4>
                  <ul className="text-xs space-y-1">
                    <li>• 利润率 = (收入-成本)/收入</li>
                    <li>• 同比增长率公式</li>
                    <li>• OFFSET (动态范围)</li>
                    <li>• 瀑布图 (利润构成)</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                  <h4 className="font-bold mb-2 text-amber-600 dark:text-amber-400">使用技巧</h4>
                  <p className="text-xs">
                    在数据录入工作表输入原始数据,损益表自动更新。配合瀑布图可清晰展示从收入到净利润的逐步拆解。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">损益表主表预览 (2024年3月)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className={`w-full text-sm border-collapse ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <thead>
                    <tr className={theme === 'dark' ? 'bg-cyan-900/30' : 'bg-cyan-50'}>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-bold text-cyan-700 dark:text-cyan-400">项目</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-right font-bold text-cyan-700 dark:text-cyan-400">本月(万元)</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-right font-bold text-cyan-700 dark:text-cyan-400">上月(万元)</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-right font-bold text-cyan-700 dark:text-cyan-400">环比增长</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-right font-bold text-cyan-700 dark:text-cyan-400">占收入比</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={`font-bold ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">一、营业收入</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-blue-600 dark:text-blue-400">8,500</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">7,800</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+9.0%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">100%</td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 pl-8">产品销售收入</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">7,200</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">6,500</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+10.8%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">84.7%</td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 pl-8">服务收入</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">1,300</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">1,300</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">0.0%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">15.3%</td>
                    </tr>
                    <tr className={`font-bold ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'}`}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">二、营业成本</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-red-600 dark:text-red-400">5,100</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">4,680</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+9.0%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">60%</td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 pl-8">直接材料</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">3,400</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">3,120</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+9.0%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">40%</td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 pl-8">直接人工</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">1,700</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">1,560</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+9.0%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">20%</td>
                    </tr>
                    <tr className={`font-bold ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">三、毛利润</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-700 dark:text-green-400">3,400</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">3,120</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+9.0%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right font-bold text-green-700 dark:text-green-400">40%</td>
                    </tr>
                    <tr className={`font-bold ${theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">四、期间费用</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-orange-600 dark:text-orange-400">2,380</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">2,184</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+9.0%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">28%</td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 pl-8">销售费用</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">1,275</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">1,170</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+9.0%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">15%</td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 pl-8">管理费用</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">850</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">780</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+9.0%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">10%</td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 pl-8">财务费用</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">255</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">234</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+9.0%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">3%</td>
                    </tr>
                    <tr className={`font-bold ${theme === 'dark' ? 'bg-cyan-900/40' : 'bg-cyan-100'}`}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">五、营业利润</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-cyan-700 dark:text-cyan-400">1,020</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">936</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+9.0%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right font-bold text-cyan-700 dark:text-cyan-400">12%</td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">加：营业外收入</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">85</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">78</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+9.0%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">1%</td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">减：营业外支出</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">17</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">16</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+6.3%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">0.2%</td>
                    </tr>
                    <tr className={`font-bold ${theme === 'dark' ? 'bg-emerald-900/50' : 'bg-emerald-200'}`}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-emerald-800 dark:text-emerald-300">六、利润总额</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-emerald-800 dark:text-emerald-300 text-lg">1,088</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">998</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+9.0%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right font-bold text-emerald-800 dark:text-emerald-300">12.8%</td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">减：所得税费用</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">272</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">250</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400">+8.8%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">3.2%</td>
                    </tr>
                    <tr className={`font-bold ${theme === 'dark' ? 'bg-emerald-900/70' : 'bg-emerald-300'}`}>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-emerald-900 dark:text-emerald-200">七、净利润</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-emerald-900 dark:text-emerald-200 text-xl font-bold">816</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right">748</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right text-green-600 dark:text-green-400 font-bold">+9.1%</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-right font-bold text-emerald-900 dark:text-emerald-200 text-lg">9.6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
                <p className="text-sm"><strong>关键指标公式:</strong></p>
                <ul className="mt-2 space-y-1 ml-4 text-xs">
                  <li>• 毛利润 = 营业收入 - 营业成本</li>
                  <li>• 毛利率 = 毛利润 / 营业收入 × 100%  (本月: 40%)</li>
                  <li>• 营业利润 = 毛利润 - 期间费用</li>
                  <li>• 净利率 = 净利润 / 营业收入 × 100%  (本月: 9.6%)</li>
                  <li>• 环比增长率 = (本月 - 上月) / 上月 × 100%</li>
                  <li>• 占收入比 = 各项目 / 营业收入 × 100%</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">使用步骤</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  { step: 1, title: "准备原始数据", desc: "在数据录入工作表中按月录入收入、成本、费用等原始数据" },
                  { step: 2, title: "自动生成报表", desc: "损益表主表自动引用数据,计算所有指标和比率" },
                  { step: 3, title: "分析利润结构", desc: "查看各项占收入比,识别成本控制重点" },
                  { step: 4, title: "对比增长趋势", desc: "分析环比增长率,评估业务发展态势" },
                  { step: 5, title: "生成管理报告", desc: "结合瀑布图展示利润构成,形成经营分析报告" }
                ].map((item) => (
                  <div key={item.step} className={`p-4 rounded-lg border-l-4 ${
                    theme === 'dark' ? 'bg-cyan-900/10 border-cyan-500' : 'bg-cyan-50 border-cyan-400'
                  }`}>
                    <h4 className={`font-bold mb-1 text-sm ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      步骤{item.step}: {item.title}
                    </h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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

