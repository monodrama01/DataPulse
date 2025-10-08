"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Home, Zap, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function AutomationPage() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState<string[]>([])
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // 控制返回顶部按钮显示
      setShowScrollTop(window.scrollY > 400)
      
      // 控制导航高亮
      const sections = ['robustness', 'data-acquisition', 'case-study', 'engineering', 'scheduler', 'data-cleaning', 'report-generation', 'monitoring-alert', 'email-push', 'dashboard-auto', 'mlops-retrain', 'pipeline-cheats']
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
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
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
            <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>/</span>
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>自动化脚本</span>
          </div>
        </div>
      </div>

      {/* 主标题区域 */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3">数据分析自动化</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            从重复劳动到智能自动化，工作效率提升10倍
          </p>
        </div>

        <div className="flex gap-8">
           {/* 左侧导航 */}
           <aside className="hidden lg:block w-72 flex-shrink-0">
             <div className={`sticky top-24 ${theme === 'dark' ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-sm rounded-2xl border-2 p-6 shadow-2xl max-h-[calc(100vh-120px)] overflow-y-auto`}>
              <h3 className={`text-xl font-extrabold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} flex items-center gap-2`}>
                {getLucideIcon('📖', 'w-6 h-6 text-[#19bcc8]')}
                <span>页面导航</span>
              </h3>
              <nav className="space-y-3">
                {[
                  { id: 'robustness', icon: '🛡️', label: '错误处理与健壮性', color: 'slate' },
                  { id: 'data-acquisition', icon: '📥', label: '数据获取自动化', color: 'blue' },
                  { id: 'case-study', icon: '🚀', label: '完整实战案例', color: 'emerald' },
                  { id: 'engineering', icon: '🧱', label: '代码组织与工程化', color: 'zinc' },
                  { id: 'scheduler', icon: '⏱️', label: '任务调度深度详解', color: 'indigo' },
                  { id: 'data-cleaning', icon: '🧹', label: '数据清洗自动化', color: 'green' },
                  { id: 'report-generation', icon: '📊', label: '报表生成自动化', color: 'orange' },
                  { id: 'monitoring-alert', icon: '⚠️', label: '监控预警自动化', color: 'red' },
                  { id: 'email-push', icon: '📧', label: '邮件推送自动化', color: 'purple' },
                  { id: 'dashboard-auto', icon: '📈', label: '仪表盘自动化', color: 'teal' },
                  { id: 'mlops-retrain', icon: '🤖', label: '模型重训与回滚', color: 'blue' },
                  { id: 'pipeline-cheats', icon: '🧭', label: '流水线命令清单', color: 'indigo' }
                ].map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border-2 ${
                      activeSection.includes(item.id)
                        ? 'bg-[#19bcc8]/10 text-[#19bcc8] border-[#19bcc8] shadow-md dark:bg-[#19bcc8]/20 dark:text-[#19bcc8] dark:border-[#19bcc8]'
                        : theme === 'dark'
                        ? 'hover:bg-[#19bcc8]/10 text-gray-300 hover:text-[#19bcc8] border-transparent hover:border-[#19bcc8]/30'
                        : 'hover:bg-[#19bcc8]/10 text-gray-700 hover:text-[#19bcc8] border-transparent hover:border-[#19bcc8]/30'
                    }`}
                  >
                    {getLucideIcon(item.icon, 'w-5 h-5 text-[#19bcc8]')}
                    <span className="leading-tight">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* 主内容区 */}
          <main className="flex-1 min-w-0" style={{ scrollBehavior: 'smooth' }}>
            <div className="space-y-12">
              {/* MODULE 00: 错误处理与健壮性 */}
              <section id="robustness" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">🛡 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 错误处理与健壮性</h2>
                    </div>
                    <p className="text-slate-100 text-lg ml-8 font-medium">脚本可靠运行的底座：重试、超时、断路器、幂等、告警</p>
                  </div>
                </div>

                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    {/* 五大机制卡片 */}
                    <div>
                      <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>🔧 五大健壮性机制</h3>
                      <div className="grid md:grid-cols-5 gap-3">
                        {[ 
                          {t:'重试', d:'指数退避 + 最大次数'},
                          {t:'超时', d:'请求/任务超时统一控制'},
                          {t:'断路器', d:'连续失败熔断，半开探测'},
                          {t:'幂等', d:'避免重复执行副作用'},
                          {t:'告警', d:'失败立即通知 + 日志留痕'}
                        ].map((x, i)=> (
                          <div key={i} className={`p-3 rounded-lg ${theme==='dark'?'bg-slate-700/50':'bg-slate-50'}`}>
                            <p className={`font-bold text-sm ${theme==='dark'?'text-slate-200':'text-slate-800'}`}>{x.t}</p>
                            <p className={`text-xs ${theme==='dark'?'text-slate-400':'text-slate-600'}`}>{x.d}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Python健壮模板 */}
                    <div className={theme==='dark' ? 'bg-gray-900 p-4 rounded-lg' : 'bg-gray-50 p-4 rounded-lg'}>
                      <h4 className={`font-bold mb-3 ${theme==='dark'?'text-slate-300':'text-slate-700'}`}>💻 Python健壮性模板（requests + 重试/超时/断路器/幂等）</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400 border border-gray-700':'bg-white text-gray-800 border border-gray-200'}`}>
{`import time, json, hashlib, threading
import requests

class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_time=30):
        self.failure_threshold = failure_threshold
        self.recovery_time = recovery_time
        self.fail_count = 0
        self.state = 'CLOSED'  # CLOSED -> OPEN -> HALF_OPEN
        self.open_until = 0

    def allow(self):
        now = time.time()
        if self.state == 'OPEN' and now >= self.open_until:
            self.state = 'HALF_OPEN'
            return True
        return self.state != 'OPEN'

    def record_success(self):
        self.fail_count = 0
        self.state = 'CLOSED'

    def record_failure(self):
        self.fail_count += 1
        if self.fail_count >= self.failure_threshold:
            self.state = 'OPEN'
            self.open_until = time.time() + self.recovery_time

breaker = CircuitBreaker()

def stable_request(url, method='GET', timeout=5, max_retries=3, backoff=0.8, payload=None, idempotent_key=None):
    if not breaker.allow():
        raise RuntimeError('circuit open')
    attempt = 0
    while attempt <= max_retries:
        try:
            resp = requests.request(method, url, timeout=timeout, json=payload)
            resp.raise_for_status()
            breaker.record_success()
            return resp.json() if 'application/json' in resp.headers.get('Content-Type','') else resp.text
        except Exception as e:
            attempt += 1
            if attempt > max_retries:
                breaker.record_failure()
                raise
            sleep = (backoff ** attempt) + 0.2 * attempt
            time.sleep(sleep)

def idempotency_key(data: dict) -> str:
    return hashlib.md5(json.dumps(data, sort_keys=True).encode('utf-8')).hexdigest()

# 示例：带幂等Key的下游调用
def push_order(order: dict):
    key = idempotency_key(order)
    return stable_request('https://api.example.com/push', method='POST', payload=order, timeout=8, max_retries=4, idempotent_key=key)

`}
                      </pre>
                      <p className={`text-xs mt-2 ${theme==='dark'?'text-slate-400':'text-slate-600'}`}>说明：指数退避避免雪崩；断路器防止持续打爆下游；幂等Key确保重复调用无副作用；所有错误应配合日志与告警。</p>
                    </div>

                    {/* 运行时最佳实践 */}
                    <div>
                      <h4 className={`font-bold mb-2 ${theme==='dark'?'text-slate-300':'text-slate-700'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 运行时最佳实践</h4>
                      <ul className={`list-disc ml-5 space-y-1 text-sm ${theme==='dark'?'text-gray-300':'text-gray-700'}`}>
                        <li>为所有外部调用设置超时（HTTP/DB/文件IO）；不得使用无限等待</li>
                        <li>关键任务加重试与告警；非关键任务失败可降级处理</li>
                        <li>写入型操作需幂等：唯一键、去重写入、Upsert</li>
                        <li>定时任务增加运行互斥（锁/文件锁），防止并发重复跑</li>
                        <li>日志可检索：请求ID、任务ID、耗时、错误栈</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* 核心价值 */}
              <Card className={theme === 'dark' ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'}>
                <CardContent className="pt-6">
                  <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 为什么数据分析师必须掌握自动化？
                  </h2>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { value: '10倍', label: '效率提升', desc: '从2小时到10分钟' },
                      { value: '95%', label: '准确率', desc: '消除人工错误' },
                      { value: '24/7', label: '持续运行', desc: '无需人工干预' }
                    ].map((item, idx) => (
                      <div key={idx} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                        <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{item.value}</div>
                        <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{item.label}</div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* MODULE 01: 数据获取自动化 */}
              <section id="data-acquisition" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据获取自动化</h2>
                    </div>
                    <p className="text-blue-50 text-lg ml-8 font-medium">告别手动下载，让数据自己来找你</p>
                  </div>
                </div>

                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    {/* 4大核心场景 */}
                    <div>
                      <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        🎯 4大核心场景 ⭐⭐⭐⭐⭐
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { icon: '🗄️', title: '数据库定时抓取', desc: '每天早上9点自动获取昨日数据', tools: 'Python + APScheduler' },
                          { icon: '🌐', title: 'API接口调用', desc: '实时获取第三方平台数据', tools: 'requests + pandas' },
                          { icon: '🕷️', title: '网页数据爬取', desc: '竞品价格监控、舆情数据采集', tools: 'BeautifulSoup' },
                          { icon: '📧', title: 'Excel文件读取', desc: '邮件附件自动提取并处理', tools: 'Python + IMAP' }
                        ].map((item, idx) => (
                          <div key={idx} className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-200'}`}>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">{item.icon}</span>
                              <p className={`font-bold text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{item.title}</p>
                            </div>
                            <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>工具：{item.tools}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Python代码示例 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>💻 Python定时抓取示例</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`import pandas as pd
from sqlalchemy import create_engine
from apscheduler.schedulers.blocking import BlockingScheduler

engine = create_engine('mysql://user:pwd@localhost/db')

def fetch_daily_data():
    query = "SELECT * FROM sales WHERE DATE(order_time) = CURDATE() - INTERVAL 1 DAY"
    df = pd.read_sql(query, engine)
    df.to_excel(f'数据_{pd.Timestamp.now().date()}.xlsx', index=False)
    print(f'✅ 已获取{len(df)}条数据')

scheduler = BlockingScheduler()
scheduler.add_job(fetch_daily_data, 'cron', hour=9, minute=0)
scheduler.start()  # 每天早上9点自动运行`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* MODULE 01.9: 完整实战案例 */}
              <section id="case-study" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 完整实战案例：日报全自动</h2>
                    </div>
                    <p className="text-emerald-50 text-lg ml-8 font-medium">获取→清洗→分析→报表→邮件→监控，一键端到端</p>
                  </div>
                </div>

                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    <div className={theme==='dark' ? 'bg-gray-900 p-4 rounded-lg' : 'bg-gray-50 p-4 rounded-lg'}>
                      <h4 className={`font-bold mb-3 ${theme==='dark'?'text-emerald-300':'text-emerald-700'}`}>💻 main.py（数据分析端到端：data_date + DQ + UPSERT + 告警）</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400 border border-gray-700':'bg-white text-gray-800 border border-gray-200'}`}>
{`import os, sys, pandas as pd
from datetime import datetime, timedelta
from sqlalchemy import create_engine
from sqlalchemy import text
from libs import get_engine, is_ready, dq_checks, upsert_metrics, safe_send_mail, safe_request  # 假设放入 libs.py

def fetch(engine, data_date):
    sql = text("SELECT * FROM dwd_sales WHERE date=:d")
    with engine.connect() as conn:
        return pd.read_sql(sql, conn, params={'d': str(data_date)})

def clean(df: pd.DataFrame):
    return df.drop_duplicates(subset=['订单ID']).query('金额 >= 0').copy()

def analyze(df: pd.DataFrame):
    metrics = {
        'gmv': float(df['金额'].sum()),
        'order_count': int(len(df)),
        'user_count': int(df['用户ID'].nunique()),
        'avg_price': float(df['金额'].mean()) if len(df) else 0.0
    }
    hourly = df.groupby('小时')['金额'].sum()
    return metrics, hourly

def render_html(date, metrics, hourly):
    rows = ''.join([f'<tr><td>{h}</td><td>{v:.0f}</td></tr>' for h, v in hourly.items()])
    return f'''
    <h3>📊 {date} 日报</h3>
    <ul>
      <li>GMV：{metrics['gmv']/10000:.2f} 万</li>
      <li>订单数：{metrics['order_count']}</li>
      <li>用户数：{metrics['user_count']}</li>
      <li>客单价：{metrics['avg_price']:.2f}</li>
    </ul>
    <table border="1" cellspacing="0" cellpadding="4">
      <tr><th>小时</th><th>GMV</th></tr>
      {rows}
    </table>
    '''

def main():
    engine = get_engine()
    data_date = sys.argv[1] if len(sys.argv) > 1 else (datetime.now() - timedelta(days=1)).date()
    # 1) 依赖就绪检测
    if not is_ready(engine, data_date):
        print('⏳ 依赖未就绪，稍后重试')
        return
    # 2) 获取+清洗
    df = clean(fetch(engine, data_date))
    # 3) DQ 闸门
    ok, report = dq_checks(df, min_rows=10)
    if not ok:
        safe_request(os.getenv('DINGTALK_WEBHOOK'), payload={
            'msgtype':'markdown',
            'markdown':{'title':'DQ失败','text':f"### DQ失败\nrows={report['rows']}"}
        })
        print('❌ DQ失败'); return
    # 4) 指标计算 + UPSERT 到度量表
    metrics, hourly = analyze(df)
    upsert_metrics(engine, os.getenv('METRIC_TABLE','analytics.daily_metrics'), str(data_date), metrics)
    # 5) 邮件
    html = render_html(data_date, metrics, hourly)
    recipients = os.getenv('REPORT_RECIPIENTS','').split(',')
    safe_send_mail(os.getenv('SMTP_SERVER','smtp.company.com'), recipients, f'【日报】{data_date}', html)
    print('✅ 完成')

if __name__ == '__main__':
    main()`}
                      </pre>
                      <p className={`text-xs mt-2 ${theme==='dark'?'text-gray-400':'text-gray-600'}`}>在项目根目录创建 <code className="px-1 rounded bg-gray-200 dark:bg-gray-700">.env</code> 配置数据库与SMTP；结合前述调度模块即可定时运行。</p>
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

              {/* MODULE 01.8: 代码组织与工程化 */}
              <section id="engineering" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-zinc-500 via-neutral-500 to-zinc-600 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">🧱 代码组织与工程化</h2>
                    </div>
                    <p className="text-zinc-50 text-lg ml-8 font-medium">目录结构、配置管理、日志、环境、测试与CI，稳健可维护</p>
                  </div>
                </div>

                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    {/* 目录结构 */}
                    <div>
                      <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>📁 推荐目录结构</h3>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400 border border-gray-700':'bg-gray-50 text-gray-800 border border-gray-200'}`}>
{`automation-project/
├─ src/
│  ├─ jobs/              # 各类任务（抓取/清洗/报表/监控）
│  ├─ libs/              # 公用库（db/http/logging）
│  ├─ configs/           # 配置模板与schemas
│  └─ main.py            # 入口
├─ tests/                # 单元与集成测试
├─ .env.example          # 环境变量模板
├─ pyproject.toml        # 依赖与工具
├─ Dockerfile            # 容器化
└─ README.md`}
                      </pre>
                    </div>

                    {/* 配置管理与环境变量 */}
                    <div className={theme==='dark' ? 'bg-gray-900 p-4 rounded-lg' : 'bg-gray-50 p-4 rounded-lg'}>
                      <h4 className={`font-bold mb-2 ${theme==='dark'?'text-zinc-300':'text-zinc-700'}`}>⚙ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 配置管理（pydantic + .env）</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400 border border-gray-700':'bg-white text-gray-800 border border-gray-200'}`}>
{`from pydantic import BaseSettings

class Settings(BaseSettings):
    DB_URL: str
    SMTP_SERVER: str = 'smtp.company.com'
    DEBUG: bool = False

    class Config:
        env_file = '.env'

settings = Settings()`}
                      </pre>
                      <p className={`text-xs mt-2 ${theme==='dark'?'text-gray-400':'text-gray-600'}`}>将密钥放入 .env，不要提交到仓库；提供 .env.example 模板便于同事配置。</p>
                    </div>

                    {/* .env 与 requirements 片段（面向数据分析） */}
                    <div className={`${theme==='dark'?'bg-gray-800':'bg-white'} p-4 rounded-lg border ${theme==='dark'?'border-gray-700':'border-gray-200'}`}>
                      <h4 className={`font-bold mb-2 ${theme==='dark'?'text-zinc-300':'text-zinc-700'}`}>📄 .env.example 与 requirements（数据分析场景）</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <p className={`text-xs mb-1 ${theme==='dark'?'text-gray-400':'text-gray-600'}`}>.env.example</p>
                          <pre className={`text-xs overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400 border border-gray-700':'bg-gray-50 text-gray-800 border border-gray-200'}`}>
{`DB_URL=mysql://user:pwd@host:3306/warehouse
SMTP_SERVER=smtp.company.com
REPORT_RECIPIENTS=boss@company.com,team@company.com
DINGTALK_WEBHOOK=https://oapi.dingtalk.com/robot/send?access_token=xxx
METRIC_TABLE=analytics.daily_metrics
READY_FLAG_SQL=SELECT 1 FROM dwd_orders WHERE date='{date}' LIMIT 1`}
                          </pre>
                        </div>
                        <div>
                          <p className={`text-xs mb-1 ${theme==='dark'?'text-gray-400':'text-gray-600'}`}>requirements.txt</p>
                          <pre className={`text-xs overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400 border border-gray-700':'bg-gray-50 text-gray-800 border border-gray-200'}`}>
{`pandas
SQLAlchemy
requests
APScheduler
pydantic
openpyxl
matplotlib`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    {/* 日志与结构化输出 */}
                    <div className={`${theme==='dark'?'bg-gray-800':'bg-white'} p-4 rounded-lg border ${theme==='dark'?'border-gray-700':'border-gray-200'}`}>
                      <h4 className={`font-bold mb-2 ${theme==='dark'?'text-zinc-300':'text-zinc-700'}`}>📝 日志（结构化 + 滚动切割）</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400 border border-gray-700':'bg-gray-50 text-gray-800 border border-gray-200'}`}>
{`import logging, json
from logging.handlers import RotatingFileHandler

logger = logging.getLogger('auto')
logger.setLevel(logging.INFO)
handler = RotatingFileHandler('logs/app.log', maxBytes=5*1024*1024, backupCount=7)
fmt = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
handler.setFormatter(fmt)
logger.addHandler(handler)

def log_event(event: str, **kv):
    logger.info(json.dumps({'event': event, **kv}, ensure_ascii=False))`}
                      </pre>
                    </div>

                    {/* 数据分析通用库（引擎/就绪检测/DQ/UPSERT/安全请求&邮件） */}
                    <div className={theme==='dark' ? 'bg-gray-900 p-4 rounded-lg' : 'bg-gray-50 p-4 rounded-lg'}>
                      <h4 className={`font-bold mb-2 ${theme==='dark'?'text-zinc-300':'text-zinc-700'}`}>🧩 数据分析通用库（可复用）</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400 border border-gray-700':'bg-white text-gray-800 border border-gray-200'}`}>
{`import os, time, smtplib, json, hashlib, requests
import pandas as pd
from sqlalchemy import create_engine, text

def get_engine():
    return create_engine(os.getenv('DB_URL'))

def is_ready(engine, data_date: str) -> bool:
    sql_tpl = os.getenv('READY_FLAG_SQL', "SELECT 1")
    with engine.connect() as conn:
        rs = conn.execute(text(sql_tpl.format(date=data_date))).fetchone()
        return rs is not None

def dq_checks(df: pd.DataFrame, min_rows: int = 10) -> tuple[bool, dict]:
    report = { 'rows': len(df), 'null_rate': df.isna().mean().round(4).to_dict() }
    ok = report['rows'] >= min_rows
    return ok, report

def upsert_metrics(engine, table: str, data_date: str, metrics: dict):
    df = pd.DataFrame([{ 'metric_name': k, 'metric_value': v, 'data_date': data_date } for k, v in metrics.items()])
    with engine.begin() as conn:
        tmp = f"tmp_metrics_{int(time.time())}"
        df.to_sql(tmp, conn, index=False)
        conn.execute(text(f"""
            INSERT INTO {table}(metric_name, data_date, metric_value)
            SELECT metric_name, data_date, metric_value FROM {tmp}
            ON DUPLICATE KEY UPDATE metric_value=VALUES(metric_value)
        """))
        conn.execute(text(f"DROP TABLE {tmp}"))

def safe_request(url, method='POST', payload=None, timeout=5, retries=3):
    for i in range(retries+1):
        try:
            r = requests.request(method, url, json=payload, timeout=timeout)
            if r.ok: return True
        except Exception:
            pass
        time.sleep(0.6*(i+1))
    return False

def safe_send_mail(smtp_server: str, to_list: list[str], subject: str, html_body: str) -> bool:
    try:
        from email.mime.text import MIMEText
        msg = MIMEText(html_body, 'html', 'utf-8')
        msg['From'] = 'report@company.com'
        msg['To'] = ', '.join(to_list)
        msg['Subject'] = subject
        s = smtplib.SMTP(smtp_server, 587)
        s.starttls(); s.login('report@company.com','password')
        s.send_message(msg); s.quit()
        return True
    except Exception:
        return False`}
                      </pre>
                      <p className={`text-xs mt-2 ${theme==='dark'?'text-gray-400':'text-gray-600'}`}>说明：所有示例统一复用该库，保障口径与可运行性一致；就绪检测与DQ作为“数据质量闸门”。</p>
                    </div>

                    {/* 测试与CI */}
                    <div className={`${theme==='dark'?'bg-gray-800':'bg-white'} p-4 rounded-lg border ${theme==='dark'?'border-gray-700':'border-gray-200'}`}>
                      <h4 className={`font-bold mb-2 ${theme==='dark'?'text-zinc-300':'text-zinc-700'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 测试与CI（pytest + GitHub Actions）</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400 border border-gray-700':'bg-gray-50 text-gray-800 border border-gray-200'}`}>
{`# tests/test_example.py
def test_sum():
    assert 1 + 1 == 2

# .github/workflows/ci.yml
name: ci
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.11' }
      - run: pip install -U pip pytest
      - run: pytest -q`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {/* MODULE 01.5: 任务调度深度详解 */}
              <section id="scheduler" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">⏱ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 任务调度深度详解</h2>
                    </div>
                    <p className="text-blue-50 text-lg ml-8 font-medium">APScheduler/Crontab/Windows计划任务/Docker 定时 - 生产可用</p>
                  </div>
                </div>

                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    {/* 场景与选型 */}
                    <div>
                      <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 场景与选型</h3>
                      <div className="grid md:grid-cols-4 gap-3 text-sm">
                        {[
                          {n:'APScheduler', s:'Python内嵌调度', r:'脚本级/小型任务'},
                          {n:'Crontab', s:'Linux系统级', r:'稳定持久/服务器常驻'},
                          {n:'Windows 任务计划', s:'系统级', r:'Windows环境'},
                          {n:'容器化定时', s:'Docker + cron/compose', r:'云端/可移植'}
                        ].map((x,i)=> (
                          <div key={i} className={`${theme==='dark'?'bg-indigo-900/20':'bg-indigo-50'} p-3 rounded-lg`}>
                            <p className={`font-bold ${theme==='dark'?'text-indigo-300':'text-indigo-700'}`}>{x.n}</p>
                            <p className={`${theme==='dark'?'text-gray-300':'text-gray-700'}`}>{x.s}</p>
                            <p className={`text-xs ${theme==='dark'?'text-gray-400':'text-gray-600'}`}>适用：{x.r}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* APScheduler 代码示例 */}
                    <div className={theme==='dark' ? 'bg-gray-900 p-4 rounded-lg' : 'bg-gray-50 p-4 rounded-lg'}>
                      <h4 className={`font-bold mb-2 ${theme==='dark'?'text-indigo-300':'text-indigo-700'}`}>💻 APScheduler 标准用法（含时区/进程互斥）</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400 border border-gray-700':'bg-white text-gray-800 border border-gray-200'}`}>
{`import os, fcntl, pytz
from datetime import datetime
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger

LOCK_FILE = '/tmp/job.lock'

def singleton_lock():
    fd = os.open(LOCK_FILE, os.O_CREAT | os.O_RDWR)
    fcntl.lockf(fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
    return fd

def job():
    print('run at', datetime.now())

if __name__ == '__main__':
    lock = singleton_lock()  # 防止并发重复跑
    scheduler = BlockingScheduler(timezone=pytz.timezone('Asia/Shanghai'))
    scheduler.add_job(job, CronTrigger.from_crontab('0 9 * * *'))  # 每天9点
    scheduler.start()`}
                      </pre>
                      <p className={`text-xs mt-2 ${theme==='dark'?'text-gray-400':'text-gray-600'}`}>要点：指定时区；使用文件锁避免并发；可将日志输出到文件并配合监控。</p>
                    </div>

                    {/* Linux Crontab */}
                    <div className={`${theme==='dark'?'bg-gray-800':'bg-white'} p-4 rounded-lg border ${theme==='dark'?'border-gray-700':'border-gray-200'}`}>
                      <h4 className={`font-bold mb-2 ${theme==='dark'?'text-indigo-300':'text-indigo-700'}`}>🐧 Linux Crontab（系统级稳定）</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400 border border-gray-700':'bg-gray-50 text-gray-800 border border-gray-200'}`}>
{`# 编辑计划任务
crontab -e

# 每天9:00执行脚本，输出日志
0 9 * * * /usr/bin/python3 /opt/jobs/report.py >> /var/log/report.log 2>&1

# 检查当前任务
crontab -l`}
                      </pre>
                    </div>

                    {/* Windows 任务计划 */}
                    <div className={`${theme==='dark'?'bg-gray-800':'bg-white'} p-4 rounded-lg border ${theme==='dark'?'border-gray-700':'border-gray-200'}`}>
                      <h4 className={`font-bold mb-2 ${theme==='dark'?'text-indigo-300':'text-indigo-700'}`}>🪟 Windows 任务计划程序</h4>
                      <ol className={`list-decimal list-inside text-sm ${theme==='dark'?'text-gray-300':'text-gray-700'} space-y-1`}>
                        <li>打开“任务计划程序” → 创建任务</li>
                        <li>触发器：每天 09:00</li>
                        <li>操作：启动程序 → 程序/脚本 指向 python.exe，参数填 report.py</li>
                        <li>条件：勾选“唤醒计算机运行任务”</li>
                        <li>历史记录：勾选启用，便于排错</li>
                      </ol>
                    </div>

                    {/* Docker 定时 */}
                    <div className={`${theme==='dark'?'bg-gray-800':'bg-white'} p-4 rounded-lg border ${theme==='dark'?'border-gray-700':'border-gray-200'}`}>
                      <h4 className={`font-bold mb-2 ${theme==='dark'?'text-indigo-300':'text-indigo-700'}`}>🐳 Docker / Compose 定时方案</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400 border border-gray-700':'bg-gray-50 text-gray-800 border border-gray-200'}`}>
{`# Dockerfile: 使用 cron 调度 Python 脚本
FROM python:3.11-slim
RUN apt-get update && apt-get install -y cron && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY report.py /app/report.py
RUN echo "0 9 * * * python /app/report.py >> /var/log/cron.log 2>&1" > /etc/cron.d/report
RUN chmod 0644 /etc/cron.d/report && crontab /etc/cron.d/report
CMD cron -f`}
                      </pre>
                      <p className={`text-xs mt-2 ${theme==='dark'?'text-gray-400':'text-gray-600'}`}>容器方案适合云端与多环境部署；日志导出到标准输出便于采集。</p>
                    </div>

                  </CardContent>
                </Card>
              </section>

              {/* MODULE 02: 数据清洗自动化 */}
              <section id="data-cleaning" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">🧹 数据清洗自动化</h2>
                    </div>
                    <p className="text-green-50 text-lg ml-8 font-medium">一键清洗脏数据，从2小时到2分钟</p>
                  </div>
                </div>

                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    {/* 8大清洗任务 */}
                    <div>
                      <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        🔧 8大常见清洗任务
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { task: '去重', method: 'drop_duplicates()', scenario: '订单ID重复' },
                          { task: '去空值', method: 'dropna() / fillna()', scenario: '缺失值处理' },
                          { task: '格式统一', method: 'astype() / to_datetime()', scenario: '日期格式' },
                          { task: '异常值', method: 'clip() / replace()', scenario: '销售额负数' },
                          { task: '字段标准化', method: 'map() / replace()', scenario: '男/M/male' },
                          { task: '多表合并', method: 'merge() / concat()', scenario: '订单+用户' }
                        ].map((item, idx) => (
                          <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-green-50'}`}>
                            <p className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{item.task}</p>
                            <p className={`text-xs font-mono mb-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>{item.method}</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>场景：{item.scenario}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Python清洗脚本 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>💻 Python通用清洗脚本 ⭐⭐⭐⭐⭐</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`def clean_sales_data(file_path, output_path):
    df = pd.read_excel(file_path)
    
    # 1. 去重
    df = df.drop_duplicates(subset=['订单ID'], keep='first')
    
    # 2. 删除空值
    df = df.dropna(subset=['订单ID', '用户ID'])
    
    # 3. 日期格式统一
    df['下单时间'] = pd.to_datetime(df['下单时间'], errors='coerce')
    
    # 4. 异常值处理
    df['销售额'] = df['销售额'].clip(lower=0)
    
    # 5. 字段标准化
    gender_map = {'男': '男', 'M': '男', '女': '女', 'F': '女'}
    df['性别'] = df['性别'].map(gender_map).fillna('未知')
    
    # 6. 保存
    df.to_excel(output_path, index=False)
    return df

# 效率：手动2小时 → 自动化2分钟 = 60倍提升！`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </section>

               {/* 模块分隔符 */}
               <div className="relative flex items-center justify-center py-4">
                 <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
                   <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                 </div>
                 <div className="relative px-4 text-orange-500 font-bold">◆ ◆ ◆</div>
               </div>

               {/* MODULE 03: 报表生成自动化 */}
               <section id="report-generation" className="scroll-mt-24">
                 <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 shadow-2xl">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                   <div className="relative">
                     <div className="flex items-center gap-3 mb-3">
                       <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                       <h2 className="text-3xl font-extrabold text-white tracking-tight">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 报表生成自动化</h2>
                     </div>
                     <p className="text-orange-50 text-lg ml-8 font-medium">从2小时手工制作到3分钟自动生成</p>
                   </div>
                 </div>

                 <div className="space-y-6">
                   <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                     <CardContent className="pt-6 space-y-6">
                       {/* 典型报表类型 */}
                       <div>
                         <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                           � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 典型报表类型与效率对比
                         </h3>
                         <div className="grid grid-cols-3 gap-4">
                           {[
                             { type: '日报', freq: '每天9点', content: 'GMV、订单数、转化率、Top商品', manual: '2小时', auto: '3分钟', boost: '40倍' },
                             { type: '周报', freq: '每周一', content: '各渠道效果、漏斗分析、趋势图', manual: '3小时', auto: '5分钟', boost: '36倍' },
                             { type: '月报', freq: '每月1日', content: '产品线分析、同比环比、预测', manual: '5小时', auto: '10分钟', boost: '30倍' }
                           ].map((item, idx) => (
                             <div key={idx} className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-orange-50 border-orange-200'}`}>
                               <div className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>{item.type}</div>
                               <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}><strong>频率：</strong>{item.freq}</p>
                               <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.content}</p>
                               <div className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                 <p>⏱ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 手动：{item.manual}</p>
                                 <p> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} 自动：{item.auto}</p>
                                 <p className={`font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 提升{item.boost}</p>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>

                       {/* Python完整脚本 */}
                       <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                         <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>💻 Python完整自动化报表脚本 ⭐⭐⭐⭐⭐</h4>
                         <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`import pandas as pd
import matplotlib.pyplot as plt
from openpyxl import load_workbook
from openpyxl.drawing.image import Image
from datetime import datetime, timedelta

def generate_daily_report():
    """自动生成日报：数据分析 + 图表 + Excel + 邮件"""
    
    # 1️⃣ 读取数据
    yesterday = (datetime.now() - timedelta(days=1)).date()
    df = pd.read_sql(f"SELECT * FROM sales WHERE date='{yesterday}'", engine)
    
    # 2️⃣ 核心指标计算
    total_gmv = df['金额'].sum()
    order_count = len(df)
    user_count = df['用户ID'].nunique()
    avg_price = df['金额'].mean()
    
    # 3️⃣ 生成趋势图表
    plt.figure(figsize=(10, 6))
    plt.rcParams['font.sans-serif'] = ['SimHei']  # 中文支持
    hourly = df.groupby('小时')['金额'].sum()
    plt.plot(hourly.index, hourly.values, marker='o', linewidth=2, color='#FF6B6B')
    plt.title(f'{yesterday} GMV小时趋势', fontsize=14, fontweight='bold')
    plt.xlabel('小时')
    plt.ylabel('GMV（元）')
    plt.grid(True, alpha=0.3)
    plt.savefig('gmv_trend.png', dpi=100, bbox_inches='tight')
    plt.close()
    
    # 4️⃣ 写入Excel模板
    wb = load_workbook('日报模板.xlsx')
    ws = wb['数据']
    ws['B2'] = str(yesterday)
    ws['B3'] = f'{total_gmv/10000:.2f}万'
    ws['B4'] = order_count
    ws['B5'] = user_count
    ws['B6'] = f'{avg_price:.2f}'
    
    # 插入图表
    img = Image('gmv_trend.png')
    img.width, img.height = 480, 288
    ws.add_image(img, 'E2')
    
    # 填充Top商品明细
    top_products = df.groupby('商品')['金额'].sum().nlargest(10)
    for idx, (product, amount) in enumerate(top_products.items(), start=10):
        ws.cell(idx, 1, product)
        ws.cell(idx, 2, f'{amount:.2f}')
    
    filename = f'日报_{yesterday}.xlsx'
    wb.save(filename)
    print(f'✅ Excel报表已生成：{filename}')
    
    # 5️⃣ 发送邮件
    send_email(
        to_list=['boss@company.com', 'team@company.com'],
        subject=f'【日报】{yesterday}数据分析',
        body=f'''
        各位领导/同事，附件为{yesterday}数据分析报表。
        
        核心数据：
        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} GMV：{total_gmv/10000:.2f}万元
        📦 订单数：{order_count}
        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 用户数：{user_count}
        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 客单价：{avg_price:.2f}元
        ''',
        attachment=filename
    )
    print('📧 邮件已发送！')

# 定时任务
from apscheduler.schedulers.blocking import BlockingScheduler
scheduler = BlockingScheduler()
scheduler.add_job(generate_daily_report, 'cron', hour=9, minute=0)
scheduler.start()`}
                         </pre>
                       </div>

                       {/* 方案对比 */}
                       <div>
                         <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                           🔧 4种方案全面对比
                         </h3>
                         <div className="overflow-x-auto">
                           <table className="w-full text-sm">
                             <thead>
                               <tr className={`border-b-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                                 <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>方案</th>
                                 <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>难度</th>
                                 <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>灵活性</th>
                                 <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>成本</th>
                                 <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>推荐度</th>
                               </tr>
                             </thead>
                             <tbody>
                               {[
                                 { solution: 'Python自动化', difficulty: '⭐⭐⭐', flexibility: '⭐⭐⭐⭐⭐', cost: '免费', recommend: '⭐⭐⭐⭐⭐', note: '最强大灵活' },
                                 { solution: 'Excel VBA', difficulty: '⭐⭐', flexibility: '⭐⭐⭐', cost: '免费', recommend: '⭐⭐⭐', note: '适合Excel用户' },
                                 { solution: 'Power BI', difficulty: '⭐⭐', flexibility: '⭐⭐⭐⭐', cost: '付费', recommend: '⭐⭐⭐⭐', note: '企业级方案' },
                                 { solution: 'Tableau', difficulty: '⭐⭐', flexibility: '⭐⭐⭐⭐⭐', cost: '昂贵', recommend: '⭐⭐⭐⭐', note: '可视化最强' }
                               ].map((row, idx) => (
                                 <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                   <td className={`py-2 px-3 font-semibold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>{row.solution}</td>
                                   <td className={`py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.difficulty}</td>
                                   <td className={`py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.flexibility}</td>
                                   <td className={`py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.cost}</td>
                                   <td className={`py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.recommend}</td>
                                 </tr>
                               ))}
                             </tbody>
                           </table>
                         </div>
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

              {/* MODULE 04: 监控预警自动化 */}
              <section id="monitoring-alert" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 监控预警自动化</h2>
                    </div>
                    <p className="text-red-50 text-lg ml-8 font-medium">数据异常立即知晓，不再错过关键信号</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6 space-y-6">
                      {/* 核心监控指标 */}
                      <div>
                        <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          🚨 4大核心监控场景
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { metric: 'GMV异常下降', rule: '日环比下降>20%', action: '钉钉+邮件', level: '紧急', color: 'red' },
                            { metric: '数据未更新', rule: '10点后仍无数据', action: '短信+电话', level: '严重', color: 'orange' },
                            { metric: '转化率异常', rule: '低于均值30%', action: '邮件+钉钉', level: '重要', color: 'yellow' },
                            { metric: '订单量暴涨', rule: '增长>50%', action: '钉钉通知', level: '提示', color: 'blue' }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'}`}>
                              <div className="flex items-center justify-between mb-2">
                                <p className={`font-bold text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{item.metric}</p>
                                <span className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-red-900' : 'bg-red-200'}`}>{item.level}</span>
                              </div>
                              <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}><strong>规则：</strong>{item.rule}</p>
                              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}><strong>预警：</strong>{item.action}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 监控脚本 + 钉钉 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>💻 Python监控脚本 + 钉钉机器人 ⭐⭐⭐⭐⭐</h4>
                        <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`import pandas as pd
from datetime import datetime, timedelta
from libs import get_engine, safe_request

def monitor_gmv():
    """监控GMV异常"""
    engine = get_engine()
    today = datetime.now().date()
    yesterday = today - timedelta(days=1)
    
    # 获取数据
    today_gmv = pd.read_sql(f"SELECT SUM(金额) as gmv FROM sales WHERE date='{today}'", engine)['gmv'][0] or 0
    
    yesterday_gmv = pd.read_sql(f"SELECT SUM(金额) as gmv FROM sales WHERE date='{yesterday}'", engine)['gmv'][0] or 0
    
    # 计算变化率
    if yesterday_gmv > 0:
        change_rate = (today_gmv - yesterday_gmv) / yesterday_gmv
    else:
        change_rate = 0
    
    # 判断是否预警
    if change_rate < -0.2:  # 下降超过20%
        alert_content = f"""
#### ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} GMV异常预警

- **时间：** {today} {datetime.now().strftime('%H:%M')}
- **今日GMV：** {today_gmv/10000:.2f}万元
- **昨日GMV：** {yesterday_gmv/10000:.2f}万元
- **变化率：** <font color="red">{change_rate*100:.1f}%</font>

> **请立即检查：**
> 1. 数据源是否正常
> 2. 是否有业务活动结束
> 3. 是否有系统故障

[查看详细数据](http://dashboard.company.com)
"""
        
        safe_request('https://oapi.dingtalk.com/robot/send?access_token=YOUR_TOKEN', payload={
            "msgtype":"markdown",
            "markdown": {"title":"⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} GMV异常预警","text": alert_content}
        })
        print(f'📢 已发送预警：GMV下降{abs(change_rate)*100:.1f}%')
    else:
        print(f'✅ GMV正常：{change_rate*100:+.1f}%')

def monitor_data_freshness():
    """监控数据更新"""
    engine = get_engine()
    today = datetime.now().date()
    current_hour = datetime.now().hour
    
    # 检查今日数据
    count = pd.read_sql(f"SELECT COUNT(*) as cnt FROM sales WHERE date='{today}'", engine)['cnt'][0]
    
    if count == 0 and current_hour >= 10:  # 10点后仍无数据
        alert_content = f"""
#### 🚨 数据未更新预警

- **时间：** {datetime.now().strftime('%Y-%m-%d %H:%M')}
- **今日数据量：** <font color="red">0条</font>
- **预期数据量：** >1000条

> **紧急处理：**
> 1. 检查ETL任务是否运行
> 2. 检查数据库连接
> 3. 联系数据团队

[查看ETL日志](http://etl.company.com/logs)
"""
        
        safe_request('YOUR_WEBHOOK_URL', payload={
            "msgtype":"markdown",
            "markdown": {"title":"🚨 数据未更新","text": alert_content}
        })
        print('🚨 预警：数据未更新')
    else:
        print(f'✅ 数据正常：{count}条')

# 定时任务：每小时运行
from apscheduler.schedulers.blocking import BlockingScheduler
scheduler = BlockingScheduler()
scheduler.add_job(monitor_gmv, 'interval', hours=1)
scheduler.add_job(monitor_data_freshness, 'interval', hours=1)
scheduler.start()`}
                        </pre>
                      </div>

                      {/* 钉钉机器人配置 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>🤖 钉钉机器人配置（5步搞定）</h4>
                        <ol className={`list-decimal list-inside space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>钉钉群 → 群设置 → 智能群助手 → 添加机器人 → 自定义</li>
                          <li>安全设置：选择"自定义关键词"（如：预警）或"加签"</li>
                          <li>复制Webhook：<code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-xs">https://oapi.dingtalk.com/robot/send?access_token=xxx</code></li>
                          <li>在Python代码中替换YOUR_TOKEN为实际token</li>
                          <li>测试发送：运行脚本，钉钉群会收到消息 ✅</li>
                        </ol>
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

              {/* MODULE 05: 邮件推送自动化 */}
              <section id="email-push" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">📧 邮件推送自动化</h2>
                    </div>
                    <p className="text-purple-50 text-lg ml-8 font-medium">定时自动发送报表，解放双手</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6 space-y-6">
                      {/* 3种场景 */}
                      <div>
                        <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          📨 3种典型自动化场景
                        </h3>
                        <div className="space-y-3">
                          {[
                            { scenario: '定时报表', time: '每天9点', content: '自动发送日报给领导和团队', to: '多人群发', freq: '每日' },
                            { scenario: '异常预警', time: '实时触发', content: 'GMV下降时立即发送预警邮件', to: '紧急联系人', freq: '触发式' },
                            { scenario: '周报汇总', time: '每周五17点', content: '自动生成并发送本周总结', to: '团队+领导', freq: '每周' }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-purple-50'}`}>
                              <div className="flex items-center justify-between mb-1">
                                <p className={`font-bold text-sm ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{item.scenario}</p>
                                <span className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-purple-900/50' : 'bg-purple-200'}`}>{item.freq}</span>
                              </div>
                              <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.content}</p>
                              <div className="flex items-center justify-between">
                                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>收件人：{item.to}</p>
                                <p className={`text-xs ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>⏰ {item.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 完整邮件代码 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>💻 Python完整邮件发送代码 ⭐⭐⭐⭐⭐</h4>
                        <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

def send_report_email(to_list, subject, html_body, attachment_path=None):
    """发送带附件的HTML格式邮件"""
    
    # 创建邮件对象
    msg = MIMEMultipart('alternative')
    msg['From'] = 'report@company.com'
    msg['To'] = ', '.join(to_list)
    msg['Subject'] = subject
    
    # HTML正文（支持富文本格式、表格、颜色）
    html_content = f"""
    <html>
      <head>
        <style>
          table {{ border-collapse: collapse; width: 100%; }}
          th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
          th {{ background-color: #4CAF50; color: white; }}
          .highlight {{ color: #FF6B6B; font-weight: bold; }}
        </style>
      </head>
      <body>
        <h2 style="color: #4CAF50;">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析日报</h2>
        {html_body}
        <hr>
        <p style="color: #666; font-size: 12px;">
          本邮件由自动化脚本生成 | 如有疑问请联系数据团队
        </p>
      </body>
    </html>
    """
    msg.attach(MIMEText(html_content, 'html', 'utf-8'))
    
    # 添加Excel附件
    if attachment_path:
        with open(attachment_path, 'rb') as f:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(f.read())
        encoders.encode_base64(part)
        filename = attachment_path.split('/')[-1]
        part.add_header('Content-Disposition', f'attachment; filename={filename}')
        msg.attach(part)
    
    # 连接SMTP服务器并发送
    try:
        server = smtplib.SMTP('smtp.company.com', 587)
        server.starttls()
        server.login('report@company.com', 'your_password')
        server.send_message(msg)
        server.quit()
        print(f'✅ 邮件已发送给：{", ".join(to_list)}')
        return True
    except Exception as e:
        print(f'❌ 邮件发送失败：{str(e)}')
        return False

# 使用示例
send_report_email(
    to_list=['boss@company.com', 'team@company.com'],
    subject='【日报】2024-10-02数据分析',
    html_body='''
    <table>
      <tr><th>指标</th><th>数值</th><th>对比</th></tr>
      <tr><td>GMV</td><td>100万</td><td class="highlight">+12.5%</td></tr>
      <tr><td>订单数</td><td>5000</td><td>+8.3%</td></tr>
      <tr><td>用户数</td><td>3200</td><td>+15.2%</td></tr>
    </table>
    ''',
    attachment_path='日报_2024-10-02.xlsx'
)`}
                        </pre>
                      </div>

                      {/* SMTP配置表 */}
                      <div>
                        <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          ⚙ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 常用邮箱SMTP配置
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className={`border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                                <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>邮箱</th>
                                <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>SMTP服务器</th>
                                <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>端口</th>
                                <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>说明</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { email: 'QQ邮箱', server: 'smtp.qq.com', port: '587/465', note: '需开启SMTP授权码' },
                                { email: '163邮箱', server: 'smtp.163.com', port: '587/465', note: '需设置授权密码' },
                                { email: 'Gmail', server: 'smtp.gmail.com', port: '587', note: '需开启两步验证' },
                                { email: '企业邮箱', server: '公司指定', port: '587/465', note: '咨询IT部门' }
                              ].map((row, idx) => (
                                <tr key={idx} className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                  <td className={`py-2 px-3 font-semibold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{row.email}</td>
                                  <td className={`py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.server}</td>
                                  <td className={`py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{row.port}</td>
                                  <td className={`py-2 px-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{row.note}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
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

              {/* MODULE 06: 仪表盘自动化 */}
              <section id="dashboard-auto" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 仪表盘自动化</h2>
                    </div>
                    <p className="text-teal-50 text-lg ml-8 font-medium">数据实时更新，领导随时查看</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="pt-6 space-y-6">
                      {/* 3种方案对比 */}
                      <div>
                        <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          🎯 3种解决方案全面对比
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { 
                              solution: 'Excel动态仪表盘', 
                              difficulty: '⭐', 
                              cost: '免费', 
                              time: '1天', 
                              features: '透视表+切片器+图表', 
                              suit: '小型团队、快速交付', 
                              recommend: '⭐⭐⭐⭐',
                              pros: '上手快、无需编程',
                              cons: '功能有限、不支持复杂分析'
                            },
                            { 
                              solution: 'Python + Streamlit', 
                              difficulty: '⭐⭐⭐', 
                              cost: '免费', 
                              time: '3-5天', 
                              features: '实时Web仪表盘、交互强', 
                              suit: '技术团队、定制需求', 
                              recommend: '⭐⭐⭐⭐⭐',
                              pros: '灵活强大、完全定制',
                              cons: '需要Python基础'
                            },
                            { 
                              solution: 'Power BI / Tableau', 
                              difficulty: '⭐⭐', 
                              cost: '付费', 
                              time: '2-3天', 
                              features: '企业级BI平台、强大', 
                              suit: '大型企业、预算充足', 
                              recommend: '⭐⭐⭐⭐',
                              pros: '专业成熟、功能全面',
                              cons: '成本高、学习曲线'
                            }
                          ].map((item, idx) => (
                            <div key={idx} className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-teal-50 border-teal-200'}`}>
                              <p className={`font-bold text-sm mb-3 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>{item.solution}</p>
                              <div className={`space-y-1 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                <p><strong>难度：</strong>{item.difficulty}</p>
                                <p><strong>成本：</strong>{item.cost}</p>
                                <p><strong>开发时间：</strong>{item.time}</p>
                                <p><strong>特点：</strong>{item.features}</p>
                                <p><strong>适合：</strong>{item.suit}</p>
                                <p className={`${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}><strong>✅ </strong>{item.pros}</p>
                                <p className={`${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}><strong>❌ </strong>{item.cons}</p>
                                <p className="pt-1"><strong>推荐度：</strong>{item.recommend}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Excel动态仪表盘 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>✨ 方案1：Excel动态仪表盘（最简单）⭐⭐⭐⭐</h4>
                        <ol className={`list-decimal list-inside text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li><strong>数据源用表格：</strong>选中数据区域 → 按<code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-xs">Ctrl+T</code>转为表格 → 数据自动扩展</li>
                          <li><strong>创建透视表：</strong><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-xs">Alt+D+P</code>快捷键 → 设置行、列、值字段</li>
                          <li><strong>插入切片器：</strong>透视表工具 → 插入切片器 → 选择筛选字段（年份/地区/产品等）</li>
                          <li><strong>基于透视表插入图表：</strong>柱状图/折线图/饼图 → 图表自动联动更新</li>
                          <li><strong>刷新数据：</strong>数据更新后，按<code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-xs">Alt+F5</code>全部刷新，所有图表自动更新！</li>
                        </ol>
                        <p className={`text-xs mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          💡 <strong>优势：</strong>无需编程、10分钟搞定、适合快速交付给领导
                        </p>
                      </div>

                      {/* Python Streamlit */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>💻 方案2：Python + Streamlit实时仪表盘 ⭐⭐⭐⭐⭐</h4>
                        <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`import streamlit as st
import pandas as pd
import plotly.express as px
from sqlalchemy import create_engine

# 页面配置
st.set_page_config(page_title='实时销售监控', layout='wide', page_icon='📊')
st.title('� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 实时销售监控仪表盘')

# 读取最新数据（自动刷新）
@st.cache_data(ttl=300)  # 5分钟缓存
def load_data():
    engine = create_engine('mysql://user:pwd@localhost/db')
    df = pd.read_sql('SELECT * FROM sales WHERE date=CURDATE()', engine)
    return df

df = load_data()

# ====== 核心指标卡片 ======
col1, col2, col3, col4 = st.columns(4)
with col1:
    gmv = df['金额'].sum()
    st.metric('今日GMV', f'{gmv/10000:.1f}万', delta='+12.5%', delta_color='normal')
with col2:
    orders = len(df)
    st.metric('订单数', f'{orders}', delta='+8.3%')
with col3:
    users = df['用户ID'].nunique()
    st.metric('用户数', f'{users}', delta='+15.2%')
with col4:
    avg_price = df['金额'].mean()
    st.metric('客单价', f'{avg_price:.0f}', delta='-2.1%', delta_color='inverse')

# ====== 交互式图表 ======
st.subheader('� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} GMV小时趋势')
hourly = df.groupby('小时')['金额'].sum().reset_index()
fig = px.line(hourly, x='小时', y='金额', markers=True, 
              title='GMV小时分布', height=400)
st.plotly_chart(fig, use_container_width=True)

# ====== 地区分布 ======
col1, col2 = st.columns(2)
with col1:
    st.subheader('🗺 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 地区GMV分布')
    region_df = df.groupby('地区')['金额'].sum().reset_index()
    fig2 = px.bar(region_df, x='地区', y='金额', color='金额')
    st.plotly_chart(fig2, use_container_width=True)

with col2:
    st.subheader('🛍 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} Top10商品')
    top_products = df.groupby('商品')['金额'].sum().nlargest(10)
    st.bar_chart(top_products)

# ====== 筛选器 ======
st.sidebar.header('� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 筛选条件')
selected_region = st.sidebar.selectbox('选择地区', ['全部'] + list(df['地区'].unique()))
if selected_region != '全部':
    filtered_df = df[df['地区'] == selected_region]
    st.subheader(f'📋 {selected_region} - 明细数据')
    st.dataframe(filtered_df[['订单ID', '商品', '金额', '用户ID']], height=300)

# ====== 自动刷新提示 ======
st.sidebar.info('⏰ 数据每5分钟自动刷新')

# 运行命令：streamlit run dashboard.py
# 访问：http://localhost:8501`}
                        </pre>
                        <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          💡 <strong>优势：</strong>交互性强、实时更新、支持复杂分析、部署简单（一行命令）
                        </p>
                      </div>

                      {/* 部署说明 */}
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Streamlit部署方式</h4>
                        <div className={`text-sm space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <div>
                            <p className="font-semibold mb-1">1️⃣ 本地运行（开发测试）</p>
                            <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-xs">pip install streamlit plotly</code><br/>
                            <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-xs mt-1 inline-block">streamlit run dashboard.py</code>
                          </div>
                          <div>
                            <p className="font-semibold mb-1">2️⃣ 云端部署（团队共享）</p>
                            <p className="text-xs">• Streamlit Cloud（免费）：<a href="https://streamlit.io/cloud" className="text-blue-500 underline" target="_blank">streamlit.io/cloud</a></p>
                            <p className="text-xs">• 阿里云/腾讯云服务器：nohup streamlit run dashboard.py &</p>
                          </div>
                          <div>
                            <p className="font-semibold mb-1">3️⃣ 企业内网部署</p>
                            <p className="text-xs">在公司服务器运行，团队通过内网IP访问（如：http://192.168.1.100:8501）</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
              
              {/* MLOps：模型重训与回滚（联动告警） */}
              <section id="mlops-retrain" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-2xl p-8 mb-8 bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500 shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-10 bg-white rounded-full shadow-lg"></div>
                      <h2 className="text-3xl font-extrabold text-white tracking-tight">🤖 模型重训与回滚</h2>
                    </div>
                    <p className="text-blue-50 text-lg ml-8 font-medium">PSI漂移/AUC下降触发重训，验证不达标自动回滚；全过程日志与告警</p>
                  </div>
                </div>

                <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardContent className="pt-6 space-y-6">
                    <div className={`${theme==='dark'?'bg-gray-900':'bg-gray-50'} p-4 rounded-lg`}>
                      <h4 className={`font-bold mb-2 ${theme==='dark'?'text-indigo-300':'text-indigo-700'}`}>💻 retrain_and_deploy.py（骨架）</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400 border border-gray-700':'bg-white text-gray-800 border border-gray-200'}`}>
{`import os, joblib, pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
from sklearn.linear_model import LogisticRegression
from libs import get_engine, safe_request

THRESHOLD_AUC = float(os.getenv('RETRAIN_AUC_THRESHOLD', '0.70'))

def retrain():
    # 1) 取近90天训练数据
    eng = get_engine()
    df = pd.read_sql('SELECT * FROM churn_training WHERE ds>=DATE_SUB(CURDATE(), INTERVAL 90 DAY)', eng)
    X = df.drop(columns=['is_churn','user_id'])
    y = df['is_churn']
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    # 2) 训练与评估
    model = LogisticRegression(max_iter=1000)
    model.fit(X_tr, y_tr)
    auc = roc_auc_score(y_te, model.predict_proba(X_te)[:,1])

    # 3) 验证阈值与回滚
    if auc >= THRESHOLD_AUC:
        joblib.dump({'model': model, 'columns': X.columns.tolist()}, 'model_prod.pkl')
        safe_request('YOUR_DINGTALK_WEBHOOK', payload={
            'msgtype':'markdown',
            'markdown':{'title':'模型上线','text':f"### {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 模型上线 AUC={auc:.3f}"}
        })
    else:
        safe_request('YOUR_DINGTALK_WEBHOOK', payload={
            'msgtype':'markdown',
            'markdown':{'title':'模型回滚','text':f"### ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 重训AUC={auc:.3f}<阈值，保持旧模型"}
        })

if __name__ == '__main__':
    retrain()`}
                      </pre>
                    </div>
                    <div className={`${theme==='dark'?'bg-gray-800':'bg-white'} p-4 rounded-lg border ${theme==='dark'?'border-gray-700':'border-gray-200'}`}>
                      <h4 className={`font-bold mb-2 ${theme==='dark'?'text-indigo-300':'text-indigo-700'}`}>⏱ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 调度与依赖</h4>
                      <ul className={`text-sm ${theme==='dark'?'text-gray-300':'text-gray-700'} space-y-1`}>
                        <li>• 触发条件：PSI超阈值/业务指标下降 → APScheduler 触发重训任务</li>
                        <li>• 依赖就绪：检查训练数据分区ready（复用 READY_FLAG_SQL）</li>
                        <li>• 回滚策略：离线评估不达标保留旧模型；新旧模型灰度对比后切换</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 流水线说明图 + 一键命令清单 */}
              <section id="pipeline-cheats" className="mt-8">
                <div className={`rounded-xl p-6 mb-6 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
                  <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>🧭 自动化流水线（ASCII示意）</h3>
                  <pre className={`text-[11px] overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400':'bg-gray-50 text-gray-800'}`}>
{`         ┌────────────┐      ┌────────────┐      ┌──────────────┐      ┌──────────────┐
APScheduler ─▶ 数据获取 ───▶ 数据清洗 ───▶ 指标/报表生成 ───▶ 邮件/钉钉推送
         │              │      │              │      │              │      │
         │              ▼      ▼              │      ▼              │      ▼
         │          质量闸门  DQ校验通过 ─────┘  指标写库(analytics.daily_metrics)  领导查看/自动化归档
         │
         ├────────▶ 监控：数据更新/GMV异常（告警）
         │
         └────────▶ 模型：漂移PSI/指标下降 → 触发重训 → 评估通过上线 / 回滚`}
                  </pre>
                  <h3 className={`text-lg font-bold mt-4 mb-2 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} 一键命令清单（建议）</h3>
                  <ul className={`text-sm grid md:grid-cols-2 gap-2 ${theme==='dark'?'text-gray-300':'text-gray-700'}`}>
                    <li>• 安装依赖：<code className="px-1 rounded bg-gray-200 dark:bg-gray-700">pip install -r requirements.txt</code></li>
                    <li>• 生成日报：<code className="px-1 rounded bg-gray-200 dark:bg-gray-700">python main.py 2025-10-02</code></li>
                    <li>• 启动监控：<code className="px-1 rounded bg-gray-200 dark:bg-gray-700">python monitor.py</code>（或 APScheduler 常驻）</li>
                    <li>• 模型API：<code className="px-1 rounded bg-gray-200 dark:bg-gray-700">uvicorn churn_api:app --reload</code></li>
                    <li>• 触发重训：<code className="px-1 rounded bg-gray-200 dark:bg-gray-700">python retrain_and_deploy.py</code></li>
                    <li>• Linux 定时：<code className="px-1 rounded bg-gray-200 dark:bg-gray-700">crontab -e</code> 写入 <code className="px-1 rounded bg-gray-200 dark:bg-gray-700">0 9 * * * python /opt/main.py</code></li>
                  </ul>
                </div>
              </section>
              
              {/* 页面底部 */}
              <div className={`mt-12 p-6 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700' : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-600'}`}>
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                      开始你的自动化之旅
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      从最频繁的任务开始，逐步建立你的自动化工作流
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {[
                    { step: '第1周', content: 'Python基础 + pandas', result: '能读写Excel' },
                    { step: '第2周', content: '数据清洗自动化', result: '清洗脚本' },
                    { step: '第3-4周', content: '报表生成+邮件', result: '日报自动化' },
                    { step: '第5-6周', content: '定时任务调度', result: '完全自动运行' },
                    { step: '第7-8周', content: '监控+预警系统', result: '实时监控' },
                    { step: '第9-12周', content: '综合项目实战', result: '效率提升10倍' }
                  ].map((item, idx) => (
                    <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className={`text-sm font-bold mb-1 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{item.step}</div>
                      <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.content}</div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>→ {item.result}</div>
                    </div>
                  ))}
                </div>
              </div>
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

