"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Home, FileSpreadsheet, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function ReimbursementTemplatePage() {
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
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>费用报销单模板</span>
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
            🧾 费用报销单模板
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            适用于差旅报销、日常费用报销 | 自动计算税额 | 超标自动校验
          </p>
        </div>

        <div className="grid gap-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
              <CardTitle className="text-lg">模板说明</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className={`grid md:grid-cols-3 gap-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">核心功能</h4>
                  <ul className="text-xs space-y-1">
                    <li>• 自动计算费用总额和税额</li>
                    <li>• 费用类别下拉选择(防错)</li>
                    <li>• 报销标准自动校验</li>
                    <li>• 生成打印版报销单</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">关键函数</h4>
                  <ul className="text-xs space-y-1">
                    <li>• SUM (金额汇总)</li>
                    <li>• VLOOKUP (标准查询)</li>
                    <li>• 数据验证 (类别限制)</li>
                    <li>• TEXT (日期格式化)</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                  <h4 className="font-bold mb-2 text-amber-600 dark:text-amber-400">使用技巧</h4>
                  <p className="text-xs">
                    在费用标准工作表设置各项费用上限,主表自动校验超标项并标红提醒。打印前隐藏辅助列,版式更专业。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">报销单表头信息</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className={`p-6 rounded-lg border-2 ${theme === 'dark' ? 'bg-gray-750 border-teal-700' : 'bg-teal-50 border-teal-300'}`}>
                <h2 className="text-center text-2xl font-bold mb-6 text-teal-700 dark:text-teal-400">费用报销申请单</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex gap-2">
                    <span className="font-bold">申请人:</span>
                    <span className={`flex-1 border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-400'}`}>张三</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold">部门:</span>
                    <span className={`flex-1 border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-400'}`}>销售部</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold">申请日期:</span>
                    <span className={`flex-1 border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-400'}`}>2024-03-15</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold">单据编号:</span>
                    <span className={`flex-1 border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-400'}`}>BX20240315001</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">费用明细表</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className={`w-full text-xs border-collapse ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <thead>
                    <tr className={theme === 'dark' ? 'bg-teal-900/30' : 'bg-teal-50'}>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-teal-700 dark:text-teal-400">序号</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-teal-700 dark:text-teal-400">日期</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-teal-700 dark:text-teal-400">费用类别</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-teal-700 dark:text-teal-400">费用说明</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-teal-700 dark:text-teal-400">金额(元)</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-teal-700 dark:text-teal-400">报销标准(元)</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 font-bold text-teal-700 dark:text-teal-400">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">1</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-10</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">差旅-交通费</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">北京-上海高铁往返</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">1,168</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">1,500</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">正常</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">2</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-10</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">差旅-住宿费</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">上海酒店2晚</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">1,200</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">1,000</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">超标</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">3</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-11</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">差旅-餐饮费</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">客户招待午餐</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">680</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">800</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">正常</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">4</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-12</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">办公-打印费</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">彩色宣传资料印刷</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">350</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">500</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">正常</span>
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">5</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">2024-03-13</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">通讯-话费</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">业务手机月租</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">128</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">200</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">正常</span>
                      </td>
                    </tr>
                    <tr className={`font-bold ${theme === 'dark' ? 'bg-teal-900/40' : 'bg-teal-100'}`}>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-center" colSpan={4}>合计</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right text-teal-700 dark:text-teal-400">3,526</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">4,000</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">费用总额:</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">¥3,526</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">可报销金额:</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">¥3,326</span>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    <strong>超标项目:</strong><br/>
                    差旅-住宿费超出标准¥200,需部门经理审批
                  </p>
                </div>
              </div>

              <div className={`mt-4 p-3 rounded-lg text-xs ${theme === 'dark' ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
                <p><strong>公式说明:</strong></p>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>• 费用总额 = SUM(金额列)</li>
                  <li>• 状态判断 = IF(金额 &gt; 报销标准, 超标, 正常)</li>
                  <li>• 可报销金额 = SUMIF(状态列, 正常, 金额列)</li>
                  <li>• 费用类别使用数据验证下拉菜单,防止输入错误</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">审批流程</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { title: "申请人", name: "张三", date: "2024-03-15", status: "已提交" },
                  { title: "直属主管", name: "李经理", date: "2024-03-16", status: "已审批" },
                  { title: "财务审核", name: "王会计", date: "待审核", status: "审核中" },
                  { title: "总经理", name: "", date: "待审批", status: "待审批" }
                ].map((step, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border ${
                    step.status === '已提交' || step.status === '已审批' 
                      ? theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'
                      : theme === 'dark' ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <h4 className="font-bold text-sm mb-2">{step.title}</h4>
                    <p className="text-xs mb-1">{step.name || '-'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{step.date}</p>
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        step.status === '已提交' || step.status === '已审批'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {step.status}
                      </span>
                    </div>
                  </div>
                ))}
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
                  { step: 1, title: "填写表头信息", desc: "录入申请人、部门、日期等基本信息,单据编号自动生成" },
                  { step: 2, title: "添加费用明细", desc: "从下拉菜单选择费用类别,填写说明和金额,系统自动校验是否超标" },
                  { step: 3, title: "检查超标项", desc: "查看标红的超标项目,确认是否需要特殊审批" },
                  { step: 4, title: "提交审批", desc: "打印报销单并附上发票,提交审批流程" },
                  { step: 5, title: "跟踪进度", desc: "在审批流程区域查看当前审批状态" }
                ].map((item) => (
                  <div key={item.step} className={`p-4 rounded-lg border-l-4 ${
                    theme === 'dark' ? 'bg-teal-900/10 border-teal-500' : 'bg-teal-50 border-teal-400'
                  }`}>
                    <h4 className={`font-bold mb-1 text-sm ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>
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

