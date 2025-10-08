"use client"

import React from "react"
import { getLucideIcon } from "@/components/LucideIcon";
import { Navigation } from "@/components/navigation"
import { Home, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function WindowFunctionsPage() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = React.useState<string>("")

  React.useEffect(() => {
    const sections = [
      'intro', 'basics', 'ranking', 'aggregate', 'offset', 'frame', 
      'partition', 'practical', 'performance', 'mistakes'
    ]
    
    const observers = sections.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
      )
      
      observer.observe(element)
      return observer
    })
    
    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [])

  const isDark = theme === 'dark'

  const navItems = [
    { id: 'intro', icon: '🎯', label: '窗口函数核心概念', color: 'blue' },
    { id: 'basics', icon: '📚', label: '基础语法与框架', color: 'green' },
    { id: 'ranking', icon: '🏆', label: '排名函数详解', color: 'yellow' },
    { id: 'aggregate', icon: '📊', label: '聚合窗口函数', color: 'red' },
    { id: 'offset', icon: '↔️', label: '偏移函数应用', color: 'purple' },
    { id: 'frame', icon: '🪟', label: '窗口框架详解', color: 'pink' },
    { id: 'partition', icon: '🔀', label: 'PARTITION BY技巧', color: 'indigo' },
    { id: 'practical', icon: '💼', label: '业务实战场景', color: 'orange' },
    { id: 'performance', icon: '⚡', label: '性能优化技巧', color: 'teal' },
    { id: 'mistakes', icon: '⚠️', label: '常见错误避坑', color: 'rose' }
  ]

  return (
    <div className={isDark ? 'min-h-screen bg-gray-900' : 'min-h-screen bg-gray-50'}>
      <Navigation />

      {/* 面包屑导航 */}
      <div className={isDark ? 'bg-gray-800 border-gray-700 border-b sticky top-0 z-10' : 'bg-white border-gray-200 border-b sticky top-0 z-10'}>
        <div className="max-w-[1600px] mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}>
              <Home className="w-4 h-4" />
            </Link>
            <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>/</span>
            <Link href="/sql" className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}>
              SQL
            </Link>
            <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>/</span>
            <span className={isDark ? 'text-white font-medium' : 'text-gray-900 font-medium'}>窗口函数专题</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          
          {/* 左侧导航 */}
          <aside className="w-72 shrink-0 sticky top-20 h-fit">
            <div className={`rounded-2xl p-6 shadow-lg border-2 backdrop-blur-sm ${
              isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
            }`}>
              <div className="mb-4">
                <Link 
                  href="/sql"
                  className={`flex items-center gap-2 text-sm font-medium mb-4 ${
                    isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  返回SQL主页
                </Link>
                <h3 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  📖 目录导航
                </h3>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id
                  const colorClass = isActive 
                    ? isDark ? 'border-blue-500 bg-blue-900/30' : 'border-blue-500 bg-blue-50'
                    : isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                  
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${colorClass} ${
                        isActive ? 'shadow-md' : ''
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        {item.label}
                      </span>
                    </a>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* 主内容区 */}
          <main className="flex-1 min-w-0">
            
            {/* 标题区 */}
            <section id="intro" className="mb-12 scroll-mt-24">
              <div className={`rounded-2xl p-8 shadow-2xl ${isDark ? 'bg-gradient-to-br from-blue-900 to-indigo-900' : 'bg-gradient-to-br from-blue-500 to-indigo-600'}`}>
                <div className="flex items-center gap-6">
                  <div className="w-1.5 h-16 bg-white rounded-full"></div>
                  <div>
                    <h1 className="text-5xl font-black text-white mb-2">🪟 窗口函数完全指南</h1>
                    <p className="text-xl text-white/90">
                      MySQL 8.0 杀手级特性 · 数据分析必备技能 · 从入门到精通
                    </p>
                  </div>
                </div>
              </div>

              {/* 核心概念卡片 */}
              <div className={`mt-6 rounded-xl p-6 border-2 ${isDark ? 'bg-gray-800 border-blue-600' : 'bg-blue-50 border-blue-300'}`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 什么是窗口函数？
                </h3>
                <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <p className="leading-relaxed">
                    <strong>窗口函数</strong>（Window Function）也叫<strong>分析函数</strong>（Analytic Function），是一种在<strong>保留原始行的同时</strong>进行<strong>聚合计算</strong>的SQL函数。
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                      <div className="text-2xl mb-2">🚫</div>
                      <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}>普通GROUP BY</div>
                      <div className="text-xs">聚合后丢失原始行细节</div>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                      <div className="text-2xl mb-2">{getLucideIcon('✅', 'w-5 h-5 text-[#19bcc8]')}</div>
                      <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-green-400' : 'text-green-600'}`}>窗口函数</div>
                      <div className="text-xs">保留原始行 + 聚合结果</div>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                      <div className="text-2xl mb-2">🎯</div>
                      <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>核心价值</div>
                      <div className="text-xs">排名、累计、同比、Top N</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 快速对比示例 */}
              <div className="mt-6 space-y-4">
                <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 快速对比：GROUP BY vs 窗口函数
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg border-2 ${isDark ? 'bg-gray-800 border-red-500' : 'bg-red-50 border-red-300'}`}>
                    <div className={`font-semibold mb-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>❌ 普通聚合（丢失明细）</div>
                    <pre className={`text-xs p-3 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-white text-gray-800'}`}>
{`-- 只能看到每个部门的总计
SELECT 
  department,
  SUM(salary) AS total_salary
FROM employees
GROUP BY department;

-- 结果：3行（3个部门）
department | total_salary
-----------|-------------
Sales      | 300000
Tech       | 450000
HR         | 180000`}
                    </pre>
                  </div>
                  <div className={`p-4 rounded-lg border-2 ${isDark ? 'bg-gray-800 border-green-500' : 'bg-green-50 border-green-300'}`}>
                    <div className={`font-semibold mb-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 窗口函数（保留明细）</div>
                    <pre className={`text-xs p-3 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-white text-gray-800'}`}>
{`-- 每个员工都能看到部门总计
SELECT 
  name,
  department,
  salary,
  SUM(salary) OVER (PARTITION BY department) AS dept_total
FROM employees;

-- 结果：10行（10个员工）
name   | department | salary | dept_total
-------|------------|--------|------------
Alice  | Sales      | 80000  | 300000
Bob    | Sales      | 75000  | 300000
...`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* PART 01: 基础语法 */}
            <section id="basics" className="mb-12 scroll-mt-24">
              <div className={`rounded-2xl p-8 shadow-2xl border-l-8 ${
                isDark 
                  ? 'bg-gradient-to-r from-green-900 to-gray-800 border-green-600' 
                  : 'bg-gradient-to-r from-green-500 to-green-600 border-green-700'
              }`}>
                <h2 className="text-4xl font-extrabold text-white mb-2">01. 基础语法与框架</h2>
                <p className="text-lg text-white/90">窗口函数的标准写法与核心组件</p>
              </div>

              <div className="mt-6 space-y-6">
                {/* 标准语法 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                    <span>📐</span>
                    <span>标准语法框架</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 窗口函数完整语法
<窗口函数> OVER (
    [PARTITION BY <分组字段>]    -- 可选：按什么字段分组
    [ORDER BY <排序字段>]         -- 可选：组内如何排序
    [ROWS/RANGE <窗口框架>]       -- 可选：计算范围
)

-- 三个核心组件：
-- 1. PARTITION BY：类似 GROUP BY，但不聚合行
-- 2. ORDER BY：定义窗口内的排序规则
-- 3. ROWS/RANGE：定义计算范围（滑动窗口）`}
                  </pre>
                </div>

                {/* 最简单示例 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    {getLucideIcon('🎯', 'w-5 h-5 text-[#19bcc8]')}
                    <span>最简单示例：全表编号</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 给所有员工按工资从高到低编号
SELECT 
  name,
  salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS salary_rank
FROM employees;

-- 结果：
name    | salary | salary_rank
--------|--------|-------------
Alice   | 95000  | 1
Bob     | 88000  | 2
Charlie | 75000  | 3
David   | 72000  | 4
...`}
                  </pre>
                  <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
                      <strong>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 关键理解：</strong> OVER() 是窗口函数的标志，ROW_NUMBER() 会为每一行生成序号，且<strong>不减少行数</strong>。
                    </p>
                  </div>
                </div>

                {/* PARTITION BY详解 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                    <span>🔀</span>
                    <span>PARTITION BY：分组计算</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 每个部门内按工资排名
SELECT 
  name,
  department,
  salary,
  ROW_NUMBER() OVER (
    PARTITION BY department  -- 按部门分组
    ORDER BY salary DESC      -- 组内按工资降序
  ) AS dept_rank
FROM employees;

-- 结果：每个部门独立排名
name    | department | salary | dept_rank
--------|------------|--------|----------
Alice   | Sales      | 95000  | 1   ← Sales部门第1
Bob     | Sales      | 75000  | 2   ← Sales部门第2
Charlie | Tech       | 88000  | 1   ← Tech部门第1
David   | Tech       | 72000  | 2   ← Tech部门第2
Eve     | HR         | 65000  | 1   ← HR部门第1`}
                  </pre>
                  <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-purple-900/30 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>
                      <strong>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 对比 GROUP BY：</strong> GROUP BY会把每个部门聚合成1行，而PARTITION BY保留所有行，只是在每个分组内独立计算。
                    </p>
                  </div>
                </div>

                {/* ORDER BY详解 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    <span>📶</span>
                    <span>ORDER BY：排序规则</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- ORDER BY 决定窗口内的计算顺序
SELECT 
  name,
  hire_date,
  salary,
  -- 按入职时间累计计算部门工资总额
  SUM(salary) OVER (
    PARTITION BY department
    ORDER BY hire_date  -- 关键：按入职时间排序
  ) AS cumulative_salary
FROM employees;

-- 结果：累计工资会随时间增长
name    | hire_date  | salary | cumulative_salary
--------|------------|--------|-------------------
Alice   | 2020-01-01 | 80000  | 80000   ← 第1个入职
Bob     | 2020-06-01 | 75000  | 155000  ← 累计2人
Charlie | 2021-01-01 | 85000  | 240000  ← 累计3人`}
                  </pre>
                  <div className={`mt-4 grid md:grid-cols-2 gap-4`}>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-green-900/30 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                      <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-800'}`}>
                        <strong> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 有 ORDER BY：</strong> 累计计算（SUM累计、AVG移动平均）
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-red-900/30 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                      <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-800'}`}>
                        <strong>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 无 ORDER BY：</strong> 整个分区聚合（SUM整个组）
                      </p>
                    </div>
                  </div>
                </div>

                {/* 完整示例对比 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                    <span>🆚</span>
                    <span>完整对比：有无 ORDER BY 的区别</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        ❌ 无 ORDER BY（整个分区）
                      </div>
                      <pre className={`text-xs p-3 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`SELECT 
  department,
  name,
  salary,
  SUM(salary) OVER (
    PARTITION BY department
    -- 无ORDER BY
  ) AS total
FROM employees;

-- 每个部门的total都相同
department | name  | salary | total
-----------|-------|--------|-------
Sales      | Alice | 80000  | 300000
Sales      | Bob   | 75000  | 300000
Sales      | Carol | 145000 | 300000`}
                      </pre>
                    </div>
                    <div>
                      <div className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 有 ORDER BY（累计计算）
                      </div>
                      <pre className={`text-xs p-3 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`SELECT 
  department,
  name,
  salary,
  SUM(salary) OVER (
    PARTITION BY department
    ORDER BY salary  -- 有ORDER BY
  ) AS cumulative
FROM employees;

-- cumulative会逐行累加
department | name  | salary | cumulative
-----------|-------|--------|------------
Sales      | Bob   | 75000  | 75000
Sales      | Alice | 80000  | 155000
Sales      | Carol | 145000 | 300000`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PART 02: 排名函数 */}
            <section id="ranking" className="mb-12 scroll-mt-24">
              <div className={`rounded-2xl p-8 shadow-2xl border-l-8 ${
                isDark 
                  ? 'bg-gradient-to-r from-yellow-900 to-gray-800 border-yellow-600' 
                  : 'bg-gradient-to-r from-yellow-500 to-yellow-600 border-yellow-700'
              }`}>
                <h2 className="text-4xl font-extrabold text-white mb-2">02. 排名函数详解</h2>
                <p className="text-lg text-white/90">ROW_NUMBER / RANK / DENSE_RANK / NTILE 全对比</p>
              </div>

              <div className="mt-6 space-y-6">
                {/* 四大排名函数对比 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    <span>🏆</span>
                    <span>四大排名函数完整对比</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 测试数据：销售额排名（注意有并列）
SELECT 
  name,
  sales,
  ROW_NUMBER() OVER (ORDER BY sales DESC) AS row_num,
  RANK() OVER (ORDER BY sales DESC) AS rank_num,
  DENSE_RANK() OVER (ORDER BY sales DESC) AS dense_rank_num,
  NTILE(4) OVER (ORDER BY sales DESC) AS quartile
FROM salesperson;

-- 结果对比：
name    | sales | row_num | rank_num | dense_rank_num | quartile
--------|-------|---------|----------|----------------|----------
Alice   | 95000 | 1       | 1        | 1              | 1
Bob     | 95000 | 2       | 1 ← 并列 | 1 ← 并列       | 1
Charlie | 88000 | 3       | 3 ← 跳号 | 2 ← 连续       | 2
David   | 75000 | 4       | 4        | 3              | 2
Eve     | 75000 | 5       | 4 ← 并列 | 3 ← 并列       | 3
Frank   | 68000 | 6       | 6 ← 跳号 | 4 ← 连续       | 3
Grace   | 55000 | 7       | 7        | 5              | 4
Helen   | 42000 | 8       | 8        | 6              | 4`}
                  </pre>
                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                      <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
                        <strong>ROW_NUMBER()：</strong> 绝对连续，即使并列也强制不同序号（1,2,3,4...）
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-green-900/30 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                      <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-800'}`}>
                        <strong>RANK()：</strong> 并列给同名次，下一名次跳号（1,1,3,4,4,6...）
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-purple-900/30 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
                      <p className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>
                        <strong>DENSE_RANK()：</strong> 并列给同名次，下一名次连续（1,1,2,3,3,4...）
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-orange-900/30 border border-orange-700' : 'bg-orange-50 border border-orange-200'}`}>
                      <p className={`text-sm ${isDark ? 'text-orange-300' : 'text-orange-800'}`}>
                        <strong>NTILE(n)：</strong> 将数据分成n个桶（四分位数用NTILE(4)）
                      </p>
                    </div>
                  </div>
                </div>

                {/* ROW_NUMBER 实战 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    <span>1️⃣</span>
                    <span>ROW_NUMBER()：每组取Top N</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 场景：每个部门工资Top 3
WITH ranked AS (
  SELECT 
    department,
    name,
    salary,
    ROW_NUMBER() OVER (
      PARTITION BY department
      ORDER BY salary DESC
    ) AS dept_rank
  FROM employees
)
SELECT * FROM ranked
WHERE dept_rank <= 3;

-- 结果：每个部门最多3人
department | name    | salary | dept_rank
-----------|---------|--------|----------
Sales      | Alice   | 95000  | 1
Sales      | Bob     | 88000  | 2
Sales      | Carol   | 75000  | 3
Tech       | David   | 92000  | 1
Tech       | Eve     | 85000  | 2
Tech       | Frank   | 78000  | 3
HR         | Grace   | 65000  | 1
HR         | Helen   | 62000  | 2`}
                  </pre>
                  <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-yellow-300' : 'text-yellow-800'}`}>
                      <strong>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：</strong> 如果有并列，ROW_NUMBER会随机打破并列（根据物理存储顺序），不适合严格排名场景。
                    </p>
                  </div>
                </div>

                {/* RANK vs DENSE_RANK */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                    <span>🥇</span>
                    <span>RANK() vs DENSE_RANK()：如何选择？</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 使用 RANK()（跳号）
                      </div>
                      <pre className={`text-xs p-3 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 场景：高考排名、体育竞赛
SELECT 
  student_name,
  score,
  RANK() OVER (ORDER BY score DESC) AS rank
FROM exam_results;

-- 结果：
student  | score | rank
---------|-------|------
Alice    | 98    | 1
Bob      | 98    | 1  ← 并列第1
Charlie  | 95    | 3  ← 跳到第3
David    | 95    | 3
Eve      | 92    | 5  ← 跳到第5

� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 符合现实：2人并列第1，
   下一名就是第3名`}
                      </pre>
                    </div>
                    <div>
                      <div className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 使用 DENSE_RANK()（连续）
                      </div>
                      <pre className={`text-xs p-3 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 场景：薪资等级、产品分类
SELECT 
  product,
  price,
  DENSE_RANK() OVER (ORDER BY price DESC) AS price_tier
FROM products;

-- 结果：
product  | price | price_tier
---------|-------|------------
iPhone   | 999   | 1  ← 高端
iPad     | 999   | 1
MacBook  | 799   | 2  ← 中端（连续）
AirPods  | 799   | 2
Watch    | 399   | 3  ← 低端（连续）

� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 适合分层：需要连续的层级编号`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* NTILE 实战 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                    {getLucideIcon('📊', 'w-5 h-5 text-[#19bcc8]')}
                    <span>NTILE(n)：分桶分析</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 场景1：用户RFM分层（四分位数）
SELECT 
  user_id,
  recency,
  frequency,
  monetary,
  NTILE(4) OVER (ORDER BY recency DESC) AS r_score,
  NTILE(4) OVER (ORDER BY frequency) AS f_score,
  NTILE(4) OVER (ORDER BY monetary) AS m_score
FROM user_rfm;

-- 场景2：销售业绩分级（十分位数）
SELECT 
  salesperson,
  sales_amount,
  NTILE(10) OVER (ORDER BY sales_amount DESC) AS decile,
  CASE 
    WHEN NTILE(10) OVER (ORDER BY sales_amount DESC) = 1 THEN 'Top 10%'
    WHEN NTILE(10) OVER (ORDER BY sales_amount DESC) <= 3 THEN 'Top 30%'
    WHEN NTILE(10) OVER (ORDER BY sales_amount DESC) <= 5 THEN 'Middle 50%'
    ELSE 'Bottom 50%'
  END AS performance_tier
FROM sales_records;

-- 场景3：AB测试分组（均匀分成2组）
SELECT 
  user_id,
  NTILE(2) OVER (ORDER BY RAND()) AS ab_group
FROM users;`}
                  </pre>
                  <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-purple-900/30 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>
                      <strong>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} NTILE原理：</strong> 尽量平均分配，若不能整除，前面的桶会多1个元素。如100行分成3桶 → 34, 33, 33。
                    </p>
                  </div>
                </div>

                {/* PERCENT_RANK 和 CUME_DIST */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                    {getLucideIcon('📈', 'w-5 h-5 text-[#19bcc8]')}
                    <span>高级：PERCENT_RANK() 和 CUME_DIST()</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- PERCENT_RANK：相对排名百分比（0-1之间）
-- CUME_DIST：累计分布（当前值及以下的百分比）
SELECT 
  name,
  score,
  RANK() OVER (ORDER BY score DESC) AS rank,
  PERCENT_RANK() OVER (ORDER BY score DESC) AS percent_rank,
  CUME_DIST() OVER (ORDER BY score DESC) AS cume_dist
FROM students;

-- 结果：
name    | score | rank | percent_rank | cume_dist
--------|-------|------|--------------|----------
Alice   | 98    | 1    | 0.00         | 0.125  ← 前12.5%
Bob     | 95    | 2    | 0.14         | 0.25   ← 前25%
Charlie | 92    | 3    | 0.29         | 0.375
David   | 88    | 4    | 0.43         | 0.50   ← 中位数
Eve     | 85    | 5    | 0.57         | 0.625
Frank   | 80    | 6    | 0.71         | 0.75
Grace   | 75    | 7    | 0.86         | 0.875
Helen   | 70    | 8    | 1.00         | 1.00   ← 最后

-- 应用：找出成绩前20%的学生
SELECT * FROM (
  SELECT *, PERCENT_RANK() OVER (ORDER BY score DESC) AS pct
  FROM students
) t WHERE pct <= 0.2;`}
                  </pre>
                </div>
              </div>
            </section>

            {/* PART 03: 聚合窗口函数 */}
            <section id="aggregate" className="mb-12 scroll-mt-24">
              <div className={`rounded-2xl p-8 shadow-2xl border-l-8 ${
                isDark 
                  ? 'bg-gradient-to-r from-red-900 to-gray-800 border-red-600' 
                  : 'bg-gradient-to-r from-red-500 to-red-600 border-red-700'
              }`}>
                <h2 className="text-4xl font-extrabold text-white mb-2">03. 聚合窗口函数</h2>
                <p className="text-lg text-white/90">SUM / AVG / COUNT / MAX / MIN 窗口版</p>
              </div>

              <div className="mt-6 space-y-6">
                {/* 聚合函数对比 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                    {getLucideIcon('🔄', 'w-5 h-5 text-[#19bcc8]')}
                    <span>普通聚合 vs 窗口聚合</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        ❌ 普通聚合（丢失明细）
                      </div>
                      <pre className={`text-xs p-3 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`SELECT 
  department,
  SUM(salary) AS total_salary,
  AVG(salary) AS avg_salary,
  COUNT(*) AS emp_count
FROM employees
GROUP BY department;

-- 结果：只有3行（3个部门）
department | total | avg   | count
-----------|-------|-------|------
Sales      | 300k  | 75k   | 4
Tech       | 450k  | 90k   | 5
HR         | 180k  | 60k   | 3`}
                      </pre>
                    </div>
                    <div>
                      <div className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 窗口聚合（保留明细）
                      </div>
                      <pre className={`text-xs p-3 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`SELECT 
  name,
  department,
  salary,
  SUM(salary) OVER (PARTITION BY department) AS dept_total,
  AVG(salary) OVER (PARTITION BY department) AS dept_avg,
  COUNT(*) OVER (PARTITION BY department) AS dept_count
FROM employees;

-- 结果：12行（12个员工），每人都有部门统计
name  | dept  | salary | dept_total | dept_avg | dept_count
------|-------|--------|------------|----------|------------
Alice | Sales | 80000  | 300000     | 75000    | 4
Bob   | Sales | 75000  | 300000     | 75000    | 4
...`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* 累计求和 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    {getLucideIcon('📈', 'w-5 h-5 text-[#19bcc8]')}
                    <span>SUM()：累计求和</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 场景1：累计销售额（按日期）
SELECT 
  date,
  sales,
  SUM(sales) OVER (ORDER BY date) AS cumulative_sales,
  SUM(sales) OVER (ORDER BY date) / SUM(sales) OVER () AS cumulative_pct
FROM daily_sales;

-- 结果：
date       | sales | cumulative_sales | cumulative_pct
-----------|-------|------------------|----------------
2024-01-01 | 1000  | 1000             | 0.10  ← 10%
2024-01-02 | 1500  | 2500             | 0.25  ← 25%
2024-01-03 | 1200  | 3700             | 0.37  ← 37%
2024-01-04 | 1800  | 5500             | 0.55  ← 55%

-- 场景2：按部门累计（独立累计）
SELECT 
  department,
  name,
  hire_date,
  salary,
  SUM(salary) OVER (
    PARTITION BY department 
    ORDER BY hire_date
  ) AS dept_cumulative_salary
FROM employees;

-- 结果：每个部门独立累计
department | name  | hire_date  | salary | dept_cumulative
-----------|-------|------------|--------|----------------
Sales      | Alice | 2020-01-01 | 80000  | 80000
Sales      | Bob   | 2020-06-01 | 75000  | 155000
Sales      | Carol | 2021-01-01 | 145000 | 300000
Tech       | David | 2020-02-01 | 92000  | 92000  ← 重新开始
Tech       | Eve   | 2020-07-01 | 85000  | 177000`}
                  </pre>
                </div>

                {/* 移动平均 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                    {getLucideIcon('📊', 'w-5 h-5 text-[#19bcc8]')}
                    <span>AVG()：移动平均</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 场景1：7日移动平均（平滑曲线）
SELECT 
  date,
  sales,
  AVG(sales) OVER (
    ORDER BY date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS ma7
FROM daily_sales;

-- 结果：
date       | sales | ma7
-----------|-------|------
2024-01-01 | 1000  | 1000   ← 只有1天
2024-01-02 | 1500  | 1250   ← 前2天平均
2024-01-03 | 1200  | 1233   ← 前3天平均
...
2024-01-07 | 1800  | 1400   ← 前7天平均
2024-01-08 | 1600  | 1450   ← 滚动窗口

-- 场景2：对比当前值与平均值
SELECT 
  product_id,
  sales,
  AVG(sales) OVER () AS avg_sales,
  sales - AVG(sales) OVER () AS diff_from_avg,
  CASE 
    WHEN sales > AVG(sales) OVER () THEN '高于平均'
    ELSE '低于平均'
  END AS performance
FROM product_sales;`}
                  </pre>
                </div>

                {/* COUNT/MAX/MIN */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                    <span>🔢</span>
                    <span>COUNT / MAX / MIN 窗口应用</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- COUNT()：累计计数
SELECT 
  date,
  user_id,
  COUNT(*) OVER (ORDER BY date) AS total_registrations
FROM user_registrations;

-- MAX()：与最大值对比
SELECT 
  name,
  salary,
  MAX(salary) OVER () AS max_salary,
  salary / MAX(salary) OVER () AS salary_ratio
FROM employees;

-- 结果：
name    | salary | max_salary | salary_ratio
--------|--------|------------|-------------
Alice   | 95000  | 95000      | 1.00  ← 最高
Bob     | 88000  | 95000      | 0.93
Charlie | 75000  | 95000      | 0.79

-- MIN()：分组最小值
SELECT 
  department,
  name,
  salary,
  MIN(salary) OVER (PARTITION BY department) AS dept_min_salary,
  salary - MIN(salary) OVER (PARTITION BY department) AS above_min
FROM employees;`}
                  </pre>
                </div>

                {/* 实战：帕累托分析 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    {getLucideIcon('📊', 'w-5 h-5 text-[#19bcc8]')}
                    <span>实战案例：帕累托分析（80/20法则）</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 找出贡献80%销售额的产品
WITH product_sales_ranked AS (
  SELECT 
    product_id,
    product_name,
    sales,
    -- 按销售额降序排列
    ROW_NUMBER() OVER (ORDER BY sales DESC) AS rank,
    -- 累计销售额
    SUM(sales) OVER (ORDER BY sales DESC) AS cumulative_sales,
    -- 总销售额
    SUM(sales) OVER () AS total_sales,
    -- 累计占比
    SUM(sales) OVER (ORDER BY sales DESC) / SUM(sales) OVER () AS cumulative_pct
  FROM product_sales
)
SELECT 
  product_id,
  product_name,
  sales,
  cumulative_sales,
  ROUND(cumulative_pct * 100, 2) AS cumulative_pct
FROM product_sales_ranked
WHERE cumulative_pct <= 0.8  -- 前80%销售额的产品
ORDER BY rank;

-- 结果：找出核心产品
product_id | product_name | sales  | cumulative_sales | cumulative_pct
-----------|--------------|--------|------------------|----------------
P001       | iPhone       | 50000  | 50000            | 25.00%
P002       | MacBook      | 40000  | 90000            | 45.00%
P003       | iPad         | 35000  | 125000           | 62.50%
P004       | AirPods      | 30000  | 155000           | 77.50%  ← 4个产品占77.5%`}
                  </pre>
                </div>
              </div>
            </section>

            {/* PART 04: 偏移函数 */}
            <section id="offset" className="mb-12 scroll-mt-24">
              <div className={`rounded-2xl p-8 shadow-2xl border-l-8 ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-900 to-gray-800 border-purple-600' 
                  : 'bg-gradient-to-r from-purple-500 to-purple-600 border-purple-700'
              }`}>
                <h2 className="text-4xl font-extrabold text-white mb-2">04. 偏移函数应用</h2>
                <p className="text-lg text-white/90">LAG / LEAD / FIRST_VALUE / LAST_VALUE</p>
              </div>

              <div className="mt-6 space-y-6">
                {/* LAG vs LEAD */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                    <span>↔️</span>
                    <span>LAG() 和 LEAD()：前后对比</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- LAG()：获取前N行的值
-- LEAD()：获取后N行的值
SELECT 
  month,
  sales,
  LAG(sales, 1) OVER (ORDER BY month) AS last_month,
  LEAD(sales, 1) OVER (ORDER BY month) AS next_month,
  sales - LAG(sales, 1) OVER (ORDER BY month) AS mom_change
FROM monthly_sales;

-- 结果：
month      | sales | last_month | next_month | mom_change
-----------|-------|------------|------------|------------
2024-01    | 10000 | NULL       | 12000      | NULL
2024-02    | 12000 | 10000      | 15000      | 2000
2024-03    | 15000 | 12000      | 14000      | 3000
2024-04    | 14000 | 15000      | NULL       | -1000

-- 高级：设置默认值
SELECT 
  month,
  sales,
  LAG(sales, 1, 0) OVER (ORDER BY month) AS last_month  -- 默认0
FROM monthly_sales;`}
                  </pre>
                </div>

                {/* 同比环比 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    {getLucideIcon('📈', 'w-5 h-5 text-[#19bcc8]')}
                    <span>实战：同比环比分析</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 环比（MoM）：与上月对比
SELECT 
  month,
  sales,
  LAG(sales, 1) OVER (ORDER BY month) AS last_month,
  ROUND((sales - LAG(sales, 1) OVER (ORDER BY month)) / LAG(sales, 1) OVER (ORDER BY month) * 100, 2) AS mom_pct
FROM monthly_sales;

-- 同比（YoY）：与去年同月对比
SELECT 
  month,
  sales,
  LAG(sales, 12) OVER (ORDER BY month) AS last_year_same_month,
  ROUND((sales - LAG(sales, 12) OVER (ORDER BY month)) / LAG(sales, 12) OVER (ORDER BY month) * 100, 2) AS yoy_pct
FROM monthly_sales;

-- 结果：
month      | sales | last_year | yoy_pct
-----------|-------|-----------|--------
2023-01    | 10000 | NULL      | NULL
...
2024-01    | 12000 | 10000     | 20.00%  ← 同比增长20%
2024-02    | 15000 | 12000     | 25.00%  ← 同比增长25%

-- 综合版：环比+同比
SELECT 
  month,
  sales,
  LAG(sales, 1) OVER (ORDER BY month) AS mom,
  ROUND((sales - LAG(sales, 1) OVER (ORDER BY month)) / LAG(sales, 1) OVER (ORDER BY month) * 100, 2) AS mom_pct,
  LAG(sales, 12) OVER (ORDER BY month) AS yoy,
  ROUND((sales - LAG(sales, 12) OVER (ORDER BY month)) / LAG(sales, 12) OVER (ORDER BY month) * 100, 2) AS yoy_pct
FROM monthly_sales;`}
                  </pre>
                </div>

                {/* FIRST_VALUE / LAST_VALUE */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                    <span>🔝</span>
                    <span>FIRST_VALUE / LAST_VALUE：首尾值</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- FIRST_VALUE()：窗口内第一个值
-- LAST_VALUE()：窗口内最后一个值
SELECT 
  department,
  name,
  hire_date,
  salary,
  FIRST_VALUE(name) OVER (
    PARTITION BY department 
    ORDER BY hire_date
  ) AS first_hire,
  LAST_VALUE(name) OVER (
    PARTITION BY department 
    ORDER BY hire_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS last_hire
FROM employees;

-- 结果：
department | name  | hire_date  | salary | first_hire | last_hire
-----------|-------|------------|--------|------------|----------
Sales      | Alice | 2020-01-01 | 80000  | Alice      | Carol
Sales      | Bob   | 2020-06-01 | 75000  | Alice      | Carol
Sales      | Carol | 2021-01-01 | 145000 | Alice      | Carol
Tech       | David | 2020-02-01 | 92000  | David      | Frank
Tech       | Eve   | 2020-07-01 | 85000  | David      | Frank

-- 实战：与首日/末日对比
SELECT 
  date,
  stock_price,
  FIRST_VALUE(stock_price) OVER (ORDER BY date) AS year_open_price,
  stock_price - FIRST_VALUE(stock_price) OVER (ORDER BY date) AS change_from_open
FROM stock_prices
WHERE YEAR(date) = 2024;`}
                  </pre>
                  <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-yellow-300' : 'text-yellow-800'}`}>
                      <strong>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} LAST_VALUE 坑：</strong> 默认窗口框架是 ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW，所以需要显式指定 UNBOUNDED FOLLOWING 才能获取真正的最后一行！
                    </p>
                  </div>
                </div>

                {/* 用户留存分析 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                    {getLucideIcon('👥', 'w-5 h-5 text-[#19bcc8]')}
                    <span>实战案例：用户留存分析</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 计算用户连续登录天数
WITH login_streaks AS (
  SELECT 
    user_id,
    login_date,
    LAG(login_date, 1) OVER (PARTITION BY user_id ORDER BY login_date) AS prev_login,
    DATEDIFF(
      login_date, 
      LAG(login_date, 1) OVER (PARTITION BY user_id ORDER BY login_date)
    ) AS days_gap
  FROM user_logins
)
SELECT 
  user_id,
  login_date,
  CASE 
    WHEN days_gap = 1 THEN '连续登录'
    WHEN days_gap IS NULL THEN '首次登录'
    ELSE '中断登录'
  END AS login_status
FROM login_streaks;

-- 计算用户流失天数
SELECT 
  user_id,
  DATEDIFF(CURDATE(), MAX(login_date)) AS days_since_last_login,
  CASE 
    WHEN DATEDIFF(CURDATE(), MAX(login_date)) > 30 THEN '已流失'
    WHEN DATEDIFF(CURDATE(), MAX(login_date)) > 7 THEN '即将流失'
    ELSE '活跃'
  END AS user_status
FROM user_logins
GROUP BY user_id;`}
                  </pre>
                </div>
              </div>
            </section>

            {/* PART 05: 窗口框架 */}
            <section id="frame" className="mb-12 scroll-mt-24">
              <div className={`rounded-2xl p-8 shadow-2xl border-l-8 ${
                isDark 
                  ? 'bg-gradient-to-r from-pink-900 to-gray-800 border-pink-600' 
                  : 'bg-gradient-to-r from-pink-500 to-pink-600 border-pink-700'
              }`}>
                <h2 className="text-4xl font-extrabold text-white mb-2">05. 窗口框架详解</h2>
                <p className="text-lg text-white/90">ROWS vs RANGE · 滑动窗口的精确控制</p>
              </div>

              <div className="mt-6 space-y-6">
                {/* 窗口框架语法 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-pink-400' : 'text-pink-700'}`}>
                    <span>🪟</span>
                    <span>窗口框架完整语法</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 完整语法
<窗口函数> OVER (
    [PARTITION BY ...]
    [ORDER BY ...]
    [ROWS|RANGE BETWEEN <起始> AND <结束>]
)

-- 起始/结束关键字：
UNBOUNDED PRECEDING  -- 分区第一行
N PRECEDING          -- 当前行前N行
CURRENT ROW          -- 当前行
N FOLLOWING          -- 当前行后N行
UNBOUNDED FOLLOWING  -- 分区最后一行

-- 默认窗口框架：
-- 有ORDER BY：RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
-- 无ORDER BY：RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`}
                  </pre>
                </div>

                {/* ROWS vs RANGE */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    <span>🆚</span>
                    <span>ROWS vs RANGE 对比</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        ROWS（物理行）
                      </div>
                      <pre className={`text-xs p-3 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 按物理行数计算
SELECT 
  date,
  sales,
  SUM(sales) OVER (
    ORDER BY date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS sum_3rows
FROM daily_sales;

-- 结果：严格3行
date       | sales | sum_3rows
-----------|-------|----------
2024-01-01 | 100   | 100      ← 1行
2024-01-02 | 200   | 300      ← 2行
2024-01-03 | 200   | 500      ← 3行
2024-01-04 | 150   | 550      ← 3行滚动`}
                      </pre>
                    </div>
                    <div>
                      <div className={`text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        RANGE（逻辑值）
                      </div>
                      <pre className={`text-xs p-3 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 按值范围计算（相同值算一组）
SELECT 
  date,
  sales,
  SUM(sales) OVER (
    ORDER BY sales
    RANGE BETWEEN 50 PRECEDING AND CURRENT ROW
  ) AS sum_range
FROM daily_sales;

-- 结果：值范围±50
date       | sales | sum_range
-----------|-------|----------
2024-01-01 | 100   | 100
2024-01-02 | 120   | 220      ← 100+120
2024-01-03 | 200   | 320      ← 120+200`}
                      </pre>
                    </div>
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-yellow-300' : 'text-yellow-800'}`}>
                      <strong>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 选择建议：</strong> 99%场景用ROWS（更直观），RANGE主要用于处理相同值的特殊情况。
                    </p>
                  </div>
                </div>

                {/* 滑动窗口实战 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                    {getLucideIcon('📊', 'w-5 h-5 text-[#19bcc8]')}
                    <span>滑动窗口实战案例</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 场景1：3日移动平均（当前+前2天）
SELECT 
  date,
  sales,
  AVG(sales) OVER (
    ORDER BY date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS ma3
FROM daily_sales;

-- 场景2：5日对称移动平均（前2+当前+后2）
SELECT 
  date,
  sales,
  AVG(sales) OVER (
    ORDER BY date
    ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING
  ) AS centered_ma5
FROM daily_sales;

-- 场景3：当前到分区末尾累计
SELECT 
  department,
  name,
  salary,
  SUM(salary) OVER (
    PARTITION BY department
    ORDER BY salary DESC
    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING
  ) AS remaining_salary
FROM employees;

-- 场景4：排除当前行（前1+后1）
SELECT 
  product_id,
  price,
  AVG(price) OVER (
    ORDER BY product_id
    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
  ) AS avg_nearby_price
FROM products;`}
                  </pre>
                </div>

                {/* 常见窗口框架模式 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                    <span>📋</span>
                    <span>常用窗口框架速查</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 1. 累计到当前（默认）
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW

-- 2. 整个分区
ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING

-- 3. 前N行移动窗口
ROWS BETWEEN N PRECEDING AND CURRENT ROW

-- 4. 对称移动窗口
ROWS BETWEEN N PRECEDING AND N FOLLOWING

-- 5. 当前到结尾
ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING

-- 6. 仅当前行
ROWS BETWEEN CURRENT ROW AND CURRENT ROW
-- 等价于: ROWS CURRENT ROW

-- 7. 前N行（不含当前）
ROWS BETWEEN N PRECEDING AND 1 PRECEDING

-- 应用示例：
SELECT 
  date,
  sales,
  -- 累计
  SUM(sales) OVER (ORDER BY date ROWS UNBOUNDED PRECEDING) AS cumulative,
  -- 7日移动平均
  AVG(sales) OVER (ORDER BY date ROWS 6 PRECEDING) AS ma7,
  -- 全局总计
  SUM(sales) OVER (ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS total
FROM daily_sales;`}
                  </pre>
                </div>
              </div>
            </section>

            {/* PART 06: 实战场景 */}
            <section id="practical" className="mb-12 scroll-mt-24">
              <div className={`rounded-2xl p-8 shadow-2xl border-l-8 ${
                isDark 
                  ? 'bg-gradient-to-r from-orange-900 to-gray-800 border-orange-600' 
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 border-orange-700'
              }`}>
                <h2 className="text-4xl font-extrabold text-white mb-2">06. 业务实战场景</h2>
                <p className="text-lg text-white/90">数据分析师最常用的10大窗口函数场景</p>
              </div>

              <div className="mt-6 space-y-6">
                {/* 场景1：Top N */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
                    <span>🏆</span>
                    <span>场景1：每组Top N（最常用）</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 每个品类销量Top 5的商品
WITH ranked AS (
  SELECT 
    category,
    product_name,
    sales,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) AS rn
  FROM product_sales
)
SELECT category, product_name, sales
FROM ranked
WHERE rn <= 5;`}
                  </pre>
                </div>

                {/* 场景2：同比环比 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    {getLucideIcon('📈', 'w-5 h-5 text-[#19bcc8]')}
                    <span>场景2：同比环比增长率</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`SELECT 
  month,
  gmv,
  LAG(gmv, 1) OVER (ORDER BY month) AS last_month,
  ROUND((gmv - LAG(gmv, 1) OVER (ORDER BY month)) / LAG(gmv, 1) OVER (ORDER BY month) * 100, 2) AS mom_growth,
  LAG(gmv, 12) OVER (ORDER BY month) AS last_year,
  ROUND((gmv - LAG(gmv, 12) OVER (ORDER BY month)) / LAG(gmv, 12) OVER (ORDER BY month) * 100, 2) AS yoy_growth
FROM monthly_gmv;`}
                  </pre>
                </div>

                {/* 场景3：去重 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                    {getLucideIcon('🔍', 'w-5 h-5 text-[#19bcc8]')}
                    <span>场景3：去重（保留最新记录）</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 每个用户只保留最新的一条记录
WITH ranked AS (
  SELECT 
    *,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY update_time DESC) AS rn
  FROM user_profiles
)
SELECT * FROM ranked WHERE rn = 1;`}
                  </pre>
                </div>

                {/* 场景4：累计占比 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                    {getLucideIcon('📊', 'w-5 h-5 text-[#19bcc8]')}
                    <span>场景4：累计占比（ABC分析）</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`SELECT 
  product_name,
  sales,
  SUM(sales) OVER (ORDER BY sales DESC) AS cumulative_sales,
  ROUND(SUM(sales) OVER (ORDER BY sales DESC) / SUM(sales) OVER () * 100, 2) AS cumulative_pct,
  CASE 
    WHEN SUM(sales) OVER (ORDER BY sales DESC) / SUM(sales) OVER () <= 0.8 THEN 'A类产品(前80%)'
    WHEN SUM(sales) OVER (ORDER BY sales DESC) / SUM(sales) OVER () <= 0.95 THEN 'B类产品(80-95%)'
    ELSE 'C类产品(后5%)'
  END AS abc_category
FROM product_sales;`}
                  </pre>
                </div>

                {/* 场景5：用户首购/复购 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                    {getLucideIcon('🛒', 'w-5 h-5 text-[#19bcc8]')}
                    <span>场景5：用户首购/复购识别</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`SELECT 
  user_id,
  order_id,
  order_date,
  amount,
  ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date) AS purchase_number,
  CASE 
    WHEN ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date) = 1 THEN '首购'
    ELSE '复购'
  END AS purchase_type,
  FIRST_VALUE(order_date) OVER (PARTITION BY user_id ORDER BY order_date) AS first_purchase_date,
  DATEDIFF(order_date, FIRST_VALUE(order_date) OVER (PARTITION BY user_id ORDER BY order_date)) AS days_since_first
FROM orders;`}
                  </pre>
                </div>

                {/* 场景6：缺口分析 */}
                <div className={`p-6 rounded-xl border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    {getLucideIcon('📉', 'w-5 h-5 text-[#19bcc8]')}
                    <span>场景6：找连续缺失的日期</span>
                  </h3>
                  <pre className={`text-sm p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`-- 找出没有销售记录的日期
WITH all_dates AS (
  SELECT DATE_ADD('2024-01-01', INTERVAL n DAY) AS date
  FROM (SELECT @row := @row + 1 AS n FROM information_schema.columns LIMIT 365) t
  CROSS JOIN (SELECT @row := -1) r
  WHERE DATE_ADD('2024-01-01', INTERVAL n DAY) <= '2024-12-31'
)
SELECT ad.date
FROM all_dates ad
LEFT JOIN sales s ON ad.date = s.sale_date
WHERE s.sale_date IS NULL;`}
                  </pre>
                </div>
              </div>
            </section>

            {/* 页尾总结 */}
            <div className={`mt-12 rounded-xl p-8 border-2 ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'}`}>
              <h3 className={`text-2xl font-bold mb-4 text-center ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                🎉 窗口函数专题已全部展开
              </h3>
              <div className={`text-sm space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <p className="font-semibold text-center">
                  基础→排名→聚合→偏移→框架→实战 · 完整学习路径
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <h4 className={`font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心统计</h4>
                    <ul className="text-xs space-y-1">
                      <li>• 6个完整模块</li>
                      <li>• 30+ 可复制代码</li>
                      <li>• 10+ 业务场景</li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <h4 className={`font-bold mb-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>🎓 学习建议</h4>
                    <ul className="text-xs space-y-1">
                      <li>• 1天：掌握基础语法</li>
                      <li>• 3天：熟练排名+聚合</li>
                      <li>• 7天：实战业务场景</li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <h4 className={`font-bold mb-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>✨ 核心价值</h4>
                    <ul className="text-xs space-y-1">
                      <li>• 替代90%复杂子查询</li>
                      <li>• 性能提升3-10倍</li>
                      <li>• 代码可读性↑↑↑</li>
                    </ul>
                  </div>
                </div>
                <p className={`text-xs text-center mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 窗口函数 = 数据分析师的"Excel透视表" SQL版 | MySQL 8.0+ 必学特性 | 面试高频考点
                </p>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  )
}

