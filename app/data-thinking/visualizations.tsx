import React from 'react'

interface VisualizationProps {
  theme: 'dark' | 'light' | string
}

// 象限法可视化
export const QuadrantChart: React.FC<VisualizationProps> = ({ theme }) => (
  <svg viewBox="0 0 200 200" className="w-full h-auto">
    {/* 坐标轴 */}
    <line x1="100" y1="10" x2="100" y2="190" stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'} strokeWidth="2"/>
    <line x1="10" y1="100" x2="190" y2="100" stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'} strokeWidth="2"/>
    
    {/* 象限背景 */}
    <rect x="100" y="10" width="90" height="90" fill="#EF4444" opacity="0.2"/>
    <rect x="10" y="10" width="90" height="90" fill="#F59E0B" opacity="0.2"/>
    <rect x="10" y="100" width="90" height="90" fill="#10B981" opacity="0.2"/>
    <rect x="100" y="100" width="90" height="90" fill="#3B82F6" opacity="0.2"/>
    
    {/* 象限文字 */}
    <text x="145" y="40" fill={theme === 'dark' ? '#FCA5A5' : '#DC2626'} fontSize="10" fontWeight="bold" textAnchor="middle">高价值</text>
    <text x="145" y="52" fill={theme === 'dark' ? '#FCA5A5' : '#DC2626'} fontSize="10" fontWeight="bold" textAnchor="middle">高流失</text>
    <text x="145" y="64" fill={theme === 'dark' ? '#FCA5A5' : '#DC2626'} fontSize="9" textAnchor="middle">重点召回</text>
    
    <text x="55" y="40" fill={theme === 'dark' ? '#FCD34D' : '#D97706'} fontSize="10" fontWeight="bold" textAnchor="middle">低价值</text>
    <text x="55" y="52" fill={theme === 'dark' ? '#FCD34D' : '#D97706'} fontSize="10" fontWeight="bold" textAnchor="middle">高流失</text>
    <text x="55" y="64" fill={theme === 'dark' ? '#FCD34D' : '#D97706'} fontSize="9" textAnchor="middle">放弃</text>
    
    <text x="55" y="140" fill={theme === 'dark' ? '#6EE7B7' : '#059669'} fontSize="10" fontWeight="bold" textAnchor="middle">低价值</text>
    <text x="55" y="152" fill={theme === 'dark' ? '#6EE7B7' : '#059669'} fontSize="10" fontWeight="bold" textAnchor="middle">低流失</text>
    <text x="55" y="164" fill={theme === 'dark' ? '#6EE7B7' : '#059669'} fontSize="9" textAnchor="middle">维持</text>
    
    <text x="145" y="140" fill={theme === 'dark' ? '#93C5FD' : '#2563EB'} fontSize="10" fontWeight="bold" textAnchor="middle">高价值</text>
    <text x="145" y="152" fill={theme === 'dark' ? '#93C5FD' : '#2563EB'} fontSize="10" fontWeight="bold" textAnchor="middle">低流失</text>
    <text x="145" y="164" fill={theme === 'dark' ? '#93C5FD' : '#2563EB'} fontSize="9" textAnchor="middle">VIP维护</text>
    
    {/* 坐标轴标签 */}
    <text x="100" y="8" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="9" textAnchor="middle">流失风险↑</text>
    <text x="192" y="105" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="9" textAnchor="start">用户价值→</text>
  </svg>
)

// 对比法可视化
export const ComparisonChart: React.FC<VisualizationProps> = ({ theme }) => (
  <svg viewBox="0 0 200 120" className="w-full h-auto">
    {/* 基准线 */}
    <line x1="20" y1="100" x2="180" y2="100" stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'} strokeWidth="1"/>
    
    {/* 柱状图 - 同比 */}
    <rect x="25" y="40" width="25" height="60" fill="#3B82F6" opacity="0.7"/>
    <rect x="52" y="50" width="25" height="50" fill="#93C5FD" opacity="0.7"/>
    <text x="37.5" y="35" fill={theme === 'dark' ? '#93C5FD' : '#2563EB'} fontSize="9" textAnchor="middle">今年</text>
    <text x="64.5" y="45" fill={theme === 'dark' ? '#93C5FD' : '#60A5FA'} fontSize="9" textAnchor="middle">去年</text>
    <text x="50" y="112" fill={theme === 'dark' ? '#D1D5DB' : '#6B7280'} fontSize="8" textAnchor="middle">同比</text>
    
    {/* 柱状图 - 环比 */}
    <rect x="90" y="30" width="25" height="70" fill="#10B981" opacity="0.7"/>
    <rect x="117" y="45" width="25" height="55" fill="#6EE7B7" opacity="0.7"/>
    <text x="102.5" y="25" fill={theme === 'dark' ? '#6EE7B7' : '#059669'} fontSize="9" textAnchor="middle">本月</text>
    <text x="129.5" y="40" fill={theme === 'dark' ? '#6EE7B7' : '#34D399'} fontSize="9" textAnchor="middle">上月</text>
    <text x="115" y="112" fill={theme === 'dark' ? '#D1D5DB' : '#6B7280'} fontSize="8" textAnchor="middle">环比</text>
    
    {/* 柱状图 - 目标对比 */}
    <rect x="155" y="35" width="25" height="65" fill="#F59E0B" opacity="0.7"/>
    <line x1="152" y1="55" x2="183" y2="55" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,3"/>
    <text x="167.5" y="30" fill={theme === 'dark' ? '#FCD34D' : '#D97706'} fontSize="9" textAnchor="middle">实际</text>
    <text x="167.5" y="52" fill={theme === 'dark' ? '#FCA5A5' : '#DC2626'} fontSize="8" textAnchor="middle">目标</text>
    <text x="167.5" y="112" fill={theme === 'dark' ? '#D1D5DB' : '#6B7280'} fontSize="8" textAnchor="middle">目标对比</text>
  </svg>
)

// 漏斗法可视化
export const FunnelChart: React.FC<VisualizationProps> = ({ theme }) => (
  <svg viewBox="0 0 200 160" className="w-full h-auto">
    {/* 漏斗层级 */}
    <polygon points="40,20 160,20 150,45 50,45" fill="#3B82F6" opacity="0.7"/>
    <polygon points="50,45 150,45 140,70 60,70" fill="#10B981" opacity="0.7"/>
    <polygon points="60,70 140,70 130,95 70,95" fill="#F59E0B" opacity="0.7"/>
    <polygon points="70,95 130,95 120,120 80,120" fill="#EF4444" opacity="0.7"/>
    <polygon points="80,120 120,120 110,145 90,145" fill="#8B5CF6" opacity="0.7"/>
    
    {/* 文字标签 */}
    <text x="100" y="35" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">浏览 10000</text>
    <text x="100" y="60" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">加购 3000 (30%)</text>
    <text x="100" y="85" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">下单 1500 (15%)</text>
    <text x="100" y="110" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">支付 1200 (12%)</text>
    <text x="100" y="135" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">复购 240 (2.4%)</text>
    
    {/* 转化率箭头 */}
    <text x="168" y="57" fill={theme === 'dark' ? '#6EE7B7' : '#059669'} fontSize="8" textAnchor="start">↓50%</text>
    <text x="168" y="82" fill={theme === 'dark' ? '#FCA5A5' : '#DC2626'} fontSize="8" textAnchor="start">↓50%</text>
    <text x="168" y="107" fill={theme === 'dark' ? '#6EE7B7' : '#059669'} fontSize="8" textAnchor="start">↓80%</text>
    <text x="168" y="132" fill={theme === 'dark' ? '#FCA5A5' : '#DC2626'} fontSize="8" textAnchor="start">↓20%</text>
  </svg>
)

// 金字塔原理可视化
export const PyramidChart: React.FC<VisualizationProps> = ({ theme }) => (
  <svg viewBox="0 0 200 160" className="w-full h-auto">
    {/* 金字塔层级 */}
    <polygon points="100,20 70,60 130,60" fill="#3B82F6" opacity="0.8"/>
    <polygon points="70,60 50,100 150,100" fill="#10B981" opacity="0.7"/>
    <polygon points="50,100 30,140 170,140" fill="#F59E0B" opacity="0.6"/>
    
    {/* 文字标签 */}
    <text x="100" y="45" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">结论</text>
    <text x="100" y="85" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">原因分析</text>
    <text x="100" y="125" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">数据证据</text>
    
    {/* 连接线 */}
    <line x1="100" y1="60" x2="80" y2="100" stroke={theme === 'dark' ? '#93C5FD' : '#60A5FA'} strokeWidth="1.5" strokeDasharray="2,2"/>
    <line x1="100" y1="60" x2="120" y2="100" stroke={theme === 'dark' ? '#93C5FD' : '#60A5FA'} strokeWidth="1.5" strokeDasharray="2,2"/>
    <line x1="80" y1="100" x2="60" y2="140" stroke={theme === 'dark' ? '#6EE7B7' : '#34D399'} strokeWidth="1.5" strokeDasharray="2,2"/>
    <line x1="80" y1="100" x2="100" y2="140" stroke={theme === 'dark' ? '#6EE7B7' : '#34D399'} strokeWidth="1.5" strokeDasharray="2,2"/>
    <line x1="120" y1="100" x2="100" y2="140" stroke={theme === 'dark' ? '#6EE7B7' : '#34D399'} strokeWidth="1.5" strokeDasharray="2,2"/>
    <line x1="120" y1="100" x2="140" y2="140" stroke={theme === 'dark' ? '#6EE7B7' : '#34D399'} strokeWidth="1.5" strokeDasharray="2,2"/>
    
    {/* 标题 */}
    <text x="100" y="15" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="9" fontWeight="bold" textAnchor="middle">结论先行·以上统下</text>
  </svg>
)

// MECE树状图可视化
export const MECETreeChart: React.FC<VisualizationProps> = ({ theme }) => (
  <svg viewBox="0 0 200 140" className="w-full h-auto">
    {/* 根节点 */}
    <rect x="75" y="10" width="50" height="20" fill="#3B82F6" opacity="0.8" rx="3"/>
    <text x="100" y="23" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">销量下降</text>
    
    {/* 第一层分支 */}
    <rect x="20" y="50" width="35" height="18" fill="#10B981" opacity="0.7" rx="2"/>
    <text x="37.5" y="62" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">时间</text>
    
    <rect x="65" y="50" width="35" height="18" fill="#10B981" opacity="0.7" rx="2"/>
    <text x="82.5" y="62" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">地区</text>
    
    <rect x="110" y="50" width="35" height="18" fill="#10B981" opacity="0.7" rx="2"/>
    <text x="127.5" y="62" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">人群</text>
    
    <rect x="155" y="50" width="35" height="18" fill="#10B981" opacity="0.7" rx="2"/>
    <text x="172.5" y="62" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">竞品</text>
    
    {/* 第二层示例分支 */}
    <rect x="10" y="90" width="25" height="15" fill="#F59E0B" opacity="0.6" rx="2"/>
    <text x="22.5" y="100" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">Q1</text>
    
    <rect x="40" y="90" width="25" height="15" fill="#F59E0B" opacity="0.6" rx="2"/>
    <text x="52.5" y="100" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">Q2</text>
    
    <rect x="60" y="90" width="30" height="15" fill="#F59E0B" opacity="0.6" rx="2"/>
    <text x="75" y="100" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">华东</text>
    
    <rect x="95" y="90" width="30" height="15" fill="#F59E0B" opacity="0.6" rx="2"/>
    <text x="110" y="100" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">华北</text>
    
    {/* 连接线 */}
    <line x1="100" y1="30" x2="37.5" y2="50" stroke={theme === 'dark' ? '#93C5FD' : '#60A5FA'} strokeWidth="1.5"/>
    <line x1="100" y1="30" x2="82.5" y2="50" stroke={theme === 'dark' ? '#93C5FD' : '#60A5FA'} strokeWidth="1.5"/>
    <line x1="100" y1="30" x2="127.5" y2="50" stroke={theme === 'dark' ? '#93C5FD' : '#60A5FA'} strokeWidth="1.5"/>
    <line x1="100" y1="30" x2="172.5" y2="50" stroke={theme === 'dark' ? '#93C5FD' : '#60A5FA'} strokeWidth="1.5"/>
    
    <line x1="37.5" y1="68" x2="22.5" y2="90" stroke={theme === 'dark' ? '#6EE7B7' : '#34D399'} strokeWidth="1"/>
    <line x1="37.5" y1="68" x2="52.5" y2="90" stroke={theme === 'dark' ? '#6EE7B7' : '#34D399'} strokeWidth="1"/>
    <line x1="82.5" y1="68" x2="75" y2="90" stroke={theme === 'dark' ? '#6EE7B7' : '#34D399'} strokeWidth="1"/>
    <line x1="82.5" y1="68" x2="110" y2="90" stroke={theme === 'dark' ? '#6EE7B7' : '#34D399'} strokeWidth="1"/>
    
    {/* MECE标注 */}
    <text x="100" y="125" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="8" fontWeight="bold" textAnchor="middle">相互独立 · 完全穷尽</text>
    <text x="100" y="135" fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize="7" textAnchor="middle">(Mutually Exclusive, Collectively Exhaustive)</text>
  </svg>
)

// 多维立方体可视化
export const CubeChart: React.FC<VisualizationProps> = ({ theme }) => (
  <svg viewBox="0 0 200 160" className="w-full h-auto">
    {/* 立方体 */}
    {/* 前面 */}
    <polygon points="60,80 140,80 140,140 60,140" fill="#3B82F6" opacity="0.3" stroke={theme === 'dark' ? '#93C5FD' : '#2563EB'} strokeWidth="2"/>
    {/* 顶面 */}
    <polygon points="60,80 100,50 180,50 140,80" fill="#10B981" opacity="0.3" stroke={theme === 'dark' ? '#6EE7B7' : '#059669'} strokeWidth="2"/>
    {/* 右面 */}
    <polygon points="140,80 180,50 180,110 140,140" fill="#F59E0B" opacity="0.3" stroke={theme === 'dark' ? '#FCD34D' : '#D97706'} strokeWidth="2"/>
    
    {/* 维度标签 */}
    <text x="30" y="110" fill={theme === 'dark' ? '#93C5FD' : '#2563EB'} fontSize="10" fontWeight="bold" textAnchor="end">品类</text>
    <text x="120" y="45" fill={theme === 'dark' ? '#6EE7B7' : '#059669'} fontSize="10" fontWeight="bold" textAnchor="middle">时间</text>
    <text x="190" y="80" fill={theme === 'dark' ? '#FCD34D' : '#D97706'} fontSize="10" fontWeight="bold" textAnchor="start">地区</text>
    
    {/* 示例数据点 */}
    <circle cx="100" cy="100" r="4" fill="#EF4444"/>
    <text x="105" y="95" fill={theme === 'dark' ? '#FCA5A5' : '#DC2626'} fontSize="8" textAnchor="start">华东·纸质书·Q1</text>
    
    <circle cx="120" cy="90" r="3" fill="#8B5CF6"/>
    <circle cx="80" cy="110" r="3" fill="#EC4899"/>
    
    {/* 标题 */}
    <text x="100" y="20" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="10" fontWeight="bold" textAnchor="middle">三维数据立方体</text>
    <text x="100" y="155" fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize="8" textAnchor="middle">任意维度交叉下钻</text>
  </svg>
)

// 二八法可视化 (帕累托图)
export const ParetoChart: React.FC<VisualizationProps> = ({ theme }) => (
  <svg viewBox="0 0 200 140" className="w-full h-auto">
    {/* 坐标轴 */}
    <line x1="30" y1="110" x2="180" y2="110" stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'} strokeWidth="2"/>
    <line x1="30" y1="20" x2="30" y2="110" stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'} strokeWidth="2"/>
    
    {/* 柱状图 - 递减 */}
    <rect x="40" y="30" width="20" height="80" fill="#3B82F6" opacity="0.8"/>
    <rect x="65" y="45" width="20" height="65" fill="#10B981" opacity="0.8"/>
    <rect x="90" y="60" width="20" height="50" fill="#F59E0B" opacity="0.8"/>
    <rect x="115" y="75" width="20" height="35" fill="#EF4444" opacity="0.7"/>
    <rect x="140" y="90" width="20" height="20" fill="#8B5CF6" opacity="0.6"/>
    <rect x="165" y="100" width="20" height="10" fill="#EC4899" opacity="0.5"/>
    
    {/* SKU标签 */}
    <text x="50" y="122" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="7" textAnchor="middle">A</text>
    <text x="75" y="122" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="7" textAnchor="middle">B</text>
    <text x="100" y="122" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="7" textAnchor="middle">C</text>
    <text x="125" y="122" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="7" textAnchor="middle">D</text>
    <text x="150" y="122" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="7" textAnchor="middle">E</text>
    <text x="175" y="122" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="7" textAnchor="middle">其他</text>
    
    {/* 累计百分比曲线 */}
    <polyline 
      points="50,30 75,40 100,50 125,65 150,85 175,95" 
      fill="none" 
      stroke="#EF4444" 
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* 曲线点 */}
    <circle cx="50" cy="30" r="3" fill="#EF4444"/>
    <circle cx="75" cy="40" r="3" fill="#EF4444"/>
    <circle cx="100" cy="50" r="3" fill="#EF4444"/>
    <circle cx="125" cy="65" r="3" fill="#EF4444"/>
    <circle cx="150" cy="85" r="3" fill="#EF4444"/>
    <circle cx="175" cy="95" r="3" fill="#EF4444"/>
    
    {/* 80%线 */}
    <line x1="30" y1="50" x2="100" y2="50" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4,2"/>
    <line x1="100" y1="50" x2="100" y2="110" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4,2"/>
    
    {/* 标注 */}
    <text x="100" y="15" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="10" fontWeight="bold" textAnchor="middle">帕累托图（二八法则）</text>
    <text x="105" y="48" fill={theme === 'dark' ? '#6EE7B7' : '#059669'} fontSize="8" fontWeight="bold" textAnchor="start">80%</text>
    <text x="100" y="135" fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize="8" textAnchor="middle">← 20%产品 →</text>
  </svg>
)

// 假设法可视化 (推算示意图)
export const HypothesisChart: React.FC<VisualizationProps> = ({ theme }) => (
  <svg viewBox="0 0 200 140" className="w-full h-auto">
    {/* 已知数据 */}
    <rect x="20" y="40" width="60" height="30" fill="#3B82F6" opacity="0.7" rx="4"/>
    <text x="50" y="52" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">已知数据</text>
    <text x="50" y="63" fill="white" fontSize="8" textAnchor="middle">评论数=500</text>
    
    {/* 箭头 */}
    <line x1="80" y1="55" x2="115" y2="55" stroke={theme === 'dark' ? '#93C5FD' : '#2563EB'} strokeWidth="2"/>
    <polygon points="115,55 108,52 108,58" fill={theme === 'dark' ? '#93C5FD' : '#2563EB'}/>
    
    {/* 假设 */}
    <rect x="120" y="30" width="60" height="50" fill="#F59E0B" opacity="0.7" rx="4"/>
    <text x="150" y="45" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">假设条件</text>
    <text x="150" y="56" fill="white" fontSize="7" textAnchor="middle">评论率=5%</text>
    <text x="150" y="66" fill="white" fontSize="7" textAnchor="middle">(行业基准)</text>
    <text x="150" y="75" fill="white" fontSize="7" textAnchor="middle">评论率=评论/订单</text>
    
    {/* 箭头向下 */}
    <line x1="150" y1="80" x2="150" y2="95" stroke={theme === 'dark' ? '#FCD34D' : '#D97706'} strokeWidth="2"/>
    <polygon points="150,95 147,88 153,88" fill={theme === 'dark' ? '#FCD34D' : '#D97706'}/>
    
    {/* 推算结果 */}
    <rect x="120" y="100" width="60" height="30" fill="#10B981" opacity="0.7" rx="4"/>
    <text x="150" y="112" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">推算结果</text>
    <text x="150" y="123" fill="white" fontSize="8" textAnchor="middle">订单≈10000</text>
    
    {/* 公式 */}
    <text x="30" y="110" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="8" textAnchor="start">订单 = 评论 ÷ 评论率</text>
    <text x="30" y="120" fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize="7" textAnchor="start">= 500 ÷ 5%</text>
    <text x="30" y="130" fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize="7" textAnchor="start">= 10000</text>
    
    {/* 标题 */}
    <text x="100" y="15" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="10" fontWeight="bold" textAnchor="middle">假设法推算流程</text>
  </svg>
)

// 指数法可视化 (加权合成)
export const IndexChart: React.FC<VisualizationProps> = ({ theme }) => (
  <svg viewBox="0 0 200 150" className="w-full h-auto">
    {/* 三个指标 */}
    <rect x="20" y="30" width="50" height="25" fill="#3B82F6" opacity="0.7" rx="3"/>
    <text x="45" y="40" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">UV</text>
    <text x="45" y="50" fill="white" fontSize="7" textAnchor="middle">10000</text>
    
    <rect x="20" y="65" width="50" height="25" fill="#10B981" opacity="0.7" rx="3"/>
    <text x="45" y="75" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">评论数</text>
    <text x="45" y="85" fill="white" fontSize="7" textAnchor="middle">500</text>
    
    <rect x="20" y="100" width="50" height="25" fill="#F59E0B" opacity="0.7" rx="3"/>
    <text x="45" y="110" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">时间</text>
    <text x="45" y="120" fill="white" fontSize="7" textAnchor="middle">7天前</text>
    
    {/* 权重 */}
    <text x="80" y="45" fill={theme === 'dark' ? '#93C5FD' : '#2563EB'} fontSize="9" fontWeight="bold" textAnchor="start">× 0.5</text>
    <text x="80" y="80" fill={theme === 'dark' ? '#6EE7B7' : '#059669'} fontSize="9" fontWeight="bold" textAnchor="start">× 0.3</text>
    <text x="80" y="115" fill={theme === 'dark' ? '#FCD34D' : '#D97706'} fontSize="9" fontWeight="bold" textAnchor="start">× 0.2</text>
    
    {/* 箭头 */}
    <line x1="110" y1="42" x2="125" y2="70" stroke={theme === 'dark' ? '#93C5FD' : '#2563EB'} strokeWidth="1.5"/>
    <line x1="110" y1="77" x2="125" y2="75" stroke={theme === 'dark' ? '#6EE7B7' : '#059669'} strokeWidth="1.5"/>
    <line x1="110" y1="112" x2="125" y2="80" stroke={theme === 'dark' ? '#FCD34D' : '#D97706'} strokeWidth="1.5"/>
    
    {/* 合成指数 */}
    <rect x="130" y="55" width="60" height="40" fill="#8B5CF6" opacity="0.8" rx="4"/>
    <text x="160" y="68" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">热度指数</text>
    <text x="160" y="80" fill="white" fontSize="9" textAnchor="middle">85.6分</text>
    <text x="160" y="90" fill="white" fontSize="7" textAnchor="middle">(综合评分)</text>
    
    {/* 公式说明 */}
    <text x="100" y="135" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="7" textAnchor="middle">热度 = 0.5×ln(UV) + 0.3×ln(评论) + 0.2×时间衰减</text>
    <text x="100" y="145" fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize="6" textAnchor="middle">权重和=1，可根据业务调整</text>
    
    {/* 标题 */}
    <text x="100" y="15" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="10" fontWeight="bold" textAnchor="middle">指数法：多指标加权合成</text>
  </svg>
)

// 用户行为序列分析可视化
export const UserBehaviorSequenceChart: React.FC<VisualizationProps> = ({ theme }) => (
  <svg viewBox="0 0 400 180" className="w-full h-auto">
    {/* 标题 */}
    <text x="200" y="20" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="12" fontWeight="bold" textAnchor="middle">用户行为序列示例：晚间音乐使用场景</text>
    
    {/* 时间轴 */}
    <line x1="40" y1="90" x2="360" y2="90" stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'} strokeWidth="2" markerEnd="url(#arrowhead)"/>
    
    {/* 箭头定义 */}
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill={theme === 'dark' ? '#6B7280' : '#9CA3AF'} />
      </marker>
    </defs>
    
    {/* 时间标签 */}
    <text x="40" y="105" fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize="8" textAnchor="middle">22:30</text>
    <text x="120" y="105" fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize="8" textAnchor="middle">22:45</text>
    <text x="200" y="105" fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize="8" textAnchor="middle">23:00</text>
    <text x="280" y="105" fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize="8" textAnchor="middle">23:15</text>
    <text x="360" y="105" fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize="8" textAnchor="middle">23:30</text>
    
    {/* 行为节点 */}
    {/* 节点1：打开App */}
    <circle cx="40" cy="90" r="6" fill="#3B82F6"/>
    <rect x="15" y="115" width="50" height="35" rx="4" fill="#3B82F6" opacity="0.15" stroke="#3B82F6" strokeWidth="1"/>
    <text x="40" y="128" fill={theme === 'dark' ? '#93C5FD' : '#2563EB'} fontSize="8" fontWeight="bold" textAnchor="middle">打开</text>
    <text x="40" y="137" fill={theme === 'dark' ? '#93C5FD' : '#2563EB'} fontSize="7" textAnchor="middle">音乐App</text>
    <text x="40" y="146" fill={theme === 'dark' ? '#6B7280' : '#9CA3AF'} fontSize="6" textAnchor="middle">播放记录</text>
    
    {/* 节点2：搜索 */}
    <circle cx="120" cy="90" r="6" fill="#8B5CF6"/>
    <rect x="95" y="115" width="50" height="35" rx="4" fill="#8B5CF6" opacity="0.15" stroke="#8B5CF6" strokeWidth="1"/>
    <text x="120" y="128" fill={theme === 'dark' ? '#C4B5FD' : '#7C3AED'} fontSize="8" fontWeight="bold" textAnchor="middle">搜索</text>
    <text x="120" y="137" fill={theme === 'dark' ? '#C4B5FD' : '#7C3AED'} fontSize="7" textAnchor="middle">"轻音乐"</text>
    <text x="120" y="146" fill={theme === 'dark' ? '#6B7280' : '#9CA3AF'} fontSize="6" textAnchor="middle">3个结果</text>
    
    {/* 节点3：切换单曲循环 */}
    <circle cx="200" cy="90" r="6" fill="#EC4899"/>
    <rect x="170" y="115" width="60" height="35" rx="4" fill="#EC4899" opacity="0.15" stroke="#EC4899" strokeWidth="1"/>
    <text x="200" y="128" fill={theme === 'dark' ? '#F9A8D4' : '#DB2777'} fontSize="8" fontWeight="bold" textAnchor="middle">切换</text>
    <text x="200" y="137" fill={theme === 'dark' ? '#F9A8D4' : '#DB2777'} fontSize="7" textAnchor="middle">单曲循环</text>
    <text x="200" y="146" fill={theme === 'dark' ? '#6B7280' : '#9CA3AF'} fontSize="6" textAnchor="middle">🔁 模式</text>
    
    {/* 节点4：降低音量 */}
    <circle cx="280" cy="90" r="6" fill="#F59E0B"/>
    <rect x="250" y="115" width="60" height="35" rx="4" fill="#F59E0B" opacity="0.15" stroke="#F59E0B" strokeWidth="1"/>
    <text x="280" y="128" fill={theme === 'dark' ? '#FCD34D' : '#D97706'} fontSize="8" fontWeight="bold" textAnchor="middle">调整</text>
    <text x="280" y="137" fill={theme === 'dark' ? '#FCD34D' : '#D97706'} fontSize="7" textAnchor="middle">音量20%</text>
    <text x="280" y="146" fill={theme === 'dark' ? '#6B7280' : '#9CA3AF'} fontSize="6" textAnchor="middle">🔉 渐弱</text>
    
    {/* 节点5：App后台 */}
    <circle cx="360" cy="90" r="6" fill="#10B981"/>
    <rect x="330" y="115" width="60" height="35" rx="4" fill="#10B981" opacity="0.15" stroke="#10B981" strokeWidth="1"/>
    <text x="360" y="128" fill={theme === 'dark' ? '#6EE7B7' : '#059669'} fontSize="8" fontWeight="bold" textAnchor="middle">切换</text>
    <text x="360" y="137" fill={theme === 'dark' ? '#6EE7B7' : '#059669'} fontSize="7" textAnchor="middle">后台播放</text>
    <text x="360" y="146" fill={theme === 'dark' ? '#6B7280' : '#9CA3AF'} fontSize="6" textAnchor="middle">锁屏</text>
    
    {/* 洞察标注 */}
    <rect x="100" y="40" width="200" height="30" rx="4" fill={theme === 'dark' ? '#1F2937' : '#FEF3C7'} stroke={theme === 'dark' ? '#F59E0B' : '#F59E0B'} strokeWidth="2"/>
    <text x="200" y="52" fill={theme === 'dark' ? '#FCD34D' : '#92400E'} fontSize="9" fontWeight="bold" textAnchor="middle">💡 洞察：典型睡眠场景</text>
    <text x="200" y="63" fill={theme === 'dark' ? '#FCD34D' : '#92400E'} fontSize="7" textAnchor="middle">用户希望音乐自动停止 → 建议增加「睡眠定时」功能</text>
    
    {/* 说明 */}
    <text x="200" y="170" fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize="7" textAnchor="middle">通过观察单个用户的完整行为序列，发现隐藏在聚合数据下的真实使用场景</text>
  </svg>
)

// 路径挖掘分析可视化（优化版）
export const PathMiningChart: React.FC<VisualizationProps> = ({ theme }) => (
  <svg viewBox="0 0 520 300" className="w-full h-auto">
    {/* 渐变定义 */}
    <defs>
      {/* 绿色流向渐变 */}
      <linearGradient id="greenFlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor: '#34D399', stopOpacity: 0.8}} />
        <stop offset="100%" style={{stopColor: '#10B981', stopOpacity: 0.9}} />
      </linearGradient>
      {/* 橙色流向渐变 */}
      <linearGradient id="orangeFlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor: '#FBBF24', stopOpacity: 0.7}} />
        <stop offset="100%" style={{stopColor: '#F59E0B', stopOpacity: 0.8}} />
      </linearGradient>
      {/* 红色流向渐变 */}
      <linearGradient id="redFlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor: '#F87171', stopOpacity: 0.6}} />
        <stop offset="100%" style={{stopColor: '#EF4444', stopOpacity: 0.7}} />
      </linearGradient>
      {/* 紫色流向渐变 */}
      <linearGradient id="purpleFlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor: '#A78BFA', stopOpacity: 0.7}} />
        <stop offset="100%" style={{stopColor: '#8B5CF6', stopOpacity: 0.8}} />
      </linearGradient>
      {/* 青色流向渐变 */}
      <linearGradient id="cyanFlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor: '#67E8F9', stopOpacity: 0.6}} />
        <stop offset="100%" style={{stopColor: '#06B6D4', stopOpacity: 0.7}} />
      </linearGradient>
    </defs>
    
    {/* 标题 */}
    <text x="260" y="25" fill={theme === 'dark' ? '#D1D5DB' : '#4B5563'} fontSize="14" fontWeight="bold" textAnchor="middle">路径挖掘示例：H5活动页正向流向分析</text>
    
    {/* 起始节点 - 更圆润的设计 */}
    <g filter="url(#shadow1)">
      <rect x="30" y="80" width="110" height="70" rx="12" fill="#3B82F6"/>
      <rect x="30" y="80" width="110" height="70" rx="12" fill="url(#blueGradient)" opacity="0.3"/>
    </g>
    <text x="85" y="102" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">H5活动页</text>
    <text x="85" y="118" fill="white" fontSize="9" opacity="0.9" textAnchor="middle">进入流量</text>
    <text x="85" y="138" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">10,000人</text>
    
    {/* 流向线和节点 */}
    
    {/* 路径1：注册（主流向 - 73%）*/}
    <g>
      {/* 粗渐变流向线 */}
      <path d="M 140 90 Q 200 90, 240 60" fill="none" stroke="url(#greenFlow)" strokeWidth="18" strokeLinecap="round"/>
      {/* 百分比标签 - 更醒目 */}
      <rect x="170" y="55" width="50" height="22" rx="11" fill="#10B981"/>
      <text x="195" y="70" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">73%</text>
      
      {/* 注册节点 - 更大更清晰 */}
      <rect x="240" y="45" width="100" height="65" rx="12" fill="#10B981"/>
      <text x="290" y="67" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">注册</text>
      <text x="290" y="83" fill="white" fontSize="11" textAnchor="middle">7,300人</text>
      <text x="290" y="100" fill="white" fontSize="9" opacity="0.9" textAnchor="middle">✅ 主流向</text>
    </g>
    
    {/* 路径2：浏览商品（次流向 - 15%）*/}
    <g>
      <path d="M 140 115 Q 200 115, 240 115" fill="none" stroke="url(#orangeFlow)" strokeWidth="8" strokeLinecap="round"/>
      <rect x="170" y="100" width="50" height="22" rx="11" fill="#F59E0B"/>
      <text x="195" y="115" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">15%</text>
      
      <rect x="240" y="115" width="100" height="65" rx="12" fill="#F59E0B"/>
      <text x="290" y="137" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">浏览商品</text>
      <text x="290" y="153" fill="white" fontSize="11" textAnchor="middle">1,500人</text>
      <text x="290" y="170" fill="white" fontSize="9" opacity="0.9" textAnchor="middle">📦 次流向</text>
    </g>
    
    {/* 路径3：直接退出（流失 - 12%）*/}
    <g>
      <path d="M 140 135 Q 200 145, 240 160" fill="none" stroke="url(#redFlow)" strokeWidth="6" strokeLinecap="round"/>
      <rect x="170" y="148" width="50" height="22" rx="11" fill="#EF4444"/>
      <text x="195" y="163" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">12%</text>
      
      <rect x="240" y="185" width="100" height="60" rx="12" fill="#EF4444"/>
      <text x="290" y="206" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">直接退出</text>
      <text x="290" y="222" fill="white" fontSize="11" textAnchor="middle">1,200人</text>
      <text x="290" y="237" fill="white" fontSize="9" opacity="0.9" textAnchor="middle">❌ 流失</text>
    </g>
    
    {/* 二级路径：注册→加购（45%）*/}
    <g>
      <path d="M 340 77 Q 380 77, 400 85" fill="none" stroke="url(#purpleFlow)" strokeWidth="9" strokeLinecap="round"/>
      <rect x="355" y="63" width="45" height="20" rx="10" fill="#8B5CF6"/>
      <text x="377.5" y="76" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">45%</text>
      
      <rect x="400" y="70" width="85" height="55" rx="10" fill="#8B5CF6"/>
      <text x="442.5" y="90" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">加购</text>
      <text x="442.5" y="105" fill="white" fontSize="10" textAnchor="middle">3,285人</text>
      <text x="442.5" y="118" fill="white" fontSize="8" textAnchor="middle">🛒</text>
    </g>
    
    {/* 二级路径：注册→继续浏览（30%）*/}
    <g>
      <path d="M 340 90 Q 380 100, 400 110" fill="none" stroke="url(#cyanFlow)" strokeWidth="6" strokeLinecap="round"/>
      <rect x="355" y="93" width="45" height="20" rx="10" fill="#06B6D4"/>
      <text x="377.5" y="106" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">30%</text>
      
      <rect x="400" y="135" width="85" height="50" rx="10" fill="#06B6D4"/>
      <text x="442.5" y="153" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">继续浏览</text>
      <text x="442.5" y="168" fill="white" fontSize="10" textAnchor="middle">2,190人</text>
    </g>
    
    {/* 洞察标注 - 更醒目的样式 */}
    <rect x="50" y="260" width="420" height="32" rx="6" fill={theme === 'dark' ? '#1E3A8A' : '#DBEAFE'} stroke="#3B82F6" strokeWidth="2"/>
    <text x="60" y="273" fill={theme === 'dark' ? '#60A5FA' : '#1E40AF'} fontSize="11" textAnchor="start">💡</text>
    <text x="80" y="273" fill={theme === 'dark' ? '#93C5FD' : '#1E40AF'} fontSize="11" fontWeight="bold" textAnchor="start">洞察：H5活动拉新效果显著</text>
    <text x="80" y="286" fill={theme === 'dark' ? '#93C5FD' : '#1E40AF'} fontSize="9" textAnchor="start">73%用户直接注册，后续45%加购 → 建议加大H5活动投放，优化注册流程</text>
    
    {/* 说明文字 */}
    <text x="260" y="295" fill={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize="7" textAnchor="middle" opacity="0.8">正向挖掘：从起点出发，观察用户流向哪里（线条粗细代表流量大小）</text>
    
    {/* 蓝色渐变定义（补充）*/}
    <defs>
      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: '#60A5FA', stopOpacity: 0.5}} />
        <stop offset="100%" style={{stopColor: '#3B82F6', stopOpacity: 0}} />
      </linearGradient>
    </defs>
  </svg>
)

