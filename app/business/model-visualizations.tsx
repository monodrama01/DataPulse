import React from 'react';

interface VisualizationProps {
  theme: string;
}

// AARRR 漏斗可视化
export const AARRRFunnel: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#e5e7eb' : '#1f2937';
  const accentColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
  
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto">
      {/* 背景 */}
      <rect width="800" height="500" fill={bgColor} rx="8" />
      
      {/* 漏斗形状 - 5层 */}
      {[
        { y: 50, width: 700, label: '获客 Acquisition', sublabel: '曝光→点击→下载→注册', color: accentColors[0] },
        { y: 130, width: 560, label: '激活 Activation', sublabel: '首次关键行为', color: accentColors[1] },
        { y: 210, width: 420, label: '留存 Retention', sublabel: '次日/7日/30日留存', color: accentColors[2] },
        { y: 290, width: 280, label: '收入 Revenue', sublabel: '付费转化→ARPU→LTV', color: accentColors[3] },
        { y: 370, width: 140, label: '传播 Referral', sublabel: '老带新 K因子', color: accentColors[4] }
      ].map((stage, idx) => {
        const x = (800 - stage.width) / 2;
        return (
          <g key={idx}>
            {/* 漏斗层 */}
            <rect 
              x={x} 
              y={stage.y} 
              width={stage.width} 
              height="60" 
              fill={stage.color} 
              fillOpacity="0.2"
              stroke={stage.color}
              strokeWidth="2"
              rx="4"
            />
            {/* 文字 */}
            <text 
              x="400" 
              y={stage.y + 25} 
              textAnchor="middle" 
              fill={stage.color}
              fontSize="18"
              fontWeight="bold"
            >
              {stage.label}
            </text>
            <text 
              x="400" 
              y={stage.y + 45} 
              textAnchor="middle" 
              fill={textColor}
              fontSize="12"
            >
              {stage.sublabel}
            </text>
          </g>
        );
      })}
      
      {/* 箭头 */}
      {[110, 190, 270, 350].map((y, idx) => (
        <path
          key={idx}
          d={`M 400 ${y} L 400 ${y + 20} L 395 ${y + 15} M 400 ${y + 20} L 405 ${y + 15}`}
          stroke={textColor}
          strokeWidth="2"
          fill="none"
        />
      ))}
      
      {/* 转化率标注 */}
      <text x="720" y="90" fill={textColor} fontSize="11">转化率↓</text>
      <text x="720" y="170" fill={textColor} fontSize="11">激活率</text>
      <text x="720" y="250" fill={textColor} fontSize="11">留存率</text>
      <text x="720" y="330" fill={textColor} fontSize="11">付费率</text>
      <text x="720" y="410" fill={textColor} fontSize="11">K因子</text>
    </svg>
  );
};

// 电商人货场模型
export const EcommerceFunnel: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#e5e7eb' : '#1f2937';
  
  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <rect width="800" height="400" fill={bgColor} rx="8" />
      
      {/* 三个维度 */}
      <g>
        {/* 人（流量）*/}
        <rect x="50" y="50" width="200" height="300" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" rx="8" />
        <text x="150" y="85" textAnchor="middle" fill="#3b82f6" fontSize="20" fontWeight="bold">人（流量）</text>
        <text x="150" y="120" textAnchor="middle" fill={textColor} fontSize="13">UV 独立访客</text>
        <text x="150" y="150" textAnchor="middle" fill={textColor} fontSize="13">新老客占比</text>
        <text x="150" y="180" textAnchor="middle" fill={textColor} fontSize="13">获客渠道ROI</text>
        <text x="150" y="210" textAnchor="middle" fill={textColor} fontSize="13">用户分层RFM</text>
        <text x="150" y="240" textAnchor="middle" fill={textColor} fontSize="13">地域分布</text>
        
        {/* 货（商品）*/}
        <rect x="300" y="50" width="200" height="300" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" rx="8" />
        <text x="400" y="85" textAnchor="middle" fill="#8b5cf6" fontSize="20" fontWeight="bold">货（商品）</text>
        <text x="400" y="120" textAnchor="middle" fill={textColor} fontSize="13">客单价</text>
        <text x="400" y="150" textAnchor="middle" fill={textColor} fontSize="13">件单价</text>
        <text x="400" y="180" textAnchor="middle" fill={textColor} fontSize="13">购物篮系数</text>
        <text x="400" y="210" textAnchor="middle" fill={textColor} fontSize="13">复购率 vs 回购率</text>
        <text x="400" y="240" textAnchor="middle" fill={textColor} fontSize="13">动销率</text>
        
        {/* 场（页面）*/}
        <rect x="550" y="50" width="200" height="300" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" rx="8" />
        <text x="650" y="85" textAnchor="middle" fill="#10b981" fontSize="20" fontWeight="bold">场（页面）</text>
        <text x="650" y="120" textAnchor="middle" fill={textColor} fontSize="13">商详页转化率</text>
        <text x="650" y="150" textAnchor="middle" fill={textColor} fontSize="13">加购转化率</text>
        <text x="650" y="180" textAnchor="middle" fill={textColor} fontSize="13">支付成功率</text>
        <text x="650" y="210" textAnchor="middle" fill={textColor} fontSize="13">购物车放弃率</text>
        <text x="650" y="240" textAnchor="middle" fill={textColor} fontSize="13">页面跳出率</text>
      </g>
      
      {/* 连接箭头 */}
      <path d="M 250 200 L 300 200" stroke={textColor} strokeWidth="2" markerEnd="url(#arrowhead)" />
      <path d="M 500 200 L 550 200" stroke={textColor} strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill={textColor} />
        </marker>
      </defs>
    </svg>
  );
};

// 市场营销漏斗
export const MarketingFunnel: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#e5e7eb' : '#1f2937';
  
  const stages = [
    { label: '潜在客户', desc: '品牌曝光', width: 600, color: '#3b82f6' },
    { label: '机会客户', desc: '线索收集', width: 480, color: '#8b5cf6' },
    { label: '新客', desc: '首次付费', width: 360, color: '#10b981' },
    { label: '老客', desc: 'CRM管理', width: 240, color: '#f59e0b' },
    { label: '忠诚客户', desc: '会员计划', width: 120, color: '#ef4444' }
  ];
  
  return (
    <svg viewBox="0 0 700 450" className="w-full h-auto">
      <rect width="700" height="450" fill={bgColor} rx="8" />
      
      {stages.map((stage, idx) => {
        const x = (700 - stage.width) / 2;
        const y = 50 + idx * 70;
        return (
          <g key={idx}>
            <rect 
              x={x} 
              y={y} 
              width={stage.width} 
              height="50" 
              fill={stage.color}
              fillOpacity="0.2"
              stroke={stage.color}
              strokeWidth="2"
              rx="4"
            />
            <text x="350" y={y + 22} textAnchor="middle" fill={stage.color} fontSize="16" fontWeight="bold">
              {stage.label}
            </text>
            <text x="350" y={y + 38} textAnchor="middle" fill={textColor} fontSize="12">
              {stage.desc}
            </text>
            {idx < stages.length - 1 && (
              <path
                d={`M 350 ${y + 50} L 350 ${y + 70} L 345 ${y + 65} M 350 ${y + 70} L 355 ${y + 65}`}
                stroke={textColor}
                strokeWidth="2"
                fill="none"
              />
            )}
          </g>
        );
      })}
      
      {/* 流失客户分支 */}
      <g>
        <path d="M 470 300 L 550 370" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
        <rect x="480" y="360" width="140" height="40" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2" rx="4" />
        <text x="550" y="383" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">流失客户</text>
        <text x="550" y="397" textAnchor="middle" fill={textColor} fontSize="11">召回活动</text>
      </g>
    </svg>
  );
};

// 流量来源模型
export const TrafficSourceModel: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#e5e7eb' : '#1f2937';
  
  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <rect width="800" height="400" fill={bgColor} rx="8" />
      
      {/* 四个来源 */}
      {[
        { x: 70, label: 'SEO', sublabel: '搜索引擎优化', color: '#3b82f6' },
        { x: 230, label: 'SEM', sublabel: '付费搜索', color: '#8b5cf6' },
        { x: 390, label: '外链', sublabel: '推荐流量', color: '#10b981' },
        { x: 550, label: '回访', sublabel: '直接访问', color: '#f59e0b' }
      ].map((source, idx) => (
        <g key={idx}>
          <rect x={source.x} y="40" width="120" height="60" fill={source.color} fillOpacity="0.2" stroke={source.color} strokeWidth="2" rx="6" />
          <text x={source.x + 60} y="65" textAnchor="middle" fill={source.color} fontSize="16" fontWeight="bold">{source.label}</text>
          <text x={source.x + 60} y="85" textAnchor="middle" fill={textColor} fontSize="11">{source.sublabel}</text>
          
          {/* 箭头指向落地页 */}
          <path d={`M ${source.x + 60} 100 L ${source.x + 60} 140`} stroke={source.color} strokeWidth="2" markerEnd="url(#arrow)" />
        </g>
      ))}
      
      {/* 落地页 */}
      <rect x="250" y="150" width="300" height="60" fill="#6366f1" fillOpacity="0.2" stroke="#6366f1" strokeWidth="3" rx="8" />
      <text x="400" y="175" textAnchor="middle" fill="#6366f1" fontSize="18" fontWeight="bold">落地页</text>
      <text x="400" y="195" textAnchor="middle" fill={textColor} fontSize="13">跳出率 / 转化率 / 停留时长</text>
      
      {/* 后续流程 */}
      <path d="M 400 210 L 400 250" stroke={textColor} strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* 三个分支 */}
      {[
        { x: 150, label: '注册', color: '#10b981' },
        { x: 350, label: '浏览', color: '#3b82f6' },
        { x: 550, label: '购买', color: '#ef4444' }
      ].map((action, idx) => (
        <g key={idx}>
          <path d={`M 400 250 L ${action.x + 50} 280`} stroke={textColor} strokeWidth="1.5" strokeDasharray="3,3" />
          <rect x={action.x} y="290" width="100" height="50" fill={action.color} fillOpacity="0.2" stroke={action.color} strokeWidth="2" rx="6" />
          <text x={action.x + 50} y="320" textAnchor="middle" fill={action.color} fontSize="14" fontWeight="bold">{action.label}</text>
        </g>
      ))}
      
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill={textColor} />
        </marker>
      </defs>
    </svg>
  );
};

// 内容平台双循环
export const ContentPlatformModel: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#e5e7eb' : '#1f2937';
  
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto">
      <rect width="800" height="500" fill={bgColor} rx="8" />
      
      {/* 中心 - 内容 */}
      <ellipse cx="400" cy="250" rx="100" ry="60" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="3" />
      <text x="400" y="245" textAnchor="middle" fill="#8b5cf6" fontSize="20" fontWeight="bold">内容池</text>
      <text x="400" y="265" textAnchor="middle" fill={textColor} fontSize="12">Feeds / 推荐</text>
      
      {/* 左侧 - 内容消费者 */}
      <g>
        <rect x="50" y="150" width="180" height="200" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" rx="8" />
        <text x="140" y="180" textAnchor="middle" fill="#3b82f6" fontSize="18" fontWeight="bold">内容消费者</text>
        <text x="140" y="210" textAnchor="middle" fill={textColor} fontSize="12">• 浏览</text>
        <text x="140" y="235" textAnchor="middle" fill={textColor} fontSize="12">• 点赞</text>
        <text x="140" y="260" textAnchor="middle" fill={textColor} fontSize="12">• 评论</text>
        <text x="140" y="285" textAnchor="middle" fill={textColor} fontSize="12">• 收藏</text>
        <text x="140" y="310" textAnchor="middle" fill={textColor} fontSize="12">• 关注</text>
        
        {/* 箭头 */}
        <path d="M 230 250 L 300 250" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue)" />
        <text x="265" y="240" textAnchor="middle" fill="#3b82f6" fontSize="11">消费</text>
      </g>
      
      {/* 右侧 - 内容生产者 */}
      <g>
        <rect x="570" y="150" width="180" height="200" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" rx="8" />
        <text x="660" y="180" textAnchor="middle" fill="#10b981" fontSize="18" fontWeight="bold">内容生产者</text>
        <text x="660" y="210" textAnchor="middle" fill={textColor} fontSize="12">• 发文</text>
        <text x="660" y="235" textAnchor="middle" fill={textColor} fontSize="12">• 获赞</text>
        <text x="660" y="260" textAnchor="middle" fill={textColor} fontSize="12">• 被关注</text>
        <text x="660" y="285" textAnchor="middle" fill={textColor} fontSize="12">• KOL成长</text>
        <text x="660" y="310" textAnchor="middle" fill={textColor} fontSize="12">• 变现</text>
        
        {/* 箭头 */}
        <path d="M 570 250 L 500 250" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />
        <text x="535" y="240" textAnchor="middle" fill="#10b981" fontSize="11">生产</text>
      </g>
      
      {/* 上方 - 激励 */}
      <g>
        <rect x="330" y="50" width="140" height="50" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" rx="6" />
        <text x="400" y="75" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">激励机制</text>
        <text x="400" y="92" textAnchor="middle" fill={textColor} fontSize="11">推荐算法</text>
        
        <path d="M 400 100 L 400 190" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
      </g>
      
      {/* 下方 - 指标 */}
      <g>
        <rect x="300" y="400" width="200" height="70" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2" rx="6" />
        <text x="400" y="425" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">核心指标</text>
        <text x="400" y="445" textAnchor="middle" fill={textColor} fontSize="11">内容指数 = 0.4×点赞+0.3×评论+0.3×收藏</text>
        <text x="400" y="462" textAnchor="middle" fill={textColor} fontSize="11">生产者渗透率 / 双边活跃度</text>
      </g>
      
      {/* 连接线 */}
      <path d="M 400 310 L 400 400" stroke={textColor} strokeWidth="1.5" strokeDasharray="3,3" />
      
      <defs>
        <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
        </marker>
        <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
        </marker>
      </defs>
    </svg>
  );
};

// 推送漏斗
export const PushFunnel: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#e5e7eb' : '#1f2937';
  
  const stages = [
    { label: '推送列表', width: 600, value: '100%', color: '#3b82f6' },
    { label: '成功推送', width: 480, value: '85%', color: '#8b5cf6' },
    { label: '有效推送', width: 360, value: '70%', color: '#10b981' },
    { label: '用户屏蔽', width: 240, value: '60%', color: '#f59e0b' },
    { label: '用户接收成功', width: 180, value: '45%', color: '#ef4444' },
    { label: '用户浏览到通知', width: 120, value: '30%', color: '#ec4899' },
    { label: '用户成功打开', width: 60, value: '8%', color: '#8b5cf6' }
  ];
  
  return (
    <svg viewBox="0 0 700 550" className="w-full h-auto">
      <rect width="700" height="550" fill={bgColor} rx="8" />
      
      <text x="350" y="30" textAnchor="middle" fill={textColor} fontSize="18" fontWeight="bold">
        推送激活转化率漏斗
      </text>
      
      {stages.map((stage, idx) => {
        const x = (700 - stage.width) / 2;
        const y = 60 + idx * 65;
        return (
          <g key={idx}>
            <rect 
              x={x} 
              y={y} 
              width={stage.width} 
              height="50" 
              fill={stage.color}
              fillOpacity="0.2"
              stroke={stage.color}
              strokeWidth="2"
              rx="4"
            />
            <text x="350" y={y + 25} textAnchor="middle" fill={stage.color} fontSize="14" fontWeight="bold">
              {stage.label}
            </text>
            <text x="350" y={y + 42} textAnchor="middle" fill={textColor} fontSize="12">
              {stage.value}
            </text>
            {idx < stages.length - 1 && (
              <path
                d={`M 350 ${y + 50} L 350 ${y + 65} L 345 ${y + 60} M 350 ${y + 65} L 355 ${y + 60}`}
                stroke={textColor}
                strokeWidth="2"
                fill="none"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

// 产品生命周期图（增强版）
export const ProductLifecycleChart: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#e5e7eb' : '#1f2937';
  
  const stages = [
    { 
      name: '探索期', 
      nameEn: 'introduction',
      color: '#3b82f6', 
      x: 150, 
      y: 320,
      focus: '计数工具',
      issue: '刚起步不完善',
      need: '验证',
      tool: '计数'
    },
    { 
      name: '成长期', 
      nameEn: 'growth',
      color: '#10b981', 
      x: 350, 
      y: 180,
      focus: '流量/内容/\n用户/业务导向',
      issue: '追求增长',
      need: '寻找用户量和业务规模化的方法',
      tool: '活量导向\n内容导向\n用户导向\n业务导向'
    },
    { 
      name: '成熟期', 
      nameEn: 'maturity',
      color: '#f59e0b', 
      x: 550, 
      y: 100,
      focus: '用户/业务导向',
      issue: '稳定',
      need: '业务稳定但更细致',
      tool: '用户导向\n业务导向'
    },
    { 
      name: '衰退期', 
      nameEn: 'decline',
      color: '#ef4444', 
      x: 700, 
      y: 230,
      focus: '用户导向',
      issue: '用户对产品兴趣下降',
      need: '延长产品生命周期',
      tool: '用户导向'
    }
  ];
  
  return (
    <svg viewBox="0 0 850 600" className="w-full h-auto">
      <rect width="850" height="600" fill={bgColor} rx="8" />
      
      {/* 标题 */}
      <text x="425" y="30" textAnchor="middle" fill={textColor} fontSize="18" fontWeight="bold">
        产品生命周期曲线图
      </text>
      
      {/* Y轴标签 */}
      <text x="40" y="250" textAnchor="middle" fill={textColor} fontSize="13" transform="rotate(-90, 40, 250)">
        活跃用户
      </text>
      
      {/* 坐标轴 */}
      <line x1="80" y1="420" x2="780" y2="420" stroke={textColor} strokeWidth="2" />
      <line x1="80" y1="60" x2="80" y2="420" stroke={textColor} strokeWidth="2" />
      
      {/* 阶段分隔虚线 */}
      {[250, 450, 630].map((x, idx) => (
        <line 
          key={idx}
          x1={x} 
          y1="60" 
          x2={x} 
          y2="420" 
          stroke={textColor} 
          strokeWidth="1" 
          strokeDasharray="5,5"
          opacity="0.3"
        />
      ))}
      
      {/* 生命周期曲线（紫色渐变） */}
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="33%" stopColor="#8b5cf6" />
          <stop offset="66%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <path 
        d="M100,410 Q150,380 200,340 Q300,220 400,120 Q500,70 580,90 Q650,110 750,230"
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="4"
      />
      
      {/* 阶段标记点和标签 */}
      {stages.map((stage, idx) => (
        <g key={idx}>
          {/* 标记点 */}
          <circle cx={stage.x} cy={stage.y} r="10" fill={stage.color} />
          <circle cx={stage.x} cy={stage.y} r="10" fill={stage.color} fillOpacity="0.3" />
          
          {/* 阶段名称（中文+英文） */}
          <text 
            x={stage.x} 
            y={stage.y > 200 ? stage.y + 35 : stage.y - 25} 
            textAnchor="middle" 
            fill={stage.color}
            fontSize="16"
            fontWeight="bold"
          >
            {stage.name}
          </text>
          <text 
            x={stage.x} 
            y={stage.y > 200 ? stage.y + 50 : stage.y - 10} 
            textAnchor="middle" 
            fill={textColor}
            fontSize="11"
            opacity="0.7"
          >
            {stage.nameEn}
          </text>
          
          {/* 关注点标注（在曲线上方） */}
          {stage.focus.split('\n').map((line, lineIdx) => (
            <text 
              key={lineIdx}
              x={stage.x} 
              y={stage.y - 40 - lineIdx * 14} 
              textAnchor="middle" 
              fill={textColor}
              fontSize="11"
              fontWeight="500"
            >
              {line}
            </text>
          ))}
        </g>
      ))}
      
      {/* X轴标签 */}
      <text x="425" y="455" textAnchor="middle" fill={textColor} fontSize="14">时间</text>
      
      {/* 底部总结文字 */}
      <text x="425" y="490" textAnchor="middle" fill={textColor} fontSize="13" fontWeight="600">
        公司不同阶段关注的业务重点不同，需不同的数据工具
      </text>
      
      {/* 详细说明 */}
      <text x="100" y="520" fill={textColor} fontSize="11" opacity="0.8">
        探索期 ← 用户的需求是否真实存在，我们的服务的确满足用户需求
      </text>
      <text x="100" y="540" fill={textColor} fontSize="11" opacity="0.8">
        成长期 ← 如果服务质量无法保证，无法支持持续增长
      </text>
      <text x="100" y="560" fill={textColor} fontSize="11" opacity="0.8">
        成熟期 ← 业务稳定但需更精细化运营，关注用户体验优化
      </text>
      <text x="100" y="580" fill={textColor} fontSize="11" opacity="0.8">
        根据公司阶段划分
      </text>
    </svg>
  );
};

// 核心指标定义4视角图
export const MetricPerspectivesChart: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#e5e7eb' : '#1f2937';
  const perspectives = [
    { name: '渠道视角', color: '#3b82f6', x: 200, y: 150 },
    { name: '运营视角', color: '#10b981', x: 600, y: 150 },
    { name: '产品视角', color: '#f59e0b', x: 200, y: 350 },
    { name: '研发视角', color: '#ef4444', x: 600, y: 350 }
  ];
  
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto">
      <rect width="800" height="500" fill={bgColor} rx="8" />
      
      {/* 中心圆 - "新用户"定义 */}
      <circle cx="400" cy="250" r="80" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="3" />
      <text x="400" y="245" textAnchor="middle" fill="#8b5cf6" fontSize="18" fontWeight="bold">新用户</text>
      <text x="400" y="265" textAnchor="middle" fill={textColor} fontSize="12">4种不同定义</text>
      
      {/* 4个视角圆圈 */}
      {perspectives.map((p, idx) => (
        <g key={idx}>
          {/* 连线 */}
          <line x1="400" y1="250" x2={p.x} y2={p.y} stroke={p.color} strokeWidth="2" strokeDasharray="5,5" />
          
          {/* 视角圆圈 */}
          <circle cx={p.x} cy={p.y} r="60" fill={p.color} fillOpacity="0.2" stroke={p.color} strokeWidth="2" />
          <text x={p.x} y={p.y + 5} textAnchor="middle" fill={p.color} fontSize="14" fontWeight="bold">
            {p.name}
          </text>
        </g>
      ))}
      
      {/* 警示标志 */}
      <text x="400" y="480" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="bold">
        ⚠️ 统一口径很重要！
      </text>
    </svg>
  );
};

// 精准留存vs大盘留存对比图
export const RetentionComparisonChart: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#e5e7eb' : '#1f2937';
  
  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <rect width="800" height="400" fill={bgColor} rx="8" />
      
      {/* 左侧：精准留存 */}
      <g>
        <rect x="50" y="50" width="320" height="300" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" rx="8" />
        <text x="210" y="80" textAnchor="middle" fill="#3b82f6" fontSize="18" fontWeight="bold">精准留存</text>
        <text x="210" y="105" textAnchor="middle" fill={textColor} fontSize="12">Unbounded Retention</text>
        
        {/* 定群示意 */}
        <circle cx="120" cy="150" r="30" fill="#3b82f6" fillOpacity="0.3" />
        <text x="120" y="155" textAnchor="middle" fill={textColor} fontSize="12">D0</text>
        
        <text x="180" y="155" textAnchor="middle" fill={textColor} fontSize="20">→</text>
        
        <circle cx="240" cy="150" r="24" fill="#3b82f6" fillOpacity="0.5" />
        <text x="240" y="155" textAnchor="middle" fill={textColor} fontSize="12">D1</text>
        
        <text x="210" y="220" textAnchor="middle" fill={textColor} fontSize="14">追踪同一批人</text>
        <text x="210" y="250" textAnchor="middle" fill="#10b981" fontSize="16" fontWeight="bold">800/1000 = 80%</text>
        
        <text x="210" y="290" textAnchor="middle" fill={textColor} fontSize="11">适合：渠道对比、A/B测试</text>
      </g>
      
      {/* 右侧：大盘留存 */}
      <g>
        <rect x="430" y="50" width="320" height="300" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" rx="8" />
        <text x="590" y="80" textAnchor="middle" fill="#8b5cf6" fontSize="18" fontWeight="bold">大盘留存</text>
        <text x="590" y="105" textAnchor="middle" fill={textColor} fontSize="12">Classic Retention</text>
        
        {/* 大盘示意 */}
        <circle cx="520" cy="150" r="35" fill="#8b5cf6" fillOpacity="0.2" />
        <text x="520" y="155" textAnchor="middle" fill={textColor} fontSize="12">总用户</text>
        
        <text x="590" y="155" textAnchor="middle" fill={textColor} fontSize="20">÷</text>
        
        <circle cx="660" cy="150" r="28" fill="#8b5cf6" fillOpacity="0.5" />
        <text x="660" y="155" textAnchor="middle" fill={textColor} fontSize="12">活跃</text>
        
        <text x="590" y="220" textAnchor="middle" fill={textColor} fontSize="14">整体活跃占比</text>
        <text x="590" y="250" textAnchor="middle" fill="#10b981" fontSize="16" fontWeight="bold">3000/5000 = 60%</text>
        
        <text x="590" y="290" textAnchor="middle" fill={textColor} fontSize="11">适合：大盘监控、向上汇报</text>
      </g>
    </svg>
  );
};

// 用户画像标签体系图（层级圆环设计）
export const UserProfilingChart: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#e5e7eb' : '#1f2937';
  
  const dimensions = [
    { 
      name: '基础属性', 
      color: '#3b82f6',
      examples: ['年龄', '性别', '地域'],
      icon: '👤'
    },
    { 
      name: '社交关系', 
      color: '#10b981',
      examples: ['好友数', '互动频次', '社群'],
      icon: '👥'
    },
    { 
      name: '行为特征', 
      color: '#8b5cf6',
      examples: ['活跃度', '使用时长', '路径'],
      icon: '📊'
    },
    { 
      name: '兴趣偏好', 
      color: '#f59e0b',
      examples: ['内容偏好', '消费偏好', '标签'],
      icon: '❤️'
    }
  ];
  
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto">
      <rect width="800" height="500" fill={bgColor} rx="8" />
      
      {/* 标题 */}
      <text x="400" y="35" textAnchor="middle" fill={textColor} fontSize="20" fontWeight="bold">
        用户画像：四维标签体系
      </text>
      
      {/* 中心核心圆 */}
      <circle cx="400" cy="270" r="60" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="3" />
      <text x="400" y="265" textAnchor="middle" fill="#ef4444" fontSize="18" fontWeight="bold">👤</text>
      <text x="400" y="285" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="bold">用户画像</text>
      
      {/* 四个维度卡片 */}
      {dimensions.map((dim, idx) => {
        const positions = [
          { x: 80, y: 120 },   // 左上
          { x: 480, y: 120 },  // 右上
          { x: 80, y: 340 },   // 左下
          { x: 480, y: 340 }   // 右下
        ];
        const pos = positions[idx];
        
        return (
          <g key={idx}>
            {/* 连接线 */}
            <line 
              x1="400" 
              y1="270" 
              x2={pos.x + 140} 
              y2={pos.y + 60} 
              stroke={dim.color} 
              strokeWidth="2" 
              strokeDasharray="4,4"
              opacity="0.4"
            />
            
            {/* 卡片背景 */}
            <rect 
              x={pos.x} 
              y={pos.y} 
              width="280" 
              height="120" 
              fill={dim.color} 
              fillOpacity="0.15" 
              stroke={dim.color} 
              strokeWidth="2" 
              rx="8"
            />
            
            {/* 图标 */}
            <text 
              x={pos.x + 20} 
              y={pos.y + 40} 
              fontSize="32"
            >
              {dim.icon}
            </text>
            
            {/* 维度名称 */}
            <text 
              x={pos.x + 70} 
              y={pos.y + 35} 
              fill={dim.color} 
              fontSize="18" 
              fontWeight="bold"
            >
              {dim.name}
            </text>
            
            {/* 示例标签 */}
            {dim.examples.map((example, exIdx) => (
              <g key={exIdx}>
                <rect
                  x={pos.x + 15 + exIdx * 85}
                  y={pos.y + 60}
                  width={75}
                  height={28}
                  fill={dim.color}
                  fillOpacity="0.2"
                  stroke={dim.color}
                  strokeWidth="1"
                  rx="14"
                />
                <text
                  x={pos.x + 52 + exIdx * 85}
                  y={pos.y + 78}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize="11"
                  fontWeight="500"
                >
                  {example}
                </text>
              </g>
            ))}
          </g>
        );
      })}
      
      {/* 底部说明 */}
      <text x="400" y="485" textAnchor="middle" fill={textColor} fontSize="12" opacity="0.7">
        💡 从4个维度构建完整的用户画像，支撑精准运营和个性化推荐
      </text>
    </svg>
  );
};

// 反作弊机制对比图
export const AntiCheatingChart: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#e5e7eb' : '#1f2937';
  
  return (
    <svg viewBox="0 0 800 450" className="w-full h-auto">
      <rect width="800" height="450" fill={bgColor} rx="8" />
      
      {/* 标题 */}
      <text x="400" y="40" textAnchor="middle" fill={textColor} fontSize="20" fontWeight="bold">
        反作弊机制：机器刷 vs 人工刷
      </text>
      
      {/* 左侧：机器刷 */}
      <g>
        <rect x="50" y="80" width="320" height="320" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2" rx="8" />
        <text x="210" y="110" textAnchor="middle" fill="#ef4444" fontSize="18" fontWeight="bold">🤖 机器刷</text>
        
        {/* 特征图标 */}
        <circle cx="120" cy="170" r="25" fill="#ef4444" fillOpacity="0.3" />
        <text x="120" y="175" textAnchor="middle" fontSize="20">💻</text>
        <text x="180" y="175" textAnchor="middle" fill={textColor} fontSize="12">批量操作</text>
        
        <circle cx="120" cy="230" r="25" fill="#ef4444" fillOpacity="0.3" />
        <text x="120" y="235" textAnchor="middle" fontSize="20">🌐</text>
        <text x="180" y="235" textAnchor="middle" fill={textColor} fontSize="12">IP集中</text>
        
        <circle cx="120" cy="290" r="25" fill="#ef4444" fillOpacity="0.3" />
        <text x="120" y="295" textAnchor="middle" fontSize="20">🔄</text>
        <text x="180" y="295" textAnchor="middle" fill={textColor} fontSize="12">路径一致</text>
        
        <text x="210" y="350" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">
          防御：验证码+设备指纹
        </text>
      </g>
      
      {/* 右侧：人工刷 */}
      <g>
        <rect x="430" y="80" width="320" height="320" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" rx="8" />
        <text x="590" y="110" textAnchor="middle" fill="#f59e0b" fontSize="18" fontWeight="bold">👤 人工刷</text>
        
        {/* 特征图标 */}
        <circle cx="500" cy="170" r="25" fill="#f59e0b" fillOpacity="0.3" />
        <text x="500" y="175" textAnchor="middle" fontSize="20">👶</text>
        <text x="560" y="175" textAnchor="middle" fill={textColor} fontSize="12">小号批量</text>
        
        <circle cx="500" cy="230" r="25" fill="#f59e0b" fillOpacity="0.3" />
        <text x="500" y="235" textAnchor="middle" fontSize="20">⏰</text>
        <text x="560" y="235" textAnchor="middle" fill={textColor} fontSize="12">时间集中</text>
        
        <circle cx="500" cy="290" r="25" fill="#f59e0b" fillOpacity="0.3" />
        <text x="500" y="295" textAnchor="middle" fontSize="20">🕸️</text>
        <text x="560" y="295" textAnchor="middle" fill={textColor} fontSize="12">网状关系</text>
        
        <text x="590" y="350" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">
          防御：信誉体系+图谱检测
        </text>
      </g>
      
      {/* 底部提示 */}
      <text x="400" y="430" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">
        💡 数据分析师：建立监控看板 + 规则建模 + 效果评估
      </text>
    </svg>
  );
};

// 用户行为模型（内容/工具型App）
export const UserBehaviorModel: React.FC<VisualizationProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#e5e7eb' : '#1f2937';
  const stages = [
    { 
      label: '启动', 
      icon: '🚀', 
      color: '#3b82f6',
      metrics: ['启动次数', '启动用户数', '首次启动'],
      y: 100
    },
    { 
      label: '功能使用', 
      icon: '⚡', 
      color: '#8b5cf6',
      metrics: ['功能使用率', '使用时长', '使用深度'],
      y: 200
    },
    { 
      label: '路径分析', 
      icon: '🔍', 
      color: '#10b981',
      metrics: ['关键路径', '路径耗时', '转化节点'],
      y: 300
    },
    { 
      label: '转化', 
      icon: '✅', 
      color: '#f59e0b',
      metrics: ['目标完成率', '转化漏斗', '核心动作'],
      y: 400
    },
    { 
      label: '流失', 
      icon: '⚠️', 
      color: '#ef4444',
      metrics: ['流失率', '流失节点', '召回策略'],
      y: 500
    }
  ];
  
  return (
    <svg viewBox="0 0 900 620" className="w-full h-auto">
      {/* 背景 */}
      <rect width="900" height="620" fill={bgColor} rx="8" />
      
      {/* 标题 */}
      <text x="450" y="40" textAnchor="middle" fill={textColor} fontSize="20" fontWeight="bold">
        用户行为分析流程（内容/工具型App）
      </text>
      <text x="450" y="65" textAnchor="middle" fill={isDark ? '#9ca3af' : '#6b7280'} fontSize="13">
        从启动到流失的完整用户旅程追踪
      </text>
      
      {/* 绘制各个阶段 */}
      {stages.map((stage, idx) => {
        const x = 150;
        const boxWidth = 600;
        const isLast = idx === stages.length - 1;
        
        return (
          <g key={idx}>
            {/* 主卡片 */}
            <rect 
              x={x} 
              y={stage.y} 
              width={boxWidth} 
              height="70" 
              fill={stage.color} 
              fillOpacity="0.1" 
              stroke={stage.color} 
              strokeWidth="2" 
              rx="8"
            />
            
            {/* 图标圆圈 */}
            <circle cx={x + 40} cy={stage.y + 35} r="25" fill={stage.color} fillOpacity="0.2" />
            <text x={x + 40} y={stage.y + 43} textAnchor="middle" fontSize="24">{stage.icon}</text>
            
            {/* 阶段标题 */}
            <text x={x + 90} y={stage.y + 30} fill={stage.color} fontSize="18" fontWeight="bold">
              {idx + 1}. {stage.label}
            </text>
            
            {/* 指标列表 */}
            {stage.metrics.map((metric, mIdx) => (
              <text 
                key={mIdx}
                x={x + 90 + mIdx * 150} 
                y={stage.y + 52} 
                fill={textColor} 
                fontSize="11"
                opacity="0.8"
              >
                • {metric}
              </text>
            ))}
            
            {/* 连接箭头 */}
            {!isLast && (
              <g>
                <line 
                  x1={x + boxWidth/2} 
                  y1={stage.y + 70} 
                  x2={x + boxWidth/2} 
                  y2={stages[idx + 1].y} 
                  stroke={isDark ? '#4b5563' : '#9ca3af'} 
                  strokeWidth="2" 
                  strokeDasharray="5,5"
                />
                <polygon 
                  points={`${x + boxWidth/2},${stages[idx + 1].y - 8} ${x + boxWidth/2 - 6},${stages[idx + 1].y - 16} ${x + boxWidth/2 + 6},${stages[idx + 1].y - 16}`}
                  fill={isDark ? '#4b5563' : '#9ca3af'}
                />
              </g>
            )}
          </g>
        );
      })}
      
      {/* 右侧说明 */}
      <rect x="770" y="100" width="110" height="470" fill={isDark ? '#374151' : '#ffffff'} rx="8" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="1" />
      
      <text x="825" y="125" textAnchor="middle" fill={textColor} fontSize="12" fontWeight="bold">
        分析重点
      </text>
      
      <text x="780" y="155" fill="#3b82f6" fontSize="10" fontWeight="bold">启动分析</text>
      <text x="780" y="170" fill={textColor} fontSize="9">首次用户占比</text>
      <text x="780" y="182" fill={textColor} fontSize="9">启动频次分布</text>
      
      <text x="780" y="210" fill="#8b5cf6" fontSize="10" fontWeight="bold">功能分析</text>
      <text x="780" y="225" fill={textColor} fontSize="9">TOP功能识别</text>
      <text x="780" y="237" fill={textColor} fontSize="9">功能留存贡献</text>
      
      <text x="780" y="265" fill="#10b981" fontSize="10" fontWeight="bold">路径挖掘</text>
      <text x="780" y="280" fill={textColor} fontSize="9">高频路径</text>
      <text x="780" y="292" fill={textColor} fontSize="9">异常路径识别</text>
      
      <text x="780" y="320" fill="#f59e0b" fontSize="10" fontWeight="bold">转化优化</text>
      <text x="780" y="335" fill={textColor} fontSize="9">漏斗分析</text>
      <text x="780" y="347" fill={textColor} fontSize="9">转化瓶颈定位</text>
      
      <text x="780" y="375" fill="#ef4444" fontSize="10" fontWeight="bold">流失预警</text>
      <text x="780" y="390" fill={textColor} fontSize="9">流失前兆行为</text>
      <text x="780" y="402" fill={textColor} fontSize="9">召回窗口期</text>
      
      <rect x="780" y="425" width="80" height="130" fill={isDark ? '#1e3a8a' : '#dbeafe'} rx="4" />
      <text x="820" y="445" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">
        核心工具
      </text>
      <text x="785" y="465" fill={textColor} fontSize="9">📊 漏斗分析</text>
      <text x="785" y="480" fill={textColor} fontSize="9">🔄 留存分析</text>
      <text x="785" y="495" fill={textColor} fontSize="9">🗺️ 路径分析</text>
      <text x="785" y="510" fill={textColor} fontSize="9">👥 分群对比</text>
      <text x="785" y="525" fill={textColor} fontSize="9">📈 趋势追踪</text>
      <text x="785" y="540" fill={textColor} fontSize="9">⚡ 实时监控</text>
      
      {/* 底部总结 */}
      <rect x="50" y="580" width="800" height="30" fill={isDark ? '#312e81' : '#e0e7ff'} rx="4" />
      <text x="450" y="600" textAnchor="middle" fill="#6366f1" fontSize="12" fontWeight="bold">
        💡 重点：识别核心功能 + 优化关键路径 + 减少流失节点
      </text>
    </svg>
  );
};

