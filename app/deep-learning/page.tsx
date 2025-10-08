"use client"

import React from "react"
import { getLucideIcon } from "@/components/LucideIcon";
import { Navigation } from "@/components/navigation"
import { Home, Sparkles, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function DeepLearningPage() {
  const { theme } = useTheme()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState<string[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
      
      const sections = [
        'dl-intro',
        'llm-basics',
        'prompt-engineering',
        'ai-agents',
        'ai-landscape',
        'ai-tools',
        'local-deployment',
        'ai-for-analytics',
        'api-integration',
        'ai-ethics',
        'ai-project-templates',
        'ai-learning-path',
        'ai-faq'
      ]
      const current: string[] = []
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            current.push(sectionId)
            break
          }
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className={isDark ? 'min-h-screen bg-gray-900' : 'min-h-screen bg-gray-50'}>
      <Navigation />
      
      <div className={isDark ? 'bg-gray-800 border-gray-700 border-b sticky top-0 z-10' : 'bg-white border-gray-200 border-b sticky top-0 z-10'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 h-16">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
              <Home size={20} />
              <span className="font-medium">主页</span>
            </Link>
            <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>/</span>
            <Link href="/machine-learning" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              机器学习
            </Link>
            <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>/</span>
            <span className={isDark ? 'font-medium text-gray-200' : 'font-medium text-gray-900'}>深度学习与AI应用</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={isDark ? 'text-center mb-12 text-gray-100' : 'text-center mb-12 text-gray-900'}>
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center shadow-2xl animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            深度学习与AI应用
          </h1>
          <p className={isDark ? 'text-xl text-gray-400 max-w-3xl mx-auto' : 'text-xl text-gray-600 max-w-3xl mx-auto'}>
            数据分析师的AI工具箱：大模型科普、Prompt技巧、本地部署 —— 不需要深厚数学，专注实用落地
          </p>
          <div className={isDark ? 'mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-900/30 border-purple-700 border-2' : 'mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-50 border-purple-300 border-2'}>
            <span className="text-lg">💡</span>
            <span className={isDark ? 'text-sm font-semibold text-purple-300' : 'text-sm font-semibold text-purple-700'}>
              定位：了解即可，重实战轻理论，助力数据分析工作
            </span>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className={isDark ? 'sticky top-24 bg-gray-800/95 border-gray-700 backdrop-blur-sm rounded-2xl border-2 p-6 shadow-2xl max-h-[calc(100vh-120px)] overflow-y-auto' : 'sticky top-24 bg-white/95 border-gray-200 backdrop-blur-sm rounded-2xl border-2 p-6 shadow-2xl max-h-[calc(100vh-120px)] overflow-y-auto'}>
              <h3 className={isDark ? 'text-xl font-extrabold mb-6 text-gray-100 flex items-center gap-2' : 'text-xl font-extrabold mb-6 text-gray-900 flex items-center gap-2'}>
                <span className="text-2xl">📖</span>
                <span>页面导航</span>
              </h3>
              <nav className="space-y-3">
                {[
                  { id: 'dl-intro', icon: '🧠', label: '深度学习快速入门' },
                  { id: 'llm-basics', icon: '🤖', label: '大模型基础科普' },
                  { id: 'prompt-engineering', icon: '✍️', label: 'Prompt工程实战' },
                  { id: 'ai-agents', icon: '🤖', label: 'AI智能体（Agent）' },
                  { id: 'ai-landscape', icon: '🌐', label: 'AI发展全景图' },
                  { id: 'ai-tools', icon: '🛠️', label: 'AI工具与应用' },
                  { id: 'local-deployment', icon: '💻', label: '本地化部署指南' },
                  { id: 'ai-for-analytics', icon: '🎯', label: 'AI赋能数据分析' },
                  { id: 'api-integration', icon: '🔌', label: 'API调用与集成' },
                  { id: 'ai-ethics', icon: '📛', label: 'AI伦理与安全' },
                  { id: 'ai-project-templates', icon: '📦', label: '实战项目模板' },
                  { id: 'ai-learning-path', icon: '🗺️', label: '学习路径指南' },
                  { id: 'ai-faq', icon: '❓', label: '常见问题FAQ' }
                ].map(item => {
                  const isActive = activeSection.includes(item.id)
                  let className = 'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border-2 '
                  if (isActive) {
                    className += isDark 
                      ? 'bg-gray-700 text-white border-gray-600 shadow-md' 
                      : 'bg-gray-100 text-gray-900 border-gray-300 shadow-md'
                  } else {
                    className += isDark
                      ? 'hover:bg-gray-700 text-gray-300 hover:text-white border-transparent hover:border-gray-600'
                      : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900 border-transparent hover:border-gray-300'
                  }
                  return (
                    <a key={item.id} href={`#${item.id}`} className={className}>
                      <span className="text-xl">{item.icon}</span>
                      <span className="leading-tight">{item.label}</span>
                    </a>
                  )
                })}
              </nav>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="space-y-12">
              
              <Card className={isDark ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700 border-2' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 border-2'}>
                <CardContent className="pt-6">
                  <h2 className={isDark ? 'text-2xl font-bold mb-4 text-purple-300' : 'text-2xl font-bold mb-4 text-purple-700'}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 本页面定位
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { icon: '✅', title: '重实战', desc: 'Prompt技巧、工具使用、本地部署' },
                      { icon: '📝', title: '轻理论', desc: '不深入神经网络数学，了解即可' },
                      { icon: '💼', title: '助工作', desc: '聚焦数据分析场景的AI应用' }
                    ].map((item, idx) => (
                      <div key={idx} className={isDark ? 'p-4 rounded-lg bg-gray-800/50' : 'p-4 rounded-lg bg-white/80'}>
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <div className={isDark ? 'text-lg font-bold mb-1 text-gray-200' : 'text-lg font-bold mb-1 text-gray-800'}>{item.title}</div>
                        <div className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-600'}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <section id="dl-intro" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">🧠 深度学习快速入门</h2>
                    </div>
                    <p className="text-purple-50 text-lg ml-8 font-medium">5分钟了解核心概念，无需深入数学公式</p>
                  </div>
                </div>

                <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-purple-400' : 'text-xl font-bold mb-4 text-purple-600'}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 什么是深度学习？（一句话版）
                      </h3>
                      <div className={isDark ? 'p-4 rounded-lg bg-purple-900/20 border border-purple-700' : 'p-4 rounded-lg bg-purple-50 border border-purple-200'}>
                        <p className={isDark ? 'text-lg font-semibold text-purple-200' : 'text-lg font-semibold text-purple-800'}>
                          深度学习 = 多层神经网络 = 让计算机像人脑一样学习模式
                        </p>
                        <p className={isDark ? 'text-sm mt-2 text-gray-300' : 'text-sm mt-2 text-gray-700'}>
                          传统ML：手工设计特征 → 算法学习<br/>
                          深度学习：原始数据输入 → 自动提取特征 → 端到端学习
                        </p>
                      </div>
                    </div>

                    <div className={isDark ? 'p-4 rounded-lg bg-yellow-900/20 border border-yellow-700' : 'p-4 rounded-lg bg-yellow-50 border border-yellow-300'}>
                      <p className={isDark ? 'font-bold text-sm mb-2 text-yellow-300' : 'font-bold text-sm mb-2 text-yellow-800'}>
                        ⭐ 数据分析师的关键结论
                      </p>
                      <ul className={isDark ? 'text-sm space-y-1 text-gray-300' : 'text-sm space-y-1 text-gray-700'}>
                        <li>• <strong>不需要从零训练</strong>：调用API（OpenAI/Claude）或微调预训练模型</li>
                        <li>• <strong>不需要懂数学</strong>：会调库（Keras/PyTorch）即可</li>
                        <li>• <strong>重点是应用</strong>：Prompt工程、数据清洗、结果解读</li>
                        <li>• <strong>表格数据优先传统ML</strong>：XGBoost/LightGBM才是主力</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section id="llm-basics" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-pink-600 via-rose-500 to-red-600 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">🤖 大模型基础科普</h2>
                    </div>
                    <p className="text-pink-50 text-lg ml-8 font-medium">ChatGPT/Claude/文心一言 背后的原理（简化版）</p>
                  </div>
                </div>

                <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-pink-400' : 'text-xl font-bold mb-4 text-pink-600'}>
                        🌟 主流大模型速览（2024年）
                      </h3>
                      <div className="overflow-x-auto">
                        <table className={isDark ? 'w-full text-sm text-gray-300' : 'w-full text-sm text-gray-700'}>
                          <thead>
                            <tr className={isDark ? 'bg-gray-900' : 'bg-gray-100'}>
                              <th className="px-4 py-2 text-left">模型</th>
                              <th className="px-4 py-2 text-left">公司</th>
                              <th className="px-4 py-2 text-left">特点</th>
                              <th className="px-4 py-2 text-left">数据分析场景</th>
                              <th className="px-4 py-2 text-left">是否免费</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className={isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                              <td className="px-4 py-2 font-bold">ChatGPT-4</td>
                              <td className="px-4 py-2">OpenAI</td>
                              <td className="px-4 py-2">综合能力最强，代码生成好</td>
                              <td className="px-4 py-2">SQL生成、报告撰写、数据解读</td>
                              <td className="px-4 py-2">❌ 付费</td>
                            </tr>
                            <tr className={isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                              <td className="px-4 py-2 font-bold">Claude 3.5</td>
                              <td className="px-4 py-2">Anthropic</td>
                              <td className="px-4 py-2">长文本理解强，更安全</td>
                              <td className="px-4 py-2">长报告分析、数据清洗脚本</td>
                              <td className="px-4 py-2">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 限量免费</td>
                            </tr>
                            <tr className={isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                              <td className="px-4 py-2 font-bold">文心一言 4.0</td>
                              <td className="px-4 py-2">百度</td>
                              <td className="px-4 py-2">中文友好，国内合规</td>
                              <td className="px-4 py-2">中文数据处理、行业报告</td>
                              <td className="px-4 py-2"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 免费版</td>
                            </tr>
                            <tr className={isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                              <td className="px-4 py-2 font-bold">通义千问</td>
                              <td className="px-4 py-2">阿里</td>
                              <td className="px-4 py-2">电商数据专长</td>
                              <td className="px-4 py-2">电商分析、营销文案</td>
                              <td className="px-4 py-2"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 免费版</td>
                            </tr>
                            <tr className={isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                              <td className="px-4 py-2 font-bold">Llama 3</td>
                              <td className="px-4 py-2">Meta</td>
                              <td className="px-4 py-2">开源，可本地部署</td>
                              <td className="px-4 py-2">敏感数据处理、私有化</td>
                              <td className="px-4 py-2"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 开源</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className={isDark ? 'p-4 rounded-lg bg-gray-900' : 'p-4 rounded-lg bg-gray-50'}>
                      <h4 className={isDark ? 'font-bold mb-3 text-pink-400' : 'font-bold mb-3 text-pink-600'}>
                        📖 必须知道的3个概念
                      </h4>
                      <div className="space-y-3">
                        <div className={isDark ? 'p-3 rounded bg-pink-900/20' : 'p-3 rounded bg-pink-50'}>
                          <p className={isDark ? 'font-bold text-sm mb-1 text-pink-300' : 'font-bold text-sm mb-1 text-pink-700'}>
                            Token（令牌）
                          </p>
                          <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                            计费单位，约等于0.75个英文单词或1.5个中文字。GPT-4: $0.03/1K tokens（输入）
                          </p>
                        </div>
                        <div className={isDark ? 'p-3 rounded bg-indigo-900/20' : 'p-3 rounded bg-indigo-50'}>
                          <p className={isDark ? 'font-bold text-sm mb-1 text-indigo-300' : 'font-bold text-sm mb-1 text-indigo-700'}>
                            Context Window（上下文窗口）
                          </p>
                          <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                            一次对话能"记住"的最大长度。GPT-4: 128K tokens ≈ 96K字，足够一本小说
                          </p>
                        </div>
                        <div className={isDark ? 'p-3 rounded bg-purple-900/20' : 'p-3 rounded bg-purple-50'}>
                          <p className={isDark ? 'font-bold text-sm mb-1 text-purple-300' : 'font-bold text-sm mb-1 text-purple-700'}>
                            Temperature（温度参数）
                          </p>
                          <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                            控制输出随机性。0=确定性（适合代码生成），1=创造性（适合文案写作）
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section id="prompt-engineering" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">✍ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} Prompt工程实战</h2>
                    </div>
                    <p className="text-red-50 text-lg ml-8 font-medium">数据分析师必备：高效提示词技巧</p>
                  </div>
                </div>

                <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    <div className={isDark ? 'p-5 rounded-lg bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-2 border-amber-700' : 'p-5 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300'}>
                      <h3 className={isDark ? 'text-xl font-bold mb-3 text-amber-300' : 'text-xl font-bold mb-3 text-amber-700'}>
                        ⭐ Prompt 黄金公式（CRISPE）
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className={isDark ? 'p-3 rounded bg-amber-900/40' : 'p-3 rounded bg-white'}>
                          <div className={isDark ? 'text-2xl font-bold mb-1 text-amber-400' : 'text-2xl font-bold mb-1 text-amber-600'}>C</div>
                          <p className={isDark ? 'text-xs font-bold mb-1 text-gray-200' : 'text-xs font-bold mb-1 text-gray-800'}>角色</p>
                          <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>你是数据分析专家</p>
                        </div>
                        <div className={isDark ? 'p-3 rounded bg-amber-900/40' : 'p-3 rounded bg-white'}>
                          <div className={isDark ? 'text-2xl font-bold mb-1 text-amber-400' : 'text-2xl font-bold mb-1 text-amber-600'}>R</div>
                          <p className={isDark ? 'text-xs font-bold mb-1 text-gray-200' : 'text-xs font-bold mb-1 text-gray-800'}>任务</p>
                          <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>生成SQL查询</p>
                        </div>
                        <div className={isDark ? 'p-3 rounded bg-amber-900/40' : 'p-3 rounded bg-white'}>
                          <div className={isDark ? 'text-2xl font-bold mb-1 text-amber-400' : 'text-2xl font-bold mb-1 text-amber-600'}>I</div>
                          <p className={isDark ? 'text-xs font-bold mb-1 text-gray-200' : 'text-xs font-bold mb-1 text-gray-800'}>背景</p>
                          <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>电商用户留存分析</p>
                        </div>
                        <div className={isDark ? 'p-3 rounded bg-amber-900/40' : 'p-3 rounded bg-white'}>
                          <div className={isDark ? 'text-2xl font-bold mb-1 text-amber-400' : 'text-2xl font-bold mb-1 text-amber-600'}>S</div>
                          <p className={isDark ? 'text-xs font-bold mb-1 text-gray-200' : 'text-xs font-bold mb-1 text-gray-800'}>风格</p>
                          <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>简洁、结构化</p>
                        </div>
                        <div className={isDark ? 'p-3 rounded bg-amber-900/40' : 'p-3 rounded bg-white'}>
                          <div className={isDark ? 'text-2xl font-bold mb-1 text-amber-400' : 'text-2xl font-bold mb-1 text-amber-600'}>P</div>
                          <p className={isDark ? 'text-xs font-bold mb-1 text-gray-200' : 'text-xs font-bold mb-1 text-gray-800'}>示例</p>
                          <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>参考格式：...</p>
                        </div>
                        <div className={isDark ? 'p-3 rounded bg-amber-900/40' : 'p-3 rounded bg-white'}>
                          <div className={isDark ? 'text-2xl font-bold mb-1 text-amber-400' : 'text-2xl font-bold mb-1 text-amber-600'}>E</div>
                          <p className={isDark ? 'text-xs font-bold mb-1 text-gray-200' : 'text-xs font-bold mb-1 text-gray-800'}>约束</p>
                          <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>不超过200字</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-red-400' : 'text-xl font-bold mb-4 text-red-600'}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析场景Prompt模板
                      </h3>
                      <div className="space-y-4">
                        <div className={isDark ? 'p-4 rounded-lg bg-red-900/20 border border-red-700' : 'p-4 rounded-lg bg-red-50 border border-red-200'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-red-300' : 'font-bold text-sm mb-2 text-red-700'}>
                            场景：SQL生成
                          </p>
                          <div className="space-y-2">
                            <div className={isDark ? 'p-2 rounded text-xs bg-gray-900' : 'p-2 rounded text-xs bg-white'}>
                              <p className={isDark ? 'text-red-400' : 'text-red-600'}>❌ "写一个查询用户的SQL"</p>
                            </div>
                            <div className={isDark ? 'p-2 rounded text-xs bg-gray-900' : 'p-2 rounded text-xs bg-white'}>
                              <p className={isDark ? 'text-emerald-400' : 'text-emerald-700'}>
                                ✅ "你是数据分析专家。请为PostgreSQL数据库生成SQL查询：<br/>
                                目标：查询2024年Q1的活跃用户（登录大于等于3次）<br/>
                                表结构：users(user_id, username), login_logs(user_id, login_time)<br/>
                                要求：按登录次数倒序，只返回TOP 100"
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className={isDark ? 'p-4 rounded-lg bg-red-900/20 border border-red-700' : 'p-4 rounded-lg bg-red-50 border border-red-200'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-red-300' : 'font-bold text-sm mb-2 text-red-700'}>
                            场景：数据解读
                          </p>
                          <div className="space-y-2">
                            <div className={isDark ? 'p-2 rounded text-xs bg-gray-900' : 'p-2 rounded text-xs bg-white'}>
                              <p className={isDark ? 'text-red-400' : 'text-red-600'}>❌ "解释这个数据"</p>
                            </div>
                            <div className={isDark ? 'p-2 rounded text-xs bg-gray-900' : 'p-2 rounded text-xs bg-white'}>
                              <p className={isDark ? 'text-emerald-400' : 'text-emerald-700'}>
                                ✅ "你是业务分析师。请解读以下用户留存数据：<br/>
                                - 次日留存：65% → 45%（环比下降20%）<br/>
                                - 7日留存：30% → 25%<br/>
                                背景：社交APP，近期新增了短视频功能<br/>
                                请分析：1) 可能原因 2) 数据验证方向 3) 改进建议"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={isDark ? 'p-4 rounded-lg bg-orange-900/20 border border-orange-700' : 'p-4 rounded-lg bg-orange-50 border border-orange-200'}>
                      <h4 className={isDark ? 'font-bold mb-3 text-orange-300' : 'font-bold mb-3 text-orange-700'}>
                        🚀 5个进阶技巧
                      </h4>
                      <ul className={isDark ? 'text-sm space-y-2 text-gray-300' : 'text-sm space-y-2 text-gray-700'}>
                        <li>• <strong>Few-Shot学习</strong>：给2-3个示例，让模型模仿格式（提升准确率30%+）</li>
                        <li>• <strong>Chain-of-Thought</strong>：加上"请一步步思考"，复杂推理问题效果更好</li>
                        <li>• <strong>结构化输出</strong>：要求JSON格式输出，方便后续程序处理</li>
                        <li>• <strong>迭代优化</strong>：根据输出反馈，逐步改进Prompt（不要一次到位）</li>
                        <li>• <strong>负面约束</strong>：告诉它"不要XXX"，避免不想要的输出</li>
                      </ul>
                    </div>

                    <div className={isDark ? 'mt-6 p-5 rounded-lg bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-700' : 'mt-6 p-5 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300'}>
                      <h4 className={isDark ? 'font-bold mb-4 text-red-300 text-lg' : 'font-bold mb-4 text-red-700 text-lg'}>
                        💎 高级Prompt工程技巧
                      </h4>
                      
                      <div className="space-y-4">
                        <div className={isDark ? 'p-3 rounded bg-red-900/40' : 'p-3 rounded bg-white'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-red-300' : 'font-bold text-sm mb-2 text-red-700'}>
                            1. Tree of Thoughts（思维树）
                          </p>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            让AI同时探索多条推理路径，适合复杂问题求解
                          </p>
                          <div className={isDark ? 'p-2 rounded text-xs bg-black text-emerald-400' : 'p-2 rounded text-xs bg-gray-50 text-gray-800'}>
                            "请用3种不同思路分析用户流失原因，每种思路独立推导，最后综合评估哪个最合理"
                          </div>
                        </div>

                        <div className={isDark ? 'p-3 rounded bg-orange-900/40' : 'p-3 rounded bg-white'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-orange-300' : 'font-bold text-sm mb-2 text-orange-700'}>
                            2. Self-Consistency（自洽性）
                          </p>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            多次生成答案并投票，提升复杂任务准确率
                          </p>
                          <div className={isDark ? 'p-2 rounded text-xs bg-black text-emerald-400' : 'p-2 rounded text-xs bg-gray-50 text-gray-800'}>
                            "请生成5个SQL查询方案，每个方案独立思考，最后选出最优的并说明理由"
                          </div>
                        </div>

                        <div className={isDark ? 'p-3 rounded bg-amber-900/40' : 'p-3 rounded bg-white'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-amber-300' : 'font-bold text-sm mb-2 text-amber-700'}>
                            3. ReAct（推理+行动）
                          </p>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            让AI边思考边执行，适合多步骤任务
                          </p>
                          <div className={isDark ? 'p-2 rounded text-xs bg-black text-emerald-400' : 'p-2 rounded text-xs bg-gray-50 text-gray-800'}>
                            "分析这份销售数据：<br/>思考1 → 查看数据结构 → 行动1 → 计算基础统计量 → 思考2 → 识别异常值..."
                          </div>
                        </div>

                        <div className={isDark ? 'p-3 rounded bg-yellow-900/40' : 'p-3 rounded bg-white'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-yellow-300' : 'font-bold text-sm mb-2 text-yellow-700'}>
                            4. Prompt Chaining（提示词链）
                          </p>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            将大任务拆分为多个小任务，前一个输出作为下一个输入
                          </p>
                          <div className={isDark ? 'p-2 rounded text-xs bg-black text-emerald-400' : 'p-2 rounded text-xs bg-gray-50 text-gray-800'}>
                            Prompt1: 提取数据要点 → Prompt2: 分析趋势 → Prompt3: 生成建议 → Prompt4: 撰写报告
                          </div>
                        </div>

                        <div className={isDark ? 'p-3 rounded bg-red-900/40' : 'p-3 rounded bg-white'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-red-300' : 'font-bold text-sm mb-2 text-red-700'}>
                            5. Meta Prompting（元提示）
                          </p>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            让AI帮你优化Prompt本身
                          </p>
                          <div className={isDark ? 'p-2 rounded text-xs bg-black text-emerald-400' : 'p-2 rounded text-xs bg-gray-50 text-gray-800'}>
                            "我想让AI生成SQL查询，请帮我改进这个Prompt：[原始Prompt]，使其更清晰有效"
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section id="ai-agents" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-600 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">🤖 AI智能体（Agent）</h2>
                    </div>
                    <p className="text-violet-50 text-lg ml-8 font-medium">让AI自主规划、执行复杂任务的新范式</p>
                  </div>
                </div>

                <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    <div className={isDark ? 'p-5 rounded-lg bg-violet-900/30 border-2 border-violet-700' : 'p-5 rounded-lg bg-violet-50 border-2 border-violet-300'}>
                      <h3 className={isDark ? 'text-xl font-bold mb-3 text-violet-300' : 'text-xl font-bold mb-3 text-violet-700'}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 什么是AI Agent？
                      </h3>
                      <p className={isDark ? 'text-sm mb-3 text-gray-300' : 'text-sm mb-3 text-gray-700'}>
                        AI Agent（智能体）是能够<strong>自主感知环境、制定计划、调用工具、执行任务</strong>的AI系统。
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className={isDark ? 'p-3 rounded bg-violet-900/40' : 'p-3 rounded bg-white'}>
                          <p className={isDark ? 'font-bold text-xs mb-1 text-violet-300' : 'font-bold text-xs mb-1 text-violet-700'}>
                            传统LLM（如ChatGPT）
                          </p>
                          <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                            你问一次，它答一次<br/>
                            无法主动调用工具<br/>
                            需要人工分解步骤
                          </p>
                        </div>
                        <div className={isDark ? 'p-3 rounded bg-fuchsia-900/40' : 'p-3 rounded bg-white'}>
                          <p className={isDark ? 'font-bold text-xs mb-1 text-fuchsia-300' : 'font-bold text-xs mb-1 text-fuchsia-700'}>
                            AI Agent
                          </p>
                          <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                            给一个目标，自动拆解任务<br/>
                            主动调用工具（搜索/代码执行/API）<br/>
                            循环执行直到完成目标
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-purple-400' : 'text-xl font-bold mb-4 text-purple-600'}>
                        🏗 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} Agent核心架构（数据分析场景）
                      </h3>
                      <div className="space-y-3">
                        <div className={isDark ? 'p-4 rounded-lg bg-purple-900/20 border-l-4 border-purple-500' : 'p-4 rounded-lg bg-purple-50 border-l-4 border-purple-500'}>
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🧠</span>
                            <div className="flex-1">
                              <p className={isDark ? 'font-bold text-sm mb-1 text-purple-300' : 'font-bold text-sm mb-1 text-purple-700'}>
                                1. 规划层（Planning）
                              </p>
                              <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                                将"生成月度销售报告"拆解为：① 连接数据库 → ② 提取数据 → ③ 计算指标 → ④ 生成图表 → ⑤ 撰写分析
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className={isDark ? 'p-4 rounded-lg bg-fuchsia-900/20 border-l-4 border-fuchsia-500' : 'p-4 rounded-lg bg-fuchsia-50 border-l-4 border-fuchsia-500'}>
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🛠️</span>
                            <div className="flex-1">
                              <p className={isDark ? 'font-bold text-sm mb-1 text-fuchsia-300' : 'font-bold text-sm mb-1 text-fuchsia-700'}>
                                2. 工具层（Tools）
                              </p>
                              <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                                可调用的工具集：Python代码执行器、SQL查询器、网页搜索、邮件发送、文件读写、API调用
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className={isDark ? 'p-4 rounded-lg bg-pink-900/20 border-l-4 border-pink-500' : 'p-4 rounded-lg bg-pink-50 border-l-4 border-pink-500'}>
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🔄</span>
                            <div className="flex-1">
                              <p className={isDark ? 'font-bold text-sm mb-1 text-pink-300' : 'font-bold text-sm mb-1 text-pink-700'}>
                                3. 执行层（Execution）
                              </p>
                              <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                                循环：执行步骤 → 观察结果 → 判断是否完成 → 调整计划 → 继续执行
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className={isDark ? 'p-4 rounded-lg bg-violet-900/20 border-l-4 border-violet-500' : 'p-4 rounded-lg bg-violet-50 border-l-4 border-violet-500'}>
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">💾</span>
                            <div className="flex-1">
                              <p className={isDark ? 'font-bold text-sm mb-1 text-violet-300' : 'font-bold text-sm mb-1 text-violet-700'}>
                                4. 记忆层（Memory）
                              </p>
                              <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                                短期记忆：本次对话的上下文 | 长期记忆：历史任务经验、用户偏好设置
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-fuchsia-400' : 'text-xl font-bold mb-4 text-fuchsia-600'}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析Agent实战框架
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className={isDark ? 'p-4 rounded-lg bg-fuchsia-900/20 border border-fuchsia-700' : 'p-4 rounded-lg bg-fuchsia-50 border border-fuchsia-200'}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🐍</span>
                            <p className={isDark ? 'font-bold text-sm text-fuchsia-300' : 'font-bold text-sm text-fuchsia-700'}>LangChain Agent</p>
                          </div>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            <strong>最成熟的Python框架</strong>
                          </p>
                          <div className={isDark ? 'p-2 rounded text-xs bg-black text-green-400 mb-2' : 'p-2 rounded text-xs bg-white text-gray-800 mb-2'}>
{`from langchain.agents import create_sql_agent
agent = create_sql_agent(llm, db, verbose=True)
agent.run("分析Q1销售趋势")`}
                          </div>
                          <p className={isDark ? 'text-xs text-emerald-400' : 'text-xs text-emerald-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 内置SQL/Python/Search工具
                          </p>
                        </div>

                        <div className={isDark ? 'p-4 rounded-lg bg-violet-900/20 border border-violet-700' : 'p-4 rounded-lg bg-violet-50 border border-violet-200'}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🤖</span>
                            <p className={isDark ? 'font-bold text-sm text-violet-300' : 'font-bold text-sm text-violet-700'}>AutoGPT / BabyAGI</p>
                          </div>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            <strong>自主Agent先驱</strong>
                          </p>
                          <p className={isDark ? 'text-xs mb-2 text-gray-400' : 'text-xs mb-2 text-gray-600'}>
                            给定目标后完全自主工作，无需人工干预（但不稳定）
                          </p>
                          <p className={isDark ? 'text-xs text-yellow-400' : 'text-xs text-yellow-700'}>
                            ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 成本高，适合实验
                          </p>
                        </div>

                        <div className={isDark ? 'p-4 rounded-lg bg-purple-900/20 border border-purple-700' : 'p-4 rounded-lg bg-purple-50 border border-purple-200'}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{getLucideIcon('⚡', 'w-5 h-5 text-[#19bcc8]')}</span>
                            <p className={isDark ? 'font-bold text-sm text-purple-300' : 'font-bold text-sm text-purple-700'}>GPTs（OpenAI官方）</p>
                          </div>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            <strong>无代码Agent构建</strong>
                          </p>
                          <p className={isDark ? 'text-xs mb-2 text-gray-400' : 'text-xs mb-2 text-gray-600'}>
                            可视化配置工具、知识库、指令，适合非技术人员
                          </p>
                          <p className={isDark ? 'text-xs text-emerald-400' : 'text-xs text-emerald-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 最简单，5分钟搭建
                          </p>
                        </div>

                        <div className={isDark ? 'p-4 rounded-lg bg-pink-900/20 border border-pink-700' : 'p-4 rounded-lg bg-pink-50 border border-pink-200'}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🔧</span>
                            <p className={isDark ? 'font-bold text-sm text-pink-300' : 'font-bold text-sm text-pink-700'}>Dify / Coze（国内）</p>
                          </div>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            <strong>国产低代码Agent平台</strong>
                          </p>
                          <p className={isDark ? 'text-xs mb-2 text-gray-400' : 'text-xs mb-2 text-gray-600'}>
                            拖拽式构建工作流，支持钉钉/飞书集成
                          </p>
                          <p className={isDark ? 'text-xs text-emerald-400' : 'text-xs text-emerald-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 中文友好，免费版可用
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={isDark ? 'p-5 rounded-lg bg-gradient-to-r from-violet-900/30 to-fuchsia-900/30 border-2 border-violet-700' : 'p-5 rounded-lg bg-gradient-to-r from-violet-50 to-fuchsia-50 border-2 border-violet-300'}>
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-violet-300' : 'text-xl font-bold mb-4 text-violet-700'}>
                        💼 数据分析Agent实战案例
                      </h3>
                      <div className="space-y-3">
                        <div className={isDark ? 'p-3 rounded bg-violet-900/40' : 'p-3 rounded bg-white'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-violet-300' : 'font-bold text-sm mb-2 text-violet-700'}>
                            案例1：自动化日报Agent
                          </p>
                          <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                            <strong>目标：</strong>每天8点自动生成前一日数据报告并发送邮件<br/>
                            <strong>流程：</strong>① 查询数据库 → ② 计算KPI → ③ 生成图表 → ④ 撰写摘要 → ⑤ 发送邮件<br/>
                            <strong>工具：</strong>LangChain + SQL + Pandas + Plotly + SMTP
                          </p>
                        </div>

                        <div className={isDark ? 'p-3 rounded bg-fuchsia-900/40' : 'p-3 rounded bg-white'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-fuchsia-300' : 'font-bold text-sm mb-2 text-fuchsia-700'}>
                            案例2：智能问答Agent
                          </p>
                          <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                            <strong>目标：</strong>业务方用自然语言提问，Agent自动生成SQL并返回结果<br/>
                            <strong>示例：</strong>"上周哪个城市的用户增长最快？" → Agent自动查询并可视化<br/>
                            <strong>工具：</strong>LangChain SQL Agent + ECharts
                          </p>
                        </div>

                        <div className={isDark ? 'p-3 rounded bg-purple-900/40' : 'p-3 rounded bg-white'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-purple-300' : 'font-bold text-sm mb-2 text-purple-700'}>
                            案例3：数据清洗Agent
                          </p>
                          <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                            <strong>目标：</strong>上传脏数据CSV，Agent自动识别问题并清洗<br/>
                            <strong>能力：</strong>自动检测缺失值、异常值、格式错误，给出清洗方案并执行<br/>
                            <strong>工具：</strong>Code Interpreter + Pandas
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={isDark ? 'p-4 rounded-lg bg-yellow-900/20 border border-yellow-700' : 'p-4 rounded-lg bg-yellow-50 border border-yellow-300'}>
                      <h4 className={isDark ? 'font-bold mb-3 text-yellow-300' : 'font-bold mb-3 text-yellow-800'}>
                        ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} Agent使用注意事项
                      </h4>
                      <ul className={isDark ? 'text-sm space-y-2 text-gray-300' : 'text-sm space-y-2 text-gray-700'}>
                        <li>• <strong>成本控制</strong>：Agent会循环调用LLM，Token消耗比普通对话高5-10倍</li>
                        <li>• <strong>可靠性</strong>：当前Agent技术不够成熟，关键任务需人工Review</li>
                        <li>• <strong>权限管理</strong>：限制Agent的数据库写入权限，避免误操作</li>
                        <li>• <strong>人在回路</strong>：重要决策应设置人工确认环节（Human-in-the-Loop）</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section id="ai-tools" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-orange-600 via-yellow-500 to-amber-500 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">🛠 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} AI工具与应用</h2>
                    </div>
                    <p className="text-orange-50 text-lg ml-8 font-medium">数据分析师常用的AI工具清单</p>
                  </div>
                </div>

                <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-orange-400' : 'text-xl font-bold mb-4 text-orange-600'}>
                        💻 代码助手类
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className={isDark ? 'p-4 rounded-lg bg-orange-900/20 border border-orange-700' : 'p-4 rounded-lg bg-orange-50 border border-orange-200'}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🤖</span>
                            <p className={isDark ? 'font-bold text-sm text-orange-300' : 'font-bold text-sm text-orange-700'}>Cursor / GitHub Copilot</p>
                          </div>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            <strong>功能：</strong>代码自动补全、生成函数、注释解释
                          </p>
                          <p className={isDark ? 'text-xs mb-2 text-gray-400' : 'text-xs mb-2 text-gray-600'}>
                            <strong>场景：</strong>写Python数据清洗脚本、SQL查询、Pandas操作
                          </p>
                          <p className={isDark ? 'text-xs text-emerald-400' : 'text-xs text-emerald-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 提升编码效率50%+
                          </p>
                        </div>

                        <div className={isDark ? 'p-4 rounded-lg bg-orange-900/20 border border-orange-700' : 'p-4 rounded-lg bg-orange-50 border border-orange-200'}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">💬</span>
                            <p className={isDark ? 'font-bold text-sm text-orange-300' : 'font-bold text-sm text-orange-700'}>ChatGPT Code Interpreter</p>
                          </div>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            <strong>功能：</strong>上传CSV分析、自动生成图表、数据清洗
                          </p>
                          <p className={isDark ? 'text-xs mb-2 text-gray-400' : 'text-xs mb-2 text-gray-600'}>
                            <strong>场景：</strong>快速探索数据、生成可视化、统计分析
                          </p>
                          <p className={isDark ? 'text-xs text-emerald-400' : 'text-xs text-emerald-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 无需写代码即可分析
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-yellow-400' : 'text-xl font-bold mb-4 text-yellow-600'}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 文档处理类
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className={isDark ? 'p-4 rounded-lg bg-yellow-900/20 border border-yellow-700' : 'p-4 rounded-lg bg-yellow-50 border border-yellow-200'}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">📋</span>
                            <p className={isDark ? 'font-bold text-sm text-yellow-300' : 'font-bold text-sm text-yellow-700'}>ChatPDF / NotebookLM</p>
                          </div>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            <strong>功能：</strong>上传PDF提取关键信息、总结长文档
                          </p>
                          <p className={isDark ? 'text-xs mb-2 text-gray-400' : 'text-xs mb-2 text-gray-600'}>
                            <strong>场景：</strong>分析行业报告、提取数据表格、总结竞品分析
                          </p>
                          <p className={isDark ? 'text-xs text-emerald-400' : 'text-xs text-emerald-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 快速消化长文档
                          </p>
                        </div>

                        <div className={isDark ? 'p-4 rounded-lg bg-yellow-900/20 border border-yellow-700' : 'p-4 rounded-lg bg-yellow-50 border border-yellow-200'}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">✍️</span>
                            <p className={isDark ? 'font-bold text-sm text-yellow-300' : 'font-bold text-sm text-yellow-700'}>Notion AI / Craft</p>
                          </div>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            <strong>功能：</strong>自动撰写报告、总结会议纪要
                          </p>
                          <p className={isDark ? 'text-xs mb-2 text-gray-400' : 'text-xs mb-2 text-gray-600'}>
                            <strong>场景：</strong>数据分析周报、项目总结、邮件撰写
                          </p>
                          <p className={isDark ? 'text-xs text-emerald-400' : 'text-xs text-emerald-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 文档写作效率翻倍
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-amber-400' : 'text-xl font-bold mb-4 text-amber-600'}>
                        🎨 创意辅助类
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className={isDark ? 'p-4 rounded-lg bg-amber-900/20 border border-amber-700' : 'p-4 rounded-lg bg-amber-50 border border-amber-200'}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🖼️</span>
                            <p className={isDark ? 'font-bold text-sm text-amber-300' : 'font-bold text-sm text-amber-700'}>Midjourney / DALL-E</p>
                          </div>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            <strong>功能：</strong>文字生成图像、设计配图
                          </p>
                          <p className={isDark ? 'text-xs mb-2 text-gray-400' : 'text-xs mb-2 text-gray-600'}>
                            <strong>场景：</strong>PPT封面、数据报告配图、信息图设计
                          </p>
                          <p className={isDark ? 'text-xs text-emerald-400' : 'text-xs text-emerald-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 无需设计技能
                          </p>
                        </div>

                        <div className={isDark ? 'p-4 rounded-lg bg-amber-900/20 border border-amber-700' : 'p-4 rounded-lg bg-amber-50 border border-amber-200'}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🎬</span>
                            <p className={isDark ? 'font-bold text-sm text-amber-300' : 'font-bold text-sm text-amber-700'}>Runway / Pictory</p>
                          </div>
                          <p className={isDark ? 'text-xs mb-2 text-gray-300' : 'text-xs mb-2 text-gray-700'}>
                            <strong>功能：</strong>文字转视频、自动剪辑
                          </p>
                          <p className={isDark ? 'text-xs mb-2 text-gray-400' : 'text-xs mb-2 text-gray-600'}>
                            <strong>场景：</strong>数据分析讲解视频、培训教程制作
                          </p>
                          <p className={isDark ? 'text-xs text-emerald-400' : 'text-xs text-emerald-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 快速制作演示视频
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={isDark ? 'p-4 rounded-lg bg-gray-900' : 'p-4 rounded-lg bg-gray-50'}>
                      <h4 className={isDark ? 'font-bold mb-3 text-orange-400' : 'font-bold mb-3 text-orange-600'}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析师使用AI工具的3大原则
                      </h4>
                      <ul className={isDark ? 'text-sm space-y-2 text-gray-300' : 'text-sm space-y-2 text-gray-700'}>
                        <li>• <strong>工具是助手不是替代</strong>：AI生成的代码需要人工Review，确保逻辑正确</li>
                        <li>• <strong>敏感数据不上传</strong>：涉及用户隐私、商业机密的数据不要上传公开AI平台</li>
                        <li>• <strong>结果需验证</strong>：AI可能产生幻觉（编造数据），关键结论必须验证</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section id="ai-landscape" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} AI发展全景图（2024）</h2>
                    </div>
                    <p className="text-cyan-50 text-lg ml-8 font-medium">六大AI领域 × 主流工具 × 实战应用指南</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">📝</span>
                        <h3 className={isDark ? 'text-xl font-bold text-cyan-400' : 'text-xl font-bold text-cyan-600'}>
                          1. 文本生成AI（LLM大语言模型）
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-cyan-900/20' : 'p-4 rounded-lg bg-cyan-50'}>
                        <p className={isDark ? 'text-sm mb-3 font-bold text-cyan-300' : 'text-sm mb-3 font-bold text-cyan-700'}>
                          🔥 发展现状（2024）
                        </p>
                        <p className={isDark ? 'text-xs mb-4 text-gray-300' : 'text-xs mb-4 text-gray-700'}>
                          • GPT-4/Claude 3.5已达到"专家级"水平，通过率超过人类平均水平<br/>
                          • 上下文窗口突破100万Token（Gemini 1.5 Pro），可处理整本书籍<br/>
                          • 开源模型（Llama 3.1/Qwen2.5）性能逼近商业模型<br/>
                          • 多模态融合成为标配（文本+图像+代码）
                        </p>
                        
                        <p className={isDark ? 'text-sm mb-3 font-bold text-cyan-300' : 'text-sm mb-3 font-bold text-cyan-700'}>
                          🛠 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 主流工具详解
                        </p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className={isDark ? 'p-3 rounded bg-cyan-900/40 border border-cyan-700' : 'p-3 rounded bg-white border border-cyan-200'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-cyan-300' : 'font-bold text-xs mb-1 text-cyan-700'}>
                              ChatGPT-4o（OpenAI）
                            </p>
                            <p className={isDark ? 'text-xs mb-1 text-gray-400' : 'text-xs mb-1 text-gray-600'}>
                              <strong>能力：</strong>128K上下文，实时语音对话，图像理解<br/>
                              <strong>价格：</strong>$20/月（Plus会员）<br/>
                              <strong>适用：</strong>代码生成、报告撰写、复杂推理
                            </p>
                          </div>
                          
                          <div className={isDark ? 'p-3 rounded bg-sky-900/40 border border-sky-700' : 'p-3 rounded bg-white border border-sky-200'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-sky-300' : 'font-bold text-xs mb-1 text-sky-700'}>
                              Claude 3.5 Sonnet（Anthropic）
                            </p>
                            <p className={isDark ? 'text-xs mb-1 text-gray-400' : 'text-xs mb-1 text-gray-600'}>
                              <strong>能力：</strong>200K上下文，长文本分析，代码能力强<br/>
                              <strong>价格：</strong>免费版有限量，Pro $20/月<br/>
                              <strong>适用：</strong>学术论文分析、长代码审查
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-blue-900/40 border border-blue-700' : 'p-3 rounded bg-white border border-blue-200'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-blue-300' : 'font-bold text-xs mb-1 text-blue-700'}>
                              文心一言4.0（百度）
                            </p>
                            <p className={isDark ? 'text-xs mb-1 text-gray-400' : 'text-xs mb-1 text-gray-600'}>
                              <strong>能力：</strong>中文优化，联网搜索，生成式BI<br/>
                              <strong>价格：</strong>免费版 + 付费增强版<br/>
                              <strong>适用：</strong>中文报告、行业分析、营销文案
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-indigo-900/40 border border-indigo-700' : 'p-3 rounded bg-white border border-indigo-200'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-indigo-300' : 'font-bold text-xs mb-1 text-indigo-700'}>
                              DeepSeek V3（深度求索）
                            </p>
                            <p className={isDark ? 'text-xs mb-1 text-gray-400' : 'text-xs mb-1 text-gray-600'}>
                              <strong>能力：</strong>开源，数学/代码能力强，成本极低<br/>
                              <strong>价格：</strong>API $0.14/M tokens（超便宜）<br/>
                              <strong>适用：</strong>数据分析、科学计算、批量任务
                            </p>
                          </div>
                        </div>

                        <div className={isDark ? 'mt-4 p-3 rounded bg-emerald-900/30 border border-emerald-700' : 'mt-4 p-3 rounded bg-emerald-50 border border-emerald-200'}>
                          <p className={isDark ? 'text-xs font-bold mb-1 text-emerald-300' : 'text-xs font-bold mb-1 text-emerald-700'}>
                            � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析场景推荐
                          </p>
                          <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                            <strong>SQL生成：</strong>GPT-4o / Claude 3.5<br/>
                            <strong>中文报告：</strong>文心一言 / 通义千问<br/>
                            <strong>大批量任务：</strong>DeepSeek / Llama 3.1（本地部署）
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🎨</span>
                        <h3 className={isDark ? 'text-xl font-bold text-sky-400' : 'text-xl font-bold text-sky-600'}>
                          2. 图像生成AI
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-sky-900/20' : 'p-4 rounded-lg bg-sky-50'}>
                        <p className={isDark ? 'text-sm mb-3 font-bold text-sky-300' : 'text-sm mb-3 font-bold text-sky-700'}>
                          🔥 发展现状
                        </p>
                        <p className={isDark ? 'text-xs mb-4 text-gray-300' : 'text-xs mb-4 text-gray-700'}>
                          • 从Stable Diffusion到Midjourney v6，图像质量接近专业摄影<br/>
                          • 可控性大幅提升（ControlNet/IP-Adapter），精准控制构图/风格<br/>
                          • 生成速度加快10倍（SDXL Turbo 1秒出图）<br/>
                          • 中国AI图像工具崛起（通义万相、文心一格、Kolors）
                        </p>

                        <div className="grid md:grid-cols-2 gap-3">
                          <div className={isDark ? 'p-3 rounded bg-sky-900/40 border border-sky-700' : 'p-3 rounded bg-white border border-sky-200'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-sky-300' : 'font-bold text-xs mb-1 text-sky-700'}>
                              Midjourney v6
                            </p>
                            <p className={isDark ? 'text-xs mb-1 text-gray-400' : 'text-xs mb-1 text-gray-600'}>
                              <strong>特点：</strong>最强艺术性，美学天花板<br/>
                              <strong>价格：</strong>$10-60/月（不同套餐）<br/>
                              <strong>适用：</strong>PPT封面、海报设计、概念图
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-blue-900/40 border border-blue-700' : 'p-3 rounded bg-white border border-blue-200'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-blue-300' : 'font-bold text-xs mb-1 text-blue-700'}>
                              DALL-E 3（OpenAI）
                            </p>
                            <p className={isDark ? 'text-xs mb-1 text-gray-400' : 'text-xs mb-1 text-gray-600'}>
                              <strong>特点：</strong>文字理解强，生成准确<br/>
                              <strong>价格：</strong>集成在ChatGPT Plus<br/>
                              <strong>适用：</strong>信息图、教学配图、数据可视化辅助
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-indigo-900/40 border border-indigo-700' : 'p-3 rounded bg-white border border-indigo-200'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-indigo-300' : 'font-bold text-xs mb-1 text-indigo-700'}>
                              Stable Diffusion（开源）
                            </p>
                            <p className={isDark ? 'text-xs mb-1 text-gray-400' : 'text-xs mb-1 text-gray-600'}>
                              <strong>特点：</strong>完全免费，可本地部署，定制性强<br/>
                              <strong>价格：</strong>免费（需自己部署）<br/>
                              <strong>适用：</strong>批量生成、风格定制、二次开发
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-cyan-900/40 border border-cyan-700' : 'p-3 rounded bg-white border border-cyan-200'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-cyan-300' : 'font-bold text-xs mb-1 text-cyan-700'}>
                              通义万相（阿里）
                            </p>
                            <p className={isDark ? 'text-xs mb-1 text-gray-400' : 'text-xs mb-1 text-gray-600'}>
                              <strong>特点：</strong>中文优化，电商场景强<br/>
                              <strong>价格：</strong>免费版 + 付费增强<br/>
                              <strong>适用：</strong>产品主图、营销素材、中文场景
                            </p>
                          </div>
                        </div>

                        <div className={isDark ? 'mt-4 p-3 rounded bg-emerald-900/30 border border-emerald-700' : 'mt-4 p-3 rounded bg-emerald-50 border border-emerald-200'}>
                          <p className={isDark ? 'text-xs font-bold mb-1 text-emerald-300' : 'text-xs font-bold mb-1 text-emerald-700'}>
                            � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析场景应用
                          </p>
                          <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                            <strong>报告配图：</strong>DALL-E 3快速生成专业配图<br/>
                            <strong>演示PPT：</strong>Midjourney制作高质量封面<br/>
                            <strong>信息图：</strong>用Canva + AI图像生成组合工具
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🎬</span>
                        <h3 className={isDark ? 'text-xl font-bold text-blue-400' : 'text-xl font-bold text-blue-600'}>
                          3. 视频生成AI
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-blue-900/20' : 'p-4 rounded-lg bg-blue-50'}>
                        <p className={isDark ? 'text-sm mb-3 font-bold text-blue-300' : 'text-sm mb-3 font-bold text-blue-700'}>
                          🔥 发展现状（重大突破）
                        </p>
                        <p className={isDark ? 'text-xs mb-4 text-gray-300' : 'text-xs mb-4 text-gray-700'}>
                          • Sora（OpenAI）引领革命：60秒连贯视频，物理规律准确<br/>
                          • 可灵（快手）国内首发，质量媲美Sora<br/>
                          • 从文生视频到图生视频，再到视频编辑AI<br/>
                          • 虚拟数字人技术成熟（HeyGen/D-ID）
                        </p>

                        <div className="space-y-3">
                          <div className={isDark ? 'p-3 rounded bg-blue-900/40 border-l-4 border-blue-500' : 'p-3 rounded bg-white border-l-4 border-blue-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-blue-300' : 'font-bold text-xs mb-1 text-blue-700'}>
                              Sora（OpenAI）- 未完全开放
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              <strong>能力：</strong>最长60秒，多机位，复杂运镜<br/>
                              <strong>状态：</strong>限量测试中<br/>
                              <strong>革命性：</strong>真正理解物理世界的AI
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-indigo-900/40 border-l-4 border-indigo-500' : 'p-3 rounded bg-white border-l-4 border-indigo-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-indigo-300' : 'font-bold text-xs mb-1 text-indigo-700'}>
                              可灵（快手）- 已开放
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              <strong>能力：</strong>2分钟视频，中文理解强<br/>
                              <strong>价格：</strong>免费额度 + 付费套餐<br/>
                              <strong>优势：</strong>国内可用，生成速度快
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-sky-900/40 border-l-4 border-sky-500' : 'p-3 rounded bg-white border-l-4 border-sky-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-sky-300' : 'font-bold text-xs mb-1 text-sky-700'}>
                              Runway Gen-3
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              <strong>能力：</strong>专业级视频编辑AI，运镜控制<br/>
                              <strong>价格：</strong>$12-76/月<br/>
                              <strong>适用：</strong>视频后期、特效生成
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-cyan-900/40 border-l-4 border-cyan-500' : 'p-3 rounded bg-white border-l-4 border-cyan-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-cyan-300' : 'font-bold text-xs mb-1 text-cyan-700'}>
                              HeyGen（数字人）
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              <strong>能力：</strong>真人克隆，多语言配音，口型同步<br/>
                              <strong>价格：</strong>$24-120/月<br/>
                              <strong>适用：</strong>培训视频、产品讲解、多语言版本
                            </p>
                          </div>
                        </div>

                        <div className={isDark ? 'mt-4 p-3 rounded bg-emerald-900/30 border border-emerald-700' : 'mt-4 p-3 rounded bg-emerald-50 border border-emerald-200'}>
                          <p className={isDark ? 'text-xs font-bold mb-1 text-emerald-300' : 'text-xs font-bold mb-1 text-emerald-700'}>
                            � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析场景应用
                          </p>
                          <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                            <strong>培训教程：</strong>HeyGen制作数字人讲解视频<br/>
                            <strong>数据故事：</strong>将数据分析结果转为短视频<br/>
                            <strong>汇报演示：</strong>自动生成可视化动画演示
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🎵</span>
                        <h3 className={isDark ? 'text-xl font-bold text-indigo-400' : 'text-xl font-bold text-indigo-600'}>
                          4. 音频生成AI
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-indigo-900/20' : 'p-4 rounded-lg bg-indigo-50'}>
                        <p className={isDark ? 'text-sm mb-3 font-bold text-indigo-300' : 'text-sm mb-3 font-bold text-indigo-700'}>
                          🔥 发展现状
                        </p>
                        <p className={isDark ? 'text-xs mb-4 text-gray-300' : 'text-xs mb-4 text-gray-700'}>
                          • 语音合成已达到真人水平（ElevenLabs/Azure TTS）<br/>
                          • 音乐生成AI（Suno/Udio）从零创作完整歌曲<br/>
                          • 语音克隆仅需3秒样本<br/>
                          • 实时语音翻译突破（同声传译级别）
                        </p>

                        <div className="space-y-3">
                          <div className={isDark ? 'p-3 rounded bg-indigo-900/40 border-l-4 border-indigo-500' : 'p-3 rounded bg-white border-l-4 border-indigo-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-indigo-300' : 'font-bold text-xs mb-1 text-indigo-700'}>
                              ElevenLabs
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              <strong>能力：</strong>29种语言，情感控制，声音克隆<br/>
                              <strong>价格：</strong>$5-330/月（按字符数计费）<br/>
                              <strong>适用：</strong>有声书、视频配音、多语言内容
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-purple-900/40 border-l-4 border-purple-500' : 'p-3 rounded bg-white border-l-4 border-purple-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-purple-300' : 'font-bold text-xs mb-1 text-purple-700'}>
                              Suno / Udio
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              <strong>能力：</strong>文字描述生成完整歌曲（含歌词、旋律、编曲）<br/>
                              <strong>价格：</strong>$8-30/月<br/>
                              <strong>适用：</strong>背景音乐、品牌主题曲、创意音频
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-violet-900/40 border-l-4 border-violet-500' : 'p-3 rounded bg-white border-l-4 border-violet-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-violet-300' : 'font-bold text-xs mb-1 text-violet-700'}>
                              Azure Speech / Google TTS
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              <strong>能力：</strong>企业级语音合成，支持数百种语言<br/>
                              <strong>价格：</strong>按字符计费，$4/百万字符<br/>
                              <strong>适用：</strong>大规模语音生成、系统集成
                            </p>
                          </div>
                        </div>

                        <div className={isDark ? 'mt-4 p-3 rounded bg-emerald-900/30 border border-emerald-700' : 'mt-4 p-3 rounded bg-emerald-50 border border-emerald-200'}>
                          <p className={isDark ? 'text-xs font-bold mb-1 text-emerald-300' : 'text-xs font-bold mb-1 text-emerald-700'}>
                            � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析场景应用
                          </p>
                          <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                            <strong>播客制作：</strong>将数据报告转为音频播客<br/>
                            <strong>培训课程：</strong>自动生成讲解配音<br/>
                            <strong>多语言版本：</strong>一键生成多国语言讲解
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🌈</span>
                        <h3 className={isDark ? 'text-xl font-bold text-purple-400' : 'text-xl font-bold text-purple-600'}>
                          5. 多模态AI（文本+图像+语音融合）
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-purple-900/20' : 'p-4 rounded-lg bg-purple-50'}>
                        <p className={isDark ? 'text-sm mb-3 font-bold text-purple-300' : 'text-sm mb-3 font-bold text-purple-700'}>
                          🔥 发展现状（AI的下一个前沿）
                        </p>
                        <p className={isDark ? 'text-xs mb-4 text-gray-300' : 'text-xs mb-4 text-gray-700'}>
                          • GPT-4V/Gemini可直接理解图表、截图、文档<br/>
                          • 实时语音对话（GPT-4o Voice Mode）<br/>
                          • 视频理解AI（Gemini 1.5可分析1小时视频）<br/>
                          • 任意模态互转（文→图→视频→音频）
                        </p>

                        <div className="space-y-3">
                          <div className={isDark ? 'p-3 rounded bg-purple-900/40 border-l-4 border-purple-500' : 'p-3 rounded bg-white border-l-4 border-purple-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-purple-300' : 'font-bold text-xs mb-1 text-purple-700'}>
                              GPT-4o（OpenAI）
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              <strong>能力：</strong>文本+图像理解，实时语音对话<br/>
                              <strong>革命性：</strong>上传Excel截图直接分析数据<br/>
                              <strong>适用：</strong>快速解读图表、审查报告、PPT分析
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-fuchsia-900/40 border-l-4 border-fuchsia-500' : 'p-3 rounded bg-white border-l-4 border-fuchsia-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-fuchsia-300' : 'font-bold text-xs mb-1 text-fuchsia-700'}>
                              Gemini 1.5 Pro（Google）
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              <strong>能力：</strong>100万Token上下文，视频理解<br/>
                              <strong>突破：</strong>上传1小时视频，AI自动总结要点<br/>
                              <strong>适用：</strong>会议记录、视频分析、长文档处理
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-pink-900/40 border-l-4 border-pink-500' : 'p-3 rounded bg-white border-l-4 border-pink-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-pink-300' : 'font-bold text-xs mb-1 text-pink-700'}>
                              Claude 3.5（Anthropic）
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              <strong>能力：</strong>图像+代码理解，截图生成网页<br/>
                              <strong>特色：</strong>上传UI截图，自动生成React代码<br/>
                              <strong>适用：</strong>原型开发、设计稿转代码
                            </p>
                          </div>
                        </div>

                        <div className={isDark ? 'mt-4 p-3 rounded bg-emerald-900/30 border border-emerald-700' : 'mt-4 p-3 rounded bg-emerald-50 border border-emerald-200'}>
                          <p className={isDark ? 'text-xs font-bold mb-1 text-emerald-300' : 'text-xs font-bold mb-1 text-emerald-700'}>
                            � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析场景应用（重点！）
                          </p>
                          <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                            <strong>截图问答：</strong>上传数据图表截图，AI直接解读趋势<br/>
                            <strong>Excel分析：</strong>截图Excel表格，AI自动计算公式<br/>
                            <strong>报告审查：</strong>上传PDF报告，AI提取核心数据<br/>
                            <strong>会议总结：</strong>录制会议视频，AI自动生成纪要
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🌍</span>
                        <h3 className={isDark ? 'text-xl font-bold text-teal-400' : 'text-xl font-bold text-teal-600'}>
                          6. 空间AI（3D/AR/VR）
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-teal-900/20' : 'p-4 rounded-lg bg-teal-50'}>
                        <p className={isDark ? 'text-sm mb-3 font-bold text-teal-300' : 'text-sm mb-3 font-bold text-teal-700'}>
                          🔥 发展现状（前沿领域）
                        </p>
                        <p className={isDark ? 'text-xs mb-4 text-gray-300' : 'text-xs mb-4 text-gray-700'}>
                          • 文字生成3D模型（Luma AI/Meshy）<br/>
                          • NeRF技术：照片重建3D场景<br/>
                          • Apple Vision Pro引领空间计算<br/>
                          • Gaussian Splatting加速3D渲染
                        </p>

                        <div className="space-y-3">
                          <div className={isDark ? 'p-3 rounded bg-teal-900/40 border-l-4 border-teal-500' : 'p-3 rounded bg-white border-l-4 border-teal-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-teal-300' : 'font-bold text-xs mb-1 text-teal-700'}>
                              Luma AI / Meshy
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              <strong>能力：</strong>文字描述生成3D模型<br/>
                              <strong>价格：</strong>免费试用 + $20-100/月<br/>
                              <strong>适用：</strong>产品原型、虚拟展示、游戏资产
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-cyan-900/40 border-l-4 border-cyan-500' : 'p-3 rounded bg-white border-l-4 border-cyan-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-cyan-300' : 'font-bold text-xs mb-1 text-cyan-700'}>
                              Polycam / Scaniverse
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              <strong>能力：</strong>手机拍照即可重建3D模型<br/>
                              <strong>价格：</strong>免费版可用<br/>
                              <strong>适用：</strong>现场扫描、空间记录、虚拟参观
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-sky-900/40 border-l-4 border-sky-500' : 'p-3 rounded bg-white border-l-4 border-sky-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-sky-300' : 'font-bold text-xs mb-1 text-sky-700'}>
                              Spline AI（3D设计）
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              <strong>能力：</strong>文字生成交互式3D场景<br/>
                              <strong>价格：</strong>免费 + Pro版<br/>
                              <strong>适用：</strong>网页3D动画、产品展示页
                            </p>
                          </div>
                        </div>

                        <div className={isDark ? 'mt-4 p-3 rounded bg-yellow-900/30 border border-yellow-700' : 'mt-4 p-3 rounded bg-yellow-50 border border-yellow-300'}>
                          <p className={isDark ? 'text-xs font-bold mb-1 text-yellow-300' : 'text-xs font-bold mb-1 text-yellow-800'}>
                            ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析场景应用（较少）
                          </p>
                          <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                            <strong>3D数据可视化：</strong>空间化展示多维数据（较前沿）<br/>
                            <strong>虚拟展厅：</strong>将数据报告做成沉浸式体验<br/>
                            <strong>注意：</strong>目前数据分析领域应用较少，更多用于产品/建筑/游戏
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-700' : 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-300'}>
                    <CardContent className="pt-6">
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-cyan-300' : 'text-xl font-bold mb-4 text-cyan-700'}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析师AI工具优先级
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className={isDark ? 'text-sm font-bold mb-2 text-emerald-300' : 'text-sm font-bold mb-2 text-emerald-700'}>
                            🔥 必学（优先级高）
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-300' : 'text-xs space-y-1 text-gray-700'}>
                            <li>• ChatGPT-4o / Claude 3.5</li>
                            <li>• Code Interpreter</li>
                            <li>• Prompt工程技巧</li>
                            <li>• AI Agent（LangChain）</li>
                          </ul>
                        </div>
                        <div>
                          <p className={isDark ? 'text-sm font-bold mb-2 text-yellow-300' : 'text-sm font-bold mb-2 text-yellow-700'}>
                            📌 推荐（提升效率）
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-300' : 'text-xs space-y-1 text-gray-700'}>
                            <li>• DALL-E 3（报告配图）</li>
                            <li>• HeyGen（视频制作）</li>
                            <li>• 多模态AI（图表分析）</li>
                            <li>• 本地部署（敏感数据）</li>
                          </ul>
                        </div>
                        <div>
                          <p className={isDark ? 'text-sm font-bold mb-2 text-gray-400' : 'text-sm font-bold mb-2 text-gray-600'}>
                            📖 了解即可（较少用）
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-400' : 'text-xs space-y-1 text-gray-600'}>
                            <li>• 音乐生成AI</li>
                            <li>• 3D生成AI</li>
                            <li>• 视频生成AI（创意向）</li>
                            <li>• AR/VR空间计算</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section id="local-deployment" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">💻 本地化部署指南</h2>
                    </div>
                    <p className="text-blue-50 text-lg ml-8 font-medium">敏感数据不外传，本地运行开源大模型</p>
                  </div>
                </div>

                <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    <div className={isDark ? 'p-4 rounded-lg bg-blue-900/20 border-2 border-blue-700' : 'p-4 rounded-lg bg-blue-50 border-2 border-blue-300'}>
                      <h3 className={isDark ? 'text-xl font-bold mb-3 text-blue-300' : 'text-xl font-bold mb-3 text-blue-700'}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 为什么要本地部署？
                      </h3>
                      <ul className={isDark ? 'text-sm space-y-2 text-gray-300' : 'text-sm space-y-2 text-gray-700'}>
                        <li>• <strong>数据安全</strong>：处理敏感用户数据、财务数据、商业机密时不能上传公开平台</li>
                        <li>• <strong>成本控制</strong>：频繁调用API费用高，本地部署一次性投入</li>
                        <li>• <strong>离线可用</strong>：不依赖网络，内网环境也能用</li>
                        <li>• <strong>定制化</strong>：可微调模型，针对特定业务场景优化</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-indigo-400' : 'text-xl font-bold mb-4 text-indigo-600'}>
                        🖥 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 硬件需求参考
                      </h3>
                      <div className="overflow-x-auto">
                        <table className={isDark ? 'w-full text-sm text-gray-300' : 'w-full text-sm text-gray-700'}>
                          <thead>
                            <tr className={isDark ? 'bg-gray-900' : 'bg-gray-100'}>
                              <th className="px-4 py-2 text-left">模型规模</th>
                              <th className="px-4 py-2 text-left">显存需求</th>
                              <th className="px-4 py-2 text-left">推荐配置</th>
                              <th className="px-4 py-2 text-left">适用场景</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className={isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                              <td className="px-4 py-2 font-bold">7B参数</td>
                              <td className="px-4 py-2">8GB+</td>
                              <td className="px-4 py-2">RTX 3060 / M1 Mac</td>
                              <td className="px-4 py-2">文本分析、简单问答</td>
                            </tr>
                            <tr className={isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                              <td className="px-4 py-2 font-bold">13B参数</td>
                              <td className="px-4 py-2">16GB+</td>
                              <td className="px-4 py-2">RTX 4070 / M2 Pro</td>
                              <td className="px-4 py-2">代码生成、数据分析</td>
                            </tr>
                            <tr className={isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                              <td className="px-4 py-2 font-bold">70B参数</td>
                              <td className="px-4 py-2">40GB+</td>
                              <td className="px-4 py-2">RTX 4090 / A100</td>
                              <td className="px-4 py-2">复杂推理、企业级应用</td>
                            </tr>
                            <tr className={isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                              <td className="px-4 py-2 font-bold">CPU模式</td>
                              <td className="px-4 py-2">无需GPU</td>
                              <td className="px-4 py-2">16GB+ 内存</td>
                              <td className="px-4 py-2">速度慢但可用</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-purple-400' : 'text-xl font-bold mb-4 text-purple-600'}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Ollama 一键部署（推荐）
                      </h3>
                      <div className={isDark ? 'p-4 rounded-lg bg-purple-900/20 border border-purple-700' : 'p-4 rounded-lg bg-purple-50 border border-purple-200'}>
                        <p className={isDark ? 'text-sm mb-3 text-gray-300' : 'text-sm mb-3 text-gray-700'}>
                          <strong>Ollama</strong> 是最简单的本地大模型部署工具，类似 Docker，一条命令搞定
                        </p>
                        <div className={isDark ? 'p-3 rounded bg-gray-900' : 'p-3 rounded bg-white'}>
                          <p className={isDark ? 'text-xs font-bold mb-2 text-purple-300' : 'text-xs font-bold mb-2 text-purple-700'}>
                            1. 安装 Ollama（Windows/Mac/Linux）
                          </p>
                          <pre className={isDark ? 'text-xs p-2 rounded bg-black text-green-400 mb-3' : 'text-xs p-2 rounded bg-gray-50 text-gray-800 mb-3'}>
{`# Mac/Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
下载安装包: https://ollama.com/download`}
                          </pre>
                          
                          <p className={isDark ? 'text-xs font-bold mb-2 text-purple-300' : 'text-xs font-bold mb-2 text-purple-700'}>
                            2. 拉取模型（推荐Llama 3）
                          </p>
                          <pre className={isDark ? 'text-xs p-2 rounded bg-black text-green-400 mb-3' : 'text-xs p-2 rounded bg-gray-50 text-gray-800 mb-3'}>
{`ollama pull llama3:8b   # 7B模型，适合入门
ollama pull llama3:70b  # 70B模型，效果更好（需要大显存）`}
                          </pre>
                          
                          <p className={isDark ? 'text-xs font-bold mb-2 text-purple-300' : 'text-xs font-bold mb-2 text-purple-700'}>
                            3. 运行模型
                          </p>
                          <pre className={isDark ? 'text-xs p-2 rounded bg-black text-green-400' : 'text-xs p-2 rounded bg-gray-50 text-gray-800'}>
{`# 命令行对话
ollama run llama3:8b

# API服务（默认端口11434）
curl http://localhost:11434/api/generate -d '{
  "model": "llama3:8b",
  "prompt": "分析这段数据..."
}'`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-blue-400' : 'text-xl font-bold mb-4 text-blue-600'}>
                        🐳 Docker部署方案
                      </h3>
                      <div className={isDark ? 'p-4 rounded-lg bg-blue-900/20 border border-blue-700' : 'p-4 rounded-lg bg-blue-50 border border-blue-200'}>
                        <p className={isDark ? 'text-sm mb-3 text-gray-300' : 'text-sm mb-3 text-gray-700'}>
                          适合企业内网部署，团队共享使用
                        </p>
                        <pre className={isDark ? 'text-xs p-3 rounded bg-black text-green-400' : 'text-xs p-3 rounded bg-white text-gray-800'}>
{`# 拉取镜像
docker pull ollama/ollama

# 启动服务（映射端口11434）
docker run -d \\
  -v ollama:/root/.ollama \\
  -p 11434:11434 \\
  --name ollama \\
  ollama/ollama

# 拉取模型
docker exec -it ollama ollama pull llama3:8b

# 团队访问：http://服务器IP:11434/api/generate`}
                        </pre>
                      </div>
                    </div>

                    <div className={isDark ? 'p-4 rounded-lg bg-yellow-900/20 border border-yellow-700' : 'p-4 rounded-lg bg-yellow-50 border border-yellow-300'}>
                      <h4 className={isDark ? 'font-bold mb-3 text-yellow-300' : 'font-bold mb-3 text-yellow-800'}>
                        ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意事项
                      </h4>
                      <ul className={isDark ? 'text-sm space-y-2 text-gray-300' : 'text-sm space-y-2 text-gray-700'}>
                        <li>• <strong>首次下载慢</strong>：模型文件几GB到几十GB，建议提前下载</li>
                        <li>• <strong>效果不如GPT-4</strong>：开源模型能力弱于顶级商业模型，适合不敏感任务</li>
                        <li>• <strong>中文能力</strong>：Llama 3对中文支持一般，可选Qwen（通义千问开源版）</li>
                        <li>• <strong>推理速度</strong>：本地7B模型速度较慢，建议用于批量任务而非实时对话</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section id="ai-for-analytics" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} AI赋能数据分析</h2>
                    </div>
                    <p className="text-emerald-50 text-lg ml-8 font-medium">5个实际工作场景 × AI应用示例</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">📊</span>
                        <h3 className={isDark ? 'text-xl font-bold text-emerald-400' : 'text-xl font-bold text-emerald-600'}>
                          场景1：SQL生成与优化
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-emerald-900/20' : 'p-4 rounded-lg bg-emerald-50'}>
                        <p className={isDark ? 'text-sm mb-3 text-gray-300' : 'text-sm mb-3 text-gray-700'}>
                          <strong>传统方式：</strong>手写SQL，查文档，调试半小时
                        </p>
                        <p className={isDark ? 'text-sm mb-3 text-gray-300' : 'text-sm mb-3 text-gray-700'}>
                          <strong>AI方式：</strong>用自然语言描述需求，AI生成SQL并解释
                        </p>
                        <p className={isDark ? 'text-xs mt-3 text-teal-400' : 'text-xs mt-3 text-teal-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 效率提升：5分钟完成，准确率90%+
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🧹</span>
                        <h3 className={isDark ? 'text-xl font-bold text-teal-400' : 'text-xl font-bold text-teal-600'}>
                          场景2：数据清洗脚本生成
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-teal-900/20' : 'p-4 rounded-lg bg-teal-50'}>
                        <p className={isDark ? 'text-sm mb-3 text-gray-300' : 'text-sm mb-3 text-gray-700'}>
                          <strong>任务：</strong>清洗包含缺失值、异常值、重复值的CSV文件
                        </p>
                        <p className={isDark ? 'text-xs mt-3 text-teal-400' : 'text-xs mt-3 text-teal-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 节省时间：从1小时缩短到10分钟
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">📈</span>
                        <h3 className={isDark ? 'text-xl font-bold text-cyan-400' : 'text-xl font-bold text-cyan-600'}>
                          场景3：数据洞察与解读
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-cyan-900/20' : 'p-4 rounded-lg bg-cyan-50'}>
                        <p className={isDark ? 'text-sm mb-3 text-gray-300' : 'text-sm mb-3 text-gray-700'}>
                          <strong>任务：</strong>上传数据表，让AI帮你发现隐藏规律
                        </p>
                        <p className={isDark ? 'text-xs mt-3 text-cyan-400' : 'text-xs mt-3 text-cyan-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 适用工具：ChatGPT Code Interpreter / Claude
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">📝</span>
                        <h3 className={isDark ? 'text-xl font-bold text-emerald-400' : 'text-xl font-bold text-emerald-600'}>
                          场景4：报告自动撰写
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-emerald-900/20' : 'p-4 rounded-lg bg-emerald-50'}>
                        <p className={isDark ? 'text-sm mb-3 text-gray-300' : 'text-sm mb-3 text-gray-700'}>
                          <strong>任务：</strong>根据数据表生成周报/月报
                        </p>
                        <p className={isDark ? 'text-xs mt-3 text-emerald-400' : 'text-xs mt-3 text-emerald-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 效率提升：从2小时缩短到30分钟
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🔮</span>
                        <h3 className={isDark ? 'text-xl font-bold text-teal-400' : 'text-xl font-bold text-teal-600'}>
                          场景5：学习新技术
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-teal-900/20' : 'p-4 rounded-lg bg-teal-50'}>
                        <p className={isDark ? 'text-sm mb-3 text-gray-300' : 'text-sm mb-3 text-gray-700'}>
                          <strong>任务：</strong>快速掌握新工具、新库、新算法
                        </p>
                        <p className={isDark ? 'text-xs mt-3 text-teal-400' : 'text-xs mt-3 text-teal-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 学习效率：30分钟掌握核心用法
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-700' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300'}>
                    <CardContent className="pt-6">
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-purple-300' : 'text-xl font-bold mb-4 text-purple-700'}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} AI时代数据分析师的能力模型
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className={isDark ? 'text-sm font-bold mb-2 text-pink-300' : 'text-sm font-bold mb-2 text-pink-700'}>
                            核心能力（不可替代）
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-300' : 'text-xs space-y-1 text-gray-700'}>
                            <li>• 业务理解：知道分析什么、为什么分析</li>
                            <li>• 数据思维：从数据中发现问题本质</li>
                            <li>• 结果验证：判断AI输出是否正确</li>
                            <li>• 沟通能力：把洞察讲给非技术人员</li>
                          </ul>
                        </div>
                        <div>
                          <p className={isDark ? 'text-sm font-bold mb-2 text-purple-300' : 'text-sm font-bold mb-2 text-purple-700'}>
                            辅助能力（AI加速）
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-300' : 'text-xs space-y-1 text-gray-700'}>
                            <li>• 代码编写：SQL/Python交给AI生成</li>
                            <li>• 报告撰写：AI辅助起草初稿</li>
                            <li>• 文档查找：问AI而不是翻官方文档</li>
                            <li>• 学习新知：AI作为学习助教</li>
                          </ul>
                        </div>
                      </div>
                      <div className={isDark ? 'mt-4 p-3 rounded bg-gradient-to-r from-purple-900/50 to-pink-900/50' : 'mt-4 p-3 rounded bg-white'}>
                        <p className={isDark ? 'text-sm font-bold text-yellow-300' : 'text-sm font-bold text-yellow-800'}>
                          � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 金句：AI不会取代数据分析师，但会用AI的数据分析师会取代不会用AI的
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section id="api-integration" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} API调用与集成</h2>
                    </div>
                    <p className="text-green-50 text-lg ml-8 font-medium">将AI集成到数据分析工作流 - 实战代码指南</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{getLucideIcon('⚡', 'w-5 h-5 text-[#19bcc8]')}</span>
                        <h3 className={isDark ? 'text-xl font-bold text-green-400' : 'text-xl font-bold text-green-600'}>
                          OpenAI API 快速上手
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-green-900/20' : 'p-4 rounded-lg bg-green-50'}>
                        <p className={isDark ? 'text-sm mb-3 font-bold text-green-300' : 'text-sm mb-3 font-bold text-green-700'}>
                          1️⃣ 安装与配置
                        </p>
                        <div className={isDark ? 'p-3 rounded bg-black mb-3' : 'p-3 rounded bg-white mb-3'}>
                          <pre className={isDark ? 'text-xs text-green-400' : 'text-xs text-gray-800'}>
{`# 安装SDK
pip install openai

# 设置API Key（推荐使用环境变量）
export OPENAI_API_KEY='sk-...'`}
                          </pre>
                        </div>

                        <p className={isDark ? 'text-sm mb-3 font-bold text-green-300' : 'text-sm mb-3 font-bold text-green-700'}>
                          2️⃣ 基础调用示例
                        </p>
                        <div className={isDark ? 'p-3 rounded bg-black mb-3' : 'p-3 rounded bg-white mb-3'}>
                          <pre className={isDark ? 'text-xs text-green-400' : 'text-xs text-gray-800'}>
{`from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 生成SQL查询
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是SQL专家"},
        {"role": "user", "content": "生成查询2024年销售额前10的SQL"}
    ],
    temperature=0  # 确定性输出
)

print(response.choices[0].message.content)`}
                          </pre>
                        </div>

                        <p className={isDark ? 'text-sm mb-3 font-bold text-green-300' : 'text-sm mb-3 font-bold text-green-700'}>
                          3️⃣ 流式输出（提升用户体验）
                        </p>
                        <div className={isDark ? 'p-3 rounded bg-black' : 'p-3 rounded bg-white'}>
                          <pre className={isDark ? 'text-xs text-green-400' : 'text-xs text-gray-800'}>
{`stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "分析这段数据"}],
    stream=True  # 开启流式输出
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")`}
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">💰</span>
                        <h3 className={isDark ? 'text-xl font-bold text-emerald-400' : 'text-xl font-bold text-emerald-600'}>
                          成本控制与优化
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-emerald-900/20' : 'p-4 rounded-lg bg-emerald-50'}>
                        <div className="space-y-3">
                          <div className={isDark ? 'p-3 rounded bg-emerald-900/40' : 'p-3 rounded bg-white'}>
                            <p className={isDark ? 'font-bold text-sm mb-2 text-emerald-300' : 'font-bold text-sm mb-2 text-emerald-700'}>
                              � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 计费参考（2024年价格）
                            </p>
                            <div className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                              • GPT-4o：$5/M输入tokens，$15/M输出tokens<br/>
                              • GPT-4o-mini：$0.15/M输入，$0.6/M输出（便宜33倍）<br/>
                              • DALL-E 3：$0.04/张（标准质量）
                            </div>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-teal-900/40' : 'p-3 rounded bg-white'}>
                            <p className={isDark ? 'font-bold text-sm mb-2 text-teal-300' : 'font-bold text-sm mb-2 text-teal-700'}>
                              � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 省钱技巧
                            </p>
                            <div className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                              1. <strong>使用mini版本</strong>：简单任务用gpt-4o-mini<br/>
                              2. <strong>控制上下文</strong>：只发送必要的历史消息<br/>
                              3. <strong>设置max_tokens</strong>：限制输出长度<br/>
                              4. <strong>批量处理</strong>：合并多个请求减少调用次数
                            </div>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-black' : 'p-3 rounded bg-white'}>
                            <p className={isDark ? 'font-bold text-sm mb-2 text-green-300' : 'font-bold text-sm mb-2 text-green-700'}>
                              代码示例：成本监控
                            </p>
                            <pre className={isDark ? 'text-xs text-green-400' : 'text-xs text-gray-800'}>
{`def track_cost(response):
    usage = response.usage
    input_cost = usage.prompt_tokens / 1_000_000 * 5
    output_cost = usage.completion_tokens / 1_000_000 * 15
    total_cost = input_cost + output_cost
    print(f"本次调用成本: \${total_cost:.4f}")
    return total_cost`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🛡️</span>
                        <h3 className={isDark ? 'text-xl font-bold text-teal-400' : 'text-xl font-bold text-teal-600'}>
                          错误处理与重试机制
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-teal-900/20' : 'p-4 rounded-lg bg-teal-50'}>
                        <p className={isDark ? 'text-sm mb-3 text-gray-300' : 'text-sm mb-3 text-gray-700'}>
                          生产环境必备：处理速率限制、网络错误、超时等问题
                        </p>
                        <div className={isDark ? 'p-3 rounded bg-black' : 'p-3 rounded bg-white'}>
                          <pre className={isDark ? 'text-xs text-green-400' : 'text-xs text-gray-800'}>
{`import time
from openai import OpenAI, RateLimitError, APIError

def call_with_retry(prompt, max_retries=3):
    client = OpenAI()
    
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}],
                timeout=30  # 30秒超时
            )
            return response.choices[0].message.content
            
        except RateLimitError:
            wait_time = 2 ** attempt  # 指数退避
            print(f"速率限制，等待{wait_time}秒...")
            time.sleep(wait_time)
            
        except APIError as e:
            print(f"API错误: {e}")
            if attempt == max_retries - 1:
                raise
            time.sleep(1)
    
    raise Exception("重试次数用尽")`}
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gradient-to-r from-green-900/30 to-teal-900/30 border-green-700' : 'bg-gradient-to-r from-green-50 to-teal-50 border-green-300'}>
                    <CardContent className="pt-6">
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-green-300' : 'text-xl font-bold mb-4 text-green-700'}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 实战：数据分析API集成模板
                      </h3>
                      <div className={isDark ? 'p-4 rounded-lg bg-black' : 'p-4 rounded-lg bg-white'}>
                        <pre className={isDark ? 'text-xs text-green-400' : 'text-xs text-gray-800'}>
{`# data_analyzer.py - 完整可用的数据分析助手

import os
import pandas as pd
from openai import OpenAI

class DataAnalyzer:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    def generate_sql(self, question: str, schema: str) -> str:
        """根据自然语言生成SQL"""
        prompt = f"""
表结构：{schema}
问题：{question}
请生成对应的SQL查询（PostgreSQL语法）
"""
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",  # 使用便宜版本
            messages=[
                {"role": "system", "content": "你是SQL专家"},
                {"role": "user", "content": prompt}
            ],
            temperature=0
        )
        return response.choices[0].message.content
    
    def analyze_dataframe(self, df: pd.DataFrame, question: str) -> str:
        """分析Pandas DataFrame"""
        summary = f"""
数据概览：
- 行数: {len(df)}
- 列数: {len(df.columns)}
- 列名: {df.columns.tolist()}
- 前5行数据:
{df.head().to_string()}

统计信息:
{df.describe().to_string()}
"""
        prompt = f"{summary}\\n\\n问题: {question}"
        
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "你是数据分析专家"},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content

# 使用示例
analyzer = DataAnalyzer()
df = pd.read_csv("sales.csv")
insight = analyzer.analyze_dataframe(df, "找出异常值和趋势")
print(insight)`}
                        </pre>
                      </div>
                      <div className={isDark ? 'mt-4 p-3 rounded bg-emerald-900/40' : 'mt-4 p-3 rounded bg-white'}>
                        <p className={isDark ? 'text-xs font-bold mb-1 text-emerald-300' : 'text-xs font-bold mb-1 text-emerald-700'}>
                          💾 保存为.py文件即可直接使用
                        </p>
                        <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                          需要先设置环境变量：export OPENAI_API_KEY='你的密钥'
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section id="ai-ethics" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-red-600 via-orange-500 to-amber-600 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">📛 AI伦理与安全</h2>
                    </div>
                    <p className="text-red-50 text-lg ml-8 font-medium">合规使用AI - 数据分析师必知的红线</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🔒</span>
                        <h3 className={isDark ? 'text-xl font-bold text-red-400' : 'text-xl font-bold text-red-600'}>
                          数据隐私保护（最高优先级）
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-red-900/20' : 'p-4 rounded-lg bg-red-50'}>
                        <div className={isDark ? 'p-4 rounded-lg bg-red-900/40 border-2 border-red-700 mb-4' : 'p-4 rounded-lg bg-white border-2 border-red-300 mb-4'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-red-300' : 'font-bold text-sm mb-2 text-red-700'}>
                            ⛔ 绝对不能上传到公开AI平台的数据
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-300' : 'text-xs space-y-1 text-gray-700'}>
                            <li>• 用户手机号、身份证号、邮箱等个人信息</li>
                            <li>• 未脱敏的交易记录、订单详情</li>
                            <li>• 公司财务数据、商业机密</li>
                            <li>• 未公开的业务指标、战略规划</li>
                            <li>• 源代码中的密钥、数据库连接串</li>
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <div className={isDark ? 'p-3 rounded bg-orange-900/40' : 'p-3 rounded bg-white'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-orange-300' : 'font-bold text-xs mb-1 text-orange-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 合规使用方案
                            </p>
                            <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                              1. <strong>数据脱敏</strong>：将真实手机号替换为"138****1234"<br/>
                              2. <strong>使用示例数据</strong>：用虚构数据测试Prompt<br/>
                              3. <strong>本地部署</strong>：敏感数据用Ollama本地模型处理<br/>
                              4. <strong>企业版API</strong>：使用Azure OpenAI（数据不训练模型）
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-amber-900/40' : 'p-3 rounded bg-white'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-amber-300' : 'font-bold text-xs mb-1 text-amber-700'}>
                              📜 相关法规
                            </p>
                            <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                              • <strong>中国《个人信息保护法》</strong>：未经授权不得处理个人信息<br/>
                              • <strong>GDPR（欧盟）</strong>：数据出境需合规<br/>
                              • <strong>企业合规要求</strong>：很多公司禁止使用公开AI处理内部数据
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🎭</span>
                        <h3 className={isDark ? 'text-xl font-bold text-orange-400' : 'text-xl font-bold text-orange-600'}>
                          AI幻觉（Hallucination）识别与防范
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-orange-900/20' : 'p-4 rounded-lg bg-orange-50'}>
                        <p className={isDark ? 'text-sm mb-3 font-bold text-orange-300' : 'text-sm mb-3 font-bold text-orange-700'}>
                          ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 什么是AI幻觉？
                        </p>
                        <p className={isDark ? 'text-xs mb-4 text-gray-300' : 'text-xs mb-4 text-gray-700'}>
                          AI会自信地"编造"不存在的事实、数据、引用，看起来很像真的，但完全是假的
                        </p>

                        <div className="space-y-3">
                          <div className={isDark ? 'p-3 rounded bg-red-900/40 border-l-4 border-red-500' : 'p-3 rounded bg-white border-l-4 border-red-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-red-300' : 'font-bold text-xs mb-1 text-red-700'}>
                              典型案例
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              • 编造不存在的论文引用<br/>
                              • 虚构统计数据和百分比<br/>
                              • 生成看似合理但错误的SQL<br/>
                              • 凭空杜撰API参数名
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-emerald-900/40 border-l-4 border-emerald-500' : 'p-3 rounded bg-white border-l-4 border-emerald-500'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-emerald-300' : 'font-bold text-xs mb-1 text-emerald-700'}>
                              防范措施
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              1. <strong>关键数据必须验证</strong>：AI生成的SQL要实际跑一遍<br/>
                              2. <strong>降低Temperature</strong>：设为0减少随机性<br/>
                              3. <strong>要求引用来源</strong>："请给出数据来源链接"<br/>
                              4. <strong>交叉验证</strong>：重要结论用不同方式再问一遍
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">©️</span>
                        <h3 className={isDark ? 'text-xl font-bold text-amber-400' : 'text-xl font-bold text-amber-600'}>
                          版权与知识产权
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-amber-900/20' : 'p-4 rounded-lg bg-amber-50'}>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className={isDark ? 'p-3 rounded bg-amber-900/40' : 'p-3 rounded bg-white'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-amber-300' : 'font-bold text-xs mb-1 text-amber-700'}>
                              AI生成内容的归属
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              • <strong>文本/代码</strong>：多数国家认定为"无版权"或使用者拥有<br/>
                              • <strong>图像</strong>：争议较大，建议商用需谨慎<br/>
                              • <strong>视频/音乐</strong>：版权归属尚不明确
                            </p>
                          </div>

                          <div className={isDark ? 'p-3 rounded bg-yellow-900/40' : 'p-3 rounded bg-white'}>
                            <p className={isDark ? 'font-bold text-xs mb-1 text-yellow-300' : 'font-bold text-xs mb-1 text-yellow-700'}>
                              安全做法
                            </p>
                            <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                              • AI生成的报告注明"AI辅助生成"<br/>
                              • 商用图像建议购买授权<br/>
                              • 不要让AI模仿特定艺术家风格<br/>
                              • 代码需人工Review后再使用
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-700' : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300'}>
                    <CardContent className="pt-6">
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-red-300' : 'text-xl font-bold mb-4 text-red-700'}>
                        ⚖ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 偏见与公平性
                      </h3>
                      <p className={isDark ? 'text-sm mb-3 text-gray-300' : 'text-sm mb-3 text-gray-700'}>
                        AI模型可能存在性别、种族、地域等偏见，数据分析时需警惕
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className={isDark ? 'p-3 rounded bg-red-900/40' : 'p-3 rounded bg-white'}>
                          <p className={isDark ? 'font-bold text-xs mb-1 text-red-300' : 'font-bold text-xs mb-1 text-red-700'}>
                            ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 常见偏见场景
                          </p>
                          <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                            • 用户画像分析可能强化刻板印象<br/>
                            • 招聘简历筛选可能歧视特定群体<br/>
                            • 信用评分可能对弱势群体不公
                          </p>
                        </div>
                        <div className={isDark ? 'p-3 rounded bg-orange-900/40' : 'p-3 rounded bg-white'}>
                          <p className={isDark ? 'font-bold text-xs mb-1 text-orange-300' : 'font-bold text-xs mb-1 text-orange-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 改进措施
                          </p>
                          <p className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}>
                            • 训练数据多样性审查<br/>
                            • 分群体验证模型准确率<br/>
                            • 关键决策保留人工审核<br/>
                            • 定期评估公平性指标
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-amber-400' : 'text-xl font-bold mb-4 text-amber-600'}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 企业AI使用合规清单
                      </h3>
                      <div className="space-y-2">
                        <div className={isDark ? 'flex items-start gap-2 p-2 rounded text-xs text-gray-300' : 'flex items-start gap-2 p-2 rounded text-xs text-gray-700'}>
                          <input type="checkbox" className="mt-1" />
                          <span>已阅读公司AI使用政策</span>
                        </div>
                        <div className={isDark ? 'flex items-start gap-2 p-2 rounded text-xs text-gray-300' : 'flex items-start gap-2 p-2 rounded text-xs text-gray-700'}>
                          <input type="checkbox" className="mt-1" />
                          <span>确认不上传敏感数据到公开平台</span>
                        </div>
                        <div className={isDark ? 'flex items-start gap-2 p-2 rounded text-xs text-gray-300' : 'flex items-start gap-2 p-2 rounded text-xs text-gray-700'}>
                          <input type="checkbox" className="mt-1" />
                          <span>AI生成内容已人工Review</span>
                        </div>
                        <div className={isDark ? 'flex items-start gap-2 p-2 rounded text-xs text-gray-300' : 'flex items-start gap-2 p-2 rounded text-xs text-gray-700'}>
                          <input type="checkbox" className="mt-1" />
                          <span>关键数据已交叉验证（防止幻觉）</span>
                        </div>
                        <div className={isDark ? 'flex items-start gap-2 p-2 rounded text-xs text-gray-300' : 'flex items-start gap-2 p-2 rounded text-xs text-gray-700'}>
                          <input type="checkbox" className="mt-1" />
                          <span>商用内容已确认版权问题</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section id="ai-project-templates" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-slate-700 via-gray-700 to-zinc-700 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">📦 实战项目模板</h2>
                    </div>
                    <p className="text-slate-100 text-lg ml-8 font-medium">复制即可用的端到端案例（数据分析师高频任务）</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">📰</span>
                        <h3 className={isDark ? 'text-xl font-bold text-slate-200' : 'text-xl font-bold text-gray-800'}>
                          模板1：自动化日报（SQL → 指标 → 图表 → 邮件）
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                        <pre className={isDark ? 'text-xs p-3 rounded bg-black text-emerald-400' : 'text-xs p-3 rounded bg-white text-gray-800'}>
{`# daily_report.py
import os, smtplib
import pandas as pd
from openai import OpenAI

def get_metrics(df):
    return {
        "gmv": float(df['amount'].sum()),
        "orders": int(df['order_id'].nunique()),
        "users": int(df['user_id'].nunique())
    }

def render_summary(metrics):
    client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
    prompt = f"请用金字塔结构总结: GMV={metrics['gmv']}, 订单数={metrics['orders']}, 用户数={metrics['users']}，给出2点原因和2条改进建议"
    res = client.chat.completions.create(model='gpt-4o-mini', messages=[{"role":"user","content":prompt}], temperature=0)
    return res.choices[0].message.content

def main():
    df = pd.read_csv('orders_yesterday.csv')
    metrics = get_metrics(df)
    summary = render_summary(metrics)
    print(summary)

if __name__ == '__main__':
    main()`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🗂️</span>
                        <h3 className={isDark ? 'text-xl font-bold text-slate-200' : 'text-xl font-bold text-gray-800'}>
                          模板2：数据问答（自然语言 → SQL → 结果）
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                        <pre className={isDark ? 'text-xs p-3 rounded bg-black text-emerald-400' : 'text-xs p-3 rounded bg-white text-gray-800'}>
{`# sql_qa.py
from openai import OpenAI

def gen_sql(schema, question):
    client = OpenAI()
    prompt = f"表结构:\n{schema}\n问题:{question}\n请输出PostgreSQL的SQL"
    res = client.chat.completions.create(model='gpt-4o', messages=[{"role":"user","content":prompt}], temperature=0)
    return res.choices[0].message.content
`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">📑</span>
                        <h3 className={isDark ? 'text-xl font-bold text-slate-200' : 'text-xl font-bold text-gray-800'}>
                          模板3：报告生成（要点 → 结构化摘要）
                        </h3>
                      </div>
                      <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                        <pre className={isDark ? 'text-xs p-3 rounded bg-black text-emerald-400' : 'text-xs p-3 rounded bg-white text-gray-800'}>
{`# report_gen.py
from openai import OpenAI

def gen_report(points):
    client = OpenAI()
    prompt = "请按金字塔结构写报告摘要：\n" + "\n".join(f"- {p}" for p in points)
    res = client.chat.completions.create(model='gpt-4o-mini', messages=[{"role":"user","content":prompt}], temperature=0)
    return res.choices[0].message.content
`}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section id="ai-learning-path" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-600 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">🗺 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 学习路径指南（30天）</h2>
                    </div>
                    <p className="text-pink-50 text-lg ml-8 font-medium">零基础到上手工作场景，按周推进，重实战</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">📅</span>
                        <h3 className={isDark ? 'text-xl font-bold text-pink-300' : 'text-xl font-bold text-pink-600'}>
                          30天进阶路线（4周）
                        </h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-pink-300' : 'font-bold text-sm mb-2 text-pink-700'}>
                            第1周：入门与工具
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-300' : 'text-xs space-y-1 text-gray-700'}>
                            <li>• 了解DL/LLM基础概念与应用边界</li>
                            <li>• 熟悉 ChatGPT/Claude、Code Interpreter</li>
                            <li>• 完成3个Prompt练习（SQL/解读/报告）</li>
                          </ul>
                        </div>
                        <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-pink-300' : 'font-bold text-sm mb-2 text-pink-700'}>
                            第2周：Prompt与多模态
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-300' : 'text-xs space-y-1 text-gray-700'}>
                            <li>• 掌握 CRISPE 与 5个高级技巧</li>
                            <li>• 多模态：上传图表/Excel截图进行解读</li>
                            <li>• 产出1份图文并茂的小报告</li>
                          </ul>
                        </div>
                        <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-pink-300' : 'font-bold text-sm mb-2 text-pink-700'}>
                            第3周：API与Agent
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-300' : 'text-xs space-y-1 text-gray-700'}>
                            <li>• 会用 OpenAI API，掌握成本/重试/流式</li>
                            <li>• 体验 LangChain SQL Agent（只需跑通）</li>
                            <li>• 做1个“自然语言 → SQL”的小Demo</li>
                          </ul>
                        </div>
                        <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-pink-300' : 'font-bold text-sm mb-2 text-pink-700'}>
                            第4周：实战与合规
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-300' : 'text-xs space-y-1 text-gray-700'}>
                            <li>• 完成“自动化日报”或“报告生成”模板</li>
                            <li>• 熟悉隐私/版权/偏见等合规清单</li>
                            <li>• 整理你的最佳实践清单（Prompt库）</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🎯</span>
                        <h3 className={isDark ? 'text-xl font-bold text-fuchsia-300' : 'text-xl font-bold text-fuchsia-600'}>
                          数据分析师定制路径（快速上手）
                        </h3>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-fuchsia-300' : 'font-bold text-sm mb-2 text-fuchsia-700'}>
                            Day 1-3：上手
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-300' : 'text-xs space-y-1 text-gray-700'}>
                            <li>• 安装并熟悉常用工具（GPT/Claude）</li>
                            <li>• 复现3个模板（日报/问答/报告）</li>
                          </ul>
                        </div>
                        <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-fuchsia-300' : 'font-bold text-sm mb-2 text-fuchsia-700'}>
                            Day 4-10：强化
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-300' : 'text-xs space-y-1 text-gray-700'}>
                            <li>• Prompt工程（含高级技巧）</li>
                            <li>• 多模态图表/Excel截图解读</li>
                          </ul>
                        </div>
                        <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-fuchsia-300' : 'font-bold text-sm mb-2 text-fuchsia-700'}>
                            Day 11-30：实战
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-300' : 'text-xs space-y-1 text-gray-700'}>
                            <li>• API接入到你的日常脚本</li>
                            <li>• 产出1个完整业务案例并复盘</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDark ? 'bg-gradient-to-r from-pink-900/30 to-fuchsia-900/30 border-pink-700' : 'bg-gradient-to-r from-pink-50 to-fuchsia-50 border-pink-300'}>
                    <CardContent className="pt-6">
                      <h3 className={isDark ? 'text-xl font-bold mb-4 text-pink-300' : 'text-xl font-bold mb-4 text-pink-700'}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 阶段性检核清单
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-pink-300' : 'font-bold text-sm mb-2 text-pink-700'}>
                            基础能力
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-300' : 'text-xs space-y-1 text-gray-700'}>
                            <li>• 会写高质量Prompt并复用模板</li>
                            <li>• 能用多模态理解图表/截图</li>
                            <li>• 能生成结构化报告摘要</li>
                          </ul>
                        </div>
                        <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                          <p className={isDark ? 'font-bold text-sm mb-2 text-pink-300' : 'font-bold text-sm mb-2 text-pink-700'}>
                            实战能力
                          </p>
                          <ul className={isDark ? 'text-xs space-y-1 text-gray-300' : 'text-xs space-y-1 text-gray-700'}>
                            <li>• 接入API并控制成本与重试</li>
                            <li>• 跑通SQL Agent并完成一个Demo</li>
                            <li>• 独立完成“日报/报告”自动化</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section id="ai-faq" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-slate-600 via-gray-600 to-neutral-600 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">❓ 常见问题 FAQ</h2>
                    </div>
                    <p className="text-slate-100 text-lg ml-8 font-medium">高频问题一览，快速定位解决方案</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6 space-y-4">
                      <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                        <p className={isDark ? 'font-bold text-sm mb-2 text-slate-200' : 'font-bold text-sm mb-2 text-gray-800'}>
                          Q1. 选哪个模型最省钱还够用？
                        </p>
                        <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                          简单任务用 gpt-4o-mini；中文报告可选文心一言/通义；长文本用 Claude；批量/本地用 Llama/Qwen 开源版。
                        </p>
                      </div>

                      <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                        <p className={isDark ? 'font-bold text-sm mb-2 text-slate-200' : 'font-bold text-sm mb-2 text-gray-800'}>
                          Q2. Token 是什么？为什么成本飙升？
                        </p>
                        <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                          Token 是计费单位，输入/输出越多越贵。请控制历史上下文、使用 mini 模型、限制 max_tokens。
                        </p>
                      </div>

                      <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                        <p className={isDark ? 'font-bold text-sm mb-2 text-slate-200' : 'font-bold text-sm mb-2 text-gray-800'}>
                          Q3. 国内无法稳定访问 ChatGPT 怎么办？
                        </p>
                        <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                          可使用国内模型（文心/通义），或选 Azure OpenAI；无法联网时采用本地部署（Ollama + 开源模型）。
                        </p>
                      </div>

                      <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                        <p className={isDark ? 'font-bold text-sm mb-2 text-slate-200' : 'font-bold text-sm mb-2 text-gray-800'}>
                          Q4. 为什么 AI 有时一本正经地胡说（幻觉）？
                        </p>
                        <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                          生成式模型并不检索事实，建议：温度设为 0、要求给来源、关键结论二次验证、重要 SQL 必须实际执行验证。
                        </p>
                      </div>

                      <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                        <p className={isDark ? 'font-bold text-sm mb-2 text-slate-200' : 'font-bold text-sm mb-2 text-gray-800'}>
                          Q5. 截图/PDF/Excel 让 AI 看不懂？
                        </p>
                        <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                          选择多模态模型（GPT-4o/Gemini/Claude），并提供明确任务与期望输出格式，必要时补充文本描述。
                        </p>
                      </div>

                      <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                        <p className={isDark ? 'font-bold text-sm mb-2 text-slate-200' : 'font-bold text-sm mb-2 text-gray-800'}>
                          Q6. 敏感数据如何处理？
                        </p>
                        <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                          绝不上传到公开平台；脱敏后再用；优先本地模型或企业合规 API（Azure OpenAI）；遵守个人信息保护法/GDPR。
                        </p>
                      </div>

                      <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                        <p className={isDark ? 'font-bold text-sm mb-2 text-slate-200' : 'font-bold text-sm mb-2 text-gray-800'}>
                          Q7. 怎么把 AI 接入到我的 Python 脚本？
                        </p>
                        <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                          使用官方 SDK（OpenAI/Claude 等），参考本页“API调用与集成”与“实战项目模板”，注意超时、重试与成本监控。
                        </p>
                      </div>

                      <div className={isDark ? 'p-4 rounded-lg bg-gray-900/40' : 'p-4 rounded-lg bg-gray-50'}>
                        <p className={isDark ? 'font-bold text-sm mb-2 text-slate-200' : 'font-bold text-sm mb-2 text-gray-800'}>
                          Q8. 我应该先学什么？
                        </p>
                        <p className={isDark ? 'text-xs text-gray-300' : 'text-xs text-gray-700'}>
                          先熟悉工具与 Prompt，再学多模态与 API，最后尝试 Agent；可直接按“学习路径指南（30天）”推进。
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <div className={isDark ? 'text-center py-12 border-t border-gray-700 mt-12' : 'text-center py-12 border-t border-gray-200 mt-12'}>
                <div className="mb-6">
                  <span className="text-5xl">🎓</span>
                </div>
                <h3 className={isDark ? 'text-2xl font-bold mb-3 text-white' : 'text-2xl font-bold mb-3 text-gray-900'}>
                  深度学习与AI应用 - 完整内容已加载 ✅
                </h3>
                <p className={isDark ? 'text-gray-400 mb-6' : 'text-gray-600 mb-6'}>
                  涵盖 深度学习入门 | 大模型科普 | Prompt工程 | AI智能体 | <strong>AI发展全景图</strong> | AI工具 | 本地部署 | 实战应用
                </p>
                <div className={isDark ? 'flex flex-wrap justify-center gap-3 text-sm text-gray-400' : 'flex flex-wrap justify-center gap-3 text-sm text-gray-600'}>
                  <span className="px-3 py-1 rounded-full bg-purple-900/30">📚 8大核心模块</span>
                  <span className="px-3 py-1 rounded-full bg-cyan-900/30">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 六大AI领域全景图（NEW）</span>
                  <span className="px-3 py-1 rounded-full bg-pink-900/30">💎 高级Prompt技巧</span>
                  <span className="px-3 py-1 rounded-full bg-violet-900/30">🤖 Agent智能体</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-900/30">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 即学即用</span>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={isDark ? 'fixed bottom-8 right-8 p-4 rounded-full shadow-2xl transition-all bg-purple-600 hover:bg-purple-500 text-white' : 'fixed bottom-8 right-8 p-4 rounded-full shadow-2xl transition-all bg-purple-500 hover:bg-purple-600 text-white'}
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  )
}
