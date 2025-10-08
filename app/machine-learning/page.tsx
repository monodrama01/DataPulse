"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Home, Brain, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { 
  ConfusionMatrixChart, 
  ROCCurveChart, 
  FeatureImportanceChart,
  LearningCurveChart,
  ClusteringVisualization,
  RegressionScatterChart,
  EncodingComparisonChart,
  CrossFeatureChart
} from "./visualizations"
import {
  ImbalancedDataModule,
  ModelInterpretabilityModule,
  TimeSeriesModule,
  AnomalyDetectionModule,
  DimensionalityReductionModule,
  EnsembleLearningModule,
  ModelDeploymentModule
} from "./advanced-modules"

export default function MachineLearningPage() {
  const { theme } = useTheme()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState('ml-intro')

  useEffect(() => {
    const ids = [
      'ml-intro',
      'data-preprocessing',
      'feature-engineering',
      'model-decision',
      'industry-use',
      'classification',
      'regression',
      'clustering',
      'evaluation',
      'imbalanced-data',
      'model-interpretability',
      'time-series',
      'anomaly-detection',
      'dimensionality-reduction',
      'ensemble-learning',
      'model-deployment',
      'ml-ops-automation',
      'deployment-pitfalls'
    ]
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 400)
      const mid = window.innerHeight / 2
      let nearest: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= mid) {
          nearest = id
        } else {
          break
        }
      }
      if (nearest) setActiveSection(nearest)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>机器学习</span>
          </div>
        </div>
      </div>

      {/* 主标题区域 */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3">机器学习 - 数据分析师必备</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            从预测用户流失到销售预测，掌握核心算法，解决实际业务问题
          </p>
          
          {/* 深度学习入口 */}
          <div className="mt-6 flex justify-center">
            <Link 
              href="/deep-learning"
              className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 text-white shadow-lg hover:shadow-2xl' 
                  : 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white shadow-xl hover:shadow-2xl'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <span>深度学习与AI应用</span>
                <span className="text-sm opacity-90">→ 大模型 | Prompt工程 | 本地部署</span>
              </span>
              <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold ${
                theme === 'dark' ? 'bg-yellow-500 text-gray-900' : 'bg-yellow-400 text-gray-900'
              } animate-pulse`}>
                NEW
              </div>
            </Link>
          </div>
        </div>

        <div className="flex gap-8">
          {/* 左侧导航 */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className={`sticky top-24 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                {getLucideIcon('📖', 'w-5 h-5 text-[#19bcc8]')}
                <span>页面导航</span>
              </h3>
              <nav className="space-y-1">
                {[
                  { id: 'ml-intro', icon: '🚀', label: 'ML入门', level: 1 },
                  { id: 'data-preprocessing', icon: '🧹', label: '数据预处理', level: 1 },
                  { id: 'feature-engineering', icon: '⚙️', label: '特征工程', level: 1 },
                  { id: 'model-decision', icon: '🧭', label: '模型选择决策', level: 1 },
                  { id: 'industry-use', icon: '💼', label: '工作应用场景', level: 1 },
                  { id: 'classification', icon: '🎲', label: '分类算法', level: 1 },
                  { id: 'regression', icon: '📈', label: '回归算法', level: 1 },
                  { id: 'clustering', icon: '🎯', label: '聚类算法', level: 1 },
                  { id: 'evaluation', icon: '📊', label: '模型评估与调优', level: 1 },
                  { id: 'imbalanced-data', icon: '⚖️', label: '样本不均衡处理', level: 1 },
                  { id: 'model-interpretability', icon: '🔍', label: '模型解释性', level: 1 },
                  { id: 'time-series', icon: '📅', label: '时间序列预测', level: 1 },
                  { id: 'anomaly-detection', icon: '⚠️', label: '异常检测', level: 1 },
                  { id: 'dimensionality-reduction', icon: '📉', label: '降维与可视化', level: 1 },
                  { id: 'ensemble-learning', icon: '🚀', label: '集成学习', level: 1 },
                  { id: 'model-deployment', icon: '🛠️', label: '模型部署与监控', level: 1 },
                  { id: 'ml-ops-automation', icon: '🔁', label: '模型上线监控与自动化联动', level: 1 },
                  { id: 'deployment-pitfalls', icon: '⚠️', label: '常见错误与避坑指南', level: 1 }
                ].map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? 'text-[#19bcc8] bg-[#19bcc8]/10'
                        : (theme === 'dark' ? 'hover:bg-[#19bcc8]/10 text-gray-300 hover:text-[#19bcc8]' : 'hover:bg-[#19bcc8]/10 text-gray-700 hover:text-[#19bcc8]')
                    }`}
                  >
                    {getLucideIcon(item.icon, 'w-5 h-5 text-[#19bcc8]')}
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* 主内容区 */}
          <main className="flex-1 min-w-0">
            <div className="space-y-8">
              {/* 核心价值 */}
              <Card className={theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'}>
                <CardContent className="pt-6">
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 为什么数据分析师要学机器学习？
                  </h2>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { value: '预测未来', desc: '销售预测、用户流失', icon: '🔮' },
                      { value: '自动分类', desc: '客户分群、风险识别', icon: '🎯' },
                      { value: '智能推荐', desc: '商品推荐、内容推荐', icon: '💡' }
                    ].map((item, idx) => (
                      <div key={idx} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                        <div className="text-4xl mb-2">{item.icon}</div>
                        <div className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{item.value}</div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 模块分隔符 */}
              <div className="relative flex items-center justify-center py-4">
                <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                </div>
                <div className="relative px-4 text-blue-500 font-bold">◆ ◆ ◆</div>
              </div>

              {/* MODULE 01: 机器学习入门 */}
              <section id="ml-intro">
                <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1 h-8 bg-white rounded-full"></div>
                      <h2 className="text-2xl font-bold text-white">🚀 01. 机器学习入门</h2>
                    </div>
                    <p className="text-blue-50 ml-7">10分钟了解核心概念，快速入门机器学习</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6 space-y-6">
                      {/* 核心概念 */}
                      <div>
                        <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-blue-500/30' : 'border-blue-200'}`}>
                          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span className="text-2xl">📚</span>
                            <span>机器学习三大类型</span>
                          </h3>
                        </div>
                        <div className="space-y-3">
                          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                            <div className="flex items-center justify-between mb-2">
                              <p className={`font-bold text-lg ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>监督学习</p>
                              <span className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>⭐⭐⭐⭐⭐</span>
                            </div>
                            <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>有标签数据，学习输入到输出的映射</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              <strong>应用：</strong>分类（用户流失预测）、回归（销售预测）
                            </p>
                          </div>

                          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'}`}>
                            <div className="flex items-center justify-between mb-2">
                              <p className={`font-bold text-lg ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>无监督学习</p>
                              <span className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>⭐⭐⭐⭐</span>
                            </div>
                            <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>无标签数据，发现数据内在结构</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              <strong>应用：</strong>聚类（客户分群）、降维（特征压缩）
                            </p>
                          </div>

                          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'}`}>
                            <div className="flex items-center justify-between mb-2">
                              <p className={`font-bold text-lg ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>强化学习</p>
                              <span className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>⭐⭐</span>
                            </div>
                            <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>通过与环境交互学习最优策略</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              <strong>应用：</strong>推荐系统、游戏AI（数据分析较少用）
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 数据分析师学习路径 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析师12周学习路径</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { week: '第1-2周', content: 'Python基础 + Pandas', result: '数据处理' },
                            { week: '第3-4周', content: '数据预处理 + 特征工程', result: '数据准备' },
                            { week: '第5-6周', content: '分类算法（逻辑回归/决策树）', result: '预测分类' },
                            { week: '第7-8周', content: '回归算法（线性回归）', result: '数值预测' },
                            { week: '第9-10周', content: '聚类 + 模型评估', result: '客户分群' },
                            { week: '第11-12周', content: '实战项目（流失预测）', result: '完整项目' }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                              <div className={`text-sm font-bold mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{item.week}</div>
                              <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.content}</div>
                              <div className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>→ {item.result}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 环境准备与依赖安装 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-900/20 border border-indigo-700' : 'bg-indigo-50 border border-indigo-200'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>🧱 环境准备与依赖安装</h4>
                        <details className={theme === 'dark' ? 'open:bg-gray-900/20' : 'open:bg-white/50'}>
                          <summary className={`text-xs mb-2 cursor-pointer select-none ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>pip 安装清单</summary>
                          <div className="relative">
                            <button
                              onClick={() => navigator.clipboard.writeText(`# 基础\npip install numpy pandas scikit-learn matplotlib seaborn\n\n# 集成学习\npip install xgboost lightgbm catboost\n\n# 时间序列\npip install pmdarima prophet\n\n# 降维与可视化\npip install umap-learn\n\n# 服务化与部署（可选）\npip install fastapi uvicorn joblib`)}
                              className={`absolute right-2 top-2 text-[11px] px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-800 text-gray-200 border border-gray-700' : 'bg-gray-100 text-gray-700 border border-gray-300'} hover:opacity-90`}
                              aria-label="复制pip安装命令"
                            >复制</button>
                            <pre className={`text-xs p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`# 基础
pip install numpy pandas scikit-learn matplotlib seaborn

# 集成学习
pip install xgboost lightgbm catboost

# 时间序列
pip install pmdarima prophet

# 降维与可视化
pip install umap-learn

# 服务化与部署（可选）
pip install fastapi uvicorn joblib`}
                            </pre>
                          </div>
                        </details>
                        <details className={theme === 'dark' ? 'open:bg-gray-900/20' : 'open:bg-white/50'}>
                          <summary className={`text-xs mt-3 mb-2 cursor-pointer select-none ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>conda 环境（可选）</summary>
                          <div className="relative">
                            <button
                              onClick={() => navigator.clipboard.writeText(`# 创建并激活环境\nconda create -n ml-env python=3.11 -y\nconda activate ml-env\n\n# 安装基础与常用库\npip install numpy pandas scikit-learn matplotlib seaborn\n\n# 常见扩展\npip install xgboost lightgbm catboost pmdarima prophet umap-learn\npip install fastapi uvicorn joblib`)}
                              className={`absolute right-2 top-2 text-[11px] px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-800 text-gray-200 border border-gray-700' : 'bg-gray-100 text-gray-700 border border-gray-300'} hover:opacity-90`}
                              aria-label="复制conda命令"
                            >复制</button>
                            <pre className={`text-xs p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`# 创建并激活环境
conda create -n ml-env python=3.11 -y
conda activate ml-env

# 安装基础与常用库
pip install numpy pandas scikit-learn matplotlib seaborn

# 常见扩展
pip install xgboost lightgbm catboost pmdarima prophet umap-learn
pip install fastapi uvicorn joblib`}
                            </pre>
                          </div>
                        </details>
                      </div>

                      {/* 核心库 */}
                      <div>
                        <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-green-500/30' : 'border-green-200'}`}>
                          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-green-400 to-emerald-400' : 'from-green-600 to-emerald-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span className="text-2xl">🛠️</span>
                            <span>Python核心库</span>
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { lib: 'scikit-learn', purpose: '机器学习算法', importance: '⭐⭐⭐⭐⭐', use: '分类/回归/聚类' },
                            { lib: 'pandas', purpose: '数据处理', importance: '⭐⭐⭐⭐⭐', use: '数据清洗/特征工程' },
                            { lib: 'numpy', purpose: '数值计算', importance: '⭐⭐⭐⭐⭐', use: '矩阵运算' },
                            { lib: 'matplotlib/seaborn', purpose: '数据可视化', importance: '⭐⭐⭐⭐', use: '结果展示' }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                              <div className="flex items-center justify-between mb-2">
                                <code className={`text-sm font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>{item.lib}</code>
                                <span className="text-xs">{item.importance}</span>
                              </div>
                              <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.purpose}</p>
                              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>用途：{item.use}</p>
                            </div>
                          ))}
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

              {/* 已删除冗余占位：真实块见 advanced-modules.tsx (ml-ops-automation) */}
              {/* 占位 section 关闭，避免未闭合导致语法错误 */}
              
              {/* 模块分隔符 */}
              <div className="relative flex items-center justify-center py-4">
                <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
                </div>
                <div className="relative px-4 text-indigo-500 font-bold">◆ ◆ ◆</div>
              </div>

              {/* 已彻底移除“常见错误与避坑指南”简化占位；真实模块见 advanced-modules.tsx */}
              {/* 模块分隔符 */}
              <div className="relative flex items-center justify-center py-4">
                <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
                </div>
                <div className="relative px-4 text-emerald-500 font-bold">◆ ◆ ◆</div>
              </div>

              {/* MODULE 02.6: 工作应用场景 */}
              <section id="industry-use">
                <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 shadow-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1 h-8 bg-white rounded-full"></div>
                      <h2 className="text-2xl font-bold text-white">💼 工作应用场景（数据分析）</h2>
                    </div>
                    <p className="text-emerald-50 ml-7">面向数据分析的高频落地：流失预测、销售预测、客户分群、文本分类、异常检测</p>
                  </div>
                </div>

                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {[ 
                        {title:'用户流失预测', goal:'找出高风险用户，提前挽留', data:'用户画像/活跃/订单/客服记录', model:'逻辑回归→XGBoost', metric:'AUC/Recall@TopK', action:'挽留券/客服外呼'},
                        {title:'销售额预测', goal:'按SKU/门店/地区预测', data:'历史销量/价格/节假日/促销', model:'线性回归→XGBoost/Prophet', metric:'MAPE/RMSE', action:'备货/排产/定价'},
                        {title:'客户分群', goal:'精准运营/千人千面', data:'RFM/浏览/购买/渠道', model:'K-Means→层次聚类', metric:'轮廓系数', action:'分群营销/个性化权益'},
                        {title:'文本分类', goal:'自动识别工单/舆情', data:'标题/正文/标签', model:'朴素贝叶斯/SVM', metric:'F1/AUC', action:'自动分派/负面预警'},
                        {title:'异常检测', goal:'识别异常交易/系统波动', data:'指标时序/多维日志', model:'IsolationForest/DBSCAN', metric:'Precision@K', action:'风控拉黑/自动扩容'}
                      ].map((x,i)=> (
                        <div key={i} className={`p-4 rounded-lg border ${theme==='dark'?'bg-emerald-900/20 border-emerald-700':'bg-emerald-50 border-emerald-200'}`}>
                          <p className={`font-bold mb-2 ${theme==='dark'?'text-emerald-300':'text-emerald-700'}`}>{x.title}</p>
                          <ul className={`text-xs space-y-1 ${theme==='dark'?'text-gray-300':'text-gray-700'}`}>
                            <li>• 目标：{x.goal}</li>
                            <li>• 数据：{x.data}</li>
                            <li>• 模型：{x.model}</li>
                            <li>• 指标：{x.metric}</li>
                            <li>• 落地：{x.action}</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* 模块分隔符 */}
              <div className="relative flex items-center justify-center py-4">
                <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                </div>
                <div className="relative px-4 text-green-500 font-bold">◆ ◆ ◆</div>
              </div>

              {/* MODULE 02.5: 模型选择决策 */}
              <section id="model-decision">
                <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1 h-8 bg-white rounded-full"></div>
                      <h2 className="text-2xl font-bold text-white">🧭 模型选择决策</h2>
                    </div>
                    <p className="text-emerald-50 ml-7">按任务类型/数据规模/实时性/可解释性做分支选择，少走弯路</p>
                  </div>
                </div>

                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 五步快速选型</h3>
                      <div className="grid md:grid-cols-5 gap-3 text-sm">
                        {[ 
                          {t:'任务', d:'分类/回归/聚类/时间序列'},
                          {t:'规模', d:'样本<1万 / 1万-100万 / 100万+'},
                          {t:'特征', d:'稀疏文本/数值/类别多'},
                          {t:'实时', d:'离线/批处理/在线/低延迟'},
                          {t:'可解释', d:'强可解释 or 黑盒可接受'}
                        ].map((x,i)=> (
                          <div key={i} className={`${theme==='dark'?'bg-emerald-900/20':'bg-emerald-50'} p-3 rounded-lg`}>
                            <p className={`font-bold ${theme==='dark'?'text-emerald-300':'text-emerald-700'}`}>{x.t}</p>
                            <p className={`${theme==='dark'?'text-gray-300':'text-gray-700'}`}>{x.d}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className={`font-bold mb-2 ${theme==='dark'?'text-emerald-300':'text-emerald-700'}`}>🗺 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 决策图（简版）</h4>
                      <ul className={`text-sm space-y-2 ${theme==='dark'?'text-gray-300':'text-gray-700'}`}>
                        <li>• <strong>分类</strong>：先用逻辑回归作基线 → 指标不足且非线性强 → 随机森林/XGBoost；样本极不均衡 → 调权重/重采样/阈值移动</li>
                        <li>• <strong>回归</strong>：线性回归作基线 → 残差非线性/交互强 → 随机森林/GBDT/XGBoost；特征多重共线 → 岭/Lasso</li>
                        <li>• <strong>文本</strong>：朴素贝叶斯/线性SVM（TF‑IDF）→ 追求极致效果用深度模型（可选）</li>
                        <li>• <strong>聚类</strong>：先K-Means（缩放）→ 簇形不规则或噪声多用DBSCAN</li>
                        <li>• <strong>时间序列</strong>：基线ARIMA/Prophet → 非线性或强节假日效应用XGBoost/LightGBM特征化</li>
                      </ul>
                    </div>

                    <div className={theme==='dark' ? 'bg-gray-900 p-4 rounded-lg' : 'bg-gray-50 p-4 rounded-lg'}>
                      <h4 className={`font-bold mb-2 ${theme==='dark'?'text-emerald-300':'text-emerald-700'}`}>📦 模型选择速查表</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className={`${theme==='dark'?'border-gray-700':'border-gray-300'} border-b`}>
                              <th className={`${theme==='dark'?'text-gray-300':'text-gray-700'} text-left py-2 px-2`}>场景</th>
                              <th className={`${theme==='dark'?'text-gray-300':'text-gray-700'} text-left py-2 px-2`}>首选模型</th>
                              <th className={`${theme==='dark'?'text-gray-300':'text-gray-700'} text-left py-2 px-2`}>备选</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {s:'用户流失预测', p:'逻辑回归/随机森林', b:'XGBoost'},
                              {s:'信用评分/风控', p:'逻辑回归（可解释）', b:'GBDT/LightGBM'},
                              {s:'销售额预测', p:'线性回归/岭回归', b:'XGBoost/Prophet'},
                              {s:'客户分群', p:'K-Means', b:'DBSCAN/层次聚类'},
                              {s:'文本分类', p:'朴素贝叶斯/线性SVM', b:'XGBoost + TF‑IDF'},
                            ].map((r,i)=> (
                              <tr key={i} className={`${theme==='dark'?'border-gray-700':'border-gray-200'} border-b`}>
                                <td className={`py-2 px-2 ${theme==='dark'?'text-gray-300':'text-gray-700'}`}>{r.s}</td>
                                <td className={`py-2 px-2 font-semibold ${theme==='dark'?'text-emerald-300':'text-emerald-700'}`}>{r.p}</td>
                                <td className={`py-2 px-2 ${theme==='dark'?'text-gray-300':'text-gray-700'}`}>{r.b}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* MODULE 02: 数据预处理 */}
              <section id="data-preprocessing">
                <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 shadow-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1 h-8 bg-white rounded-full"></div>
                      <h2 className="text-2xl font-bold text-white">🧹 02. 数据预处理</h2>
                    </div>
                    <p className="text-green-50 ml-7">数据质量决定模型效果，掌握数据清洗的黄金法则</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6 space-y-6">
                      {/* 预处理核心步骤 */}
                      <div>
                        <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-green-500/30' : 'border-green-200'}`}>
                          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-green-400 to-teal-400' : 'from-green-600 to-teal-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span className="text-2xl">🎯</span>
                            <span>数据预处理4大核心</span>
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { title: '缺失值处理', methods: ['删除', '均值/中位数填充', 'KNN填充', '模型预测'], importance: '⭐⭐⭐⭐⭐' },
                            { title: '异常值处理', methods: ['IQR法', 'Z-score法', '业务规则', 'Isolation Forest'], importance: '⭐⭐⭐⭐⭐' },
                            { title: '特征编码', methods: ['Label Encoding', 'One-Hot Encoding', 'Target Encoding'], importance: '⭐⭐⭐⭐⭐' },
                            { title: '特征缩放', methods: ['StandardScaler', 'MinMaxScaler', 'RobustScaler'], importance: '⭐⭐⭐⭐' }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-br from-green-900/20 to-teal-900/20 border border-green-700' : 'bg-gradient-to-br from-green-50 to-teal-50 border border-green-200'}`}>
                              <div className="flex items-center justify-between mb-2">
                                <p className={`font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>{item.title}</p>
                                <span className="text-xs">{item.importance}</span>
                              </div>
                              <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                {item.methods.map((method, midx) => (
                                  <li key={midx}>• {method}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 缺失值处理 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>🔧 缺失值处理全流程 ⭐⭐⭐⭐⭐</h4>
                        <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`import pandas as pd
from sklearn.impute import SimpleImputer, KNNImputer

# 1. 检测缺失值
print("缺失值统计:")
print(df.isnull().sum())
print("\\n缺失比例:")
print(df.isnull().mean())

# 2. 策略1：删除（缺失>50%）
df_clean = df.dropna(thresh=len(df)*0.5, axis=1)  # 删除缺失>50%的列

# 3. 策略2：简单填充
# 均值填充（数值型）
imputer_mean = SimpleImputer(strategy='mean')
df[['age', 'income']] = imputer_mean.fit_transform(df[['age', 'income']])

# 中位数填充（有异常值时）
imputer_median = SimpleImputer(strategy='median')
df[['price']] = imputer_median.fit_transform(df[['price']])

# 众数填充（类别型）
imputer_mode = SimpleImputer(strategy='most_frequent')
df[['category']] = imputer_mode.fit_transform(df[['category']])

# 4. 策略3：KNN填充（高级）⭐⭐⭐⭐⭐
knn_imputer = KNNImputer(n_neighbors=5)
df_knn = pd.DataFrame(
    knn_imputer.fit_transform(df),
    columns=df.columns
)`}
                        </pre>
                      </div>

                      {/* 异常值处理 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 异常值检测与处理 ⭐⭐⭐⭐⭐</h4>
                        <pre className={`text-xs p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`import numpy as np

# 方法1：IQR法（最常用）
def detect_outliers_iqr(df, column):
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)]
    print(f"{column} 异常值数量: {len(outliers)}")
    return outliers

# 方法2：Z-score法
def detect_outliers_zscore(df, column, threshold=3):
    z_scores = np.abs((df[column] - df[column].mean()) / df[column].std())
    outliers = df[z_scores > threshold]
    return outliers

# 处理策略
# 1. 删除异常值
df_clean = df[~df.index.isin(outliers.index)]

# 2. 替换为边界值（Winsorization）
df['price'] = df['price'].clip(lower=lower_bound, upper=upper_bound)

# 3. 对数转换（处理长尾分布）
df['price_log'] = np.log1p(df['price'])`}
                        </pre>
                      </div>

                      {/* 特征编码 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>🔤 类别特征编码 ⭐⭐⭐⭐⭐</h4>
                        <pre className={`text-xs p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`from sklearn.preprocessing import LabelEncoder, OneHotEncoder
import category_encoders as ce

# 1. Label Encoding（有序类别）
le = LabelEncoder()
df['education_encoded'] = le.fit_transform(df['education'])
# 高中:0, 本科:1, 硕士:2, 博士:3

# 2. One-Hot Encoding（无序类别，类别少）
df_onehot = pd.get_dummies(df, columns=['city', 'gender'], drop_first=True)

# 或使用sklearn
from sklearn.preprocessing import OneHotEncoder
ohe = OneHotEncoder(sparse=False, drop='first')
encoded = ohe.fit_transform(df[['city']])

# 3. Target Encoding（类别多，有监督）⭐⭐⭐⭐⭐
# 需要安装：pip install category_encoders
encoder = ce.TargetEncoder(cols=['user_id', 'product_id'])
df_encoded = encoder.fit_transform(df[['user_id', 'product_id']], df['target'])

# 注意：Target Encoding容易过拟合，需要交叉验证`}
                        </pre>
                      </div>

                      {/* 特征缩放 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-orange-50 border border-orange-200'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>📏 特征缩放 ⭐⭐⭐⭐</h4>
                        <pre className={`text-xs p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

# 1. StandardScaler（标准化，均值0方差1）- 最常用
scaler_std = StandardScaler()
df[['age', 'income']] = scaler_std.fit_transform(df[['age', 'income']])

# 2. MinMaxScaler（归一化到0-1）
scaler_minmax = MinMaxScaler()
df[['score']] = scaler_minmax.fit_transform(df[['score']])

# 3. RobustScaler（对异常值鲁棒）
scaler_robust = RobustScaler()
df[['price']] = scaler_robust.fit_transform(df[['price']])

# 何时使用？
# • 逻辑回归/SVM/神经网络 → 必须缩放 ⭐⭐⭐⭐⭐
# • 树模型（决策树/随机森林/XGBoost） → 不需要缩放
# • KMeans聚类 → 必须缩放`}
                        </pre>
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

              {/* MODULE 03: 特征工程 */}
              <section id="feature-engineering">
                <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 shadow-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1 h-8 bg-white rounded-full"></div>
                      <h2 className="text-2xl font-bold text-white">⚙️ 03. 特征工程</h2>
                    </div>
                    <p className="text-orange-50 ml-7">特征决定模型上限，算法只是逼近上限</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6 space-y-6">
                      {/* 特征选择 */}
                      <div>
                        <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-orange-500/30' : 'border-orange-200'}`}>
                          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-orange-400 to-amber-400' : 'from-orange-600 to-amber-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span className="text-2xl">🎯</span>
                            <span>特征选择（降维减噪）⭐⭐⭐⭐⭐</span>
                          </h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { method: '方差过滤', desc: '删除方差小的特征', code: 'VarianceThreshold()', use: '去除常数特征' },
                            { method: '相关性分析', desc: '删除高度相关特征', code: 'df.corr()', use: '避免多重共线性' },
                            { method: 'RFE递归消除', desc: '逐步删除不重要特征', code: 'RFE(estimator)', use: '基于模型重要性' }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-orange-50 border border-orange-200'}`}>
                              <p className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>{item.method}</p>
                              <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
                              <code className={`text-xs block mb-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>{item.code}</code>
                              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.use}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 特征构造 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>🔧 特征构造实战技巧 ⭐⭐⭐⭐⭐</h4>
                        <div className="space-y-3">
                          <div>
                            <p className={`font-semibold text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>1️⃣ 时间特征拆解</p>
                            <pre className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['dayofweek'] = df['date'].dt.dayofweek
df['hour'] = df['date'].dt.hour
df['is_weekend'] = df['dayofweek'].isin([5, 6]).astype(int)
df['is_holiday'] = df['date'].isin(holidays).astype(int)`}
                            </pre>
                          </div>
                          <div>
                            <p className={`font-semibold text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>2️⃣ 数值特征组合</p>
                            <pre className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`df['BMI'] = df['weight'] / (df['height'] / 100) ** 2
df['price_per_sqm'] = df['price'] / df['area']
df['total_amount'] = df['quantity'] * df['unit_price']`}
                            </pre>
                          </div>
                          <div>
                            <p className={`font-semibold text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>3️⃣ 统计特征聚合</p>
                            <pre className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`# 用户历史行为聚合
user_stats = df.groupby('user_id').agg({
    'order_amount': ['mean', 'sum', 'count', 'max', 'std'],
    'days_since_last': ['min', 'mean']
})`}
                            </pre>
                          </div>
                        </div>
                      </div>

                      {/* 文本特征抽取 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-orange-50 border border-orange-200'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>📝 文本特征抽取（Count / TF-IDF）⭐⭐⭐⭐</h4>
                        <pre className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

# Count：词频  TF-IDF：惩罚常见词，突出区分词
stop = ['的','了','呢','啊']  # 示例停用词
count_vec = CountVectorizer(stop_words=stop, ngram_range=(1,2))
tfidf_vec = TfidfVectorizer(stop_words=stop, ngram_range=(1,2))

X_count = count_vec.fit_transform(texts)
X_tfidf = tfidf_vec.fit_transform(texts)`}
                        </pre>
                      </div>

                      {/* 字典特征（One-hot） */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>📦 字典特征（DictVectorizer→One-Hot）⭐⭐⭐</h4>
                        <pre className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`from sklearn.feature_extraction import DictVectorizer

records = [
  {'city':'上海','device':'iOS'},
  {'city':'北京','device':'Android'}
]
vec = DictVectorizer(sparse=True)
X_dict = vec.fit_transform(records)
print(vec.get_feature_names_out())  # ['city=上海','city=北京','device=Android','device=iOS']`}
                        </pre>
                      </div>

                      {/* 高级特征工程技巧 */}
                      <div>
                        <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-purple-500/30' : 'border-purple-200'}`}>
                          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span className="text-2xl">🚀</span>
                            <span>高级特征工程技巧 ⭐⭐⭐⭐⭐</span>
                          </h3>
                        </div>

                        <div className="space-y-4">
                          {/* 交叉特征 */}
                          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border-2 border-purple-700' : 'bg-purple-50 border-2 border-purple-300'}`}>
                            <h4 className={`font-bold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                              <span className="text-xl">✖️</span>
                              <span>交叉特征（捕捉特征间非线性关系）</span>
                            </h4>
                            
                            {/* 交叉特征可视化 */}
                            <div className="mb-4">
                              <CrossFeatureChart theme={theme} />
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-3 mb-3">
                              <div className={`p-3 rounded ${theme === 'dark' ? 'bg-purple-900/40' : 'bg-purple-100'}`}>
                                <p className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-purple-200' : 'text-purple-800'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 应用场景</p>
                                <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                  <li>• 广告CTR预估：用户ID × 商品类目</li>
                                  <li>• 推荐系统：用户年龄段 × 内容类型</li>
                                  <li>• 风控模型：收入区间 × 信用评分</li>
                                </ul>
                              </div>
                              <div className={`p-3 rounded ${theme === 'dark' ? 'bg-purple-900/40' : 'bg-purple-100'}`}>
                                <p className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-purple-200' : 'text-purple-800'}`}>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意事项</p>
                                <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                  <li>• 维度爆炸：n×m → n·m（慎用高基数）</li>
                                  <li>• 稀疏性增加：需配合正则化</li>
                                  <li>• 树模型自带交叉：无需手动构造</li>
                                </ul>
                              </div>
                            </div>
                            <pre className={`text-xs p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`from sklearn.preprocessing import PolynomialFeatures

# 方法1：多项式交叉（自动生成所有2阶交叉）
poly = PolynomialFeatures(degree=2, interaction_only=True, include_bias=False)
X_cross = poly.fit_transform(X[['age', 'income', 'credit_score']])
# 输出：age, income, credit_score, age×income, age×credit, income×credit

# 方法2：手动构造业务交叉特征
df['age_income'] = df['age'] * df['income']
df['city_category'] = df['city'].astype(str) + '_' + df['category'].astype(str)

# 方法3：分桶后交叉（降低维度）
df['age_bin'] = pd.cut(df['age'], bins=[0,25,35,50,100], labels=['青年','中年','壮年','老年'])
df['age_income_cross'] = df['age_bin'].astype(str) + '_' + df['income_level'].astype(str)`}
                            </pre>
                          </div>

                          {/* 目标编码 */}
                          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-900/20 border-2 border-indigo-700' : 'bg-indigo-50 border-2 border-indigo-300'}`}>
                            <h4 className={`font-bold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
                              <span className="text-xl">🎯</span>
                              <span>目标编码（Target Encoding）- 高基数类别特征利器</span>
                            </h4>
                            
                            {/* 编码对比可视化 */}
                            <div className="mb-4">
                              <EncodingComparisonChart theme={theme} />
                            </div>
                            
                            <div className={`mb-3 p-3 rounded ${theme === 'dark' ? 'bg-indigo-900/40' : 'bg-indigo-100'}`}>
                              <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-indigo-200' : 'text-indigo-800'}`}>核心思想：用目标变量统计量替代类别</p>
                              <div className="grid md:grid-cols-3 gap-2">
                                <div>
                                  <p className={`text-xs font-bold mb-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 优势</p>
                                  <ul className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <li>• 适合高基数（城市/商品ID）</li>
                                    <li>• 保留业务语义信息</li>
                                    <li>• 线性模型效果好</li>
                                  </ul>
                                </div>
                                <div>
                                  <p className={`text-xs font-bold mb-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 风险</p>
                                  <ul className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <li>• 容易过拟合（需平滑）</li>
                                    <li>• 必须做交叉验证</li>
                                    <li>• 目标泄漏风险</li>
                                  </ul>
                                </div>
                                <div>
                                  <p className={`text-xs font-bold mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>🛡 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 防护</p>
                                  <ul className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <li>• 留一法（Leave-One-Out）</li>
                                    <li>• 贝叶斯平滑</li>
                                    <li>• K折编码</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <pre className={`text-xs p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`# 方法1：基础目标编码（有过拟合风险！）
target_mean = df.groupby('city')['target'].mean()
df['city_encoded'] = df['city'].map(target_mean)

# 方法2：留一法目标编码（推荐！避免泄漏）
def target_encode_loo(df, cat_col, target_col):
    global_mean = df[target_col].mean()
    # 计算每个类别的总和与计数
    agg = df.groupby(cat_col)[target_col].agg(['sum', 'count'])
    # 留一法：(总和 - 当前值) / (计数 - 1)
    encoded = []
    for idx, row in df.iterrows():
        cat = row[cat_col]
        target = row[target_col]
        sum_val = agg.loc[cat, 'sum'] - target
        cnt = agg.loc[cat, 'count'] - 1
        encoded.append(sum_val / cnt if cnt > 0 else global_mean)
    return encoded

df['city_te_loo'] = target_encode_loo(df, 'city', 'is_churn')

# 方法3：贝叶斯平滑（category_encoders库）
from category_encoders import TargetEncoder
te = TargetEncoder(cols=['city', 'product_id'], smoothing=10.0)
X_train_te = te.fit_transform(X_train, y_train)
X_test_te = te.transform(X_test)  # 注意：测试集只transform不fit`}
                            </pre>
                          </div>

                          {/* 频率编码与排序编码 */}
                          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-teal-900/20 border border-teal-700' : 'bg-teal-50 border border-teal-200'}`}>
                            <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 其他编码技巧</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              <div>
                                <p className={`font-semibold text-sm mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-800'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 频率编码（Count Encoding）</p>
                                <pre className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`# 用出现次数替代类别
freq = df['city'].value_counts()
df['city_freq'] = df['city'].map(freq)

# 适用场景：
# {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 高频类别更重要的业务
# {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 树模型（捕捉出现频率信息）`}
                                </pre>
                              </div>
                              <div>
                                <p className={`font-semibold text-sm mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-800'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 排序编码（Ordinal Encoding）</p>
                                <pre className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`# 有序类别：学历/评级/等级
from sklearn.preprocessing import OrdinalEncoder
edu_order = ['小学','初中','高中','本科','硕士','博士']
ord_enc = OrdinalEncoder(categories=[edu_order])
df['education_ord'] = ord_enc.fit_transform(df[['education']])

# {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 保留顺序信息
# {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 线性模型能捕捉单调关系`}
                                </pre>
                              </div>
                            </div>
                          </div>

                          {/* WOE编码（金融风控） */}
                          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20 border border-amber-700' : 'bg-amber-50 border border-amber-200'}`}>
                            <h4 className={`font-bold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-amber-300' : 'text-amber-700'}`}>
                              <span className="text-xl">💰</span>
                              <span>WOE编码（Weight of Evidence）- 金融风控标配</span>
                            </h4>
                            <div className={`mb-2 p-2 rounded text-xs ${theme === 'dark' ? 'bg-amber-900/40 text-amber-200' : 'bg-amber-100 text-amber-800'}`}>
                              <strong>WOE = ln(好客户占比 / 坏客户占比)</strong>，衡量特征对目标的区分能力
                            </div>
                            <pre className={`text-xs p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`# WOE编码示例（信用评分）
def calculate_woe(df, feature, target):
    grouped = df.groupby(feature)[target].agg(['sum', 'count'])
    grouped['bad'] = grouped['sum']
    grouped['good'] = grouped['count'] - grouped['sum']
    grouped['bad_pct'] = grouped['bad'] / grouped['bad'].sum()
    grouped['good_pct'] = grouped['good'] / grouped['good'].sum()
    grouped['woe'] = np.log((grouped['good_pct'] + 0.0001) / (grouped['bad_pct'] + 0.0001))
    return grouped['woe'].to_dict()

woe_map = calculate_woe(df, 'income_level', 'is_default')
df['income_woe'] = df['income_level'].map(woe_map)

# 优势： {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 线性可解释 {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 缺失值也能计算WOE {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} IV值筛选特征`}
                            </pre>
                          </div>
                        </div>
                      </div>

                      {/* 特征重要性 */}
                      <div>
                        <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-blue-500/30' : 'border-blue-200'}`}>
                          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-blue-400 to-cyan-400' : 'from-blue-600 to-cyan-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span className="text-2xl">📊</span>
                            <span>特征重要性评估 ⭐⭐⭐⭐</span>
                          </h3>
                        </div>
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                          <pre className={`text-xs p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`from sklearn.ensemble import RandomForestClassifier
import matplotlib.pyplot as plt

# 训练随机森林获取特征重要性
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# 可视化特征重要性
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': rf.feature_importances_
}).sort_values('importance', ascending=False)

plt.barh(feature_importance['feature'][:10], feature_importance['importance'][:10])
plt.xlabel('Importance')
plt.title('Top 10 Feature Importance')
plt.show()`}
                          </pre>
                          
                          {/* 特征重要性可视化图表 */}
                          <div className="mt-4">
                            <FeatureImportanceChart theme={theme} />
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
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                </div>
                <div className="relative px-4 text-purple-500 font-bold">◆ ◆ ◆</div>
              </div>

              {/* MODULE 04: 分类算法 */}
              <section id="classification">
                <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 shadow-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1 h-8 bg-white rounded-full"></div>
                      <h2 className="text-2xl font-bold text-white">🎲 04. 分类算法</h2>
                    </div>
                    <p className="text-purple-50 ml-7">从用户流失到风险识别，掌握5大核心算法</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6 space-y-6">
                      {/* 算法对比 */}
                      <div>
                        <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-purple-500/30' : 'border-purple-200'}`}>
                          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span className="text-2xl">🎯</span>
                            <span>5大分类算法对比</span>
                          </h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className={`border-b-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                                <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>算法</th>
                                <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>优点</th>
                                <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>缺点</th>
                                <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>应用场景</th>
                                <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>重要性</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { algo: '逻辑回归', pros: '简单快速、可解释强', cons: '线性分类', use: '用户流失、信用评分', star: '⭐⭐⭐⭐⭐' },
                                { algo: '决策树', pros: '可解释、处理非线性', cons: '易过拟合', use: '规则提取、风险评估', star: '⭐⭐⭐⭐' },
                                { algo: '随机森林', pros: '准确率高、鲁棒性强', cons: '训练慢、黑盒', use: '特征重要性、通用分类', star: '⭐⭐⭐⭐⭐' },
                                { algo: 'XGBoost', pros: '性能最强、竞赛首选', cons: '调参复杂', use: 'Kaggle竞赛、精准预测', star: '⭐⭐⭐⭐⭐' },
                                { algo: 'SVM', pros: '高维数据、核技巧', cons: '大数据慢', use: '文本分类、小样本', star: '⭐⭐⭐' },
                                { algo: 'KNN', pros: '实现简单、无训练开销', cons: '预测慢、对维度/尺度敏感', use: '小样本、需缩放的场景', star: '⭐⭐⭐' },
                                { algo: '朴素贝叶斯', pros: '训练快、对高维稀疏文本友好', cons: '特征独立假设较强', use: '文本分类、垃圾邮件', star: '⭐⭐⭐⭐' }
                              ].map((row, idx) => (
                                <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                  <td className={`py-2 px-3 font-semibold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{row.algo}</td>
                                  <td className={`py-2 px-3 text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>{row.pros}</td>
                                  <td className={`py-2 px-3 text-xs ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{row.cons}</td>
                                  <td className={`py-2 px-3 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.use}</td>
                                  <td className={`py-2 px-3 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.star}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* 逻辑回归 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>🔥 逻辑回归 - 最常用的分类算法 ⭐⭐⭐⭐⭐</h4>
                        <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix

# 1. 数据准备
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. 训练模型
lr = LogisticRegression(max_iter=1000, random_state=42)
lr.fit(X_train, y_train)

# 3. 预测
y_pred = lr.predict(X_test)
y_proba = lr.predict_proba(X_test)[:, 1]  # 获取概率

# 4. 评估
print("准确率:", lr.score(X_test, y_test))
print(classification_report(y_test, y_pred))

# 5. 特征系数（可解释性）
coef_df = pd.DataFrame({
    'feature': X.columns,
    'coefficient': lr.coef_[0]
}).sort_values('coefficient', ascending=False)
print("\\n特征重要性:\\n", coef_df)`}
                        </pre>
                      </div>

                      {/* 随机森林 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 随机森林 - 鲁棒性最强 ⭐⭐⭐⭐⭐</h4>
                        <pre className={`text-xs p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`from sklearn.ensemble import RandomForestClassifier

# 训练随机森林
rf = RandomForestClassifier(
    n_estimators=100,      # 树的数量
    max_depth=10,          # 树的最大深度
    min_samples_split=20,  # 分裂最小样本数
    random_state=42
)
rf.fit(X_train, y_train)

# 预测
y_pred = rf.predict(X_test)
print("准确率:", rf.score(X_test, y_test))

# 特征重要性
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': rf.feature_importances_
}).sort_values('importance', ascending=False)
print("\\nTop 5 特征:\\n", feature_importance.head())`}
                        </pre>
                      </div>

                      {/* XGBoost */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} XGBoost - 竞赛王者 ⭐⭐⭐⭐⭐</h4>
                        <pre className={`text-xs p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`import xgboost as xgb

# 训练XGBoost
xgb_model = xgb.XGBClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=5,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)
xgb_model.fit(X_train, y_train)

# 预测
y_pred = xgb_model.predict(X_test)
y_proba = xgb_model.predict_proba(X_test)[:, 1]

print("准确率:", xgb_model.score(X_test, y_test))`}
                        </pre>
                      </div>

                      {/* 混淆矩阵可视化 */}
                      <div>
                        <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-pink-500/30' : 'border-pink-200'}`}>
                          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-pink-400 to-rose-400' : 'from-pink-600 to-rose-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span className="text-2xl">📊</span>
                            <span>混淆矩阵可视化</span>
                          </h3>
                        </div>
                        <ConfusionMatrixChart theme={theme} />
                      </div>

                      {/* KNN */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} KNN - 基于距离的投票 ⭐⭐⭐</h4>
                        <pre className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`from sklearn.neighbors import KNeighborsClassifier

knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train, y_train)
print('准确率:', knn.score(X_test, y_test))`}
                        </pre>
                      </div>

                      {/* 朴素贝叶斯 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-pink-900/20 border border-pink-700' : 'bg-pink-50 border border-pink-200'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-pink-300' : 'text-pink-700'}`}>📨 朴素贝叶斯 - 文本强项 ⭐⭐⭐⭐</h4>
                        <pre className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`from sklearn.naive_bayes import MultinomialNB

nb = MultinomialNB()
nb.fit(X_tfidf_train, y_train)
print('准确率:', nb.score(X_tfidf_test, y_test))`}
                        </pre>
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

              {/* MODULE 05: 回归算法 */}
              <section id="regression">
                <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 shadow-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1 h-8 bg-white rounded-full"></div>
                      <h2 className="text-2xl font-bold text-white">📈 05. 回归算法</h2>
                    </div>
                    <p className="text-red-50 ml-7">从销售预测到价格估算，预测连续数值的利器</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6 space-y-6">
                      {/* 线性回归 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>📏 线性回归 - 最基础最常用 ⭐⭐⭐⭐⭐</h4>
                        <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# 训练线性回归
lr = LinearRegression()
lr.fit(X_train, y_train)

# 预测
y_pred = lr.predict(X_test)

# 评估
print("R² 得分:", r2_score(y_test, y_pred))
print("MSE:", mean_squared_error(y_test, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))

# 查看系数
coef_df = pd.DataFrame({
    'feature': X.columns,
    'coefficient': lr.coef_
}).sort_values('coefficient', key=abs, ascending=False)
print("\\n特征系数:\\n", coef_df)`}
                        </pre>
                      </div>

                      {/* 岭回归和Lasso */}
                      <div>
                        <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-red-500/30' : 'border-red-200'}`}>
                          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-red-400 to-orange-400' : 'from-red-600 to-orange-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span className="text-2xl">🎯</span>
                            <span>正则化回归：岭回归 vs Lasso ⭐⭐⭐⭐</span>
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                            <p className={`font-bold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>岭回归（Ridge）- L2正则化</p>
                            <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>惩罚系数平方和，系数趋近0但不为0</p>
                            <pre className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`from sklearn.linear_model import Ridge
ridge = Ridge(alpha=1.0)
ridge.fit(X_train, y_train)
print("R²:", ridge.score(X_test, y_test))`}
                            </pre>
                            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>✓ 防止过拟合 | ✓ 特征多重共线性</p>
                          </div>
                          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
                            <p className={`font-bold mb-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>Lasso - L1正则化</p>
                            <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>惩罚系数绝对值，可将系数压缩为0</p>
                            <pre className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`from sklearn.linear_model import Lasso
lasso = Lasso(alpha=0.1)
lasso.fit(X_train, y_train)
print("R²:", lasso.score(X_test, y_test))`}
                            </pre>
                            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>✓ 特征选择 | ✓ 稀疏模型</p>
                          </div>
                        </div>
                      </div>

                      {/* 回归可视化 */}
                      <div>
                        <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-orange-500/30' : 'border-orange-200'}`}>
                          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-orange-400 to-pink-400' : 'from-orange-600 to-pink-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span className="text-2xl">📊</span>
                            <span>回归模型效果可视化 ⭐⭐⭐⭐⭐</span>
                          </h3>
                        </div>
                        <RegressionScatterChart theme={theme} />
                      </div>

                      {/* SGDRegressor（在线学习） */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} SGDRegressor - 大数据/在线学习 ⭐⭐⭐⭐</h4>
                        <pre className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`from sklearn.linear_model import SGDRegressor

sgd = SGDRegressor(max_iter=1000, tol=1e-3, random_state=42)
sgd.fit(X_train, y_train)
print('R²:', sgd.score(X_test, y_test))

# 流式数据（partial_fit）
for X_batch, y_batch in stream():
    sgd.partial_fit(X_batch, y_batch)`}
                        </pre>
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

              {/* MODULE 06: 聚类算法 */}
              <section id="clustering">
                <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 shadow-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1 h-8 bg-white rounded-full"></div>
                      <h2 className="text-2xl font-bold text-white">🎯 06. 聚类算法</h2>
                    </div>
                    <p className="text-cyan-50 ml-7">无监督学习利器，客户分群、商品归类的最佳选择</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6 space-y-6">
                      {/* 聚类算法对比 */}
                      <div>
                        <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-cyan-500/30' : 'border-cyan-200'}`}>
                          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-teal-400' : 'from-cyan-600 to-teal-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span className="text-2xl">🎯</span>
                            <span>3大聚类算法对比</span>
                          </h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { algo: 'K-Means', desc: '划分最常用', pros: '快速简单', cons: '需指定K', use: '客户分群' },
                            { algo: 'DBSCAN', desc: '基于密度', pros: '自动发现簇数', cons: '参数敏感', use: '异常检测' },
                            { algo: '层次聚类', desc: '树形结构', pros: '可视化好', cons: '计算慢', use: '商品分类' }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-cyan-900/20 border border-cyan-700' : 'bg-cyan-50 border border-cyan-200'}`}>
                              <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>{item.algo}</p>
                              <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
                              <p className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>✓ {item.pros}</p>
                              <p className={`text-xs ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>✗ {item.cons}</p>
                              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>用途：{item.use}</p>
                </div>
              ))}
            </div>
          </div>

                      {/* K-Means */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} K-Means聚类 - 最常用 ⭐⭐⭐⭐⭐</h4>
                        <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# 1. 确定最佳K值（肘部法则）
inertias = []
K_range = range(2, 11)
for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X)
    inertias.append(kmeans.inertia_)

# 绘制肘部图
plt.plot(K_range, inertias, 'bo-')
plt.xlabel('Number of Clusters (K)')
plt.ylabel('Inertia')
plt.title('Elbow Method')
plt.show()

# 2. 训练K-Means（假设K=4）
kmeans = KMeans(n_clusters=4, random_state=42)
labels = kmeans.fit_predict(X)

# 3. 查看每个簇的统计
df['cluster'] = labels
print(df.groupby('cluster').mean())`}
                        </pre>
                      </div>

                      {/* 聚类可视化 */}
                      <div>
                        <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-teal-500/30' : 'border-teal-200'}`}>
                          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-teal-400 to-emerald-400' : 'from-teal-600 to-emerald-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span className="text-2xl">📊</span>
                            <span>聚类结果可视化</span>
                          </h3>
                        </div>
                        <ClusteringVisualization theme={theme} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* 模块分隔符 */}
              <div className="relative flex items-center justify-center py-4">
                <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                </div>
                <div className="relative px-4 text-yellow-500 font-bold">◆ ◆ ◆</div>
              </div>

              {/* MODULE 07: 模型评估与调优 */}
              <section id="evaluation">
                <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 shadow-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1 h-8 bg-white rounded-full"></div>
                      <h2 className="text-2xl font-bold text-white">📊 07. 模型评估与调优</h2>
                    </div>
                    <p className="text-yellow-50 ml-7">选对指标、调好参数，让模型性能提升30%</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6 space-y-6">
                      {/* 评估指标 */}
                      <div>
                        <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-yellow-500/30' : 'border-yellow-200'}`}>
                          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-yellow-400 to-amber-400' : 'from-yellow-600 to-amber-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span className="text-2xl">🎯</span>
                            <span>分类与回归评估指标 ⭐⭐⭐⭐⭐</span>
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                            <p className={`font-bold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>分类指标</p>
                            <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                              <li>• <strong>Accuracy</strong>: 总体准确率（样本均衡时用）</li>
                              <li>• <strong>Precision</strong>: 查准率（减少误报）</li>
                              <li>• <strong>Recall</strong>: 查全率（减少漏报）</li>
                              <li>• <strong>F1-Score</strong>: P和R的调和平均</li>
                              <li>• <strong>AUC-ROC</strong>: 分类能力综合评价</li>
                            </ul>
                          </div>
                          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                            <p className={`font-bold mb-2 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>回归指标</p>
                            <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                              <li>• <strong>MAE</strong>: 平均绝对误差（易理解）</li>
                              <li>• <strong>MSE</strong>: 均方误差（惩罚大误差）</li>
                              <li>• <strong>RMSE</strong>: 均方根误差（同单位）</li>
                              <li>• <strong>R²</strong>: 决定系数（解释方差）</li>
                              <li>• <strong>MAPE</strong>: 平均绝对百分比误差</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* 交叉验证 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>🔁 交叉验证 - 防止过拟合必备 ⭐⭐⭐⭐⭐</h4>
                        <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`from sklearn.model_selection import cross_val_score, KFold

# K折交叉验证
kfold = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=kfold, scoring='accuracy')

print(f"交叉验证得分: {scores}")
print(f"平均得分: {scores.mean():.4f}")
print(f"标准差: {scores.std():.4f}")`}
                        </pre>
                      </div>

                      {/* 超参数调优 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>⚙ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 超参数调优 - GridSearchCV ⭐⭐⭐⭐⭐</h4>
                        <pre className={`text-xs p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'}`}>
{`from sklearn.model_selection import GridSearchCV

# 定义参数网格
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, 15],
    'min_samples_split': [2, 5, 10]
}

# 网格搜索
grid_search = GridSearchCV(
    RandomForestClassifier(),
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1
)
grid_search.fit(X_train, y_train)

print("最佳参数:", grid_search.best_params_)
print("最佳得分:", grid_search.best_score_)`}
                        </pre>
                      </div>

                      {/* 学习曲线 */}
                      <div>
                        <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-amber-500/30' : 'border-amber-200'}`}>
                          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-amber-400 to-orange-400' : 'from-amber-600 to-orange-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                            <span className="text-2xl">📈</span>
                            <span>学习曲线可视化</span>
                          </h3>
                        </div>
                        <LearningCurveChart theme={theme} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* 样本不均衡处理模块 */}
              <ImbalancedDataModule theme={theme} />

              {/* 模型解释性模块 */}
              <ModelInterpretabilityModule theme={theme} />

              {/* 时间序列预测模块 */}
              <TimeSeriesModule theme={theme} />

              {/* 异常检测模块 */}
              <AnomalyDetectionModule theme={theme} />

              {/* 降维与可视化模块 */}
              <DimensionalityReductionModule theme={theme} />

              {/* 集成学习模块 */}
              <EnsembleLearningModule theme={theme} />

              {/* 模型部署与监控模块 */}
              <ModelDeploymentModule theme={theme} />

              {/* 模块分隔符 */}
              <div className="relative flex items-center justify-center py-4">
                <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
                </div>
                <div className="relative px-4 text-indigo-500 font-bold">◆ ◆ ◆</div>
              </div>

              {/* 重复简化版已彻底删除；保留 advanced-modules.tsx 中的正式实现 */}

              {/* 页面末尾速查：模型选择与工具 */}
              <section id="ml-cheatsheet" className="mt-8">
                <div className={`rounded-xl p-6 mb-6 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
                  <div className="mb-4">
                    <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>🧭 模型选择与使用建议（速查）</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} border-b-2`}>
                          <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>场景</th>
                          <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>推荐模型</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { scene: '小数据集 + 可解释性', model: '决策树、逻辑回归' },
                          { scene: '高维稀疏数据', model: '朴素贝叶斯、Lasso' },
                          { scene: '大数据集', model: 'SGDRegressor、随机森林、XGBoost' },
                          { scene: '非线性关系', model: '随机森林、GBDT、XGBoost' },
                          { scene: '异常检测', model: '孤立森林、DBSCAN' }
                        ].map((row, idx) => (
                          <tr key={idx} className={`${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                            <td className={`py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.scene}</td>
                            <td className={`py-2 px-3 font-semibold ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>{row.model}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
                  <div className="mb-4">
                    <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>🧰 工具与框架（速查）</h2>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>scikit-learn</p>
                      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>传统机器学习全流程</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>XGBoost</p>
                      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>高效Boosting集成</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>joblib</p>
                      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>模型保存与加载（.pkl）</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>LightGBM</p>
                      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>高性能梯度提升树</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>CatBoost</p>
                      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>类别特征友好</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Prophet</p>
                      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>时间序列快速建模</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>pmdarima</p>
                      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>auto_arima自动定阶</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>umap-learn</p>
                      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>非线性降维/可视化</p>
                    </div>
                  </div>
                </div>

                <div className={`mt-6 rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
                  <div className="mb-3">
                    <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>🧩 一屏模板：训练 → 验证 → 保存 → 服务化</h2>
                  </div>
                  <pre className={`text-xs p-3 rounded overflow-x-auto ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-gray-50 text-gray-800'}`}>
{`# 0) 数据载入
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.linear_model import LogisticRegression
import joblib

df = pd.read_csv('data.csv')
X = df.drop(columns=['label'])
y = df['label']

# 1) 切分数据
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# 2) 训练基线模型（可换成 RF/XGB/LGB）
model = LogisticRegression(max_iter=1000, n_jobs=-1)
model.fit(X_train, y_train)

# 3) 验证评估
y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]
print(classification_report(y_test, y_pred))
print('AUC:', roc_auc_score(y_test, y_proba))

# 4) 保存模型与列名（上线需要一致的特征顺序）
joblib.dump({'model': model, 'columns': X.columns.tolist()}, 'model.pkl')

# 5) FastAPI 服务化（保存为 app.py 后启动：uvicorn app:app --reload）
from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np

bundle = joblib.load('model.pkl')
mdl, cols = bundle['model'], bundle['columns']

class Item(BaseModel):
    features: dict  # 传入字典 {feature: value}

app = FastAPI()

@app.post('/predict')
def predict(item: Item):
    x = np.array([[item.features.get(c, 0) for c in cols]])
    proba = float(mdl.predict_proba(x)[0, 1])
    pred = int(proba >= 0.5)
    return {'pred': pred, 'prob': proba}`}
                  </pre>
                </div>
              </section>
            </div>
          </main>
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
