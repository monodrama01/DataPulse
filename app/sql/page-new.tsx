"use client";

import React from "react";
import { Navigation } from "@/components/navigation";
import { Home, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";

export default function SQLPage() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = React.useState<string>("");
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const sections = [
      'intro', 'env', 'ddl', 'dml', 'dql', 'join', 'functions',
      'optimization', 'window', 'timeseries', 'templates', 'bi', 'resources',
      'analysis-templates', 'visualizations', 'optimization-cases', 
      'python-mysql', 'common-mistakes', 'scenario-map', 'data-warehouse', 'data-quality', 'data-sampling'
    ];
    
    const observers = sections.map(id => {
      const element = document.getElementById(id);
      if (!element) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
      );
      
      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);

  const isDark = theme === 'dark';

  const navItems = [
    { id: 'intro', icon: '🎯', label: 'SQL知识体系', color: 'purple' },
    { id: 'env', icon: '⚙️', label: '01. 基础环境层', color: 'blue' },
    { id: 'ddl', icon: '🏗️', label: '02. 数据定义DDL', color: 'green' },
    { id: 'dml', icon: '✏️', label: '03. 数据操作DML', color: 'yellow' },
    { id: 'dql', icon: '🔍', label: '04. 查询核心DQL', color: 'red' },
    { id: 'join', icon: '🔗', label: '05. 多表关联JOIN', color: 'pink' },
    { id: 'functions', icon: '🧮', label: '06. 函数与表达式', color: 'indigo' },
    { id: 'optimization', icon: '⚡', label: '07. 性能优化', color: 'orange' },
    { id: 'window', icon: '📊', label: '08. 统计与窗口', color: 'teal' },
    { id: 'timeseries', icon: '📅', label: '09. 时间序列', color: 'cyan' },
    { id: 'templates', icon: '📦', label: '10. 实战模板', color: 'rose' },
    { id: 'bi', icon: '📈', label: '11. BI连接与自动化', color: 'lime' },
    { id: 'resources', icon: '📚', label: '12. 学习路径', color: 'emerald' },
    { id: 'analysis-templates', icon: '🎯', label: '13. 分析模板库', color: 'blue' },
    { id: 'visualizations', icon: '📊', label: '14. SQL可视化', color: 'green' },
    { id: 'optimization-cases', icon: '🚀', label: '15. 优化实战', color: 'red' },
    { id: 'python-mysql', icon: '🐍', label: '16. Python实践', color: 'yellow' },
    { id: 'common-mistakes', icon: '⚠️', label: '17. 避坑指南', color: 'pink' },
    { id: 'scenario-map', icon: '🗺️', label: '18. 场景速查', color: 'violet' },
    { id: 'data-warehouse', icon: '🏢', label: '19. 数据仓库基础', color: 'sky' },
    { id: 'data-quality', icon: '✅', label: '20. 数据质量检查', color: 'amber' },
    { id: 'data-sampling', icon: '🎲', label: '21. 数据采样技巧', color: 'emerald' }
  ];

  // 暂时使用空数组，稍后逐步添加内容
  const parts: any[] = [];

  return (
    <div className={isDark ? 'min-h-screen bg-gray-900' : 'min-h-screen bg-gray-50'}>
      <Navigation />

      <div className={isDark ? 'bg-gray-800 border-gray-700 border-b sticky top-0 z-10' : 'bg-white border-gray-200 border-b sticky top-0 z-10'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-2">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
              <Home size={20} />
              <span className="font-medium">主页</span>
            </Link>
            <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <span className={isDark ? 'text-gray-100 font-medium' : 'text-gray-900 font-medium'}>SQL</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className={isDark ? 'sticky top-24 bg-gray-800/95 border-gray-700 backdrop-blur-sm rounded-2xl border-2 p-5 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto' : 'sticky top-24 bg-white/95 border-gray-200 backdrop-blur-sm rounded-2xl border-2 p-5 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto'}>
              <h3 className="text-xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                📖 目录导航
              </h3>
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  const colorMap = {
                    purple: 'border-purple-500 bg-purple-500/10',
                    blue: 'border-blue-500 bg-blue-500/10',
                    green: 'border-green-500 bg-green-500/10',
                    yellow: 'border-yellow-500 bg-yellow-500/10',
                    red: 'border-red-500 bg-red-500/10',
                    pink: 'border-pink-500 bg-pink-500/10',
                    indigo: 'border-indigo-500 bg-indigo-500/10',
                    orange: 'border-orange-500 bg-orange-500/10',
                    teal: 'border-teal-500 bg-teal-500/10',
                    cyan: 'border-cyan-500 bg-cyan-500/10',
                    fuchsia: 'border-fuchsia-500 bg-fuchsia-500/10',
                    lime: 'border-lime-500 bg-lime-500/10',
                    rose: 'border-rose-500 bg-rose-500/10',
                    emerald: 'border-emerald-500 bg-emerald-500/10',
                    violet: 'border-violet-500 bg-violet-500/10',
                    sky: 'border-sky-500 bg-sky-500/10',
                    amber: 'border-amber-500 bg-amber-500/10'
                  };
                  const color = colorMap[item.color as keyof typeof colorMap] || 'border-gray-500 bg-gray-500/10';
                  
                  return (
                    <a
                      key={item.id}
                      href={'#' + item.id}
                      className={
                        'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ' +
                        (isActive
                          ? (color + ' shadow-md')
                          : (isDark ? 'border-transparent hover:bg-gray-700/50' : 'border-transparent hover:bg-gray-100')
                        )
                      }
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className={'text-sm font-medium ' + (isDark ? 'text-gray-200' : 'text-gray-700')}>
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <section id="intro" className="mb-12 scroll-mt-24">
              <div className={'rounded-3xl p-10 shadow-2xl relative overflow-hidden ' + (isDark ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900' : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700')}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                
                <div className="relative flex items-center gap-6">
                  <div className="w-2 h-16 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
                  <div>
                    <h1 className="text-6xl font-black text-white mb-3 tracking-tight">
                      MySQL 完整知识体系
                    </h1>
                    <p className="text-2xl text-white/95 font-medium">
                      从0到独立完成企业级数据分析任务 · 21个模块全覆盖
                    </p>
                    <div className="flex gap-4 mt-4">
                      <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                        110+ SQL代码
                      </span>
                      <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                        3600+ 行内容
                      </span>
                      <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                        95% 场景覆盖
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={'mt-6 rounded-xl p-6 border-2 ' + (isDark ? 'bg-gray-800 border-blue-600' : 'bg-blue-50 border-blue-300')}>
                <h3 className={'text-xl font-bold mb-4 ' + (isDark ? 'text-blue-400' : 'text-blue-700')}>
                  📖 本体系特点
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={'p-4 rounded-lg border-2 ' + (isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200')}>
                    <div className="text-3xl mb-2">🎯</div>
                    <div className={'font-semibold mb-1 ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>实战导向</div>
                    <div className={'text-sm ' + (isDark ? 'text-gray-300' : 'text-gray-600')}>
                      基于MySQL 8.0官方文档、实际业务场景与高频面试考点
                    </div>
                  </div>
                  <div className={'p-4 rounded-lg border-2 ' + (isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200')}>
                    <div className="text-3xl mb-2">🚀</div>
                    <div className={'font-semibold mb-1 ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>体系完整</div>
                    <div className={'text-sm ' + (isDark ? 'text-gray-300' : 'text-gray-600')}>
                      覆盖95%企业数据分析场景，☆标注面试/实战最高频内容
                    </div>
                  </div>
                  <div className={'p-4 rounded-lg border-2 ' + (isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200')}>
                    <div className="text-3xl mb-2">📚</div>
                    <div className={'font-semibold mb-1 ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>四维深挖</div>
                    <div className={'text-sm ' + (isDark ? 'text-gray-300' : 'text-gray-600')}>
                      必须掌握深度 ➜ 典型业务场景 ➜ 易踩坑点 ➜ 可继续深挖
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="text-center py-20">
              <p className={'text-2xl font-bold ' + (isDark ? 'text-gray-300' : 'text-gray-700')}>
                📚 内容正在迁移中，请稍候...
              </p>
              <p className={'text-sm mt-4 ' + (isDark ? 'text-gray-500' : 'text-gray-600')}>
                我们正在优化页面结构，确保最佳的学习体验
              </p>
            </div>
          </main>
        </div>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className={
              'fixed bottom-8 right-8 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 ' +
              (isDark 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white')
            }
            aria-label="返回顶部"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
