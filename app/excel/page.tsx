"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Home, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function ExcelPage() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState("overview")
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // 控制返回顶部按钮显示
      setShowScrollTop(window.scrollY > 400)
      
      // 控制导航高亮
      const sections = [
        "overview", "l0-foundation", "l1-cleaning", "power-query", "l2-explore", "power-pivot",
        "l3-advanced", "l4-output", "vba-macro", "shortcuts", "common-mistakes", "templates", "practical-cases", "learning-path", "tool-mapping", "functions"
      ]
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      {/* 面包屑导航 */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 h-16">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                {getLucideIcon('🏠', 'w-5 h-5 text-[#19bcc8]')}
                <span className="font-medium">主页</span>
              </Link>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Excel函数与工具</span>
            </div>
          </div>
        </div>

      {/* 主内容区 */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* 左侧导航 */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className={`sticky top-24 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                {getLucideIcon('📖', 'w-5 h-5 text-[#19bcc8]')}
                <span>页面导航</span>
              </h3>
            <nav className="space-y-2">
              {[
                { id: "overview", icon: "🧭", label: "知识体系总览" },
                { id: "l0-foundation", icon: "📋", label: "L0·数据规范层" },
                { id: "l1-cleaning", icon: "🧹", label: "L1·清洗与集成" },
                { id: "power-query", icon: "🔄", label: "Power Query" },
                { id: "l2-explore", icon: "📊", label: "L2·探索可视化" },
                { id: "power-pivot", icon: "📐", label: "Power Pivot" },
                { id: "l3-advanced", icon: "⚡", label: "L3·高阶模板" },
                { id: "l4-output", icon: "🎨", label: "L4·输出协作" },
                { id: "vba-macro", icon: "🤖", label: "VBA与宏" },
                { id: "shortcuts", icon: "⌨️", label: "快捷键与效率" },
                { id: "common-mistakes", icon: "⚠️", label: "常见错误避坑" },
                { id: "templates", icon: "📦", label: "Excel模板库" },
                { id: "practical-cases", icon: "💼", label: "Excel实战案例" },
                { id: "learning-path", icon: "🎯", label: "学习路径" },
                { id: "tool-mapping", icon: "🔗", label: "工具链映射" },
                { id: "functions", icon: "📚", label: "函数速查表" }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeSection === item.id
                      ? 'bg-[#19bcc8]/10 text-[#19bcc8] hover:text-[#17a8b4] dark:bg-[#19bcc8]/20 dark:text-[#19bcc8] dark:hover:text-[#17a8b4]'
                      : theme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-300 hover:text-[#19bcc8]'
                      : 'hover:bg-[#19bcc8]/10 text-gray-700 hover:text-[#19bcc8]'
                  }`}
                >
                  {getLucideIcon(item.icon, 'w-5 h-5 text-[#19bcc8]')}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
      </div>
          </aside>

          {/* 主内容 */}
          <div className="flex-1 min-w-0">
            {/* 页面标题 */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                {getLucideIcon('📊', 'w-8 h-8 text-[#19bcc8]')}
              </div>
              <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                Excel 函数与工具
        </h1>
              <p className={`text-lg max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Industry-Ready版 | 面向数据分析岗位的完整学习路径 | 学完即能用
              </p>
            </div>

            <main className="space-y-8" style={{ scrollBehavior: 'smooth' }}>
            
            {/* MODULE 01: 知识体系总览 */}
            <section id="overview">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    {getLucideIcon('🧭', 'w-6 h-6 text-white')}
                    <h2 className="text-2xl font-bold text-white">知识体系总览</h2>
                  </div>
                  <p className="text-emerald-50 ml-7">Industry-Ready版 - 按行业真实工作流重新分层</p>
                </div>
              </div>

              <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`border-b-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>层级</th>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>目标</th>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>对应岗位场景</th>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>关键函数/工具</th>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>可衔接的下一站</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            level: "L0 数据认知与规范",
                            goal: "避免脏数据从源头失控",
                            scenario: "需求访谈、数据采集、问卷设计",
                            tools: "数据类型、编码、空值、合并单元格禁忌",
                            next: "数据治理、埋点规范"
                          },
                          {
                            level: "L1 数据清洗与集成",
                            goal: "让多源数据变成一张宽表",
                            scenario: "数据工程师、数据分析师（60%工时）",
                            tools: "文本函数、关联匹配、Power Query、分列、删除重复",
                            next: "Python-pandas、SQL-ETL"
                          },
                          {
                            level: "L2 数据探索与建模",
                            goal: "快速描述+可视化+轻量建模",
                            scenario: "业务分析师、运营分析师",
                            tools: "透视表、切片器、时间函数、逻辑/统计函数、图表、条件格式",
                            next: "Power BI、Tableau、Python-seaborn"
                          },
                          {
                            level: "L3 高阶分析与自动化",
                            goal: "可复用的模板级分析",
                            scenario: "商业分析师、策略分析师",
                            tools: "综合评价、LOG/标准化、数组公式、OFFSET动态区域、宏+按钮",
                            next: "Python-sklearn、SQL窗口函数"
                          },
                          {
                            level: "L4 输出与故事化",
                            goal: "让结论一眼被老板看懂",
                            scenario: "数据产品经理、汇报型分析师",
                            tools: "动态图表、切片器联动、打印/链接对象、One-Pager报告",
                            next: "PPT数据联动、Power BI Service、Dash"
                          }
                        ].map((row, idx) => (
                          <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            <td className={`py-3 px-4 font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{row.level}</td>
                            <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.goal}</td>
                            <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.scenario}</td>
                            <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.tools}</td>
                            <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{row.next}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-blue-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE 02: L0 数据规范层 */}
            <section id="l0-foundation">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} L0·数据规范层</h2>
                  </div>
                  <p className="text-purple-50 ml-7">避免脏数据从源头失控</p>
                </div>
              </div>

              <div className="space-y-4">
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold shadow-md">1</div>
                      <CardTitle className="text-lg">文件编码</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          <span className="text-purple-600 dark:text-purple-400">✦</span> UTF-8 vs GB2312/GBK
                        </p>
                        <p className={`text-sm ml-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          乱码修复：通过 TXT 中转，另存为时选择正确编码
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'}`}>
                          {getLucideIcon('💡', 'inline w-4 h-4 text-[#19bcc8]')} <strong>实战技巧：</strong>CSV 导入乱码时，先用记事本打开 → 另存为 UTF-8 → 再导入 Excel
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold shadow-md">2</div>
                      <CardTitle className="text-lg">数据格式</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { type: "日期", example: "2025-10-02", format: "yyyy-mm-dd" },
                        { type: "文本", example: "产品编号", format: "设为文本避免自动转换" },
                        { type: "数值", example: "1234.56", format: "小数位数、千分位" },
                        { type: "布尔", example: "TRUE/FALSE", format: "逻辑判断" }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                          <p className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{item.type}</p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.example}</p>
                          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{item.format}</p>
                  </div>
                ))}
            </div>
                  </CardContent>
                </Card>

                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold shadow-md">3</div>
                      <CardTitle className="text-lg">禁忌清单 🚫</CardTitle>
          </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      {[
                        { icon: "❌", item: "合并单元格", reason: "破坏数据结构，无法排序/筛选/透视" },
                        { icon: "❌", item: "空行/空列", reason: "影响区域选择，导致公式错误" },
                        { icon: "❌", item: "合计行", reason: "应单独放置，不与明细数据混合" },
                        { icon: "❌", item: "斜线表头", reason: "不利于程序读取，改用标准列名" }
                      ].map((item, idx) => (
                        <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
                          <span className="text-xl">{item.icon}</span>
                          <div className="flex-1">
                            <p className={`font-semibold text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>{item.item}</p>
                            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{item.reason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold shadow-md">4</div>
                      <CardTitle className="text-lg">唯一键设计</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                      <p className={`font-medium mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        序号、ID、主键 - 避免"同名不同人"
                      </p>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                          <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">序号</p>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>手动编号</p>
                        </div>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                          <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">ID</p>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>系统生成</p>
                        </div>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                          <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">复合键</p>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>多字段组合</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-green-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE 03: L1 清洗与集成层 */}
            <section id="l1-cleaning">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">🧹 L1·清洗与集成层</h2>
                  </div>
                  <p className="text-green-50 ml-7">让多源数据变成一张宽表</p>
                </div>
              </div>

              <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`border-b-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>场景</th>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>核心函数</th>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>技巧Plus</th>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Python对标</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { scenario: "拆分列", func: "分列; TEXT-TO-COLUMNS", tips: "按 \"-\" \"/\" 等符号", python: "pandas.read_csv(sep)" },
                          { scenario: "提取字段", func: "LEFT/RIGHT/MID+FIND", tips: "薪资\"7-9K\"→下限/上限", python: "str.extract(regex)" },
                          { scenario: "替换/删除", func: "SUBSTITUTE; REPLACE", tips: "批量\"K\"→\"\"", python: "str.replace" },
                          { scenario: "拼接", func: "CONCATENATE; \"&\"", tips: "多字段合成Key", python: "\"+\" 或 f-string" },
                          { scenario: "去重", func: "删除重复值", tips: "公司ID、用户ID唯一性", python: "df.drop_duplicates()" },
                          { scenario: "跨表匹配", func: "VLOOKUP（新手）", tips: "INDEX+MATCH（进阶）", python: "pd.merge" },
                          { scenario: "多条件匹配", func: "SUMIFS/COUNTIFS", tips: "辅助列先拼Key", python: "merge on=[key1,key2]" },
                          { scenario: "异常处理", func: "IFERROR; ISNUMBER", tips: "把 #N/A 转 0 或\"未知\"", python: "try/except" }
                        ].map((row, idx) => (
                          <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            <td className={`py-3 px-4 font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>{row.scenario}</td>
                            <td className={`py-3 px-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} font-mono text-xs`}>{row.func}</td>
                            <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.tips}</td>
                            <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-mono text-xs`}>{row.python}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-cyan-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE NEW: Power Query */}
            <section id="power-query">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Power Query - ETL神器</h2>
                  </div>
                  <p className="text-cyan-50 ml-7">无代码实现复杂数据转换，比公式快10倍</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* 核心概念 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-sky-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold shadow-md">1</div>
                      <CardTitle className="text-lg">Power Query 核心概念</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'bg-cyan-900/20 border-cyan-700' : 'bg-cyan-50 border-cyan-200'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{getLucideIcon('✦', 'inline w-4 h-4 text-[#19bcc8]')} 什么是Power Query？</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Excel内置的ETL（Extract-Transform-Load）工具，通过GUI操作自动生成M语言代码，实现可重复、可刷新的数据处理流程。
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'bg-sky-900/20 border-sky-700' : 'bg-sky-50 border-sky-200'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{getLucideIcon('✦', 'inline w-4 h-4 text-[#19bcc8]')} 为什么用它？</h4>
                        <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>• 不需要手动复制粘贴</li>
                          <li>• 数据源更新后一键刷新</li>
                          <li>• 比VLOOKUP快100倍</li>
                          <li>• 可处理百万行级数据</li>
                        </ul>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>典型工作流程</h4>
                      <div className="flex items-center gap-2 text-sm overflow-x-auto">
                        <div className={`px-3 py-2 rounded ${theme === 'dark' ? 'bg-cyan-900/30 text-cyan-300' : 'bg-cyan-100 text-cyan-700'} whitespace-nowrap`}>
                          1️⃣ 获取数据
                        </div>
                        <span className="text-gray-400">→</span>
                        <div className={`px-3 py-2 rounded ${theme === 'dark' ? 'bg-sky-900/30 text-sky-300' : 'bg-sky-100 text-sky-700'} whitespace-nowrap`}>
                          2️⃣ 转换清洗
                        </div>
                        <span className="text-gray-400">→</span>
                        <div className={`px-3 py-2 rounded ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'} whitespace-nowrap`}>
                          3️⃣ 合并追加
                        </div>
                        <span className="text-gray-400">→</span>
                        <div className={`px-3 py-2 rounded ${theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'} whitespace-nowrap`}>
                          4️⃣ 加载输出
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 常用操作 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-sky-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold shadow-md">2</div>
                      <CardTitle className="text-lg">10大高频操作</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className={`border-b-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                            <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>操作</th>
                            <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>路径/快捷键</th>
                            <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>典型场景</th>
                            <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>M语言核心函数</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { op: "删除列", path: "右键 → 删除", scenario: "保留关键字段，减少内存", mfunc: "Table.RemoveColumns" },
                            { op: "筛选行", path: "列标题下拉 → 筛选", scenario: "只保留\"已支付\"订单", mfunc: "Table.SelectRows" },
                            { op: "转换数据类型", path: "列标题 → 数据类型", scenario: "文本\"123\"→数字123", mfunc: "Table.TransformColumnTypes" },
                            { op: "替换值", path: "转换 → 替换值", scenario: "\"null\" → 空白", mfunc: "Table.ReplaceValue" },
                            { op: "拆分列", path: "转换 → 拆分列", scenario: "\"张三-01\"→姓名/编号", mfunc: "Table.SplitColumn" },
                            { op: "合并查询", path: "主页 → 合并查询", scenario: "订单表 + 用户表", mfunc: "Table.NestedJoin" },
                            { op: "追加查询", path: "主页 → 追加查询", scenario: "合并1月+2月数据", mfunc: "Table.Combine" },
                            { op: "删除重复项", path: "主页 → 删除重复项", scenario: "用户去重", mfunc: "Table.Distinct" },
                            { op: "逆透视列", path: "转换 → 逆透视列", scenario: "宽表→长表（交叉表转明细）", mfunc: "Table.UnpivotOtherColumns" },
                            { op: "添加自定义列", path: "添加列 → 自定义列", scenario: "计算利润率、拼接字段", mfunc: "Table.AddColumn" }
                          ].map((row, idx) => (
                            <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                              <td className={`py-3 px-4 font-semibold ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>{row.op}</td>
                              <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xs`}>{row.path}</td>
                              <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.scenario}</td>
                              <td className={`py-3 px-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} font-mono text-xs`}>{row.mfunc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* M语言基础 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-sky-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold shadow-md">3</div>
                      <CardTitle className="text-lg">M语言入门（高级编辑器）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          打开高级编辑器：<span className="text-cyan-600 dark:text-cyan-400">主页 → 高级编辑器</span>
                        </p>
                        <div className={`mt-3 p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} font-mono text-xs overflow-x-auto`}>
                          <pre className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
{`let
  Source = Excel.CurrentWorkbook(){[Name="订单表"]}[Content],
  FilteredRows = Table.SelectRows(Source, each [状态] = "已支付"),
  ChangedType = Table.TransformColumnTypes(FilteredRows, {{"金额", type number}})
in
  ChangedType`}
                          </pre>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-cyan-900/20 border-cyan-700' : 'bg-cyan-50 border-cyan-200'}`}>
                          <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'}`}>基础语法</h4>
                          <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <li>• <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">let...in</code> - 分步定义变量</li>
                            <li>• <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">each</code> - 当前行引用</li>
                            <li>• <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">[列名]</code> - 字段引用</li>
                            <li>• <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">=</code> - 等于判断</li>
                          </ul>
                        </div>
                        <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-sky-900/20 border-sky-700' : 'bg-sky-50 border-sky-200'}`}>
                          <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-sky-400' : 'text-sky-700'}`}>常用函数类别</h4>
                          <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <li>• <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">Table.*</code> - 表操作</li>
                            <li>• <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">Text.*</code> - 文本处理</li>
                            <li>• <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">Date.*</code> - 日期处理</li>
                            <li>• <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">List.*</code> - 列表操作</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 实战案例 */}
                <Card className={theme === 'dark' ? 'bg-gradient-to-br from-cyan-900/30 to-sky-900/30 border-cyan-700' : 'bg-gradient-to-br from-cyan-50 to-sky-50 border-cyan-200'}>
                  <CardHeader className="pb-3 border-b border-cyan-600 dark:border-cyan-500">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-sky-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold shadow-md">💼</div>
                      <CardTitle className="text-lg text-cyan-700 dark:text-cyan-300">实战案例：多月销售数据合并</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 场景描述</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          有12个Excel文件（2024年1月.xlsx ~ 12月.xlsx），每个文件都有"订单"工作表，结构完全相同。需要合并成一个总表，并添加"月份"字段。
                        </p>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-sky-400' : 'text-sky-700'}`}> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} Power Query 操作步骤</h4>
                        <ol className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-decimal list-inside`}>
                          <li><strong>获取文件夹：</strong>数据 → 获取数据 → 来自文件 → 从文件夹</li>
                          <li><strong>筛选Excel：</strong>筛选"扩展名"列 = ".xlsx"</li>
                          <li><strong>展开内容：</strong>点击"Content"列右上角展开按钮 → 选择工作表"订单"</li>
                          <li><strong>提取月份：</strong>添加自定义列 <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">= Text.BeforeDelimiter([Name], "月")</code></li>
                          <li><strong>删除多余列：</strong>保留订单相关字段 + 月份字段</li>
                          <li><strong>关闭并加载：</strong>一键刷新，自动更新</li>
                        </ol>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                        <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-green-300' : 'text-green-800'}`}>
                          ✅ <strong>效率对比：</strong>手动复制粘贴需要1小时，Power Query只需3分钟！且下次数据更新只需点击"刷新"按钮。
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 学习资源 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-[#19bcc8] rounded-full"></div>
                      {getLucideIcon('📚', 'w-6 h-6 text-[#19bcc8]')}
                      <CardTitle className="text-lg">学习路径与资源</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="text-2xl mb-2">{getLucideIcon('📖', 'w-5 h-5 text-[#19bcc8]')}</div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Week 1-2: 基础操作</h4>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <li>• 获取数据源</li>
                          <li>• 筛选、排序、删除列</li>
                          <li>• 数据类型转换</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'}`}>
                        <div className="text-2xl mb-2">{getLucideIcon('🔧', 'w-5 h-5 text-[#19bcc8]')}</div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>Week 3-4: 高级转换</h4>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <li>• 合并查询（Join）</li>
                          <li>• 追加查询（Union）</li>
                          <li>• 逆透视/透视</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-200'}`}>
                        <div className="text-2xl mb-2">{getLucideIcon('💻', 'w-5 h-5 text-[#19bcc8]')}</div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`}>Week 5+: M语言编程</h4>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <li>• 自定义函数</li>
                          <li>• 条件列</li>
                          <li>• 参数化查询</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-blue-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE 04: L2 探索可视化层 */}
            <section id="l2-explore">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} L2·探索可视化层</h2>
                  </div>
                  <p className="text-blue-50 ml-7">快速描述+可视化+轻量建模</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* 描述统计 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-md">1</div>
                      <CardTitle className="text-lg">描述统计</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>基础函数</p>
                        <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li><code className="text-xs bg-gray-200 dark:bg-gray-600 px-1 rounded">AVERAGE</code> - 平均值</li>
                          <li><code className="text-xs bg-gray-200 dark:bg-gray-600 px-1 rounded">STDEV.P/S</code> - 标准差</li>
                          <li><code className="text-xs bg-gray-200 dark:bg-gray-600 px-1 rounded">QUARTILE</code> - 四分位数</li>
                          <li><code className="text-xs bg-gray-200 dark:bg-gray-600 px-1 rounded">MAX/MIN</code> - 最大/最小值</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>排名函数</p>
                        <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li><code className="text-xs bg-gray-200 dark:bg-gray-600 px-1 rounded">RANK</code> - 排名</li>
                          <li><code className="text-xs bg-gray-200 dark:bg-gray-600 px-1 rounded">PERCENTRANK</code> - 百分比排名</li>
                        </ul>
                      </div>
                    </div>
                    <div className={`mt-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {getLucideIcon('💡', 'inline w-4 h-4 text-[#19bcc8]')} <strong>快捷工具:</strong> 数据 → 数据分析 → 描述统计 → 一键生成完整报表
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* 透视表三板斧 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-md">2</div>
                      <CardTitle className="text-lg">数据透视表完全指南 ⭐⭐⭐⭐⭐</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-6">
                      {/* 核心概念 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-700' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 为什么透视表是数据分析师的核心技能？</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          透视表（PivotTable）是Excel最强大的数据分析工具，80%的数据分析需求都能通过透视表快速完成。面试必考，工作必用！快捷键：<code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">Alt+D+P</code>
                        </p>
                      </div>

                      {/* 四大区域 */}
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 透视表四大区域</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { num: "1", title: "行标签", color: "blue", desc: "纵向分类（产品、地区）" },
                            { num: "2", title: "列标签", color: "green", desc: "横向分类（年份、季度）" },
                            { num: "3", title: "值", color: "orange", desc: "汇总数据（销售额、数量）" },
                            { num: "4", title: "筛选器", color: "purple", desc: "全局筛选（渠道、类型）" }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-3 rounded-lg border ${theme === 'dark' ? `bg-${item.color}-900/20 border-${item.color}-700` : `bg-${item.color}-50 border-${item.color}-200`}`}>
                              <div className="flex items-center gap-2 mb-1">
                                <div className={`w-5 h-5 rounded bg-${item.color}-500 text-white flex items-center justify-center text-xs font-bold`}>{item.num}</div>
                                <p className={`font-bold text-sm ${theme === 'dark' ? `text-${item.color}-400` : `text-${item.color}-600`}`}>{item.title}</p>
                              </div>
                              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 值字段设置 */}
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>⚙ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 值字段8种汇总方式</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {[
                            { method: "求和", star: "⭐⭐⭐⭐⭐", scenario: "销售额" },
                            { method: "计数", star: "⭐⭐⭐⭐⭐", scenario: "订单数" },
                            { method: "平均值", star: "⭐⭐⭐⭐", scenario: "客单价" },
                            { method: "不重复计数", star: "⭐⭐⭐⭐⭐", scenario: "去重用户" },
                            { method: "百分比", star: "⭐⭐⭐⭐⭐", scenario: "占比分析" },
                            { method: "运行总计", star: "⭐⭐⭐⭐", scenario: "累计销售" },
                            { method: "差异", star: "⭐⭐⭐⭐", scenario: "同比环比" },
                            { method: "最大/最小", star: "⭐⭐⭐", scenario: "峰值" }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                              <span className={`font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{item.method}</span>
                              <span className="ml-2">{item.star}</span>
                              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{item.scenario}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 高级功能 */}
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{getLucideIcon('🚀', 'inline w-4 h-4 text-[#19bcc8]')} 4个高级功能</h4>
                  <div className="space-y-2">
                          {[
                            { icon: "📅", title: "分组：", desc: "日期按年/季/月分组，数值设置区间" },
                            { icon: "🧮", title: "计算字段：", desc: "自定义公式（如：利润率=利润/销售额）⭐⭐⭐⭐⭐" },
                            { icon: "🎛️", title: "切片器：", desc: "可视化筛选器，支持多表联动 ⭐⭐⭐⭐⭐" },
                            { icon: "⏱️", title: "时间线：", desc: "专门用于日期字段的筛选器" }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                              <span className="text-lg mr-2">{getLucideIcon(item.icon, 'w-4 h-4 text-[#19bcc8]')}</span>
                              <span className={`font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{item.title}</span>
                              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</span>
                        </div>
                    ))}
                  </div>
                      </div>

                      {/* 实战案例 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{getLucideIcon('💼', 'inline w-4 h-4 text-[#19bcc8]')} 实战：销售数据多维分析</h4>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <p className="mb-2"><strong>需求：</strong>分析各地区、各产品的月度销售趋势</p>
                          <ul className="space-y-1 text-xs">
                            <li>• <strong>筛选器：</strong>销售渠道 | <strong>行：</strong>地区、产品 | <strong>列：</strong>月份</li>
                            <li>• <strong>值：</strong>销售额（求和）、订单数（计数）、客单价（平均）</li>
                            <li>• <strong>切片器：</strong>年份、季度 → 完成后插入透视图</li>
                          </ul>
                        </div>
                      </div>

                      {/* 常见错误 */}
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                        <h4 className={`font-bold mb-2 text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{getLucideIcon('⚠️', 'inline w-4 h-4 text-[#19bcc8]')} 5个常见错误</h4>
                        <ol className={`list-decimal list-inside space-y-1 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>源数据有空行 → 删除空行或用表格格式</li>
                          <li>数据未更新 → 右键刷新（Alt+F5）</li>
                          <li>数值识别为文本 → 转换为数值格式</li>
                          <li>日期无法分组 → 统一日期格式</li>
                          <li>数据量过大卡顿 → 用Power Pivot</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Excel图表大全 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-md">3</div>
                      <CardTitle className="text-lg">Excel图表大全 ⭐⭐⭐⭐⭐</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
                          💡 <strong>数据可视化的基础：</strong>选对图表类型是数据分析师的基本功！快捷键：<code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">Alt+F1</code>（快速创建图表）
                        </p>
                      </div>

                      {/* 10种核心图表 */}
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: "📊", name: "柱状图/条形图", star: "⭐⭐⭐⭐⭐", use: "对比分析（各产品销售额对比）", tip: "数据<10项用柱状，>10项用条形" },
                          { icon: "📈", name: "折线图", star: "⭐⭐⭐⭐⭐", use: "趋势分析（月度销售趋势）", tip: "最适合展示时间序列数据" },
                          { icon: "🥧", name: "饼图/圆环图", star: "⭐⭐⭐⭐", use: "占比分析（市场份额）", tip: "类别<6个，用圆环图更高级" },
                          { icon: "📉", name: "散点图", star: "⭐⭐⭐⭐⭐", use: "相关性分析（价格vs销量）", tip: "数据分析师必备，展示两变量关系" },
                          { icon: "📊", name: "组合图", star: "⭐⭐⭐⭐⭐", use: "双坐标轴（销售额+增长率）", tip: "不同量级数据的对比利器" },
                          { icon: "📦", name: "箱线图", star: "⭐⭐⭐⭐", use: "分布分析（数据离散程度）", tip: "展示最大/小值、四分位数、中位数" },
                          { icon: "💧", name: "瀑布图", star: "⭐⭐⭐⭐", use: "增减变化（利润构成分析）", tip: "Excel 2016+，展示累计效果" },
                          { icon: "🌡️", name: "热力图", star: "⭐⭐⭐⭐", use: "矩阵数据（各地区各月销售）", tip: "用条件格式色阶实现" },
                          { icon: "🎯", name: "雷达图", star: "⭐⭐⭐", use: "多维度对比（产品评分）", tip: "维度3-8个最佳" },
                          { icon: "📊", name: "直方图", star: "⭐⭐⭐⭐", use: "频数分布（年龄分布）", tip: "数据分析 → 直方图，设置组距" }
                        ].map((chart, idx) => (
                          <div key={idx} className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-2xl">{getLucideIcon(chart.icon, 'w-5 h-5 text-[#19bcc8]')}</span>
                              <div className="flex-1">
                                <p className={`font-bold text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{chart.name}</p>
                                <p className="text-xs">{chart.star}</p>
                              </div>
                            </div>
                            <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}><strong>用途：</strong>{chart.use}</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{getLucideIcon('💡', 'inline w-4 h-4 text-[#19bcc8]')} {chart.tip}</p>
                </div>
              ))}
            </div>

                      {/* 图表美化技巧 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>🎨 图表美化5个技巧</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {[
                            { num: "1", tip: "删除图例（数据直接标注）", reason: "减少视觉干扰" },
                            { num: "2", tip: "使用数据标签", reason: "精确展示数值" },
                            { num: "3", tip: "坐标轴从0开始", reason: "避免视觉误导" },
                            { num: "4", tip: "配色遵循品牌色", reason: "专业统一" },
                            { num: "5", tip: "突出关键数据", reason: "用颜色/粗细强调重点" }
                          ].map((item) => (
                            <div key={item.num} className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                              <span className="font-bold text-purple-600 dark:text-purple-400">{item.num}. </span>
                              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{item.tip}</span>
                              <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>→ {item.reason}</p>
          </div>
                          ))}
        </div>
      </div>

                      {/* 动态图表 */}
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 动态图表（必学）⭐⭐⭐⭐⭐</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <strong>方法1：</strong>图表+透视表切片器联动（最简单）<br/>
                          <strong>方法2：</strong>图表+数据验证下拉框+OFFSET函数（灵活）<br/>
                          <strong>方法3：</strong>图表+表格（Table）自动扩展（推荐）<br/>
                          <strong>效果：</strong>数据更新，图表自动刷新，无需手动调整！
                        </p>
    </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 条件格式与数据验证 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-md">4</div>
                      <CardTitle className="text-lg">条件格式 & 数据验证 ⭐⭐⭐⭐</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      {/* 条件格式 */}
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>🎨 条件格式（Conditional Formatting）</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { name: "数据条", desc: "可视化单元格数值大小", use: "销售额对比", star: "⭐⭐⭐⭐" },
                            { name: "色阶", desc: "渐变色展示数值", use: "热力图效果", star: "⭐⭐⭐⭐⭐" },
                            { name: "图标集", desc: "箭头/红绿灯标识", use: "趋势标记", star: "⭐⭐⭐⭐" },
                            { name: "突出显示规则", desc: "大于/小于/等于", use: "异常值标红", star: "⭐⭐⭐⭐⭐" },
                            { name: "重复值", desc: "标记重复/唯一值", use: "数据去重", star: "⭐⭐⭐⭐" },
                            { name: "自定义公式", desc: "最强大功能", use: "复杂条件判断", star: "⭐⭐⭐⭐⭐" }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                              <p className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{item.name} {item.star}</p>
                              <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
                              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>→ {item.use}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 自定义公式示例 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 条件格式自定义公式示例</h4>
                        <div className="space-y-2 text-sm">
                          <div className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                            <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>1. 标记整行（销售额&gt;10000）</p>
                            <code className="text-xs">=$C2&gt;10000</code> <span className="text-xs text-gray-500">（注意$符号）</span>
                          </div>
                          <div className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                            <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>2. 标记周末日期</p>
                            <code className="text-xs">=WEEKDAY($A2,2)&gt;5</code>
                          </div>
                          <div className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                            <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>3. 标记Top 10</p>
                            <code className="text-xs">=B2&gt;=LARGE($B:$B,10)</code>
                          </div>
                        </div>
                      </div>

                      {/* 数据验证 */}
                      <div>
                        <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 数据验证（Data Validation）⭐⭐⭐⭐</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { type: "下拉列表", use: "限制输入选项", example: "=A1:A10 或 男,女", tip: "最常用" },
                            { type: "数值范围", use: "限制数值", example: "0-100之间", tip: "防止异常输入" },
                            { type: "日期限制", use: "限制日期范围", example: "只能输入未来日期", tip: "表单必备" },
                            { type: "自定义公式", use: "复杂验证", example: "=LEN(A1)=11（手机号）", tip: "最灵活" }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'}`}>
                              <p className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>{item.type}</p>
                              <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}><strong>用途：</strong>{item.use}</p>
                              <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>示例：{item.example}</p>
                              <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>💡 {item.tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 动态下拉列表 */}
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 动态下拉列表（高级技巧）</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <strong>需求：</strong>二级联动下拉（选择省份→显示对应城市）<br/>
                          <strong>公式：</strong><code className="text-xs bg-gray-200 dark:bg-gray-600 px-1 rounded">=INDIRECT($A2)</code><br/>
                          <strong>原理：</strong>根据第一个下拉框的值，动态引用对应的命名区域
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 查找引用函数族 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-md">5</div>
                      <CardTitle className="text-lg">查找引用函数族 ⭐⭐⭐⭐⭐</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-800'}`}>
                          🔥 <strong>数据分析师必考技能！</strong>面试90%会问VLOOKUP，实际工作中每天都在用！
                        </p>
                      </div>

                      {/* 三大函数对比 */}
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        {[
                          { func: "VLOOKUP", difficulty: "简单⭐", flexibility: "低⭐⭐", speed: "中⭐⭐⭐", recommend: "⭐⭐⭐⭐" },
                          { func: "INDEX+MATCH", difficulty: "中等⭐⭐⭐", flexibility: "高⭐⭐⭐⭐⭐", speed: "快⭐⭐⭐⭐⭐", recommend: "⭐⭐⭐⭐⭐" },
                          { func: "XLOOKUP", difficulty: "简单⭐", flexibility: "高⭐⭐⭐⭐⭐", speed: "快⭐⭐⭐⭐⭐", recommend: "⭐⭐⭐⭐⭐" }
                        ].map((row, idx) => (
                          <div key={idx} className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                            <p className={`font-bold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{row.func}</p>
                            <div className="space-y-1 text-xs">
                              <p><strong>难度：</strong>{row.difficulty}</p>
                              <p><strong>灵活性：</strong>{row.flexibility}</p>
                              <p><strong>速度：</strong>{row.speed}</p>
                              <p><strong>推荐度：</strong>{row.recommend}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* 三个函数详解 */}
                      <div className="space-y-3">
                        {/* VLOOKUP */}
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                          <h4 className={`font-bold mb-2 text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>1️⃣ VLOOKUP（必学）</h4>
                          <p className="text-xs font-mono mb-2 bg-gray-200 dark:bg-gray-700 p-2 rounded">
                            =VLOOKUP(查找值, 查找区域, 返回列号, 0)
                          </p>
                          <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            示例：<code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">=VLOOKUP(A2,$D$2:$F$100,2,0)</code>
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <p className="text-green-600 dark:text-green-400"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 最常用，面试必考</p>
                            <p className="text-red-600 dark:text-red-400">❌ 只能从左往右查</p>
                          </div>
                        </div>

                        {/* INDEX+MATCH */}
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
                          <h4 className={`font-bold mb-2 text-sm ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>2️⃣ INDEX+MATCH（最强）⭐⭐⭐⭐⭐</h4>
                          <p className="text-xs font-mono mb-2 bg-gray-200 dark:bg-gray-700 p-2 rounded">
                            =INDEX(返回区域, MATCH(查找值, 查找区域, 0))
                          </p>
                          <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            示例：<code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">=INDEX($E$2:$E$100,MATCH(A2,$D$2:$D$100,0))</code>
                          </p>
                          <div className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <p> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 可从右往左查 {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 速度最快 {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 双向查找</p>
                          </div>
                        </div>

                        {/* XLOOKUP */}
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                          <h4 className={`font-bold mb-2 text-sm ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>3️⃣ XLOOKUP（Office 365）</h4>
                          <p className="text-xs font-mono mb-2 bg-gray-200 dark:bg-gray-700 p-2 rounded">
                            =XLOOKUP(查找值, 查找区域, 返回区域, "未找到")
                          </p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            ✨ 集两者优点，语法最简洁。⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 仅Office 365/2021支持
                          </p>
                        </div>
                      </div>

                      {/* 常见错误 */}
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                        <h4 className={`font-bold mb-2 text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>⚠️ 5个常见错误</h4>
                        <ol className={`list-decimal list-inside space-y-1 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>#N/A错误 → 数值vs文本格式不一致</li>
                          <li>匹配模式写1 → 应该用0（精确匹配）</li>
                          <li>忘记$绝对引用 → 公式下拉时出错</li>
                          <li>VLOOKUP列号固定 → 插入列后失效</li>
                          <li>重复值 → 只返回第一个，用FILTER函数</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 表格与快捷键 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-md">6</div>
                      <CardTitle className="text-lg">表格 & 快捷键 ⭐⭐⭐⭐</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      {/* 表格功能 */}
                      <div>
                        <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Excel表格（Ctrl+T）</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {[
                            { icon: "🎯", feature: "自动扩展", desc: "数据/公式/图表自动更新" },
                            { icon: "🔍", feature: "筛选按钮", desc: "每列自动筛选" },
                            { icon: "📊", feature: "汇总行", desc: "一键求和/平均" },
                            { icon: "📝", feature: "结构化引用", desc: "[销售额]*[数量]" }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                              <span className="mr-1">{item.icon}</span>
                              <strong>{item.feature}:</strong> {item.desc}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 快捷键 */}
                      <div>
                        <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>⌨️ 20个必学快捷键</h4>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          {[
                            { key: "Ctrl+T", action: "创建表格" },
                            { key: "Alt+D+P", action: "透视表" },
                            { key: "Alt+F1", action: "快速图表" },
                            { key: "Ctrl+Shift+L", action: "筛选" },
                            { key: "Ctrl+↓", action: "跳转边界" },
                            { key: "Ctrl+Shift+↓", action: "选中整列" },
                            { key: "Alt+=", action: "快速求和" },
                            { key: "Ctrl+;", action: "当前日期" },
                            { key: "Ctrl+D", action: "向下填充" },
                            { key: "Ctrl+R", action: "向右填充" },
                            { key: "F4", action: "绝对引用" },
                            { key: "Ctrl+PageDown", action: "切换表" },
                            { key: "Alt+Enter", action: "单元格换行" },
                            { key: "Ctrl+1", action: "格式设置" },
                            { key: "Ctrl+9", action: "隐藏行" },
                            { key: "Ctrl+0", action: "隐藏列" },
                            { key: "F2", action: "编辑单元格" },
                            { key: "Ctrl+Space", action: "选中整列" },
                            { key: "Shift+Space", action: "选中整行" },
                            { key: "Ctrl+Home", action: "回到A1" }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-2 rounded ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
                              <code className={`font-bold block mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{item.key}</code>
                              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{item.action}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 效率提升 */}
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 熟练掌握快捷键，数据处理效率提升<strong className="text-green-600 dark:text-green-400"> 5-10倍</strong>！建议每天练习3-5个，1周掌握。
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-indigo-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE NEW: Power Pivot */}
            <section id="power-pivot">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Power Pivot - 数据建模引擎</h2>
                  </div>
                  <p className="text-indigo-50 ml-7">百万行数据秒级响应，DAX公式超越SUMIFS</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* 核心概念 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shadow-md">1</div>
                      <CardTitle className="text-lg">Power Pivot 核心概念</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'bg-indigo-900/20 border-indigo-700' : 'bg-indigo-50 border-indigo-200'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-700'}`}>✦ 什么是Power Pivot？</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Excel内置的<strong>内存数据库引擎</strong>（xVelocity），可以处理百万级数据，通过建立表关系（Star Schema）和DAX语言，实现比透视表更强大的多维分析。
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>✦ 为什么用它？</h4>
                        <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>• 处理100万+ 行数据不卡顿</li>
                          <li>• 无需VLOOKUP，自动关联</li>
                          <li>• 一次建模，多维切片</li>
                          <li>• DAX公式替代复杂SUMIFS</li>
                        </ul>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>数据建模三步走</h4>
                      <div className="flex items-center gap-2 text-sm overflow-x-auto">
                        <div className={`px-3 py-2 rounded ${theme === 'dark' ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-100 text-indigo-700'} whitespace-nowrap`}>
                          1️⃣ 导入表格
                        </div>
                        <span className="text-gray-400">→</span>
                        <div className={`px-3 py-2 rounded ${theme === 'dark' ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'} whitespace-nowrap`}>
                          2️⃣ 建立关系
                        </div>
                        <span className="text-gray-400">→</span>
                        <div className={`px-3 py-2 rounded ${theme === 'dark' ? 'bg-pink-900/30 text-pink-300' : 'bg-pink-100 text-pink-700'} whitespace-nowrap`}>
                          3️⃣ 创建度量值（DAX）
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 数据建模基础 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shadow-md">2</div>
                      <CardTitle className="text-lg">星型模型（Star Schema）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>核心概念：事实表 + 维度表</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className={`p-3 rounded border ${theme === 'dark' ? 'bg-indigo-900/20 border-indigo-700' : 'bg-indigo-50 border-indigo-200'}`}>
                            <p className={`font-bold mb-2 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 事实表（Fact Table）</p>
                            <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                              <li>• <strong>定义：</strong>包含业务数据的主表</li>
                              <li>• <strong>示例：</strong>订单表、销售流水表</li>
                              <li>• <strong>字段：</strong>订单ID、日期、用户ID、产品ID、金额</li>
                              <li>• <strong>特点：</strong>数据量大，包含度量值</li>
                            </ul>
                          </div>
                          <div className={`p-3 rounded border ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'}`}>
                            <p className={`font-bold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>🏷 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 维度表（Dimension Table）</p>
                            <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                              <li>• <strong>定义：</strong>描述业务维度的属性表</li>
                              <li>• <strong>示例：</strong>用户表、产品表、日期表</li>
                              <li>• <strong>字段：</strong>用户ID、姓名、性别、城市</li>
                              <li>• <strong>特点：</strong>数据量小，用于筛选切片</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-pink-900/20 border border-pink-700' : 'bg-pink-50 border border-pink-200'}`}>
                        <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-pink-300' : 'text-pink-700'}`}>✨ 建立关系的3个原则</h4>
                        <ol className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-decimal list-inside`}>
                          <li><strong>一对多：</strong>维度表的主键（唯一）→ 事实表的外键（可重复）</li>
                          <li><strong>单向筛选：</strong>默认维度表筛选事实表（可设为双向，慎用）</li>
                          <li><strong>避免循环：</strong>不能形成循环依赖，否则DAX计算错误</li>
                        </ol>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-300'}`}>
                        <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>💼 操作步骤：</h4>
                        <ol className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-decimal list-inside`}>
                          <li>Power Pivot → 添加到数据模型（导入各表）</li>
                          <li>Power Pivot窗口 → 关系图视图</li>
                          <li>拖拽维度表的主键 → 事实表的外键</li>
                          <li>验证关系类型为"一对多"</li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* DAX语言 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shadow-md">3</div>
                      <CardTitle className="text-lg">DAX 公式基础（Data Analysis Expressions）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>DAX vs Excel 公式</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className={`border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                                <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>特性</th>
                                <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Excel公式</th>
                                <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>DAX公式</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { feature: "计算位置", excel: "单元格", dax: "度量值（Measure）" },
                                { feature: "数据来源", excel: "单张表", dax: "多表关联" },
                                { feature: "自动聚合", excel: "需SUMIFS等", dax: "自动SUM" },
                                { feature: "上下文", excel: "当前行", dax: "筛选上下文+行上下文" }
                              ].map((row, idx) => (
                                <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                  <td className={`py-2 px-3 font-semibold ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>{row.feature}</td>
                                  <td className={`py-2 px-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{row.excel}</td>
                                  <td className={`py-2 px-3 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{row.dax}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-indigo-900/20 border-indigo-700' : 'bg-indigo-50 border-indigo-200'}`}>
                          <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-700'}`}>基础聚合函数</h4>
                          <div className={`space-y-2 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <div>
                              <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">SUM(表[列])</code>
                              <p className="mt-1 text-gray-500">求和</p>
                            </div>
                            <div>
                              <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">AVERAGE(表[列])</code>
                              <p className="mt-1 text-gray-500">平均值</p>
                            </div>
                            <div>
                              <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">COUNT/COUNTA</code>
                              <p className="mt-1 text-gray-500">计数</p>
                            </div>
                          </div>
                        </div>
                        <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'}`}>
                          <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>迭代函数（X系列）</h4>
                          <div className={`space-y-2 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <div>
                              <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">SUMX(表, 表达式)</code>
                              <p className="mt-1 text-gray-500">逐行计算后求和</p>
                            </div>
                            <div>
                              <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">AVERAGEX</code>
                              <p className="mt-1 text-gray-500">逐行计算后平均</p>
                            </div>
                            <div>
                              <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">COUNTX</code>
                              <p className="mt-1 text-gray-500">逐行计算后计数</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-300'}`}>
                        <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>📌 核心函数：CALCULATE（上下文转换）</h4>
                        <div className={`p-3 mt-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} font-mono text-xs`}>
                          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            总销售额 = SUM(订单表[金额])<br/>
                            已支付销售额 = CALCULATE(SUM(订单表[金额]), 订单表[状态]="已支付")<br/>
                            去年同期 = CALCULATE(SUM(订单表[金额]), SAMEPERIODLASTYEAR(日期表[日期]))
                          </p>
                        </div>
                        <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <strong className="text-indigo-600 dark:text-indigo-400">CALCULATE</strong> 是DAX最强大的函数，可以动态修改筛选上下文。
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 实战案例 */}
                <Card className={theme === 'dark' ? 'bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-700' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'}>
                  <CardHeader className="pb-3 border-b border-indigo-600 dark:border-indigo-500">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">💼</div>
                      <CardTitle className="text-lg text-indigo-700 dark:text-indigo-300">实战案例：电商销售仪表盘</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 场景描述</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          有3张表：<strong>订单表</strong>（100万行）、<strong>产品表</strong>（1000行）、<strong>日期表</strong>（3年）。需要分析：各品类销售额、同比增长、Top10产品、用户复购率。
                        </p>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} Power Pivot 解决方案</h4>
                        <div className="space-y-3">
                          <div>
                            <p className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>1️⃣ 建立关系</p>
                            <ul className={`text-xs space-y-1 ml-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              <li>• 产品表[产品ID] → 订单表[产品ID]</li>
                              <li>• 日期表[日期] → 订单表[下单日期]</li>
                            </ul>
                          </div>

                          <div>
                            <p className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>2️⃣ 创建度量值（DAX）</p>
                            <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} font-mono text-xs mt-2`}>
                              <pre className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
{`// 总销售额
销售额 = SUM(订单表[金额])

// 去年同期销售额
去年销售额 = CALCULATE([销售额], SAMEPERIODLASTYEAR(日期表[日期]))

// 同比增长率
同比增长 = DIVIDE([销售额] - [去年销售额], [去年销售额], 0)

// 复购用户数
复购用户 = CALCULATE(
    DISTINCTCOUNT(订单表[用户ID]),
    订单表[订单次数] > 1
)`}
                              </pre>
                            </div>
                          </div>

                          <div>
                            <p className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>3️⃣ 创建透视表</p>
                            <p className={`text-xs ml-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              插入 → 数据透视表 → 使用数据模型 → 拖入字段 + 度量值
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                        <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-green-300' : 'text-green-800'}`}>
                          ✅ <strong>性能对比：</strong>普通透视表处理100万行数据需要5分钟，Power Pivot只需10秒！且切片器响应速度快10倍。
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 学习路径 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-[#19bcc8] rounded-full"></div>
                      {getLucideIcon('📚', 'w-6 h-6 text-[#19bcc8]')}
                      <CardTitle className="text-lg">学习路径与资源</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="text-2xl mb-2">{getLucideIcon('📖', 'w-5 h-5 text-[#19bcc8]')}</div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Week 1-2: 数据建模</h4>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <li>• 导入数据</li>
                          <li>• 建立表关系</li>
                          <li>• 星型模型设计</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'}`}>
                        <div className="text-2xl mb-2">{getLucideIcon('🔧', 'w-5 h-5 text-[#19bcc8]')}</div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>Week 3-4: DAX基础</h4>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <li>• SUM/AVERAGE等</li>
                          <li>• CALCULATE函数</li>
                          <li>• 时间智能函数</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-200'}`}>
                        <div className="text-2xl mb-2">{getLucideIcon('💻', 'w-5 h-5 text-[#19bcc8]')}</div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`}>Week 5+: 高级DAX</h4>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <li>• FILTER/ALL</li>
                          <li>• 上下文转换</li>
                          <li>• 变量（VAR）</li>
                        </ul>
                      </div>
                    </div>

                    <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-pink-900/20 border border-pink-700' : 'bg-pink-50 border border-pink-200'}`}>
                      <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-pink-300' : 'text-pink-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 衔接 Power BI</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Power Pivot是Power BI的前身，学会后可以无缝过渡到Power BI Desktop，实现更专业的商业智能分析和可视化。
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-orange-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE 05: L3 高阶模板层 */}
            <section id="l3-advanced">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white"> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} L3·高阶模板层</h2>
                  </div>
                  <p className="text-orange-50 ml-7">可复用的模板级分析</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* 综合评价建模 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shadow-md">1</div>
                      <CardTitle className="text-lg">综合评价建模（通用模板）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className={`mb-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-orange-50 border border-orange-200'}`}>
                      <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-orange-300' : 'text-orange-800'}`}>
                        适用场景: 餐厅/商品/员工评分、供应商评估
                      </p>
                    </div>
                    <div className="space-y-3">
                      {[
                        { step: "指标统一量纲", formula: "LOG10(点评数+1); 人均价格反向LOG" },
                        { step: "线性加权", formula: "=口味*0.5+服务*0.3+环境*0.2" },
                        { step: "标准化", formula: "=(X-MIN)/(MAX-MIN) → 0-1区间" },
                        { step: "TopN输出", formula: "排序+序号，可接RANK函数" }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                          <p className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>{idx + 1}. {item.step}</p>
                          <code className={`text-xs ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>{item.formula}</code>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 数组公式 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shadow-md">2</div>
                      <CardTitle className="text-lg">数组公式（Ctrl+Shift+Enter）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>一键分档</p>
                        <code className={`block p-2 rounded text-xs ${theme === 'dark' ? 'bg-gray-600 text-blue-300' : 'bg-white text-blue-600'}`}>
                          =LOOKUP(薪资,{'{'}0,5,10,20{'}'},{'{'}\"L\",\"M\",\"H\",\"S\"{'}'})
                        </code>
                      </div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>多条件求和</p>
                        <code className={`block p-2 rounded text-xs ${theme === 'dark' ? 'bg-gray-600 text-blue-300' : 'bg-white text-blue-600'}`}>
                          =SUM((区域=\"应届\")*(薪资&gt;10)*薪资)
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 动态区域 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shadow-md">3</div>
                      <CardTitle className="text-lg">动态区域</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-orange-700 bg-orange-900/20' : 'border-orange-200 bg-orange-50'}`}>
                        <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>OFFSET+COUNTA</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>自动扩展下拉菜单/图表序列</p>
                      </div>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-orange-700 bg-orange-900/20' : 'border-orange-200 bg-orange-50'}`}>
                        <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>名称管理器+INDIRECT</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>多级联动下拉</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-pink-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE 06: L4 输出协作层 */}
            <section id="l4-output">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">{getLucideIcon('🎨', 'inline w-6 h-6 text-white')} L4·输出协作层</h2>
                  </div>
                  <p className="text-pink-50 ml-7">让结论一眼被老板看懂</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader className="pb-3 border-b bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
                        <CardTitle className="text-base">打印设置</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-3">
                      <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• 缩放一页</li>
                        <li>• 重复标题行</li>
                        <li>• 页码/单色</li>
                        <li>• 隐藏错误值</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader className="pb-3 border-b bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
                        <CardTitle className="text-base">链接对象</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-3">
                      <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• Excel ↔ Word/PPT</li>
                        <li>• 粘贴链接</li>
                        <li>• 刷新即更新</li>
                        <li>• 保持交互</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader className="pb-3 border-b bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
                        <CardTitle className="text-base">一键出图</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-3">
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        切片器+图表 → 复制到PPT仍保持交互
                      </p>
                    </CardContent>
                  </Card>

                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader className="pb-3 border-b bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
                        <CardTitle className="text-base">视图管理</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-3">
                      <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• 冻结窗格</li>
                        <li>• 保持表头可见</li>
                        <li>• CSV编码互转</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-slate-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE NEW: VBA与宏 */}
            <section id="vba-macro">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-slate-500 via-gray-500 to-zinc-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">{getLucideIcon('🤖', 'inline w-6 h-6 text-white')} VBA与宏 - 自动化进阶</h2>
                  </div>
                  <div className="flex items-center gap-3 ml-7">
                    <p className="text-slate-50">可选技能 | 优先级：中等 | 适合传统企业环境</p>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/80 text-white">可选模块</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* 重要性说明 */}
                <Card className={theme === 'dark' ? 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-700' : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold shadow-md">⚠️</div>
                      <CardTitle className="text-lg text-yellow-700 dark:text-yellow-300">重要性评级与学习建议</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'}`}>
                        <h4 className={`font-bold mb-2 text-center ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 优先学习</h4>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>1. Excel基础函数</li>
                          <li>2. 透视表</li>
                          <li>3. Power Query ⭐⭐⭐</li>
                          <li>4. Power Pivot ⭐⭐</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
                        <h4 className={`font-bold mb-2 text-center ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} VBA与宏 - 当前模块</h4>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <strong>优先级：中等</strong><br/>
                          传统企业、重复性工作多时学习。<br/>
                          如有Python环境，优先学Python。
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                        <h4 className={`font-bold mb-2 text-center ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 长期发展</h4>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>1. Python ⭐⭐⭐</li>
                          <li>2. SQL ⭐⭐⭐</li>
                          <li>3. Power BI ⭐⭐</li>
                          <li>4. 统计学 ⭐⭐⭐</li>
                        </ul>
                      </div>
                    </div>

                    <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-300'}`}>
                      <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 使用场景判断</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>✓ 适合学VBA的场景：</p>
                          <ul className={`text-xs space-y-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            <li>• 公司只有Excel，没有Python环境</li>
                            <li>• 每天处理几十个相同格式的文件</li>
                            <li>• 需要定期生成固定格式报表</li>
                            <li>• 需要自定义按钮、表单界面</li>
                            <li>• 需要Excel与Outlook/Word联动</li>
                          </ul>
                        </div>
                        <div>
                          <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>✗ 不建议学VBA的场景：</p>
                          <ul className={`text-xs space-y-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            <li>• 有Python环境（用pandas更强大）</li>
                            <li>• Power Query能解决（优先用PQ）</li>
                            <li>• 数据量&gt;10万行（VBA会很慢）</li>
                            <li>• 使用Excel Online（不支持VBA）</li>
                            <li>• 团队协作环境（代码难维护）</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 核心概念 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-slate-500 to-gray-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold shadow-md">1</div>
                      <CardTitle className="text-lg">核心概念：宏 vs VBA</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'bg-slate-900/20 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>🎬 宏（Macro）</h4>
                        <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <strong>定义：</strong>录制的操作步骤序列
                        </p>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <li>• <strong>创建方式：</strong>录制宏（视图 → 宏 → 录制宏）</li>
                          <li>• <strong>适用场景：</strong>简单重复性操作</li>
                          <li>• <strong>优点：</strong>无需编程，快速上手</li>
                          <li>• <strong>缺点：</strong>不够灵活，难以处理逻辑</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'bg-gray-900/20 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>💻 VBA（Visual Basic for Applications）</h4>
                        <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <strong>定义：</strong>Excel内置的编程语言
                        </p>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <li>• <strong>创建方式：</strong>VBA编辑器（Alt+F11）</li>
                          <li>• <strong>适用场景：</strong>复杂逻辑、条件判断、循环</li>
                          <li>• <strong>优点：</strong>功能强大，完全控制Excel</li>
                          <li>• <strong>缺点：</strong>需要编程基础，学习曲线陡峭</li>
                        </ul>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                      <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 关系：宏是VBA的简化版</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        录制宏会自动生成VBA代码。你可以先录制宏，再打开VBA编辑器查看和修改代码，这是学习VBA的最佳路径。
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* 基础语法 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-slate-500 to-gray-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold shadow-md">2</div>
                      <CardTitle className="text-lg">VBA 基础语法（5分钟速览）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>基本结构：Sub过程</h4>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} font-mono text-xs overflow-x-auto`}>
                          <pre className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
{`Sub HelloWorld()
    MsgBox "Hello, Data Analyst!"
End Sub

Sub 删除空行()
    Dim i As Long
    For i = Cells(Rows.Count, 1).End(xlUp).Row To 1 Step -1
        If WorksheetFunction.CountA(Rows(i)) = 0 Then
            Rows(i).Delete
        End If
    Next i
End Sub`}
                          </pre>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-slate-900/20 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                          <h4 className={`font-bold text-sm mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>变量声明</h4>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-mono space-y-1`}>
                            <p>Dim x As Integer</p>
                            <p>Dim name As String</p>
                            <p>Dim ws As Worksheet</p>
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-900/20 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                          <h4 className={`font-bold text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>条件判断</h4>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-mono space-y-1`}>
                            <p>If x &gt; 100 Then</p>
                            <p>&nbsp;&nbsp;MsgBox "大于100"</p>
                            <p>End If</p>
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-zinc-900/20 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                          <h4 className={`font-bold text-sm mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`}>循环</h4>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-mono space-y-1`}>
                            <p>For i = 1 To 10</p>
                            <p>&nbsp;&nbsp;Cells(i,1)=i</p>
                            <p>Next i</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 核心对象模型 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-slate-500 to-gray-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold shadow-md">3</div>
                      <CardTitle className="text-lg">核心对象模型（必须掌握）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className={`border-b-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                            <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>对象</th>
                            <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>说明</th>
                            <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>常用方法/属性</th>
                            <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>示例代码</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { 
                              obj: "Workbook", 
                              desc: "工作簿（Excel文件）", 
                              methods: "Open, Close, Save, SaveAs", 
                              example: 'Workbooks.Open("C:\\data.xlsx")' 
                            },
                            { 
                              obj: "Worksheet", 
                              desc: "工作表（Sheet）", 
                              methods: "Add, Delete, Copy, Name", 
                              example: 'Worksheets("Sheet1").Delete' 
                            },
                            { 
                              obj: "Range", 
                              desc: "单元格区域", 
                              methods: "Value, Copy, Clear, AutoFill", 
                              example: 'Range("A1:B10").Value = 100' 
                            },
                            { 
                              obj: "Cells", 
                              desc: "单元格（行列索引）", 
                              methods: "Value, Font, Interior", 
                              example: 'Cells(1, 1).Value = "标题"' 
                            },
                            { 
                              obj: "Rows/Columns", 
                              desc: "行/列", 
                              methods: "Insert, Delete, Hidden, AutoFit", 
                              example: 'Rows(5).Delete' 
                            }
                          ].map((row, idx) => (
                            <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                              <td className={`py-3 px-4 font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{row.obj}</td>
                              <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.desc}</td>
                              <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xs`}>{row.methods}</td>
                              <td className={`py-3 px-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} font-mono text-xs`}>{row.example}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* 5大典型场景 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-slate-500 to-gray-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold shadow-md">4</div>
                      <CardTitle className="text-lg">5大典型应用场景</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {[
                        {
                          title: "场景1：批量处理多个工作簿",
                          desc: "每天收到50个Excel文件，需要提取指定数据并汇总",
                          code: `Sub 批量汇总文件()
    Dim wb As Workbook, ws As Worksheet
    Dim filePath As String
    filePath = "C:\\数据\\"
    
    For Each fileName In Dir(filePath & "*.xlsx")
        Set wb = Workbooks.Open(filePath & fileName)
        ' 提取数据逻辑
        wb.Close SaveChanges:=False
    Next
End Sub`,
                          color: "blue"
                        },
                        {
                          title: "场景2：自动生成标准化报表",
                          desc: "每周生成固定格式的周报，包含图表、格式、筛选器",
                          code: `Sub 生成周报()
    Range("A1").Value = "销售周报 - " & Format(Date, "yyyy-mm-dd")
    Range("A1").Font.Bold = True
    Range("A1").Font.Size = 14
    ' 插入透视表、图表等
End Sub`,
                          color: "green"
                        },
                        {
                          title: "场景3：数据验证和格式检查",
                          desc: "检查数据是否符合规范，标记异常行",
                          code: `Sub 检查数据质量()
    For i = 2 To Cells(Rows.Count, 1).End(xlUp).Row
        If IsEmpty(Cells(i, 2)) Or Cells(i, 3) < 0 Then
            Rows(i).Interior.Color = RGB(255, 0, 0)  ' 标红
        End If
    Next i
End Sub`,
                          color: "yellow"
                        },
                        {
                          title: "场景4：自定义用户表单",
                          desc: "创建数据录入界面，提高录入效率和准确性",
                          code: `' 需要在VBA编辑器中插入UserForm
Private Sub CommandButton1_Click()
    Cells(lastRow + 1, 1).Value = TextBox1.Value
    Cells(lastRow + 1, 2).Value = TextBox2.Value
    MsgBox "数据已保存！"
End Sub`,
                          color: "purple"
                        },
                        {
                          title: "场景5：与Outlook邮件联动",
                          desc: "自动发送带附件的邮件报告",
                          code: `Sub 发送邮件()
    Dim OutApp As Object, OutMail As Object
    Set OutApp = CreateObject("Outlook.Application")
    Set OutMail = OutApp.CreateItem(0)
    
    With OutMail
        .To = "boss@company.com"
        .Subject = "数据分析报告"
        .Body = "请查收附件"
        .Attachments.Add ThisWorkbook.FullName
        .Send
    End With
End Sub`,
                          color: "red"
                        }
                      ].map((scenario, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border ${
                          theme === 'dark' 
                            ? `bg-${scenario.color}-900/20 border-${scenario.color}-700` 
                            : `bg-${scenario.color}-50 border-${scenario.color}-200`
                        }`}>
                          <h4 className={`font-bold mb-2 ${theme === 'dark' ? `text-${scenario.color}-400` : `text-${scenario.color}-700`}`}>
                            {scenario.title}
                          </h4>
                          <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{scenario.desc}</p>
                          <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} font-mono text-xs overflow-x-auto`}>
                            <pre className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>{scenario.code}</pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 对比表 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-slate-500 to-gray-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold shadow-md">5</div>
                      <CardTitle className="text-lg">VBA vs Power Query vs Python - 全面对比</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className={`border-b-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                            <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>维度</th>
                            <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>VBA</th>
                            <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Power Query</th>
                            <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Python</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { dim: "学习难度", vba: "中等（需编程基础）", pq: "低（GUI操作）", py: "中高（需编程基础）" },
                            { dim: "处理速度", vba: "中等（<10万行）", pq: "快（<100万行）", py: "很快（>100万行）" },
                            { dim: "环境要求", vba: "仅Excel", pq: "仅Excel", py: "需安装Python" },
                            { dim: "代码复用", vba: "中等", pq: "高（可刷新）", py: "很高" },
                            { dim: "团队协作", vba: "差（代码难维护）", pq: "中等", py: "好（版本控制）" },
                            { dim: "数据清洗", vba: "★★☆☆☆", pq: "★★★★★", py: "★★★★★" },
                            { dim: "自动化", vba: "★★★★★", pq: "★★★☆☆", py: "★★★★★" },
                            { dim: "统计分析", vba: "★★☆☆☆", pq: "★☆☆☆☆", py: "★★★★★" },
                            { dim: "可视化", vba: "★★★☆☆", pq: "★☆☆☆☆", py: "★★★★★" },
                            { dim: "适用场景", vba: "传统企业、简单自动化", pq: "数据清洗、ETL", py: "全能型、大数据" }
                          ].map((row, idx) => (
                            <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                              <td className={`py-3 px-4 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.dim}</td>
                              <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{row.vba}</td>
                              <td className={`py-3 px-4 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>{row.pq}</td>
                              <td className={`py-3 px-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{row.py}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* 实战案例 */}
                <Card className={theme === 'dark' ? 'bg-gradient-to-br from-slate-900/30 to-gray-900/30 border-slate-700' : 'bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200'}>
                  <CardHeader className="pb-3 border-b border-slate-600 dark:border-slate-500">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-slate-500 to-gray-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold shadow-md">💼</div>
                      <CardTitle className="text-lg text-slate-700 dark:text-slate-300">实战案例：批量处理50个Excel文件并合并</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 场景描述</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          每个月收到各部门提交的50个Excel文件（命名格式：部门-月份.xlsx），每个文件都有"销售数据"工作表，需要提取A列到E列的数据，合并到一个总表中，并添加"部门"字段。
                        </p>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} VBA 完整代码</h4>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} font-mono text-xs overflow-x-auto`}>
                          <pre className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>
{`Sub 批量合并Excel文件()
    Dim wb As Workbook
    Dim ws As Worksheet, targetWs As Worksheet
    Dim folderPath As String
    Dim fileName As String
    Dim lastRow As Long, targetRow As Long
    Dim deptName As String
    
    ' 设置文件夹路径
    folderPath = "C:\\月度数据\\"
    
    ' 创建汇总表
    Set targetWs = ThisWorkbook.Sheets.Add
    targetWs.Name = "汇总表"
    targetWs.Range("A1:F1").Value = Array("部门", "产品", "数量", "单价", "金额", "日期")
    targetRow = 2
    
    ' 遍历文件夹中的所有Excel文件
    fileName = Dir(folderPath & "*.xlsx")
    
    Do While fileName <> ""
        ' 跳过当前文件
        If fileName <> ThisWorkbook.Name Then
            ' 提取部门名称（文件名格式：部门-月份.xlsx）
            deptName = Split(fileName, "-")(0)
            
            ' 打开文件
            Set wb = Workbooks.Open(folderPath & fileName)
            Set ws = wb.Sheets("销售数据")
            
            ' 获取数据行数
            lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
            
            ' 复制数据（从第2行开始，跳过标题行）
            If lastRow > 1 Then
                For i = 2 To lastRow
                    ' 添加部门名称
                    targetWs.Cells(targetRow, 1).Value = deptName
                    ' 复制数据（B到F列 → 汇总表的2到6列）
                    targetWs.Cells(targetRow, 2).Resize(1, 5).Value = _
                        ws.Cells(i, 1).Resize(1, 5).Value
                    targetRow = targetRow + 1
                Next i
            End If
            
            ' 关闭文件，不保存
            wb.Close SaveChanges:=False
        End If
        
        ' 获取下一个文件
        fileName = Dir()
    Loop
    
    ' 格式化汇总表
    With targetWs
        .Range("A1:F1").Font.Bold = True
        .Range("A1:F1").Interior.Color = RGB(68, 114, 196)
        .Range("A1:F1").Font.Color = RGB(255, 255, 255)
        .Columns("A:F").AutoFit
    End With
    
    MsgBox "合并完成！共处理 " & targetRow - 2 & " 行数据", vbInformation
End Sub`}
                          </pre>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                        <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-green-300' : 'text-green-800'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 使用步骤</h4>
                        <ol className={`text-sm space-y-1 list-decimal list-inside ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>按 <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">Alt+F11</code> 打开VBA编辑器</li>
                          <li>插入 → 模块，将代码粘贴进去</li>
                          <li>修改 <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">folderPath</code> 为实际文件夹路径</li>
                          <li>按 <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">F5</code> 运行宏</li>
                          <li>完成后会自动创建"汇总表"工作表</li>
                        </ol>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 效率对比</h4>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <p className="font-bold mb-1">手动复制粘贴</p>
                            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>~2小时</p>
                          </div>
                          <div>
                            <p className="font-bold mb-1">VBA自动化</p>
                            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>~30秒</p>
                          </div>
                          <div>
                            <p className="font-bold mb-1">效率提升</p>
                            <p className="text-green-600 dark:text-green-400 font-bold">240倍！</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 学习建议 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-slate-500 to-gray-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold shadow-md">{getLucideIcon('📚', 'w-5 h-5 text-white')}</div>
                      <CardTitle className="text-lg">学习建议：学到什么程度？</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'}`}>
                        <div className="text-2xl mb-2">🌱</div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>入门级（1-2天）</h4>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <li>• 录制宏</li>
                          <li>• 查看和修改宏代码</li>
                          <li>• 运行已有宏</li>
                          <li>• <strong>目标：</strong>解决重复性操作</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
                        <div className="text-2xl mb-2">🌿</div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>进阶级（1-2周）</h4>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <li>• 掌握对象模型</li>
                          <li>• 循环和条件判断</li>
                          <li>• 批量处理文件</li>
                          <li>• <strong>目标：</strong>自动化报表</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="text-2xl mb-2">🌳</div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>高级（1-2月）</h4>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <li>• 自定义用户表单</li>
                          <li>• 错误处理机制</li>
                          <li>• 与其他应用联动</li>
                          <li>• <strong>目标：</strong>企业级工具</li>
                        </ul>
                      </div>
                    </div>

                    <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-orange-50 border border-orange-200'}`}>
                      <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析师建议学习程度</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>推荐：</strong>学到<strong className="text-yellow-600 dark:text-yellow-400">进阶级</strong>即可（约1-2周）。掌握录制宏、修改代码、批量处理文件、自动化报表这4个核心技能就够用了。<br/>
                        <strong className="text-red-600 dark:text-red-400">重要提醒：</strong>如果公司有Python环境，建议直接学Python，跳过VBA！Python的长期价值远高于VBA。
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-amber-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE NEW: 快捷键与效率技巧 */}
            <section id="shortcuts">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">{getLucideIcon('⌨️', 'inline w-6 h-6 text-white')} Excel快捷键与效率技巧</h2>
                  </div>
                  <p className="text-amber-50 ml-7">TOP 30高频快捷键 | 组合技巧 | 提升10倍工作效率</p>
                </div>
              </div>

              <div className="grid gap-6">
                {/* 快捷键速查表 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-yellow-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold shadow-md">{getLucideIcon('⌨️', 'w-5 h-5 text-white')}</div>
                      <CardTitle className="text-lg">TOP 30 高频快捷键速查表</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* 导航类快捷键 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                        <h4 className={`font-bold mb-3 text-blue-600 dark:text-blue-400 flex items-center gap-2`}>
                          🧭 导航类（6个）
                        </h4>
                        <div className="space-y-2">
                          {[
                            { keys: "Ctrl + Home", desc: "跳转到A1单元格" },
                            { keys: "Ctrl + End", desc: "跳转到数据区域末尾" },
                            { keys: "Ctrl + 方向键", desc: "快速跳转到数据边界" },
                            { keys: "Ctrl + Page Up/Down", desc: "切换工作表" },
                            { keys: "F5 或 Ctrl + G", desc: "定位到指定单元格" },
                            { keys: "Alt + Page Up/Down", desc: "左右移动一屏" }
                          ].map((item, idx) => (
                            <div key={idx} className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                              <span className="font-mono font-bold text-blue-600 dark:text-blue-300">{item.keys}</span>
                              <span className={`ml-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>→ {item.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 编辑类快捷键 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'}`}>
                        <h4 className={`font-bold mb-3 text-green-600 dark:text-green-400 flex items-center gap-2`}>
                          ✏ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 编辑类（8个）
                        </h4>
                        <div className="space-y-2">
                          {[
                            { keys: "Ctrl + D", desc: "向下填充（复制上方单元格）" },
                            { keys: "Ctrl + R", desc: "向右填充（复制左侧单元格）" },
                            { keys: "Ctrl + ;", desc: "插入当前日期" },
                            { keys: "Ctrl + Shift + :", desc: "插入当前时间" },
                            { keys: "Ctrl + '", desc: "复制上方单元格公式" },
                            { keys: "F2", desc: "编辑当前单元格" },
                            { keys: "Ctrl + Enter", desc: "对多个单元格批量输入" },
                            { keys: "Alt + Enter", desc: "单元格内换行" }
                          ].map((item, idx) => (
                            <div key={idx} className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                              <span className="font-mono font-bold text-green-600 dark:text-green-300">{item.keys}</span>
                              <span className={`ml-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>→ {item.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 格式类快捷键 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'}`}>
                        <h4 className={`font-bold mb-3 text-purple-600 dark:text-purple-400 flex items-center gap-2`}>
                          🎨 格式类（7个）
                        </h4>
                        <div className="space-y-2">
                          {[
                            { keys: "Ctrl + 1", desc: "打开单元格格式对话框" },
                            { keys: "Ctrl + B", desc: "加粗" },
                            { keys: "Ctrl + I", desc: "斜体" },
                            { keys: "Ctrl + U", desc: "下划线" },
                            { keys: "Ctrl + Shift + $", desc: "应用货币格式" },
                            { keys: "Ctrl + Shift + %", desc: "应用百分比格式" },
                            { keys: "Ctrl + Shift + #", desc: "应用日期格式（日-月-年）" }
                          ].map((item, idx) => (
                            <div key={idx} className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                              <span className="font-mono font-bold text-purple-600 dark:text-purple-300">{item.keys}</span>
                              <span className={`ml-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>→ {item.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 数据处理类快捷键 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-200'}`}>
                        <h4 className={`font-bold mb-3 text-orange-600 dark:text-orange-400 flex items-center gap-2`}>
                          � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据处理类（9个）
                        </h4>
                        <div className="space-y-2">
                          {[
                            { keys: "Ctrl + Shift + L", desc: "添加/取消筛选器" },
                            { keys: "Ctrl + T", desc: "创建表格（Table）" },
                            { keys: "Alt + =", desc: "快速求和（SUM）" },
                            { keys: "Ctrl + -", desc: "删除行/列" },
                            { keys: "Ctrl + +", desc: "插入行/列" },
                            { keys: "F4", desc: "切换绝对/相对引用（$）" },
                            { keys: "Ctrl + Shift + U", desc: "展开/折叠编辑栏" },
                            { keys: "Alt + D + P", desc: "创建数据透视表" },
                            { keys: "Ctrl + Shift + &", desc: "应用外边框" }
                          ].map((item, idx) => (
                            <div key={idx} className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                              <span className="font-mono font-bold text-orange-600 dark:text-orange-300">{item.keys}</span>
                              <span className={`ml-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>→ {item.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 提示信息 */}
                    <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20 border border-amber-700' : 'bg-amber-50 border border-amber-200'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-amber-300' : 'text-amber-800'}`}>
                        💡 <strong>学习建议：</strong>不要试图一次记住所有快捷键！先掌握<strong>导航类</strong>和<strong>编辑类</strong>（共14个），可立即提升50%效率。其他快捷键在工作中遇到高频操作时再学习。
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* 快捷键组合技巧 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-sky-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold shadow-md">{getLucideIcon('🚀', 'w-5 h-5 text-white')}</div>
                      <CardTitle className="text-lg">5个实用组合技巧（10倍效率提升）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* 技巧1 */}
                      <div className={`p-4 rounded-lg border-l-4 ${theme === 'dark' ? 'bg-blue-900/10 border-blue-500' : 'bg-blue-50 border-blue-400'}`}>
                        <h4 className={`font-bold mb-2 text-blue-600 dark:text-blue-400`}>
                          � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 技巧1：批量填充公式到数据末尾
                        </h4>
                        <div className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <p><strong>场景：</strong>有10000行数据，需要在D列批量填充公式 <code className="px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700">=A2*B2</code></p>
                          <p><strong>传统做法：</strong>写公式后双击填充柄，或手动拖拽（容易漏行）</p>
                          <p className="text-green-600 dark:text-green-400"><strong> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} 高效组合：</strong></p>
                          <ol className="list-decimal list-inside space-y-1 ml-4">
                            <li>在D2写好公式，按<kbd className="px-2 py-1 rounded bg-amber-500 text-white text-xs font-mono">Ctrl + C</kbd>复制</li>
                            <li>选中D2，按<kbd className="px-2 py-1 rounded bg-amber-500 text-white text-xs font-mono">Ctrl + Shift + End</kbd>（选中到数据末尾）</li>
                            <li>按<kbd className="px-2 py-1 rounded bg-amber-500 text-white text-xs font-mono">Ctrl + V</kbd>粘贴</li>
                          </ol>
                          <p className="text-xs text-gray-500">✓ 3秒完成10000行填充，零出错！</p>
                        </div>
                      </div>

                      {/* 技巧2 */}
                      <div className={`p-4 rounded-lg border-l-4 ${theme === 'dark' ? 'bg-green-900/10 border-green-500' : 'bg-green-50 border-green-400'}`}>
                        <h4 className={`font-bold mb-2 text-green-600 dark:text-green-400`}>
                          � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 技巧2：快速选择不连续区域
                        </h4>
                        <div className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <p><strong>场景：</strong>需要对A列、D列、G列批量应用格式（列不相邻）</p>
                          <p className="text-green-600 dark:text-green-400"><strong> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} 高效组合：</strong></p>
                          <ol className="list-decimal list-inside space-y-1 ml-4">
                            <li>点击A列列标，按住<kbd className="px-2 py-1 rounded bg-amber-500 text-white text-xs font-mono">Ctrl</kbd></li>
                            <li>继续点击D列、G列列标（不松开Ctrl）</li>
                            <li>松开Ctrl，按<kbd className="px-2 py-1 rounded bg-amber-500 text-white text-xs font-mono">Ctrl + 1</kbd>打开格式对话框</li>
                          </ol>
                          <p className="text-xs text-gray-500">✓ 一次性设置多个不连续列的格式！</p>
                        </div>
                      </div>

                      {/* 技巧3 */}
                      <div className={`p-4 rounded-lg border-l-4 ${theme === 'dark' ? 'bg-purple-900/10 border-purple-500' : 'bg-purple-50 border-purple-400'}`}>
                        <h4 className={`font-bold mb-2 text-purple-600 dark:text-purple-400`}>
                          � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 技巧3：秒选当前数据区域
                        </h4>
                        <div className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <p><strong>场景：</strong>有个500行×20列的数据表，需要全选复制</p>
                          <p><strong>传统做法：</strong>鼠标拖拽选择（容易选偏）</p>
                          <p className="text-green-600 dark:text-green-400"><strong> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} 高效组合：</strong></p>
                          <ol className="list-decimal list-inside space-y-1 ml-4">
                            <li>点击数据区域任意单元格（如A5）</li>
                            <li>按<kbd className="px-2 py-1 rounded bg-amber-500 text-white text-xs font-mono">Ctrl + Shift + End</kbd></li>
                            <li>按<kbd className="px-2 py-1 rounded bg-amber-500 text-white text-xs font-mono">Ctrl + C</kbd>复制</li>
                          </ol>
                          <p className="text-xs text-gray-500">✓ 精准选中整个数据区域，不多不少！</p>
                        </div>
                      </div>

                      {/* 技巧4 */}
                      <div className={`p-4 rounded-lg border-l-4 ${theme === 'dark' ? 'bg-orange-900/10 border-orange-500' : 'bg-orange-50 border-orange-400'}`}>
                        <h4 className={`font-bold mb-2 text-orange-600 dark:text-orange-400`}>
                          � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 技巧4：快速删除空行
                        </h4>
                        <div className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <p><strong>场景：</strong>数据中混杂很多空行，需要批量删除</p>
                          <p className="text-green-600 dark:text-green-400"><strong> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} 高效组合：</strong></p>
                          <ol className="list-decimal list-inside space-y-1 ml-4">
                            <li>选中数据区域，按<kbd className="px-2 py-1 rounded bg-amber-500 text-white text-xs font-mono">F5</kbd>（定位）</li>
                            <li>选择"定位条件" → "空值"，点击确定</li>
                            <li>按<kbd className="px-2 py-1 rounded bg-amber-500 text-white text-xs font-mono">Ctrl + -</kbd>（删除），选择"整行"</li>
                          </ol>
                          <p className="text-xs text-gray-500">✓ 瞬间删除所有空行，比手动快100倍！</p>
                        </div>
                      </div>

                      {/* 技巧5 */}
                      <div className={`p-4 rounded-lg border-l-4 ${theme === 'dark' ? 'bg-pink-900/10 border-pink-500' : 'bg-pink-50 border-pink-400'}`}>
                        <h4 className={`font-bold mb-2 text-pink-600 dark:text-pink-400`}>
                          � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 技巧5：快速切换显示公式/结果
                        </h4>
                        <div className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <p><strong>场景：</strong>需要检查工作表中所有公式的逻辑</p>
                          <p><strong>传统做法：</strong>一个个单元格点击查看（效率极低）</p>
                          <p className="text-green-600 dark:text-green-400"><strong> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} 高效组合：</strong></p>
                          <ol className="list-decimal list-inside space-y-1 ml-4">
                            <li>按<kbd className="px-2 py-1 rounded bg-amber-500 text-white text-xs font-mono">Ctrl + `</kbd>（反引号，通常在Esc下方）</li>
                            <li>所有公式立即显示在单元格中</li>
                            <li>检查完毕后再按一次<kbd className="px-2 py-1 rounded bg-amber-500 text-white text-xs font-mono">Ctrl + `</kbd>切换回结果</li>
                          </ol>
                          <p className="text-xs text-gray-500">✓ 一键查看所有公式，审核工作表的神器！</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 自定义快捷键 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shadow-md">⚙️</div>
                      <CardTitle className="text-lg">自定义快捷键（进阶技巧）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className={`space-y-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <p>
                        Excel允许为常用命令自定义快捷键，特别适合<strong>高频重复操作</strong>（如清除格式、合并单元格、插入当前日期等）。
                      </p>
                      
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-900/20 border border-indigo-700' : 'bg-indigo-50 border border-indigo-200'}`}>
                        <h4 className="font-bold mb-2 text-indigo-600 dark:text-indigo-400">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 设置步骤：</h4>
                        <ol className="list-decimal list-inside space-y-2">
                          <li>
                            <strong>方法1：通过快速访问工具栏</strong>
                            <ul className="list-disc list-inside ml-6 mt-1 text-xs space-y-1">
                              <li>右键点击常用命令（如"清除格式"）→ 添加到快速访问工具栏</li>
                              <li>按<kbd className="px-1.5 py-0.5 rounded bg-indigo-500 text-white text-xs">Alt + 数字</kbd>即可调用（如Alt+1、Alt+2）</li>
                            </ul>
                          </li>
                          <li>
                            <strong>方法2：通过VBA宏</strong>
                            <ul className="list-disc list-inside ml-6 mt-1 text-xs space-y-1">
                              <li>录制宏 → 自定义快捷键（如Ctrl+Shift+C）</li>
                              <li>适合复杂操作（如"清除格式+调整列宽+加粗表头"）</li>
                            </ul>
                          </li>
                        </ol>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <h4 className="font-bold mb-2 text-yellow-600 dark:text-yellow-400">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意事项：</h4>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li><strong>避免覆盖系统快捷键：</strong>不要设置Ctrl+C、Ctrl+S等常用组合</li>
                          <li><strong>建议使用Ctrl+Shift组合：</strong>如Ctrl+Shift+F（清除格式）</li>
                          <li><strong>文档化你的自定义键：</strong>建议在工作表中备注，避免遗忘</li>
                        </ul>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                        <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 推荐自定义快捷键（3个高价值操作）：</h4>
                        <div className="grid md:grid-cols-3 gap-3 mt-2">
                          <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                            <p className="font-bold text-green-600 dark:text-green-300">Ctrl+Shift+F</p>
                            <p className="text-xs mt-1">清除单元格格式</p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                            <p className="font-bold text-green-600 dark:text-green-300">Ctrl+Shift+D</p>
                            <p className="text-xs mt-1">插入当前日期+时间</p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                            <p className="font-bold text-green-600 dark:text-green-300">Ctrl+Shift+A</p>
                            <p className="text-xs mt-1">调整列宽为最适合</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 学习建议 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shadow-md">💡</div>
                      <CardTitle className="text-lg">快捷键学习路径建议</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* 第1周 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="text-2xl mb-2">📖</div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>第1周：核心导航（6个）</h4>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <li>• Ctrl + Home/End</li>
                          <li>• Ctrl + 方向键</li>
                          <li>• Ctrl + Page Up/Down</li>
                          <li>• F5（定位）</li>
                        </ul>
                        <p className={`text-xs mt-3 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                          <strong>目标：</strong>彻底摆脱鼠标滚轮和拖拽
                        </p>
                      </div>

                      {/* 第2周 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'}`}>
                        <div className="text-2xl mb-2">{getLucideIcon('⚡', 'w-5 h-5 text-[#19bcc8]')}</div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>第2周：高频编辑（8个）</h4>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <li>• Ctrl + D/R（填充）</li>
                          <li>• Ctrl + ; / Shift+:（日期时间）</li>
                          <li>• F2（编辑）</li>
                          <li>• Ctrl + Enter（批量输入）</li>
                        </ul>
                        <p className={`text-xs mt-3 ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`}>
                          <strong>目标：</strong>重复性操作效率翻倍
                        </p>
                      </div>

                      {/* 第3周+ */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'}`}>
                        <div className="text-2xl mb-2">🚀</div>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>第3周+：按需学习</h4>
                        <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <li>• 遇到高频操作就查快捷键</li>
                          <li>• 记录在便签纸上</li>
                          <li>• 强迫自己用3次就能记住</li>
                        </ul>
                        <p className={`text-xs mt-3 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`}>
                          <strong>目标：</strong>形成肌肉记忆，无需思考
                        </p>
                      </div>
                    </div>

                    <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20 border border-amber-700' : 'bg-amber-50 border border-amber-200'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-amber-300' : 'text-amber-800'}`}>
                        🎯 <strong>黄金法则：</strong>不要死记硬背！在实际工作中<strong>遇到重复操作3次以上</strong>，立即查询快捷键并强制自己使用。2周后你会发现，原本1小时的工作现在只需10分钟！
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-red-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE NEW: 常见错误避坑指南 */}
            <section id="common-mistakes">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} Excel十大常见错误避坑指南</h2>
                  </div>
                  <p className="text-red-50 ml-7">工作中最容易踩的坑 | 附解决方案 | 提前预防节省80%排错时间</p>
                </div>
              </div>

              <div className="grid gap-6">
                {/* 错误1：日期格式混乱 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold shadow-md">1</div>
                      <CardTitle className="text-lg">❌ 错误1：日期格式混乱（文本 vs 日期）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className={`space-y-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                        <h4 className="font-bold mb-2 text-red-600 dark:text-red-400">🔴 错误现象：</h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li>筛选日期时部分数据漏掉</li>
                          <li>日期排序结果错误（如"2024/1/5"排在"2024/12/1"后面）</li>
                          <li>DATEDIF等日期函数报错 <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700">#VALUE!</code></li>
                          <li>数据透视表无法按月/季度分组</li>
                        </ul>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                        <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 根本原因：</h4>
                        <p>Excel将日期存储为<strong>文本格式</strong>而非<strong>日期格式</strong>（数值）。常见来源：</p>
                        <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                          <li>从CSV文件导入时未指定格式</li>
                          <li>复制粘贴时带入文本格式</li>
                          <li>单元格格式预设为"文本"后输入日期</li>
                          <li>日期前有空格（如" 2024/1/5"）</li>
                        </ul>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                        <h4 className="font-bold mb-2 text-green-600 dark:text-green-400"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 解决方案（3步修复）：</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="font-bold">方法1：快速转换（推荐）</p>
                            <ol className="list-decimal list-inside ml-4 mt-1 space-y-1 text-xs">
                              <li>选中日期列 → 数据选项卡 → "分列"</li>
                              <li>连续点击"下一步"2次 → 在第3步选择"日期"格式（YMD或DMY）</li>
                              <li>点击"完成" → 文本日期秒变真实日期！</li>
                            </ol>
                          </div>
                          <div>
                            <p className="font-bold">方法2：公式转换</p>
                            <p className="ml-4 mt-1 text-xs">使用 <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700">=DATEVALUE(TRIM(A2))</code> 转换（TRIM去除空格）</p>
                          </div>
                          <div>
                            <p className="font-bold">方法3：Power Query自动识别</p>
                            <p className="ml-4 mt-1 text-xs">导入数据时在Power Query中将列类型改为"日期"</p>
                          </div>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <h4 className="font-bold mb-2 text-yellow-600 dark:text-yellow-400">🛡 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 预防措施：</h4>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li><strong>导入CSV时：</strong>使用"数据" → "从文本/CSV"，手动指定日期列格式</li>
                          <li><strong>输入日期时：</strong>单元格格式预设为"常规"或"日期"，避免"文本"</li>
                          <li><strong>检查技巧：</strong>真实日期默认右对齐，文本日期默认左对齐（一眼识别）</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 错误2：VLOOKUP找不到数据 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shadow-md">2</div>
                      <CardTitle className="text-lg">❌ 错误2：VLOOKUP找不到数据（明明存在！）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className={`space-y-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                        <h4 className="font-bold mb-2 text-red-600 dark:text-red-400">🔴 错误现象：</h4>
                        <p>VLOOKUP返回 <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700">#N/A</code> 错误，但目视检查数据确实存在！</p>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                        <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">🔍 5大常见原因：</h4>
                        <div className="space-y-2">
                          <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                            <p className="font-bold text-blue-600 dark:text-blue-300">原因1：数据类型不匹配</p>
                            <p className="text-xs mt-1">查找值是数字，但源数据是文本数字（或相反）。如查找"100"（文本）但表中是100（数值）</p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                            <p className="font-bold text-blue-600 dark:text-blue-300">原因2：多余空格</p>
                            <p className="text-xs mt-1">源数据有前导/尾随空格，如"张三 "和"张三"被视为不同值</p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                            <p className="font-bold text-blue-600 dark:text-blue-300">原因3：精确匹配 vs 模糊匹配</p>
                            <p className="text-xs mt-1">第4参数用了TRUE（模糊匹配）但数据未排序，应改为FALSE（精确匹配）</p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                            <p className="font-bold text-blue-600 dark:text-blue-300">原因4：列号超出范围</p>
                            <p className="text-xs mt-1">返回值列号（第3参数）大于查找范围的列数</p>
                          </div>
                          <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                            <p className="font-bold text-blue-600 dark:text-blue-300">原因5：查找列不在最左侧</p>
                            <p className="text-xs mt-1">VLOOKUP只能从左往右查找，如需反向查找应用INDEX+MATCH</p>
                          </div>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                        <h4 className="font-bold mb-2 text-green-600 dark:text-green-400"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 解决方案：</h4>
                        <div className="space-y-2">
                          <div>
                            <p className="font-bold">针对原因1（数据类型）：</p>
                            <p className="text-xs ml-4 mt-1">将文本数字转为数值：用 <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700">=VALUE(A2)</code> 或在空白单元格输入1，复制后选择性粘贴"乘"到目标列</p>
                          </div>
                          <div>
                            <p className="font-bold">针对原因2（空格）：</p>
                            <p className="text-xs ml-4 mt-1">使用 <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700">=VLOOKUP(TRIM(A2), ...)</code> 自动去除空格</p>
                          </div>
                          <div>
                            <p className="font-bold">针对原因3（匹配模式）：</p>
                            <p className="text-xs ml-4 mt-1">95%场景应用精确匹配：<code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700">=VLOOKUP(A2, 数据源, 2, FALSE)</code></p>
                          </div>
                          <div>
                            <p className="font-bold">针对原因5（反向查找）：</p>
                            <p className="text-xs ml-4 mt-1">改用万能公式：<code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700">=INDEX(返回列, MATCH(查找值, 查找列, 0))</code></p>
                          </div>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <h4 className="font-bold mb-2 text-yellow-600 dark:text-yellow-400">🛡 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 预防措施：</h4>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li><strong>统一数据格式：</strong>导入数据后立即检查数据类型，统一清洗</li>
                          <li><strong>用IFERROR包裹：</strong><code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700">=IFERROR(VLOOKUP(...), "未找到")</code> 避免满屏#N/A</li>
                          <li><strong>优先用XLOOKUP：</strong>Excel 365新函数，自动解决数据类型、反向查找等问题</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 错误3-10概览卡片 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-amber-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold shadow-md">{getLucideIcon('⚡', 'w-5 h-5 text-[#19bcc8]')}</div>
                      <CardTitle className="text-lg">其他8大常见错误速查</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* 错误3 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-red-900/10 border-red-700' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">3</div>
                          <h4 className={`font-bold text-red-600 dark:text-red-400`}>数据透视表不刷新</h4>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          <strong>现象：</strong>源数据更新后，透视表数据不变
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <strong>解决：</strong>右键透视表 → "刷新"，或设置"打开文件时自动刷新"
                        </p>
                      </div>

                      {/* 错误4 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-orange-900/10 border-orange-700' : 'bg-orange-50 border-orange-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">4</div>
                          <h4 className={`font-bold text-orange-600 dark:text-orange-400`}>公式循环引用</h4>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          <strong>现象：</strong>公式引用自身，Excel报错或卡死
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <strong>解决：</strong>公式 → 错误检查 → 循环引用，逐个修正；或用辅助列拆分计算
                        </p>
                      </div>

                      {/* 错误5 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-yellow-900/10 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold">5</div>
                          <h4 className={`font-bold text-yellow-600 dark:text-yellow-400`}>合并单元格导致公式错误</h4>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          <strong>现象：</strong>排序、筛选、公式填充全部失效
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <strong>解决：</strong><strong className="text-yellow-600">永远不要在数据区域合并单元格！</strong>仅在标题/汇总行使用
                        </p>
                      </div>

                      {/* 错误6 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-green-900/10 border-green-700' : 'bg-green-50 border-green-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">6</div>
                          <h4 className={`font-bold text-green-600 dark:text-green-400`}>数字存储为文本</h4>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          <strong>现象：</strong>SUM求和结果为0，数字左上角有绿色三角
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <strong>解决：</strong>选中列 → 点击警告图标 → "转换为数字"；或用VALUE()公式
                        </p>
                      </div>

                      {/* 错误7 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-blue-900/10 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">7</div>
                          <h4 className={`font-bold text-blue-600 dark:text-blue-400`}>隐藏行/列被忽略</h4>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          <strong>现象：</strong>复制粘贴时隐藏数据也被复制，导致错位
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <strong>解决：</strong>F5定位 → "可见单元格" → 再复制；或用SUBTOTAL()忽略隐藏行
                        </p>
                      </div>

                      {/* 错误8 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-purple-900/10 border-purple-700' : 'bg-purple-50 border-purple-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">8</div>
                          <h4 className={`font-bold text-purple-600 dark:text-purple-400`}>条件格式规则冲突</h4>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          <strong>现象：</strong>多个条件格式叠加，显示结果不符预期
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <strong>解决：</strong>条件格式 → 管理规则 → 调整优先级（上移/下移），或勾选"满足条件后停止"
                        </p>
                      </div>

                      {/* 错误9 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-pink-900/10 border-pink-700' : 'bg-pink-50 border-pink-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold">9</div>
                          <h4 className={`font-bold text-pink-600 dark:text-pink-400`}>命名区域失效</h4>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          <strong>现象：</strong>公式中的命名区域报错 <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700">#NAME?</code>
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <strong>解决：</strong>公式 → 名称管理器 → 检查引用位置是否正确，删除重建；避免命名包含空格
                        </p>
                      </div>

                      {/* 错误10 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-indigo-900/10 border-indigo-700' : 'bg-indigo-50 border-indigo-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">10</div>
                          <h4 className={`font-bold text-indigo-600 dark:text-indigo-400`}>宏安全性设置过高</h4>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          <strong>现象：</strong>打开含宏文件时，宏被禁用无法运行
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <strong>解决：</strong>文件 → 选项 → 信任中心 → 宏设置 → 选"禁用所有宏，并发出通知"（手动启用可信文件）
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 避坑黄金法则 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shadow-md">💎</div>
                      <CardTitle className="text-lg">避坑黄金法则（5条铁律）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {[
                        {
                          title: "铁律1：数据区域永远不合并单元格",
                          desc: "合并单元格是90%公式错误的根源！仅在标题/汇总行使用，数据区绝对禁止。"
                        },
                        {
                          title: "铁律2：导入数据后立即检查格式",
                          desc: "花1分钟检查日期/数字格式，能省1小时排错时间。养成习惯：导入→检查左右对齐→统一格式。"
                        },
                        {
                          title: "铁律3：所有公式用IFERROR包裹",
                          desc: "避免满屏#N/A、#VALUE!等错误信息，让工作表更专业。格式：=IFERROR(原公式, \"错误提示\")"
                        },
                        {
                          title: "铁律4：定期备份重要文件",
                          desc: "Excel崩溃、误删、公式覆盖都可能发生。重要文件每次修改前Ctrl+S，关键节点另存副本。"
                        },
                        {
                          title: "铁律5：复杂公式拆分成辅助列",
                          desc: "一个单元格塞10层嵌套公式=维护噩梦！拆成3-4个辅助列，可读性提升10倍，排错快100倍。"
                        }
                      ].map((rule, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                          idx % 2 === 0 
                            ? theme === 'dark' ? 'bg-emerald-900/10 border-emerald-500' : 'bg-emerald-50 border-emerald-400'
                            : theme === 'dark' ? 'bg-teal-900/10 border-teal-500' : 'bg-teal-50 border-teal-400'
                        }`}>
                          <h4 className={`font-bold mb-2 ${
                            idx % 2 === 0 
                              ? 'text-emerald-600 dark:text-emerald-400' 
                              : 'text-teal-600 dark:text-teal-400'
                          }`}>
                            {rule.title}
                          </h4>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {rule.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20 border border-amber-700' : 'bg-amber-50 border border-amber-200'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-amber-300' : 'text-amber-800'}`}>
                        🎯 <strong>记住：</strong>80%的Excel错误都是因为<strong>数据格式不规范</strong>和<strong>公式逻辑不清晰</strong>。遵循这5条铁律，能让你的Excel工作效率提升3倍，出错率降低90%！
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-purple-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE NEW: Excel模板库 */}
            <section id="templates">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">📦 Excel实用模板库</h2>
                  </div>
                  <p className="text-purple-50 ml-7">覆盖5大业务场景 | 拿来即用 | 节省90%重复性工作时间</p>
                </div>
              </div>

              <div className="grid gap-6">
                {/* 模板库总览 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold shadow-md">📚</div>
                      <CardTitle className="text-lg">模板库使用说明</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className={`space-y-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                          <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 模板优势</h4>
                          <ul className="text-xs space-y-1">
                            <li>• 公式预设好，只需填数据</li>
                            <li>• 格式规范，直接用于汇报</li>
                            <li>• 减少90%重复性工作</li>
                            <li>• 降低80%出错概率</li>
                          </ul>
                        </div>
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                          <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 使用方法</h4>
                          <ul className="text-xs space-y-1">
                            <li>• 根据场景选择对应模板</li>
                            <li>• 查看"说明"工作表了解逻辑</li>
                            <li>• 在数据区填入实际数据</li>
                            <li>• 结果自动计算生成</li>
                          </ul>
                        </div>
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20 border border-amber-700' : 'bg-amber-50 border border-amber-200'}`}>
                          <h4 className="font-bold mb-2 text-amber-600 dark:text-amber-400">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意事项</h4>
                          <ul className="text-xs space-y-1">
                            <li>• 不要删除隐藏的辅助列</li>
                            <li>• 不要合并数据区单元格</li>
                            <li>• 修改前先另存副本</li>
                            <li>• 定期备份重要数据</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 财务类模板 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shadow-md">💰</div>
                      <CardTitle className="text-lg">财务类模板（3个）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* 模板1 */}
                      <div className={`p-4 rounded-lg border-l-4 ${theme === 'dark' ? 'bg-emerald-900/10 border-emerald-500' : 'bg-emerald-50 border-emerald-400'}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className={`font-bold text-lg text-emerald-600 dark:text-emerald-400`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 年度预算表模板</h4>
                              <Link 
                                href="/excel/templates/budget"
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                                  theme === 'dark' 
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                }`}
                              >
                                查看模板 →
                              </Link>
                            </div>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>适用场景：部门预算编制、项目预算规划</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${theme === 'dark' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                            ⭐⭐⭐⭐⭐
                          </span>
                        </div>
                        <div className={`grid md:grid-cols-2 gap-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <div>
                            <p className="font-bold mb-1">核心功能：</p>
                            <ul className="text-xs space-y-1 ml-4">
                              <li>• 自动计算各部门预算汇总</li>
                              <li>• 预算vs实际对比分析</li>
                              <li>• 预算执行率可视化图表</li>
                              <li>• 支持多部门、多项目分类</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-bold mb-1">关键函数：</p>
                            <ul className="text-xs space-y-1 ml-4">
                              <li>• SUMIF（分类汇总）</li>
                              <li>• IF（预算预警）</li>
                              <li>• 条件格式（超支标红）</li>
                              <li>• 数据透视表（多维分析）</li>
                            </ul>
                          </div>
                        </div>
                        <div className={`mt-3 p-3 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                          <p className={`text-xs ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'}`}>
                            <strong>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 使用技巧：</strong>在"预算设置"工作表中定义部门和科目，主表自动引用；超支项目会自动标红，方便管理层快速发现问题。
                          </p>
                        </div>
                      </div>

                      {/* 模板2 */}
                      <div className={`p-4 rounded-lg border-l-4 ${theme === 'dark' ? 'bg-teal-900/10 border-teal-500' : 'bg-teal-50 border-teal-400'}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className={`font-bold text-lg text-teal-600 dark:text-teal-400`}>🧾 费用报销单模板</h4>
                              <Link 
                                href="/excel/templates/reimbursement"
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                                  theme === 'dark' 
                                    ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                                    : 'bg-teal-500 hover:bg-teal-600 text-white'
                                }`}
                              >
                                查看模板 →
                              </Link>
                            </div>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>适用场景：差旅报销、日常费用报销</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${theme === 'dark' ? 'bg-teal-900/30 text-teal-400' : 'bg-teal-100 text-teal-700'}`}>
                            ⭐⭐⭐⭐
                          </span>
                        </div>
                        <div className={`grid md:grid-cols-2 gap-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <div>
                            <p className="font-bold mb-1">核心功能：</p>
                            <ul className="text-xs space-y-1 ml-4">
                              <li>• 自动计算费用总额和税额</li>
                              <li>• 费用类别下拉选择（防错）</li>
                              <li>• 报销标准自动校验</li>
                              <li>• 生成打印版报销单</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-bold mb-1">关键函数：</p>
                            <ul className="text-xs space-y-1 ml-4">
                              <li>• SUM（金额汇总）</li>
                              <li>• VLOOKUP（标准查询）</li>
                              <li>• 数据验证（类别限制）</li>
                              <li>• TEXT（日期格式化）</li>
                            </ul>
                          </div>
                        </div>
                        <div className={`mt-3 p-3 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                          <p className={`text-xs ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>
                            <strong>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 使用技巧：</strong>在"费用标准"工作表设置各项费用上限，主表自动校验超标项并标红提醒；打印前隐藏辅助列，版式更专业。
                          </p>
                        </div>
                      </div>

                      {/* 模板3 */}
                      <div className={`p-4 rounded-lg border-l-4 ${theme === 'dark' ? 'bg-cyan-900/10 border-cyan-500' : 'bg-cyan-50 border-cyan-400'}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className={`font-bold text-lg text-cyan-600 dark:text-cyan-400`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 损益表（P&L）模板</h4>
                              <Link 
                                href="/excel/templates/profit-loss"
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                                  theme === 'dark' 
                                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                                    : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                                }`}
                              >
                                查看模板 →
                              </Link>
                            </div>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>适用场景：月度经营分析、年度财务报告</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${theme === 'dark' ? 'bg-cyan-900/30 text-cyan-400' : 'bg-cyan-100 text-cyan-700'}`}>
                            ⭐⭐⭐⭐⭐
                          </span>
                        </div>
                        <div className={`grid md:grid-cols-2 gap-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <div>
                            <p className="font-bold mb-1">核心功能：</p>
                            <ul className="text-xs space-y-1 ml-4">
                              <li>• 自动计算毛利率、净利率</li>
                              <li>• 同比、环比增长率分析</li>
                              <li>• 收入/成本结构占比图</li>
                              <li>• 支持12个月滚动展示</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-bold mb-1">关键函数：</p>
                            <ul className="text-xs space-y-1 ml-4">
                              <li>• 利润率 = (收入-成本)/收入</li>
                              <li>• 同比增长率公式</li>
                              <li>• OFFSET（动态范围）</li>
                              <li>• 瀑布图（利润构成）</li>
                            </ul>
                          </div>
                        </div>
                        <div className={`mt-3 p-3 rounded ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                          <p className={`text-xs ${theme === 'dark' ? 'text-cyan-300' : 'text-cyan-700'}`}>
                            <strong>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 使用技巧：</strong>在"数据录入"工作表输入原始数据，损益表自动更新；配合瀑布图可清晰展示从收入到净利润的逐步拆解，老板最爱！
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 人力资源类模板 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-[#19bcc8] rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-md">{getLucideIcon('👥', 'w-5 h-5 text-white')}</div>
                      <CardTitle className="text-lg">人力资源类模板（3个）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* HR模板卡片式展示 */}
                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-blue-900/10 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-2xl">{getLucideIcon('📅', 'w-5 h-5 text-[#19bcc8]')}</div>
                          <Link 
                            href="/excel/templates/attendance"
                            className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                              theme === 'dark' 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                          >
                            查看 →
                          </Link>
                        </div>
                        <h4 className={`font-bold mb-2 text-blue-600 dark:text-blue-400`}>智能考勤表</h4>
                        <p className={`text-xs mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          自动计算工作日、加班、请假，生成月度考勤汇总
                        </p>
                        <div className={`space-y-1 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <p><strong>核心功能：</strong></p>
                          <ul className="list-disc list-inside ml-2">
                            <li>工作日自动识别</li>
                            <li>迟到/早退标红</li>
                            <li>加班时长统计</li>
                            <li>月度报表自动生成</li>
                          </ul>
                          <p className="mt-2"><strong>关键函数：</strong>NETWORKDAYS, COUNTIF, IF</p>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-indigo-900/10 border-indigo-700' : 'bg-indigo-50 border-indigo-200'}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-2xl">{getLucideIcon('⭐', 'w-5 h-5 text-[#19bcc8]')}</div>
                          <Link 
                            href="/excel/templates/performance"
                            className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                              theme === 'dark' 
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                            }`}
                          >
                            查看 →
                          </Link>
                        </div>
                        <h4 className={`font-bold mb-2 text-indigo-600 dark:text-indigo-400`}>绩效评估表</h4>
                        <p className={`text-xs mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          KPI指标设定、打分、权重计算、等级评定一站式完成
                        </p>
                        <div className={`space-y-1 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <p><strong>核心功能：</strong></p>
                          <ul className="list-disc list-inside ml-2">
                            <li>加权平均分计算</li>
                            <li>等级自动评定（S/A/B/C）</li>
                            <li>雷达图可视化</li>
                            <li>部门排名对比</li>
                          </ul>
                          <p className="mt-2"><strong>关键函数：</strong>SUMPRODUCT, RANK, IF嵌套</p>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-purple-900/10 border-purple-700' : 'bg-purple-50 border-purple-200'}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-2xl">{getLucideIcon('📋', 'w-5 h-5 text-[#19bcc8]')}</div>
                          <Link 
                            href="/excel/templates/recruitment"
                            className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                              theme === 'dark' 
                                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                                : 'bg-purple-500 hover:bg-purple-600 text-white'
                            }`}
                          >
                            查看 →
                          </Link>
                        </div>
                        <h4 className={`font-bold mb-2 text-purple-600 dark:text-purple-400`}>招聘进度跟踪表</h4>
                        <p className={`text-xs mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          候选人管理、面试进度、录用转化率分析
                        </p>
                        <div className={`space-y-1 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <p><strong>核心功能：</strong></p>
                          <ul className="list-disc list-inside ml-2">
                            <li>面试状态自动更新</li>
                            <li>转化率漏斗图</li>
                            <li>招聘周期统计</li>
                            <li>邮件提醒设置</li>
                          </ul>
                          <p className="mt-2"><strong>关键函数：</strong>COUNTIFS, TODAY, 条件格式</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 项目管理、销售营销、数据分析类模板（简洁展示） */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-[#19bcc8] rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shadow-md">{getLucideIcon('📊', 'w-5 h-5 text-white')}</div>
                      <CardTitle className="text-lg">其他业务场景模板（9个）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* 项目管理类 */}
                      <div>
                        <h4 className={`font-bold mb-3 text-orange-600 dark:text-orange-400 flex items-center gap-2`}>
                          � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 项目管理类（3个）
                        </h4>
                        <div className="grid md:grid-cols-3 gap-3">
                          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-orange-900/10 border border-orange-800' : 'bg-orange-50 border border-orange-200'}`}>
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{getLucideIcon('📅', 'w-4 h-4 text-[#19bcc8]')}</span>
                                <p className={`font-bold text-sm ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>甘特图模板</p>
                              </div>
                              <Link 
                                href="/excel/templates/gantt"
                                className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                                  theme === 'dark' 
                                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                                }`}
                              >
                                查看 →
                              </Link>
                            </div>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>项目时间轴、任务依赖、进度跟踪</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                              <strong>关键：</strong>条件格式+日期函数
                            </p>
                          </div>
                          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-orange-900/10 border border-orange-800' : 'bg-orange-50 border border-orange-200'}`}>
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{getLucideIcon('🎯', 'w-4 h-4 text-[#19bcc8]')}</span>
                                <p className={`font-bold text-sm ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>OKR目标管理</p>
                              </div>
                              <Link 
                                href="/excel/templates/okr"
                                className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                                  theme === 'dark' 
                                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                                }`}
                              >
                                查看 →
                              </Link>
                            </div>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>目标+关键结果、完成度跟踪</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                              <strong>关键：</strong>AVERAGE, IF
                            </p>
                          </div>
                          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-orange-900/10 border border-orange-800' : 'bg-orange-50 border border-orange-200'}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{getLucideIcon('👥', 'w-4 h-4 text-[#19bcc8]')}</span>
                              <p className={`font-bold text-sm ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>资源分配表</p>
                            </div>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>人力资源分配、工时统计、成本核算</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                              <strong>关键：</strong>SUMIF, VLOOKUP
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 销售营销类 */}
                      <div>
                        <h4 className={`font-bold mb-3 text-green-600 dark:text-green-400 flex items-center gap-2`}>
                          {getLucideIcon('💼', 'inline w-5 h-5 text-[#19bcc8]')} 销售营销类（3个）
                        </h4>
                        <div className="grid md:grid-cols-3 gap-3">
                          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/10 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{getLucideIcon('📞', 'w-4 h-4 text-[#19bcc8]')}</span>
                                <p className={`font-bold text-sm ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>CRM客户管理表</p>
                              </div>
                              <Link 
                                href="/excel/templates/crm"
                                className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                                  theme === 'dark' 
                                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                                    : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                              >
                                查看 →
                              </Link>
                            </div>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>客户信息、跟进记录、成交转化</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                              <strong>关键：</strong>数据透视表+切片器
                            </p>
                          </div>
                          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/10 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{getLucideIcon('📊', 'w-4 h-4 text-[#19bcc8]')}</span>
                                <p className={`font-bold text-sm ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>销售业绩跟踪</p>
                              </div>
                              <Link 
                                href="/excel/templates/sales-tracker"
                                className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                                  theme === 'dark' 
                                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                                    : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                              >
                                查看 →
                              </Link>
                            </div>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>业绩排名、目标达成率、提成计算</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                              <strong>关键：</strong>RANK, 达成率计算
                            </p>
                          </div>
                          {[
                            { icon: "🔻", name: "销售漏斗分析", desc: "商机阶段、转化率、预测成交额", func: "COUNTIFS, 漏斗图" },
                            { icon: "🎯", name: "客户价值分析", desc: "RFM模型、客户分层、复购率", func: "IF嵌套, DATEDIF" }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/10 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{getLucideIcon(item.icon, 'w-4 h-4 text-[#19bcc8]')}</span>
                                <p className={`font-bold text-sm ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>{item.name}</p>
                              </div>
                              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{item.desc}</p>
                              <p className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                                <strong>关键：</strong>{item.func}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 数据分析类 */}
                      <div>
                        <h4 className={`font-bold mb-3 text-blue-600 dark:text-blue-400 flex items-center gap-2`}>
                          � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析类（3个）
                        </h4>
                        <div className="grid md:grid-cols-3 gap-3">
                          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/10 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{getLucideIcon('📦', 'w-4 h-4 text-[#19bcc8]')}</span>
                                <p className={`font-bold text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>库存ABC分析</p>
                              </div>
                              <Link 
                                href="/excel/templates/inventory-abc"
                                className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                                  theme === 'dark' 
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                              >
                                查看 →
                              </Link>
                            </div>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>帕累托分析、自动分类、库存优化</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                              <strong>关键：</strong>累计占比+分类
                            </p>
                          </div>
                          {[
                            { icon: "🧹", name: "数据清洗模板", desc: "去重、格式统一、异常值处理", func: "TRIM, PROPER, 分列" },
                            { icon: "📊", name: "分析仪表板", desc: "KPI卡片、趋势图、交互式筛选", func: "切片器+动态图表" }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/10 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg">{getLucideIcon(item.icon, 'w-4 h-4 text-[#19bcc8]')}</span>
                                <p className={`font-bold text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>{item.name}</p>
                              </div>
                              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{item.desc}</p>
                              <p className={`text-xs ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                                <strong>关键：</strong>{item.func}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 模板自建指南 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold shadow-md">🛠️</div>
                      <CardTitle className="text-lg">如何自建专属模板？（5步法）</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {[
                        {
                          step: "步骤1：明确业务需求",
                          content: "问自己3个问题：①这个表要解决什么问题？②谁会用？③最终输出什么结果？",
                          example: "例：做销售日报表 → 老板要看每日销售额和完成率 → 输出日报+月度趋势图"
                        },
                        {
                          step: "步骤2：设计数据结构",
                          content: "遵循\"一行一条记录\"原则，设置清晰的字段名，预留辅助列。",
                          example: "例：销售日报需要字段：日期、销售员、产品、数量、单价、金额、目标、完成率"
                        },
                        {
                          step: "步骤3：编写核心公式",
                          content: "从简单到复杂，先写辅助列公式，再汇总计算。用命名区域提升可读性。",
                          example: "例：金额=数量*单价，完成率=金额/目标，用SUMIF汇总各销售员业绩"
                        },
                        {
                          step: "步骤4：美化与校验",
                          content: "应用条件格式（完成率<80%标红），添加数据验证（下拉菜单），设置保护（锁定公式列）。",
                          example: "例：销售员姓名用下拉菜单防止拼写错误，公式列设为只读防止误删"
                        },
                        {
                          step: "步骤5：测试与迭代",
                          content: "用真实数据测试1周，收集使用反馈，优化公式逻辑和页面布局。",
                          example: "例：发现手动输入产品名容易错，改为VLOOKUP从产品库自动匹配"
                        }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                          theme === 'dark' ? 'bg-pink-900/10 border-pink-500' : 'bg-pink-50 border-pink-400'
                        }`}>
                          <h4 className={`font-bold mb-2 text-pink-600 dark:text-pink-400`}>{item.step}</h4>
                          <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.content}</p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-pink-300' : 'text-pink-700'} bg-white/30 dark:bg-gray-800/30 p-2 rounded`}>
                            {getLucideIcon('💡', 'inline w-4 h-4 text-[#19bcc8]')} {item.example}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20 border border-amber-700' : 'bg-amber-50 border border-amber-200'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-amber-300' : 'text-amber-800'}`}>
                        {getLucideIcon('🎯', 'inline w-4 h-4 text-[#19bcc8]')} <strong>黄金法则：</strong>好的模板=<strong>傻瓜式操作</strong>+<strong>结果自动化</strong>。让使用者只需填数据，不需懂公式。模板越简单，推广越成功！
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-cyan-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE NEW: Excel实战案例 */}
            <section id="practical-cases">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">{getLucideIcon('💼', 'inline w-6 h-6 text-white')} Excel实战案例集</h2>
                  </div>
                  <p className="text-cyan-50 ml-7">5个端到端完整案例 | 业务背景+数据处理+分析报告 | 即学即用</p>
                </div>
              </div>

              <div className="grid gap-6">
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold shadow-md">📚</div>
                      <CardTitle className="text-lg">实战案例说明</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <p className="mb-4">以下5个案例涵盖数据分析工作中最常见的业务场景,每个案例都包含完整的分析流程和关键技术点。</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                          <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">案例特点</h4>
                          <ul className="text-xs space-y-1">
                            <li>• 真实业务场景</li>
                            <li>• 完整数据流程</li>
                            <li>• 可直接复用</li>
                          </ul>
                        </div>
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                          <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">学习方法</h4>
                          <ul className="text-xs space-y-1">
                            <li>• 理解业务需求</li>
                            <li>• 跟随操作步骤</li>
                            <li>• 尝试举一反三</li>
                          </ul>
                        </div>
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20 border border-amber-700' : 'bg-amber-50 border border-amber-200'}`}>
                          <h4 className="font-bold mb-2 text-amber-600 dark:text-amber-400">预期收获</h4>
                          <ul className="text-xs space-y-1">
                            <li>• 掌握分析思路</li>
                            <li>• 积累函数经验</li>
                            <li>• 提升解决能力</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shadow-md">1</div>
                      <CardTitle className="text-lg">案例1: 月度销售数据分析报告</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className={`space-y-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                        <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">业务背景</h4>
                        <p>销售部门需要每月生成销售报告,分析各产品线、区域、销售员的业绩表现,为管理层决策提供数据支持。</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-bold mb-2">数据准备</h4>
                          <ul className="text-xs space-y-1 ml-4">
                            <li>• 从ERP系统导出销售明细数据</li>
                            <li>• 清洗日期格式、统一产品名称</li>
                            <li>• 补充区域、销售员信息</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">关键技术</h4>
                          <ul className="text-xs space-y-1 ml-4">
                            <li>• 数据透视表(多维分析)</li>
                            <li>• SUMIFS(条件汇总)</li>
                            <li>• 同比/环比增长率计算</li>
                          </ul>
                        </div>
                      </div>
                      <div className={`p-3 rounded ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          <strong>核心产出:</strong> 月度销售仪表板,包含KPI卡片、趋势图、TOP10排行榜、区域对比图
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader className="pb-3 border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold shadow-md">2</div>
                        <CardTitle className="text-base">案例2: 员工绩效考核系统</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className={`space-y-3 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <p><strong>业务场景:</strong> HR需要对50名员工进行季度绩效评定</p>
                        <div>
                          <p className="font-bold mb-1">关键步骤:</p>
                          <ul className="ml-4 space-y-1">
                            <li>• 设定KPI指标及权重</li>
                            <li>• 加权平均分计算</li>
                            <li>• 等级自动评定(S/A/B/C/D)</li>
                            <li>• 雷达图可视化</li>
                          </ul>
                        </div>
                        <p className="text-purple-600 dark:text-purple-400"><strong>核心函数:</strong> SUMPRODUCT, RANK, IF嵌套</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader className="pb-3 border-b bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shadow-md">3</div>
                        <CardTitle className="text-base">案例3: 库存预警分析</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className={`space-y-3 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <p><strong>业务场景:</strong> 仓库管理员需实时监控200+SKU库存状态</p>
                        <div>
                          <p className="font-bold mb-1">关键步骤:</p>
                          <ul className="ml-4 space-y-1">
                            <li>• 计算安全库存和周转天数</li>
                            <li>• 条件格式标红预警项</li>
                            <li>• 自动生成补货建议</li>
                            <li>• ABC分类管理</li>
                          </ul>
                        </div>
                        <p className="text-orange-600 dark:text-orange-400"><strong>核心函数:</strong> IF, VLOOKUP, 条件格式</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader className="pb-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-md">4</div>
                        <CardTitle className="text-base">案例4: 客户RFM价值分析</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className={`space-y-3 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <p><strong>业务场景:</strong> 营销部门需对10000+客户进行分层运营</p>
                        <div>
                          <p className="font-bold mb-1">关键步骤:</p>
                          <ul className="ml-4 space-y-1">
                            <li>• 计算R(最近购买)、F(购买频次)、M(消费金额)</li>
                            <li>• RFM三维打分(1-5分)</li>
                            <li>• 客户分层(重要价值/重要发展/一般维持等8类)</li>
                            <li>• 针对性营销策略建议</li>
                          </ul>
                        </div>
                        <p className="text-blue-600 dark:text-blue-400"><strong>核心函数:</strong> DATEDIF, IF嵌套, 数据透视表</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader className="pb-3 border-b bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold shadow-md">5</div>
                        <CardTitle className="text-base">案例5: 财务预算执行监控</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className={`space-y-3 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <p><strong>业务场景:</strong> 财务部门需每月跟踪各部门预算执行情况</p>
                        <div>
                          <p className="font-bold mb-1">关键步骤:</p>
                          <ul className="ml-4 space-y-1">
                            <li>• 预算vs实际对比分析</li>
                            <li>• 执行率、偏差率计算</li>
                            <li>• 超支项目自动标红预警</li>
                            <li>• 瀑布图展示预算分解</li>
                          </ul>
                        </div>
                        <p className="text-green-600 dark:text-green-400"><strong>核心函数:</strong> SUMIF, 条件格式, 瀑布图</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-yellow-500 rounded-full"></div>
                      <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold shadow-md">💡</div>
                      <CardTitle className="text-lg">实战案例学习建议</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {[
                        { title: "第1步: 理解业务逻辑", desc: "不要急于动手,先花5分钟理解业务问题和最终目标,思考如果是你会怎么做" },
                        { title: "第2步: 拆解分析步骤", desc: "把复杂问题拆成3-5个小步骤,每步解决一个具体问题,避免一次性完成导致思路混乱" },
                        { title: "第3步: 动手实践操作", desc: "准备类似的数据,跟随案例步骤操作一遍,重点关注函数参数和逻辑" },
                        { title: "第4步: 举一反三迁移", desc: "尝试用同样的思路解决类似问题,如销售分析改为生产分析、RFM改为产品ABC分类" },
                        { title: "第5步: 积累到工具库", desc: "把常用的公式、模板保存下来,下次遇到类似问题可直接复用,节省80%时间" }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-3 rounded-lg border-l-4 ${
                          theme === 'dark' ? 'bg-amber-900/10 border-amber-500' : 'bg-amber-50 border-amber-400'
                        }`}>
                          <h4 className={`font-bold mb-1 text-sm text-amber-600 dark:text-amber-400`}>{item.title}</h4>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-green-300' : 'text-green-800'}`}>
                        🎯 <strong>记住:</strong> 真正的Excel高手不是记住了多少函数,而是能快速把业务问题转化为数据分析逻辑。这5个案例覆盖了90%常见场景,学会了就能解决工作中80%的数据问题!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-teal-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE 07: 学习路径 */}
            <section id="learning-path">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">{getLucideIcon('🎯', 'inline w-6 h-6 text-white')} 6周实战学习路径</h2>
                  </div>
                  <p className="text-teal-50 ml-7">按行业标准分阶完成 - 每周都有交付物</p>
                </div>
              </div>

              <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`border-b-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>周次</th>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>任务</th>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>产出物</th>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>行业考核标准</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            week: "Week 1",
                            task: "数据规范+文本清洗",
                            output: "干净员工信息表",
                            standard: "空值率<1%; 无合并单元格"
                          },
                          {
                            week: "Week 2",
                            task: "关联匹配+透视表",
                            output: "合并订单+商品+用户宽表",
                            standard: "主键唯一; 能30秒回答GMV"
                          },
                          {
                            week: "Week 3",
                            task: "描述统计+可视化",
                            output: "城市销售日报（含迷你图）",
                            standard: "老板无需滚动即可看Top5"
                          },
                          {
                            week: "Week 4",
                            task: "时间序列+图表美化",
                            output: "月度趋势图（动态标题）",
                            standard: "切片器切换→图/表同步刷新"
                          },
                          {
                            week: "Week 5",
                            task: "综合评分建模",
                            output: "餐厅/商品/供应商TOP10",
                            standard: "权重可调、公式防错、一键排序"
                          },
                          {
                            week: "Week 6",
                            task: "输出+自动化",
                            output: "PPT一键更新模板",
                            standard: "修改Excel→PPT数值+图表自动刷新"
                          }
                        ].map((row, idx) => (
                          <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            <td className={`py-3 px-4 font-semibold ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>{row.week}</td>
                            <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.task}</td>
                            <td className={`py-3 px-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{row.output}</td>
                            <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{row.standard}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-indigo-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE 08: 工具链映射 */}
            <section id="tool-mapping">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 工具链映射</h2>
                  </div>
                  <p className="text-indigo-50 ml-7">Excel vs Python vs SQL - 进阶路径清晰可见</p>
                </div>
              </div>

              <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`border-b-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Excel技能</th>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Python对标</th>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>SQL对标</th>
                          <th className={`text-left py-3 px-4 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>说明</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            excel: "VLOOKUP/INDEX-MATCH",
                            python: "pandas.merge",
                            sql: "JOIN",
                            note: "先Excel理解键概念"
                          },
                          {
                            excel: "透视表",
                            python: "pd.pivot_table",
                            sql: "GROUP BY + CASE",
                            note: "拖拽式理解分组逻辑"
                          },
                          {
                            excel: "条件格式可视化",
                            python: "seaborn.heatmap",
                            sql: "BI工具",
                            note: "色阶/数据条=热力图思想"
                          },
                          {
                            excel: "LOG+Max-Min标准化",
                            python: "sklearn.preprocessing",
                            sql: "(x-min)/(max-min)",
                            note: "统一量纲思路一致"
                          },
                          {
                            excel: "数组公式",
                            python: "NumPy广播运算",
                            sql: "窗口函数",
                            note: "向量化思维过渡"
                          }
                        ].map((row, idx) => (
                          <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            <td className={`py-3 px-4 font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>{row.excel}</td>
                            <td className={`py-3 px-4 font-mono text-xs ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{row.python}</td>
                            <td className={`py-3 px-4 font-mono text-xs ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{row.sql}</td>
                            <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{row.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 模块分隔符 */}
            <div className="relative flex items-center justify-center py-4">
              <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>
              </div>
              <div className="relative px-4 text-rose-500 font-bold">◆ ◆ ◆</div>
            </div>

            {/* MODULE 09: 函数速查表 */}
            <section id="functions">
              <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-white rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心函数速查表</h2>
                  </div>
                  <p className="text-rose-50 ml-7">6大函数组 - 按工作流分类整理</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* 文本清洗组 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-blue-500">🔧</span> 文本清洗组
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <div className="space-y-2 text-sm">
                      {[
                        { func: "LEFT/RIGHT/MID", desc: "提取子串" },
                        { func: "FIND/SEARCH", desc: "查找位置" },
                        { func: "SUBSTITUTE", desc: "替换文本" },
                        { func: "TRIM", desc: "清除空格" },
                        { func: "LEN", desc: "计算长度" },
                        { func: "CONCAT/&", desc: "拼接文本" }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                          <code className={`font-mono text-xs ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{item.func}</code>
                          <span className={`ml-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>- {item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 关联匹配组 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-green-500">🔍</span> 关联匹配组
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <div className="space-y-2 text-sm">
                      {[
                        { func: "VLOOKUP", desc: "垂直查找" },
                        { func: "INDEX+MATCH", desc: "双向查找" },
                        { func: "XLOOKUP", desc: "新版查找" },
                        { func: "OFFSET", desc: "动态区域" },
                        { func: "INDIRECT", desc: "文本转引用" },
                        { func: "HYPERLINK", desc: "创建链接" }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                          <code className={`font-mono text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>{item.func}</code>
                          <span className={`ml-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>- {item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 逻辑运算组 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-purple-500">{getLucideIcon('✅', 'w-5 h-5 text-[#19bcc8]')}</span> 逻辑运算组
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <div className="space-y-2 text-sm">
                      {[
                        { func: "IF", desc: "条件判断" },
                        { func: "IFS", desc: "多条件判断" },
                        { func: "AND/OR", desc: "与/或逻辑" },
                        { func: "NOT", desc: "非逻辑" },
                        { func: "IFERROR", desc: "错误处理" },
                        { func: "ISNUMBER", desc: "类型判断" }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                          <code className={`font-mono text-xs ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{item.func}</code>
                          <span className={`ml-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>- {item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 计算统计组 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-orange-500">🧮</span> 计算统计组
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <div className="space-y-2 text-sm">
                      {[
                        { func: "SUMIFS", desc: "多条件求和" },
                        { func: "COUNTIFS", desc: "多条件计数" },
                        { func: "AVERAGEIFS", desc: "多条件平均" },
                        { func: "RANK", desc: "排名" },
                        { func: "STDEV", desc: "标准差" },
                        { func: "QUARTILE", desc: "四分位数" }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                          <code className={`font-mono text-xs ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>{item.func}</code>
                          <span className={`ml-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>- {item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 时间序列组 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-teal-500">📆</span> 时间序列组
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <div className="space-y-2 text-sm">
                      {[
                        { func: "TODAY/NOW", desc: "当前日期/时间" },
                        { func: "YEAR/MONTH/DAY", desc: "提取年月日" },
                        { func: "DATEDIF", desc: "日期差值" },
                        { func: "EOMONTH", desc: "月末日期" },
                        { func: "WEEKNUM", desc: "第几周" },
                        { func: "WEEKDAY", desc: "星期几" }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                          <code className={`font-mono text-xs ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>{item.func}</code>
                          <span className={`ml-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>- {item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 数组公式组 */}
                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader className="pb-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-indigo-500">{getLucideIcon('⚡', 'w-5 h-5 text-[#19bcc8]')}</span> 数组公式组 <span className="text-xs text-gray-500">(365)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <div className="space-y-2 text-sm">
                      {[
                        { func: "UNIQUE", desc: "一键去重" },
                        { func: "SORT/SORTBY", desc: "动态排序" },
                        { func: "FILTER", desc: "多条件筛选" },
                        { func: "SEQUENCE", desc: "生成序列" }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                          <code className={`font-mono text-xs ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>{item.func}</code>
                          <span className={`ml-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>- {item.desc}</span>
                        </div>
                      ))}
                      <div className={`p-2 rounded ${theme === 'dark' ? 'bg-amber-900/20 border border-amber-700' : 'bg-amber-50 border border-amber-200'}`}>
                        <p className={`text-xs ${theme === 'dark' ? 'text-amber-300' : 'text-amber-800'}`}>
                          💡 <strong>注:</strong> Office 365 专享功能
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 页面底部 - 完成标识 */}
            <div className={`mt-12 p-6 rounded-lg text-center ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800' : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold text-sm shadow-lg mb-4">
                <span>✓</span> Excel 完整知识体系 - 全部16大模块已完成
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                包含知识体系总览、L0-L4完整层级、Power Query (M语言)、Power Pivot (DAX)、VBA与宏、⌨️快捷键与效率技巧、⚠️常见错误避坑指南、📦Excel模板库、💼Excel实战案例、6周学习路径、工具链映射、函数速查表等完整内容
              </p>
              
              {/* 下一步学习建议 */}
              <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
                <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 推荐学习路径
                </h3>
                <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
                  <Link href="/python" className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 border-blue-700 hover:border-blue-500' : 'bg-white border-blue-200 hover:border-blue-400'}`}>
                    <div className="text-3xl mb-2">{getLucideIcon('🐍', 'w-6 h-6 text-[#19bcc8]')}</div>
                    <div className={`font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Python</div>
                    <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>进阶自动化</div>
                  </Link>
                  <Link href="/statistics" className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 border-purple-700 hover:border-purple-500' : 'bg-white border-purple-200 hover:border-purple-400'}`}>
                    <div className="text-3xl mb-2">{getLucideIcon('📊', 'w-6 h-6 text-[#19bcc8]')}</div>
                    <div className={`font-semibold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>统计分析</div>
                    <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>数据洞察</div>
                  </Link>
                  <Link href="/business" className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 border-green-700 hover:border-green-500' : 'bg-white border-green-200 hover:border-green-400'}`}>
                    <div className="text-3xl mb-2">{getLucideIcon('💼', 'w-6 h-6 text-[#19bcc8]')}</div>
                    <div className={`font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>业务知识</div>
                    <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>行业应用</div>
                  </Link>
                </div>
              </div>
            </div>
          </main>
          </div>
        </div>
      </div>

      {/* 返回顶部按钮 */}
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all hover:scale-110 ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200'}`}
          aria-label="返回顶部"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  )
}

