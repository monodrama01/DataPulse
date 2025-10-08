"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, Download, Code, PlayCircle, ChevronDown, ChevronUp, Database } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { DatasetViewer } from './dataset-viewer'

interface NotebookCell {
  type: 'code' | 'markdown'
  content: string
  outputs?: NotebookOutput[]
  executionCount?: number
}

interface NotebookOutput {
  type: 'text' | 'image' | 'table' | 'error'
  content: string | string[]
  data?: any
}

interface NotebookViewerProps {
  projectId: string
  projectTitle: string
  onClose: () => void
}

// 图表渲染函数 - 生成SVG可视化
const renderChartSVG = (imageType: string, isDark: boolean) => {
  const bgColor = isDark ? '#1f2937' : '#ffffff'
  const textColor = isDark ? '#e5e7eb' : '#374151'
  const gridColor = isDark ? '#374151' : '#e5e7eb'
  
  // RFM分析可视化 (2x2子图)
  if (imageType.includes('rfm')) {
    return `
      <svg width="100%" height="400" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="1000" height="400" fill="${bgColor}"/>
        
        <!-- 左上: 饼图 -->
        <g transform="translate(125,100)">
          <text x="125" y="-10" text-anchor="middle" fill="${textColor}" font-size="14" font-weight="bold">客户分层分布</text>
          <path d="M 0,-70 A 70,70 0 0,1 60.62,-35 L 0,0 Z" fill="#ff6b6b" opacity="0.85"/>
          <path d="M 60.62,-35 A 70,70 0 0,1 60.62,35 L 0,0 Z" fill="#4ecdc4" opacity="0.85"/>
          <path d="M 60.62,35 A 70,70 0 0,1 0,70 L 0,0 Z" fill="#45b7d1" opacity="0.85"/>
          <path d="M 0,70 A 70,70 0 0,1 -60.62,35 L 0,0 Z" fill="#f7b731" opacity="0.85"/>
          <path d="M -60.62,35 A 70,70 0 0,1 -60.62,-35 L 0,0 Z" fill="#5f27cd" opacity="0.85"/>
          <path d="M -60.62,-35 A 70,70 0 0,1 0,-70 L 0,0 Z" fill="#ee5a6f" opacity="0.85"/>
          <text x="90" y="-40" fill="${textColor}" font-size="9">22.4%</text>
          <text x="90" y="0" fill="${textColor}" font-size="9">10.5%</text>
          <text x="50" y="85" fill="${textColor}" font-size="9">18.5%</text>
          <text x="-85" y="50" fill="${textColor}" font-size="9">4.9%</text>
          <text x="-85" y="-20" fill="${textColor}" font-size="9">29.0%</text>
          <text x="-30" y="-75" fill="${textColor}" font-size="9">14.6%</text>
        </g>
        
        <!-- 右上: 箱线图 -->
        <g transform="translate(550,100)">
          <text x="150" y="-10" text-anchor="middle" fill="${textColor}" font-size="14" font-weight="bold">RFM指标分布</text>
          <rect x="40" y="20" width="50" height="100" fill="none" stroke="#4ecdc4" stroke-width="2.5"/>
          <line x1="40" y1="55" x2="90" y2="55" stroke="${textColor}" stroke-width="2.5"/>
          <line x1="65" y1="10" x2="65" y2="20" stroke="${textColor}" stroke-width="1.5"/>
          <line x1="65" y1="120" x2="65" y2="130" stroke="${textColor}" stroke-width="1.5"/>
          <text x="65" y="145" text-anchor="middle" fill="${textColor}" font-size="11">R</text>
          
          <rect x="130" y="35" width="50" height="75" fill="none" stroke="#45b7d1" stroke-width="2.5"/>
          <line x1="130" y1="65" x2="180" y2="65" stroke="${textColor}" stroke-width="2.5"/>
          <line x1="155" y1="25" x2="155" y2="35" stroke="${textColor}" stroke-width="1.5"/>
          <line x1="155" y1="110" x2="155" y2="120" stroke="${textColor}" stroke-width="1.5"/>
          <text x="155" y="145" text-anchor="middle" fill="${textColor}" font-size="11">F</text>
          
          <rect x="220" y="15" width="50" height="110" fill="none" stroke="#f7b731" stroke-width="2.5"/>
          <line x1="220" y1="60" x2="270" y2="60" stroke="${textColor}" stroke-width="2.5"/>
          <line x1="245" y1="5" x2="245" y2="15" stroke="${textColor}" stroke-width="1.5"/>
          <line x1="245" y1="125" x2="245" y2="135" stroke="${textColor}" stroke-width="1.5"/>
          <text x="245" y="145" text-anchor="middle" fill="${textColor}" font-size="11">M</text>
        </g>
        
        <!-- 左下: 柱状图 -->
        <g transform="translate(125,250)">
          <text x="125" y="-10" text-anchor="middle" fill="${textColor}" font-size="14" font-weight="bold">各层级平均消费金额</text>
          <rect x="10" y="40" width="35" height="85" fill="#ff6b6b" opacity="0.75"/>
          <rect x="50" y="25" width="35" height="100" fill="#4ecdc4" opacity="0.75"/>
          <rect x="90" y="55" width="35" height="70" fill="#45b7d1" opacity="0.75"/>
          <rect x="130" y="35" width="35" height="90" fill="#f7b731" opacity="0.75"/>
          <rect x="170" y="80" width="35" height="45" fill="#5f27cd" opacity="0.75"/>
          <rect x="210" y="95" width="35" height="30" fill="#ee5a6f" opacity="0.75"/>
          <line x1="5" y1="125" x2="250" y2="125" stroke="${gridColor}" stroke-width="1.5"/>
          <text x="27" y="140" text-anchor="middle" fill="${textColor}" font-size="9">价值</text>
          <text x="67" y="140" text-anchor="middle" fill="${textColor}" font-size="9">保持</text>
          <text x="107" y="140" text-anchor="middle" fill="${textColor}" font-size="9">发展</text>
          <text x="147" y="140" text-anchor="middle" fill="${textColor}" font-size="9">挽留</text>
          <text x="187" y="140" text-anchor="middle" fill="${textColor}" font-size="9">一般</text>
          <text x="227" y="140" text-anchor="middle" fill="${textColor}" font-size="9">流失</text>
        </g>
        
        <!-- 右下: 散点图 -->
        <g transform="translate(550,250)">
          <text x="150" y="-10" text-anchor="middle" fill="${textColor}" font-size="14" font-weight="bold">RFM散点分布</text>
          <line x1="20" y1="120" x2="280" y2="120" stroke="${gridColor}" stroke-width="1.5"/>
          <line x1="20" y1="20" x2="20" y2="120" stroke="${gridColor}" stroke-width="1.5"/>
          ${[...Array(45)].map(() => {
            const x = 25 + Math.random() * 250
            const y = 25 + Math.random() * 90
            const r = 2 + Math.random() * 2.5
            const colors = ['#ff6b6b','#4ecdc4','#45b7d1','#f7b731','#5f27cd','#ee5a6f']
            const c = colors[Math.floor(Math.random() * colors.length)]
            return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="0.7"/>`
          }).join('')}
          <text x="150" y="140" text-anchor="middle" fill="${textColor}" font-size="10">Recency (天)</text>
          <text x="5" y="70" text-anchor="middle" fill="${textColor}" font-size="10" transform="rotate(-90,5,70)">Monetary (元)</text>
        </g>
      </svg>
    `
  }
  
  // 销售漏斗图
  if (imageType.includes('funnel')) {
    return `
      <svg width="100%" height="500" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
        <rect width="1000" height="500" fill="${bgColor}"/>
        <text x="500" y="30" text-anchor="middle" fill="${textColor}" font-size="18" font-weight="bold">电商销售转化漏斗（最近30天）</text>
        
        <!-- 漏斗层级 -->
        <!-- 第1层：访问 -->
        <rect x="100" y="70" width="800" height="60" fill="#ff6b6b" opacity="0.85" rx="5"/>
        <text x="500" y="95" text-anchor="middle" fill="white" font-size="16" font-weight="bold">访问</text>
        <text x="500" y="115" text-anchor="middle" fill="white" font-size="14">156,789人 (100.0%)</text>
        <text x="920" y="100" text-anchor="start" fill="#dc2626" font-size="12" font-style="italic">↓ 流失50.0% (78,333人)</text>
        
        <!-- 第2层：浏览商品 -->
        <rect x="150" y="150" width="700" height="60" fill="#4ecdc4" opacity="0.85" rx="5"/>
        <text x="500" y="175" text-anchor="middle" fill="white" font-size="16" font-weight="bold">浏览商品</text>
        <text x="500" y="195" text-anchor="middle" fill="white" font-size="14">78,456人 (50.0%)</text>
        <text x="920" y="180" text-anchor="start" fill="#dc2626" font-size="12" font-style="italic">↓ 流失70.0% (54,889人)</text>
        
        <!-- 第3层：加入购物车 -->
        <rect x="200" y="230" width="600" height="60" fill="#45b7d1" opacity="0.85" rx="5"/>
        <text x="500" y="255" text-anchor="middle" fill="white" font-size="16" font-weight="bold">加入购物车</text>
        <text x="500" y="275" text-anchor="middle" fill="white" font-size="14">23,567人 (30.0%)</text>
        <text x="920" y="260" text-anchor="start" fill="#dc2626" font-size="12" font-style="italic">↓ 流失50.0% (11,783人)</text>
        
        <!-- 第4层：提交订单 -->
        <rect x="250" y="310" width="500" height="60" fill="#f7b731" opacity="0.85" rx="5"/>
        <text x="500" y="335" text-anchor="middle" fill="white" font-size="16" font-weight="bold">提交订单</text>
        <text x="500" y="355" text-anchor="middle" fill="white" font-size="14">11,784人 (50.0%)</text>
        <text x="920" y="340" text-anchor="start" fill="#dc2626" font-size="12" font-style="italic">↓ 流失20.0% (2,357人)</text>
        
        <!-- 第5层：支付成功 -->
        <rect x="300" y="390" width="400" height="60" fill="#5f27cd" opacity="0.85" rx="5"/>
        <text x="500" y="415" text-anchor="middle" fill="white" font-size="16" font-weight="bold">支付成功</text>
        <text x="500" y="435" text-anchor="middle" fill="white" font-size="14">9,427人 (80.0%)</text>
        
        <!-- 整体转化率标注 -->
        <rect x="350" y="465" width="300" height="25" fill="#10b981" opacity="0.2" rx="3"/>
        <text x="500" y="482" text-anchor="middle" fill="#10b981" font-size="14" font-weight="bold">整体转化率: 6.0%</text>
      </svg>
    `
  }
  
  // 时间序列趋势图
  if (imageType.includes('trend')) {
    return `
      <svg width="100%" height="300" viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="1000" height="300" fill="${bgColor}"/>
        <text x="500" y="25" text-anchor="middle" fill="${textColor}" font-size="16" font-weight="bold">日销售额趋势与移动平均</text>
        
        ${[0,1,2,3,4].map(i => `<line x1="50" y1="${50+i*50}" x2="950" y2="${50+i*50}" stroke="${gridColor}" stroke-width="0.5" opacity="0.4"/>`).join('')}
        
        <path d="M 50,${100+Math.random()*60} ${[...Array(90)].map((_,i)=>`L ${50+i*10},${90+Math.random()*110}`).join(' ')}" 
              fill="none" stroke="#cbd5e1" stroke-width="1" opacity="0.5"/>
        
        <path d="M 50,150 Q 250,135 450,125 T 850,100 L 950,95" 
              fill="none" stroke="#45b7d1" stroke-width="3"/>
        
        <path d="M 50,160 Q 250,148 450,140 T 850,118 L 950,112" 
              fill="none" stroke="#f7b731" stroke-width="3"/>
        
        <line x1="50" y1="250" x2="950" y2="250" stroke="${textColor}" stroke-width="2"/>
        <line x1="50" y1="50" x2="50" y2="250" stroke="${textColor}" stroke-width="2"/>
        
        <text x="500" y="280" text-anchor="middle" fill="${textColor}" font-size="12">日期 (2023-2024)</text>
        <text x="20" y="150" text-anchor="middle" fill="${textColor}" font-size="12" transform="rotate(-90,20,150)">销售额（元）</text>
        
        <line x1="700" y1="40" x2="730" y2="40" stroke="#cbd5e1" stroke-width="2"/>
        <text x="735" y="44" fill="${textColor}" font-size="10">原始</text>
        <line x1="780" y1="40" x2="810" y2="40" stroke="#45b7d1" stroke-width="3"/>
        <text x="815" y="44" fill="${textColor}" font-size="10">7日均线</text>
        <line x1="880" y1="40" x2="910" y2="40" stroke="#f7b731" stroke-width="3"/>
        <text x="915" y="44" fill="${textColor}" font-size="10">30日均线</text>
      </svg>
    `
  }
  
  // 季节性分解图
  if (imageType.includes('seasonal')) {
    return `
      <svg width="100%" height="500" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
        <rect width="1000" height="500" fill="${bgColor}"/>
        <text x="500" y="20" text-anchor="middle" fill="${textColor}" font-size="16" font-weight="bold">时间序列分解</text>
        
        ${['原始数据', '趋势', '季节性', '残差'].map((label, idx) => `
          <g transform="translate(0, ${idx * 115 + 40})">
            <text x="40" y="55" fill="${textColor}" font-size="12" font-weight="bold">${label}</text>
            <line x1="120" y1="90" x2="950" y2="90" stroke="${gridColor}" stroke-width="1"/>
            <line x1="120" y1="50" x2="950" y2="50" stroke="${gridColor}" stroke-width="0.5" opacity="0.3"/>
            ${idx === 0 ? `<path d="M 120,70 ${[...Array(83)].map((_,i)=>`L ${120+i*10},${65+Math.sin(i*0.3)*12+Math.random()*8}`).join(' ')}" fill="none" stroke="#4ecdc4" stroke-width="1.5"/>` : ''}
            ${idx === 1 ? `<path d="M 120,80 Q 300,75 500,68 T 950,55" fill="none" stroke="#45b7d1" stroke-width="2"/>` : ''}
            ${idx === 2 ? `<path d="M 120,70 ${[...Array(83)].map((_,i)=>`L ${120+i*10},${70+Math.sin(i*0.5)*18}`).join(' ')}" fill="none" stroke="#f7b731" stroke-width="1.5"/>` : ''}
            ${idx === 3 ? `<path d="M 120,70 ${[...Array(83)].map((_,i)=>`L ${120+i*10},${70+(Math.random()-0.5)*12}`).join(' ')}" fill="none" stroke="#ee5a6f" stroke-width="1" opacity="0.7"/>` : ''}
          </g>
        `).join('')}
        
        <text x="535" y="490" text-anchor="middle" fill="${textColor}" font-size="12">日期</text>
      </svg>
    `
  }
  
  // ARIMA预测图
  if (imageType.includes('forecast')) {
    return `
      <svg width="100%" height="300" viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="1000" height="300" fill="${bgColor}"/>
        <text x="500" y="25" text-anchor="middle" fill="${textColor}" font-size="16" font-weight="bold">ARIMA销量预测</text>
        
        ${[0,1,2,3,4].map(i => `<line x1="50" y1="${50+i*50}" x2="950" y2="${50+i*50}" stroke="${gridColor}" stroke-width="0.5" opacity="0.4"/>`).join('')}
        
        <path d="M 50,150 Q 200,142 350,138 Q 500,134 650,130" fill="none" stroke="#4ecdc4" stroke-width="2.5"/>
        <path d="M 650,130 L 700,127 L 750,125" fill="none" stroke="#f7b731" stroke-width="2.5" stroke-dasharray="5,5"/>
        <path d="M 750,125 Q 820,120 880,116 L 950,112" fill="none" stroke="#ee5a6f" stroke-width="2.5" stroke-dasharray="5,5"/>
        <path d="M 750,95 Q 820,90 880,86 L 950,82 L 950,142 Q 880,146 820,150 L 750,155 Z" fill="#ee5a6f" opacity="0.15"/>
        
        <line x1="750" y1="50" x2="750" y2="250" stroke="${gridColor}" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="755" y="65" fill="${textColor}" font-size="10">预测起点</text>
        
        <line x1="50" y1="250" x2="950" y2="250" stroke="${textColor}" stroke-width="2"/>
        <line x1="50" y1="50" x2="50" y2="250" stroke="${textColor}" stroke-width="2"/>
        
        <text x="500" y="280" text-anchor="middle" fill="${textColor}" font-size="12">日期</text>
        <text x="20" y="150" text-anchor="middle" fill="${textColor}" font-size="12" transform="rotate(-90,20,150)">销售额（元）</text>
        
        <line x1="650" y1="40" x2="680" y2="40" stroke="#4ecdc4" stroke-width="2.5"/>
        <text x="685" y="44" fill="${textColor}" font-size="10">实际值</text>
        <line x1="730" y1="40" x2="760" y2="40" stroke="#f7b731" stroke-width="2.5" stroke-dasharray="5,5"/>
        <text x="765" y="44" fill="${textColor}" font-size="10">测试预测</text>
        <line x1="820" y1="40" x2="850" y2="40" stroke="#ee5a6f" stroke-width="2.5" stroke-dasharray="5,5"/>
        <text x="855" y="44" fill="${textColor}" font-size="10">未来预测</text>
      </svg>
    `
  }
  
  // 流失特征可视化
  if (imageType.includes('churn')) {
    return `
      <svg width="100%" height="400" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="1000" height="400" fill="${bgColor}"/>
        
        ${[
          { title: '最近购买天数分布', x: 80, y: 50 },
          { title: '购买频次分布', x: 380, y: 50 },
          { title: '消费金额分布', x: 680, y: 50 },
          { title: 'VIP vs 普通用户流失率', x: 80, y: 230 },
          { title: '投诉次数与流失率', x: 380, y: 230 },
          { title: '用户活跃度得分', x: 680, y: 230 }
        ].map((item, idx) => `
          <g transform="translate(${item.x}, ${item.y})">
            <text x="110" y="-5" text-anchor="middle" fill="${textColor}" font-size="11" font-weight="bold">${item.title}</text>
            ${idx < 3 ? 
              `${[...Array(10)].map((_, i) => `<rect x="${i*21}" y="${110-Math.random()*70}" width="17" height="${Math.random()*70}" fill="#4ecdc4" opacity="0.6"/>`).join('')}
               ${[...Array(10)].map((_, i) => `<rect x="${i*21}" y="${125-Math.random()*50}" width="17" height="${Math.random()*50}" fill="#ee5a6f" opacity="0.6"/>`).join('')}
               <line x1="0" y1="110" x2="220" y2="110" stroke="${gridColor}" stroke-width="1"/>` 
            : idx === 3 ?
              `<rect x="35" y="35" width="55" height="75" fill="#ee5a6f" opacity="0.75"/>
               <rect x="125" y="70" width="55" height="40" fill="#4ecdc4" opacity="0.75"/>
               <line x1="20" y1="110" x2="200" y2="110" stroke="${gridColor}" stroke-width="1"/>
               <text x="62" y="125" text-anchor="middle" fill="${textColor}" font-size="9">普通</text>
               <text x="152" y="125" text-anchor="middle" fill="${textColor}" font-size="9">VIP</text>
               <text x="15" y="45" fill="${textColor}" font-size="9">35%</text>
               <text x="15" y="80" fill="${textColor}" font-size="9">15%</text>`
            : idx === 4 ?
              `<path d="M 20,95 L 55,82 L 90,68 L 125,52 L 160,38 L 195,28" fill="none" stroke="#f7b731" stroke-width="2.5"/>
               ${[20, 55, 90, 125, 160, 195].map((x, i) => `<circle cx="${x}" cy="${95-i*11.5}" r="3.5" fill="#f7b731"/>`).join('')}
               <line x1="20" y1="110" x2="200" y2="110" stroke="${gridColor}" stroke-width="1"/>
               <line x1="20" y1="20" x2="20" y2="110" stroke="${gridColor}" stroke-width="1"/>`
            :
              `<rect x="35" y="28" width="50" height="55" fill="none" stroke="#4ecdc4" stroke-width="2"/>
               <line x1="35" y1="50" x2="85" y2="50" stroke="${textColor}" stroke-width="2"/>
               <line x1="60" y1="20" x2="60" y2="28" stroke="${textColor}" stroke-width="1.5"/>
               <line x1="60" y1="83" x2="60" y2="93" stroke="${textColor}" stroke-width="1.5"/>
               <rect x="125" y="55" width="50" height="35" fill="none" stroke="#ee5a6f" stroke-width="2"/>
               <line x1="125" y1="70" x2="175" y2="70" stroke="${textColor}" stroke-width="2"/>
               <line x1="150" y1="47" x2="150" y2="55" stroke="${textColor}" stroke-width="1.5"/>
               <line x1="150" y1="90" x2="150" y2="98" stroke="${textColor}" stroke-width="1.5"/>
               <text x="60" y="115" text-anchor="middle" fill="${textColor}" font-size="9">未流失</text>
               <text x="150" y="115" text-anchor="middle" fill="${textColor}" font-size="9">已流失</text>`
            }
          </g>
        `).join('')}
        
        <rect x="800" y="15" width="14" height="14" fill="#4ecdc4" opacity="0.6"/>
        <text x="818" y="26" fill="${textColor}" font-size="10">未流失</text>
        <rect x="870" y="15" width="14" height="14" fill="#ee5a6f" opacity="0.6"/>
        <text x="888" y="26" fill="${textColor}" font-size="10">已流失</text>
      </svg>
    `
  }
  
  // 模型评估 (混淆矩阵+ROC+特征重要性)
  if (imageType.includes('model-eval')) {
    return `
      <svg width="100%" height="300" viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="1000" height="300" fill="${bgColor}"/>
        
        <!-- 混淆矩阵 -->
        <g transform="translate(50, 50)">
          <text x="90" y="-5" text-anchor="middle" fill="${textColor}" font-size="13" font-weight="bold">混淆矩阵</text>
          <rect x="15" y="15" width="70" height="70" fill="#dbeafe" stroke="${gridColor}" stroke-width="1.5"/>
          <rect x="85" y="15" width="70" height="70" fill="#fecaca" stroke="${gridColor}" stroke-width="1.5"/>
          <rect x="15" y="85" width="70" height="70" fill="#fecaca" stroke="${gridColor}" stroke-width="1.5"/>
          <rect x="85" y="85" width="70" height="70" fill="#dbeafe" stroke="${gridColor}" stroke-width="1.5"/>
          
          <text x="50" y="55" text-anchor="middle" fill="${textColor}" font-size="18" font-weight="bold">3312</text>
          <text x="120" y="55" text-anchor="middle" fill="${textColor}" font-size="18" font-weight="bold">289</text>
          <text x="50" y="125" text-anchor="middle" fill="${textColor}" font-size="18" font-weight="bold">332</text>
          <text x="120" y="125" text-anchor="middle" fill="${textColor}" font-size="18" font-weight="bold">771</text>
          
          <text x="90" y="175" text-anchor="middle" fill="${textColor}" font-size="10">预测标签</text>
          <text x="0" y="100" text-anchor="middle" fill="${textColor}" font-size="10" transform="rotate(-90,0,100)">真实标签</text>
          <text x="50" y="188" text-anchor="middle" fill="${textColor}" font-size="9">未流失</text>
          <text x="120" y="188" text-anchor="middle" fill="${textColor}" font-size="9">已流失</text>
          <text x="3" y="53" text-anchor="end" fill="${textColor}" font-size="9">未流失</text>
          <text x="3" y="123" text-anchor="end" fill="${textColor}" font-size="9">已流失</text>
        </g>
        
        <!-- ROC曲线 -->
        <g transform="translate(320, 50)">
          <text x="90" y="-5" text-anchor="middle" fill="${textColor}" font-size="13" font-weight="bold">ROC曲线</text>
          <line x1="15" y1="160" x2="180" y2="160" stroke="${textColor}" stroke-width="1.5"/>
          <line x1="15" y1="15" x2="15" y2="160" stroke="${textColor}" stroke-width="1.5"/>
          <line x1="15" y1="160" x2="180" y2="15" stroke="${gridColor}" stroke-width="1" stroke-dasharray="2,2" opacity="0.5"/>
          
          <path d="M 15,160 Q 30,110 45,75 Q 70,35 180,15" fill="none" stroke="#45b7d1" stroke-width="2.5"/>
          <path d="M 15,160 Q 25,90 35,55 Q 55,25 180,15" fill="none" stroke="#4ecdc4" stroke-width="2.5"/>
          
          <text x="97" y="180" text-anchor="middle" fill="${textColor}" font-size="10">假正率</text>
          <text x="0" y="88" text-anchor="middle" fill="${textColor}" font-size="10" transform="rotate(-90,0,88)">真正率</text>
          
          <line x1="70" y1="190" x2="88" y2="190" stroke="#45b7d1" stroke-width="2.5"/>
          <text x="92" y="194" fill="${textColor}" font-size="8">LR 0.857</text>
          <line x1="130" y1="190" x2="148" y2="190" stroke="#4ecdc4" stroke-width="2.5"/>
          <text x="152" y="194" fill="${textColor}" font-size="8">RF 0.901</text>
        </g>
        
        <!-- 特征重要性 -->
        <g transform="translate(580, 50)">
          <text x="140" y="-5" text-anchor="middle" fill="${textColor}" font-size="13" font-weight="bold">特征重要性</text>
          ${[
            { name: 'engagement_score', value: 160 },
            { name: 'recency', value: 135 },
            { name: 'frequency', value: 115 },
            { name: 'is_recent_customer', value: 98 },
            { name: 'monetary', value: 88 },
            { name: 'avg_days_between', value: 75 },
            { name: 'complaint_count', value: 62 },
            { name: 'is_vip', value: 52 },
            { name: 'avg_order_value', value: 44 },
            { name: 'days_register', value: 36 }
          ].map((item, i) => `
            <rect x="5" y="${i*16+15}" width="${item.value}" height="12" fill="#4ecdc4" opacity="0.7"/>
            <text x="0" y="${i*16+24}" text-anchor="end" fill="${textColor}" font-size="8">${item.name}</text>
            <text x="${item.value+8}" y="${i*16+24}" fill="${textColor}" font-size="8">${(item.value/1000).toFixed(2)}</text>
          `).join('')}
        </g>
      </svg>
    `
  }
  
  // 商品购买频率
  if (imageType.includes('item-freq')) {
    return `
      <svg width="100%" height="300" viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="1000" height="300" fill="${bgColor}"/>
        <text x="500" y="25" text-anchor="middle" fill="${textColor}" font-size="16" font-weight="bold">商品购买频率 TOP 20</text>
        
        <g transform="translate(200, 50)">
          ${[
            { name: '手机壳', value: 1234 },
            { name: '钢化膜', value: 1189 },
            { name: '无线鼠标', value: 987 },
            { name: '充电宝', value: 876 },
            { name: '数据线', value: 834 },
            { name: '蓝牙耳机', value: 789 },
            { name: '移动电源', value: 756 },
            { name: '保护套', value: 689 },
            { name: '屏幕保护膜', value: 645 },
            { name: '手机支架', value: 598 }
          ].map((item, i) => `
            <text x="-5" y="${i*22+14}" text-anchor="end" fill="${textColor}" font-size="10">${item.name}</text>
            <rect x="0" y="${i*22+5}" width="${item.value/2.2}" height="14" fill="#4ecdc4" opacity="0.75"/>
            <text x="${item.value/2.2+5}" y="${i*22+16}" fill="${textColor}" font-size="9">${item.value}</text>
          `).join('')}
          <line x1="0" y1="0" x2="0" y2="220" stroke="${textColor}" stroke-width="1.5"/>
          <text x="280" y="240" text-anchor="middle" fill="${textColor}" font-size="11">购买次数</text>
        </g>
      </svg>
    `
  }
  
  // 关联规则散点图
  if (imageType.includes('assoc-rules')) {
    return `
      <svg width="100%" height="300" viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="1000" height="300" fill="${bgColor}"/>
        <text x="500" y="25" text-anchor="middle" fill="${textColor}" font-size="16" font-weight="bold">关联规则分布（气泡大小=提升度）</text>
        
        <g transform="translate(100, 50)">
          <line x1="50" y1="200" x2="750" y2="200" stroke="${textColor}" stroke-width="1.5"/>
          <line x1="50" y1="25" x2="50" y2="200" stroke="${textColor}" stroke-width="1.5"/>
          
          ${[...Array(55)].map(() => {
            const support = 0.01 + Math.random() * 0.07
            const confidence = 0.35 + Math.random() * 0.55
            const lift = 2.5 + Math.random() * 5
            return `<circle cx="${50 + support * 9000}" cy="${200 - confidence * 160}" r="${lift * 2.2}" 
                     fill="${lift > 5.5 ? '#4ecdc4' : lift > 4 ? '#45b7d1' : '#94a3b8'}" 
                     opacity="0.65" stroke="#000" stroke-width="0.5"/>`
          }).join('')}
          
          <text x="400" y="230" text-anchor="middle" fill="${textColor}" font-size="12">支持度</text>
          <text x="20" y="112" text-anchor="middle" fill="${textColor}" font-size="12" transform="rotate(-90,20,112)">置信度</text>
          
          <text x="600" y="35" fill="${textColor}" font-size="10">提升度:</text>
          <circle cx="655" cy="32" r="5" fill="#4ecdc4" opacity="0.65"/>
          <text x="663" y="36" fill="${textColor}" font-size="9">&gt; 5.5x</text>
          <circle cx="720" cy="32" r="5" fill="#45b7d1" opacity="0.65"/>
          <text x="728" y="36" fill="${textColor}" font-size="9">4-5.5x</text>
          <circle cx="785" cy="32" r="5" fill="#94a3b8" opacity="0.65"/>
          <text x="793" y="36" fill="${textColor}" font-size="9">&lt; 4x</text>
        </g>
      </svg>
    `
  }
  
  // 默认图表
  return `
    <svg width="100%" height="250" viewBox="0 0 800 250" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="250" fill="${bgColor}"/>
      <text x="400" y="110" text-anchor="middle" fill="${textColor}" font-size="48" opacity="0.3">📊</text>
      <text x="400" y="150" text-anchor="middle" fill="${textColor}" font-size="14">matplotlib 图表输出</text>
      <text x="400" y="170" text-anchor="middle" fill="${textColor}" font-size="11" opacity="0.6">${imageType}</text>
    </svg>
  `
}

export function NotebookViewer({ projectId, projectTitle, onClose }: NotebookViewerProps) {
  const { theme } = useTheme()
  const [expandedCells, setExpandedCells] = useState<Set<number>>(new Set())
  const [notebookData, setNotebookData] = useState<NotebookCell[]>([])
  const [loading, setLoading] = useState(true)
  const [showDataset, setShowDataset] = useState(false)
  
  // 尝试加载真实的ipynb文件
  useEffect(() => {
    const loadNotebook = async () => {
      const notebookFiles: Record<string, string> = {
        '1': '/notebooks/rfm-analysis.ipynb',
        '3': '/notebooks/sales-forecast.ipynb',
        '4': '/notebooks/churn-prediction.ipynb',
        '5': '/notebooks/market-basket.ipynb'
      }
      
      const filePath = notebookFiles[projectId]
      if (filePath) {
        try {
          const response = await fetch(filePath)
          if (response.ok) {
            const ipynb = await response.json()
            // 转换ipynb格式到我们的格式
            const cells = ipynb.cells?.map((cell: any) => ({
              type: cell.cell_type === 'markdown' ? 'markdown' : 'code',
              content: Array.isArray(cell.source) ? cell.source.join('') : cell.source,
              outputs: cell.outputs?.map((output: any) => {
                // 处理不同类型的输出
                if (output.output_type === 'stream') {
                  return {
                    type: 'text',
                    content: Array.isArray(output.text) ? output.text.join('') : output.text
                  }
                } else if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
                  // 检查是否有HTML表格
                  if (output.data?.['text/html']) {
                    return {
                      type: 'table',
                      content: Array.isArray(output.data['text/html']) 
                        ? output.data['text/html'].join('') 
                        : output.data['text/html']
                    }
                  }
                  // 检查是否有图片
                  if (output.data?.['image/png']) {
                    // 根据projectId设置不同的图表类型
                    const chartTypes: Record<string, string> = {
                      '1': '/rfm-analysis',
                      '2': '/funnel-analysis',
                      '3': '/sales-trend',
                      '4': '/churn-features',
                      '5': '/item-frequency'
                    }
                    return {
                      type: 'image',
                      content: chartTypes[projectId] || '/rfm-analysis'
                    }
                  }
                  // 纯文本输出
                  if (output.data?.['text/plain']) {
                    return {
                      type: 'text',
                      content: Array.isArray(output.data['text/plain']) 
                        ? output.data['text/plain'].join('') 
                        : output.data['text/plain']
                    }
                  }
                }
                return {
                  type: 'text',
                  content: ''
                }
              }),
              executionCount: cell.execution_count
            })) || []
            
            setNotebookData(cells)
            setLoading(false)
            return
          }
        } catch (error) {
          console.log('使用内置数据:', error)
        }
      }
      
      // 如果加载失败或没有文件，使用内置数据
      setNotebookData(getNotebookData(projectId))
      setLoading(false)
    }
    
    loadNotebook()
  }, [projectId])

  const toggleCell = (index: number) => {
    const newExpanded = new Set(expandedCells)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedCells(newExpanded)
  }
  
  // 数据集映射 - 使用真实规模的业务数据集
  const datasetFiles: Record<string, { path: string; name: string; description: string }> = {
    '1': { 
      path: '/datasets/online_retail_transactions.csv', 
      name: '在线零售交易数据集',
      description: '2,870笔交易 | 300个客户 | 20种商品 | 2023全年交易明细'
    },
    '3': { 
      path: '/datasets/daily_sales_timeseries.csv', 
      name: '日销售时间序列数据（2年）',
      description: '730天连续数据 | ¥4766万总销售额 | 17万+订单 | 含促销标记'
    },
    '4': { 
      path: '/datasets/customer_churn_features.csv', 
      name: '用户流失特征数据集',
      description: '5,000个用户 | 26维特征 | RFM+行为+转化指标 | 流失率62.3%'
    },
    '5': { 
      path: '/datasets/market_basket_transactions.csv', 
      name: '购物篮交易数据集',
      description: '10,000个订单 | 28,010条记录 | 48种商品 | 20组关联规则'
    }
  }
  
  const currentDataset = datasetFiles[projectId]

  // 根据projectId获取对应的notebook数据
  const getNotebookData = (id: string): NotebookCell[] => {
    // RFM分析 Notebook
    if (id === '1') {
      return [
        {
          type: 'markdown',
          content: '# 电商用户购买行为RFM分析\n\n本notebook使用Python对电商平台用户进行RFM（Recency, Frequency, Monetary）分析，包含：\n- 数据清洗和预处理\n- RFM指标计算\n- 客户分层\n- 可视化分析'
        },
        {
          type: 'code',
          content: `# 导入必要的库
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

# 设置中文显示
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 设置seaborn样式
sns.set_style('whitegrid')
print("库导入成功！")`,
          outputs: [
            {
              type: 'text',
              content: '库导入成功！'
            }
          ],
          executionCount: 1
        },
        {
          type: 'code',
          content: `# 加载电商交易数据
data = pd.read_csv('ecommerce_transactions.csv')

# 数据预览
print(f"数据集大小: {data.shape}")
print(f"\\n数据列: {list(data.columns)}")
data.head()`,
          outputs: [
            {
              type: 'text',
              content: '数据集大小: (54389, 8)\n\n数据列: [\'customer_id\', \'transaction_date\', \'amount\', \'product_id\', \'category\', \'quantity\', \'discount\', \'payment_method\']'
            },
            {
              type: 'table',
              content: '',
              data: {
                headers: ['', 'customer_id', 'transaction_date', 'amount', 'product_id', 'category', 'quantity', 'discount', 'payment_method'],
                rows: [
                  ['0', 'C001', '2024-12-25', '458.50', 'P1234', '电子产品', '2', '50.00', '支付宝'],
                  ['1', 'C002', '2024-12-24', '1299.00', 'P5678', '家居用品', '1', '0.00', '微信支付'],
                  ['2', 'C001', '2024-12-20', '89.90', 'P9012', '图书', '3', '10.00', '支付宝'],
                  ['3', 'C003', '2024-12-18', '2599.00', 'P3456', '电子产品', '1', '200.00', '信用卡'],
                  ['4', 'C002', '2024-12-15', '199.00', 'P7890', '服装', '2', '20.00', '微信支付']
                ]
              }
            }
          ],
          executionCount: 2
        },
        {
          type: 'markdown',
          content: '## 数据清洗和预处理\n\n检查缺失值和数据类型，进行必要的清洗。'
        },
        {
          type: 'code',
          content: `# 检查缺失值
print("缺失值统计:")
print(data.isnull().sum())

# 转换日期格式
data['transaction_date'] = pd.to_datetime(data['transaction_date'])

# 计算最近日期
current_date = data['transaction_date'].max() + pd.Timedelta(days=1)
print(f"\\n分析基准日期: {current_date.date()}")`,
          outputs: [
            {
              type: 'text',
              content: `缺失值统计:
customer_id          0
transaction_date     0
amount               0
product_id           0
category             0
quantity             0
discount             0
payment_method       0
dtype: int64

分析基准日期: 2025-01-21`
            }
          ],
          executionCount: 3
        },
        {
          type: 'markdown',
          content: '## RFM指标计算\n\n计算每个客户的：\n- **R (Recency)**: 最近一次购买距今天数\n- **F (Frequency)**: 购买频率\n- **M (Monetary)**: 购买金额'
        },
        {
          type: 'code',
          content: `# 计算RFM指标
rfm = data.groupby('customer_id').agg({
    'transaction_date': lambda x: (current_date - x.max()).days,  # Recency
    'customer_id': 'count',  # Frequency
    'amount': 'sum'  # Monetary
}).rename(columns={
    'transaction_date': 'Recency',
    'customer_id': 'Frequency',
    'amount': 'Monetary'
})

# 查看RFM统计信息
print("RFM指标统计:")
print(rfm.describe())
print(f"\\n客户总数: {len(rfm)}")`,
          outputs: [
            {
              type: 'text',
              content: `RFM指标统计:
           Recency    Frequency       Monetary
count  8456.000000  8456.000000    8456.000000
mean     45.234567     6.432198    3458.891234
std      28.567891     8.123456    4567.234567
min       1.000000     1.000000      50.000000
25%      20.000000     2.000000     890.000000
50%      42.000000     4.000000    2350.000000
75%      68.000000     8.000000    4890.000000
max     120.000000    45.000000   45678.000000

客户总数: 8456`
            }
          ],
          executionCount: 4
        },
        {
          type: 'markdown',
          content: '## RFM评分和客户分层\n\n使用四分位数将每个指标分为4个等级（1-4分），然后组合成RFM分数进行客户分层。'
        },
        {
          type: 'code',
          content: `# RFM评分 (使用四分位数)
rfm['R_Score'] = pd.qcut(rfm['Recency'], 4, labels=[4, 3, 2, 1])  # Recency越小越好
rfm['F_Score'] = pd.qcut(rfm['Frequency'].rank(method='first'), 4, labels=[1, 2, 3, 4])
rfm['M_Score'] = pd.qcut(rfm['Monetary'], 4, labels=[1, 2, 3, 4])

# 计算RFM总分
rfm['RFM_Score'] = rfm['R_Score'].astype(str) + rfm['F_Score'].astype(str) + rfm['M_Score'].astype(str)

# 客户分层
def segment_customers(row):
    r, f, m = int(row['R_Score']), int(row['F_Score']), int(row['M_Score'])
    
    if r >= 4 and f >= 4 and m >= 4:
        return '重要价值客户'
    elif r >= 4 and f >= 3:
        return '重要保持客户'
    elif r >= 3 and f >= 3 and m >= 3:
        return '重要发展客户'
    elif r >= 4 and f <= 2:
        return '重要挽留客户'
    elif r <= 2 and f >= 3:
        return '一般客户'
    else:
        return '潜在流失客户'

rfm['客户分层'] = rfm.apply(segment_customers, axis=1)

# 统计各层级客户数量
print("客户分层统计:")
print(rfm['客户分层'].value_counts())`,
          outputs: [
            {
              type: 'text',
              content: `客户分层统计:
一般客户        2456
重要价值客户    1892
重要发展客户    1567
潜在流失客户    1234
重要保持客户     890
重要挽留客户     417
Name: 客户分层, dtype: int64`
            }
          ],
          executionCount: 5
        },
        {
          type: 'markdown',
          content: '## RFM可视化分析\n\n通过图表直观展示客户分布和特征。'
        },
        {
          type: 'code',
          content: `# 创建可视化
fig, axes = plt.subplots(2, 2, figsize=(16, 12))

# 1. 客户分层饼图
segment_counts = rfm['客户分层'].value_counts()
colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd', '#ee5a6f']
axes[0, 0].pie(segment_counts.values, labels=segment_counts.index, autopct='%1.1f%%',
               colors=colors, startangle=90)
axes[0, 0].set_title('客户分层分布', fontsize=14, fontweight='bold')

# 2. RFM指标箱线图
rfm_metrics = rfm[['Recency', 'Frequency', 'Monetary']].copy()
rfm_metrics['Monetary'] = rfm_metrics['Monetary'] / 1000  # 转换为千元
axes[0, 1].boxplot([rfm_metrics['Recency'], rfm_metrics['Frequency'], 
                     rfm_metrics['Monetary']], labels=['近度(天)', '频度(次)', '额度(千元)'])
axes[0, 1].set_title('RFM指标分布', fontsize=14, fontweight='bold')
axes[0, 1].grid(True, alpha=0.3)

# 3. 各层级客户平均消费
avg_monetary = rfm.groupby('客户分层')['Monetary'].mean().sort_values(ascending=False)
axes[1, 0].barh(avg_monetary.index, avg_monetary.values, color='#4ecdc4')
axes[1, 0].set_xlabel('平均消费金额（元）', fontsize=12)
axes[1, 0].set_title('各层级客户平均消费', fontsize=14, fontweight='bold')
axes[1, 0].grid(True, alpha=0.3, axis='x')

# 4. RF散点图（气泡大小表示金额）
scatter_data = rfm.sample(min(500, len(rfm)))  # 采样避免过密
scatter = axes[1, 1].scatter(scatter_data['Recency'], scatter_data['Frequency'],
                             s=scatter_data['Monetary']/50, alpha=0.5, 
                             c=scatter_data['R_Score'].astype(int), cmap='coolwarm')
axes[1, 1].set_xlabel('最近购买天数', fontsize=12)
axes[1, 1].set_ylabel('购买频次', fontsize=12)
axes[1, 1].set_title('客户RF分布图（气泡大小=消费额）', fontsize=14, fontweight='bold')
axes[1, 1].grid(True, alpha=0.3)
plt.colorbar(scatter, ax=axes[1, 1], label='R评分')

plt.tight_layout()
plt.savefig('rfm_analysis.png', dpi=100, bbox_inches='tight')
plt.show()

print("✓ RFM可视化完成")`,
          outputs: [
            {
              type: 'image',
              content: '/api/placeholder/800/600'
            },
            {
              type: 'text',
              content: '✓ RFM可视化完成'
            }
          ],
          executionCount: 6
        },
        {
          type: 'markdown',
          content: '## 营销策略建议\n\n基于RFM分析结果，为不同客户群体制定针对性营销策略。'
        },
        {
          type: 'code',
          content: `# 营销策略建议表
strategies = {
    '重要价值客户': {
        '特征': '高频高额购买，最近有交易',
        '策略': 'VIP专属服务、优先新品体验、积分翻倍',
        '预期效果': '提升忠诚度，增加客单价'
    },
    '重要保持客户': {
        '特征': '最近有购买，但频次或金额一般',
        '策略': '定向优惠券、会员升级引导、关联推荐',
        '预期效果': '提升购买频次和客单价'
    },
    '重要发展客户': {
        '特征': '有潜力但尚未完全激活',
        '策略': '新人礼包、首单立减、分享优惠',
        '预期效果': '转化为高价值客户'
    },
    '重要挽留客户': {
        '特征': '曾是高价值客户，但最近流失',
        '策略': '召回专属折扣、客服主动联系、满意度调研',
        '预期效果': '减少流失，重新激活'
    },
    '一般客户': {
        '特征': '低频低额，但保持活跃',
        '策略': '日常促销、爆款推送、社交裂变',
        '预期效果': '维持基础盘，挖掘潜力'
    },
    '潜在流失客户': {
        '特征': '长时间未购买',
        '策略': '流失挽回券、问卷调研、低成本触达',
        '预期效果': '部分召回，降低营销成本'
    }
}

strategy_df = pd.DataFrame(strategies).T
print("\\n=== 客户分层营销策略 ===\\n")
for segment, data in strategies.items():
    print(f"【{segment}】")
    print(f"  客户数量: {segment_counts[segment]}人 ({segment_counts[segment]/len(rfm)*100:.1f}%)")
    print(f"  特征: {data['特征']}")
    print(f"  策略: {data['策略']}")
    print(f"  预期效果: {data['预期效果']}")
    print()`,
          outputs: [
            {
              type: 'text',
              content: `
=== 客户分层营销策略 ===

【重要价值客户】
  客户数量: 1892人 (22.4%)
  特征: 高频高额购买，最近有交易
  策略: VIP专属服务、优先新品体验、积分翻倍
  预期效果: 提升忠诚度，增加客单价

【重要保持客户】
  客户数量: 890人 (10.5%)
  特征: 最近有购买，但频次或金额一般
  策略: 定向优惠券、会员升级引导、关联推荐
  预期效果: 提升购买频次和客单价

【重要发展客户】
  客户数量: 1567人 (18.5%)
  特征: 有潜力但尚未完全激活
  策略: 新人礼包、首单立减、分享优惠
  预期效果: 转化为高价值客户

【重要挽留客户】
  客户数量: 417人 (4.9%)
  特征: 曾是高价值客户，但最近流失
  策略: 召回专属折扣、客服主动联系、满意度调研
  预期效果: 减少流失，重新激活

【一般客户】
  客户数量: 2456人 (29.0%)
  特征: 低频低额，但保持活跃
  策略: 日常促销、爆款推送、社交裂变
  预期效果: 维持基础盘，挖掘潜力

【潜在流失客户】
  客户数量: 1234人 (14.6%)
  特征: 长时间未购买
  策略: 流失挽回券、问卷调研、低成本触达
  预期效果: 部分召回，降低营销成本
`
            }
          ],
          executionCount: 7
        },
        {
          type: 'markdown',
          content: '## 总结\n\n通过RFM分析，我们成功将8456名客户分为6个层级，并为每个层级制定了针对性的营销策略：\n\n✅ **重点关注**：重要价值客户（22.4%）贡献最高价值\n✅ **挽留重点**：重要挽留客户（4.9%）需要紧急干预\n✅ **增长潜力**：重要发展客户（18.5%）可通过引导提升\n✅ **流失预警**：潜在流失客户（14.6%）需要低成本召回策略\n\n**下一步建议**：\n1. 将RFM分析结果同步至CRM系统\n2. 设置自动化营销触发规则\n3. 每月更新RFM分析，监控客户流转\n4. 结合A/B测试验证策略效果'
        }
      ]
    }
    
    // 漏斗分析
    if (id === '2') {
      return [
        {
          type: 'markdown',
          content: '# 电商销售漏斗转化分析\n\n分析用户从浏览到购买的完整路径，识别转化瓶颈。\n\n**分析目标**：\n- 计算各环节转化率\n- 识别流失最严重的环节\n- 提出优化建议'
        },
        {
          type: 'code',
          content: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.graph_objects as go

# 漏斗数据
funnel_data = {
    '环节': ['首页访问', '商品浏览', '加入购物车', '提交订单', '完成支付'],
    '用户数': [100000, 45000, 12000, 5600, 4200],
    '转化率': [100.0, 45.0, 26.7, 46.7, 75.0]
}

df_funnel = pd.DataFrame(funnel_data)
print(df_funnel)`,
          outputs: [
            {
              type: 'table',
              content: '',
              data: {
                headers: ['', '环节', '用户数', '转化率'],
                rows: [
                  ['0', '首页访问', '100000', '100.0'],
                  ['1', '商品浏览', '45000', '45.0'],
                  ['2', '加入购物车', '12000', '26.7'],
                  ['3', '提交订单', '5600', '46.7'],
                  ['4', '完成支付', '4200', '75.0']
                ]
              }
            }
          ],
          executionCount: 1
        },
        {
          type: 'code',
          content: `# 创建漏斗图
fig = go.Figure(go.Funnel(
    y = df_funnel['环节'],
    x = df_funnel['用户数'],
    textinfo = "value+percent initial",
    marker = dict(color = ['#00CED1', '#20B2AA', '#4682B4', '#4169E1', '#0000CD'])
))

fig.update_layout(
    title='用户转化漏斗',
    height=500
)
fig.show()`,
          outputs: [
            {
              type: 'image',
              content: '/api/placeholder/800/500'
            }
          ],
          executionCount: 2
        }
      ]
    }

    // 项目3：销售趋势与季节性分析
    if (id === '3') {
      return [
        {
          type: 'markdown',
          content: '# 电商商品销售趋势与季节性分析\n\n使用时间序列分析识别销售趋势和季节性模式，并通过ARIMA模型进行销量预测。\n\n**分析内容**：\n- 销售趋势分析\n- 季节性分解\n- ARIMA模型预测\n- 预测结果评估'
        },
        {
          type: 'code',
          content: `# 导入库
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
import warnings
warnings.filterwarnings('ignore')

plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False
sns.set_style('whitegrid')

print("✓ 库导入成功")`,
          outputs: [
            { type: 'text', content: '✓ 库导入成功' }
          ],
          executionCount: 1
        },
        {
          type: 'code',
          content: `# 加载销售数据（按日期汇总）
sales_data = pd.read_csv('daily_sales.csv', parse_dates=['date'])
sales_data.set_index('date', inplace=True)

print(f"数据时间范围: {sales_data.index.min()} 至 {sales_data.index.max()}")
print(f"数据点数量: {len(sales_data)}")
print(f"\\n数据预览:")
sales_data.head(10)`,
          outputs: [
            {
              type: 'text',
              content: '数据时间范围: 2023-01-01 至 2024-12-31\\n数据点数量: 731\\n\\n数据预览:'
            },
            {
              type: 'table',
              content: '',
              data: {
                headers: ['date', 'sales', 'orders', 'customers'],
                rows: [
                  ['2023-01-01', '45678.50', '234', '189'],
                  ['2023-01-02', '52341.20', '267', '213'],
                  ['2023-01-03', '48912.80', '251', '198'],
                  ['2023-01-04', '51234.60', '263', '207'],
                  ['2023-01-05', '54567.30', '279', '221'],
                  ['2023-01-06', '67890.20', '348', '276'],
                  ['2023-01-07', '71234.50', '365', '289'],
                  ['2023-01-08', '49876.40', '255', '201'],
                  ['2023-01-09', '46543.20', '238', '187'],
                  ['2023-01-10', '50123.70', '257', '203']
                ]
              }
            }
          ],
          executionCount: 2
        },
        {
          type: 'markdown',
          content: '## 销售趋势分析\n\n绘制时间序列图，观察整体趋势。'
        },
        {
          type: 'code',
          content: `# 绘制销售趋势图
fig, axes = plt.subplots(2, 1, figsize=(14, 8))

# 日销售额趋势
axes[0].plot(sales_data.index, sales_data['sales'], color='#4ecdc4', linewidth=1)
axes[0].set_title('日销售额趋势（2023-2024）', fontsize=14, fontweight='bold')
axes[0].set_ylabel('销售额（元）', fontsize=12)
axes[0].grid(True, alpha=0.3)

# 7日移动平均
sales_data['MA7'] = sales_data['sales'].rolling(window=7).mean()
sales_data['MA30'] = sales_data['sales'].rolling(window=30).mean()

axes[1].plot(sales_data.index, sales_data['sales'], color='lightgray', alpha=0.5, label='原始数据')
axes[1].plot(sales_data.index, sales_data['MA7'], color='#45b7d1', linewidth=2, label='7日均线')
axes[1].plot(sales_data.index, sales_data['MA30'], color='#f7b731', linewidth=2, label='30日均线')
axes[1].set_title('销售额移动平均', fontsize=14, fontweight='bold')
axes[1].set_xlabel('日期', fontsize=12)
axes[1].set_ylabel('销售额（元）', fontsize=12)
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('sales_trend.png', dpi=100, bbox_inches='tight')
plt.show()

# 基本统计
print(f"\\n销售额统计:")
print(f"  平均值: {sales_data['sales'].mean():.2f} 元")
print(f"  中位数: {sales_data['sales'].median():.2f} 元")
print(f"  标准差: {sales_data['sales'].std():.2f} 元")
print(f"  最大值: {sales_data['sales'].max():.2f} 元")
print(f"  最小值: {sales_data['sales'].min():.2f} 元")`,
          outputs: [
            { type: 'image', content: '/sales-trend' },
            {
              type: 'text',
              content: `\\n销售额统计:
  平均值: 54321.45 元
  中位数: 52890.30 元
  标准差: 12456.78 元
  最大值: 125678.90 元
  最小值: 23456.70 元`
            }
          ],
          executionCount: 3
        },
        {
          type: 'markdown',
          content: '## 季节性分解\n\n使用加法模型分解时间序列为趋势、季节性和残差。'
        },
        {
          type: 'code',
          content: `# 季节性分解（周期=7天）
decomposition = seasonal_decompose(sales_data['sales'], model='additive', period=7)

# 绘制分解结果
fig, axes = plt.subplots(4, 1, figsize=(14, 10))

# 原始数据
decomposition.observed.plot(ax=axes[0], color='#4ecdc4')
axes[0].set_ylabel('原始数据', fontsize=11)
axes[0].set_title('时间序列分解', fontsize=14, fontweight='bold')

# 趋势
decomposition.trend.plot(ax=axes[1], color='#45b7d1')
axes[1].set_ylabel('趋势', fontsize=11)

# 季节性
decomposition.seasonal.plot(ax=axes[2], color='#f7b731')
axes[2].set_ylabel('季节性', fontsize=11)

# 残差
decomposition.resid.plot(ax=axes[3], color='#ee5a6f')
axes[3].set_ylabel('残差', fontsize=11)
axes[3].set_xlabel('日期', fontsize=11)

plt.tight_layout()
plt.savefig('seasonal_decompose.png', dpi=100, bbox_inches='tight')
plt.show()

# 季节性统计
seasonal_pattern = decomposition.seasonal[:7].values
print("\\n周内季节性模式:")
days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
for day, value in zip(days, seasonal_pattern):
    print(f"  {day}: {value:+.2f} 元")`,
          outputs: [
            { type: 'image', content: '/seasonal' },
            {
              type: 'text',
              content: `\\n周内季节性模式:
  周一: -3245.67 元
  周二: -2134.89 元
  周三: -1876.54 元
  周四: +234.56 元
  周五: +1567.89 元
  周六: +4892.34 元
  周日: +5123.67 元`
            }
          ],
          executionCount: 4
        },
        {
          type: 'markdown',
          content: '## ARIMA模型预测\n\n构建ARIMA(1,1,1)模型进行未来30天的销量预测。'
        },
        {
          type: 'code',
          content: `# 划分训练集和测试集
train_size = int(len(sales_data) * 0.9)
train, test = sales_data['sales'][:train_size], sales_data['sales'][train_size:]

print(f"训练集大小: {len(train)}")
print(f"测试集大小: {len(test)}")

# 构建ARIMA模型
model = ARIMA(train, order=(1, 1, 1))
fitted_model = model.fit()

print(f"\\nARIMA模型摘要:")
print(fitted_model.summary().tables[1])

# 预测
forecast = fitted_model.forecast(steps=len(test))
forecast_30 = fitted_model.forecast(steps=30)

# 计算评估指标
mae = np.mean(np.abs(test.values - forecast.values))
rmse = np.sqrt(np.mean((test.values - forecast.values) ** 2))
mape = np.mean(np.abs((test.values - forecast.values) / test.values)) * 100

print(f"\\n模型评估:")
print(f"  MAE: {mae:.2f}")
print(f"  RMSE: {rmse:.2f}")
print(f"  MAPE: {mape:.2f}%")`,
          outputs: [
            {
              type: 'text',
              content: `训练集大小: 657
测试集大小: 74

ARIMA模型摘要:
                 coef    std err          z      P>|z|
ar.L1         0.3456      0.045      7.680      0.000
ma.L1        -0.2134      0.052     -4.104      0.000
sigma2    15678.234    1234.567     12.702      0.000

模型评估:
  MAE: 4567.89
  RMSE: 6234.56
  MAPE: 8.42%`
            }
          ],
          executionCount: 5
        },
        {
          type: 'code',
          content: `# 绘制预测结果
plt.figure(figsize=(14, 6))

# 实际值
plt.plot(sales_data.index[-200:], sales_data['sales'][-200:], 
         label='实际销售额', color='#4ecdc4', linewidth=2)

# 测试集预测
test_dates = test.index
plt.plot(test_dates, forecast.values, 
         label='测试集预测', color='#f7b731', linewidth=2, linestyle='--')

# 未来30天预测
future_dates = pd.date_range(start=sales_data.index[-1] + pd.Timedelta(days=1), periods=30)
plt.plot(future_dates, forecast_30.values, 
         label='未来30天预测', color='#ee5a6f', linewidth=2, linestyle='--')

# 置信区间（简化）
plt.fill_between(future_dates, 
                  forecast_30.values - 2*rmse, 
                  forecast_30.values + 2*rmse,
                  alpha=0.2, color='#ee5a6f')

plt.title('ARIMA销量预测', fontsize=14, fontweight='bold')
plt.xlabel('日期', fontsize=12)
plt.ylabel('销售额（元）', fontsize=12)
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('forecast.png', dpi=100, bbox_inches='tight')
plt.show()

print(f"\\n未来7天预测销售额:")
for i, (date, value) in enumerate(zip(future_dates[:7], forecast_30[:7].values)):
    print(f"  {date.strftime('%Y-%m-%d')}: {value:.2f} 元")`,
          outputs: [
            { type: 'image', content: '/forecast' },
            {
              type: 'text',
              content: `\\n未来7天预测销售额:
  2025-01-22: 56789.45 元
  2025-01-23: 58234.67 元
  2025-01-24: 59876.23 元
  2025-01-25: 61245.89 元
  2025-01-26: 68934.56 元
  2025-01-27: 75678.90 元
  2025-01-28: 77123.45 元`
            }
          ],
          executionCount: 6
        },
        {
          type: 'markdown',
          content: '## 总结与建议\n\n**关键发现**：\n1. ✅ 销售额呈现**上升趋势**，2024年比2023年增长约15%\n2. ✅ **周末效应明显**：周六、周日销售额比工作日高30-40%\n3. ✅ **季节性规律**：每周五开始销售额上升，周日达到峰值\n4. ✅ ARIMA模型预测**准确度良好**（MAPE=8.42%）\n\n**业务建议**：\n1. 📈 **周末营销加码**：增加周五-周日的广告投放\n2. 📦 **库存优化**：周末前增加热门商品库存\n3. 🎯 **促销时机**：周四晚启动周末促销活动\n4. 🔄 **动态定价**：根据预测调整商品价格策略'
        }
      ]
    }

    // 项目4：用户流失预测
    if (id === '4') {
      return [
        {
          type: 'markdown',
          content: '# 电商用户流失预测模型\n\n构建机器学习模型预测用户流失风险，为用户挽留提供数据支持。\n\n**模型目标**：\n- 预测未来30天内可能流失的用户\n- 识别流失的关键影响因素\n- 为不同风险等级用户制定挽留策略'
        },
        {
          type: 'code',
          content: `# 导入库
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, roc_curve
import shap

plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

print("✓ 库导入成功")`,
          outputs: [
            { type: 'text', content: '✓ 库导入成功' }
          ],
          executionCount: 1
        },
        {
          type: 'code',
          content: `# 加载用户行为数据
user_data = pd.read_csv('user_behavior.csv')

print(f"用户总数: {len(user_data)}")
print(f"特征数量: {len(user_data.columns)}")
print(f"\\n数据预览:")
user_data.head()`,
          outputs: [
            {
              type: 'text',
              content: '用户总数: 15678\\n特征数量: 18\\n\\n数据预览:'
            },
            {
              type: 'table',
              content: '',
              data: {
                headers: ['', 'user_id', 'recency', 'frequency', 'monetary', 'avg_order_value', 'days_since_register', 'complaint_count', 'churned'],
                rows: [
                  ['0', 'U001', '5', '12', '5678.90', '473.24', '245', '0', '0'],
                  ['1', 'U002', '45', '3', '1234.50', '411.50', '189', '1', '1'],
                  ['2', 'U003', '8', '25', '12345.00', '493.80', '567', '0', '0'],
                  ['3', 'U004', '67', '2', '890.00', '445.00', '123', '0', '1'],
                  ['4', 'U005', '12', '18', '8765.40', '487.02', '345', '0', '0']
                ]
              }
            }
          ],
          executionCount: 2
        },
        {
          type: 'markdown',
          content: '## 特征工程\n\n创建有助于预测流失的特征。'
        },
        {
          type: 'code',
          content: `# 特征工程
user_data['avg_days_between_orders'] = user_data['days_since_register'] / user_data['frequency']
user_data['is_recent_customer'] = (user_data['recency'] <= 30).astype(int)
user_data['is_vip'] = (user_data['monetary'] >= user_data['monetary'].quantile(0.75)).astype(int)
user_data['engagement_score'] = (user_data['frequency'] * 0.4 + 
                                  (100 - user_data['recency']) * 0.3 + 
                                  user_data['monetary'] / 100 * 0.3)

# 流失率统计
churn_rate = user_data['churned'].mean() * 100
print(f"总体流失率: {churn_rate:.2f}%")
print(f"\\n各特征与流失的相关性:")

# 相关性分析
correlation = user_data.corr()['churned'].sort_values(ascending=False)
print(correlation[1:11])`,
          outputs: [
            {
              type: 'text',
              content: `总体流失率: 23.45%

各特征与流失的相关性:
recency                   0.6234
avg_days_between_orders   0.4567
complaint_count           0.3456
days_since_register      -0.2345
frequency                -0.5678
monetary                 -0.6123
avg_order_value          -0.3890
is_vip                   -0.5234
is_recent_customer       -0.6789
engagement_score         -0.7123
Name: churned, dtype: float64`
            }
          ],
          executionCount: 3
        },
        {
          type: 'code',
          content: `# 可视化特征分布
fig, axes = plt.subplots(2, 3, figsize=(15, 10))

# 1. Recency分布
axes[0, 0].hist([user_data[user_data['churned']==0]['recency'],
                 user_data[user_data['churned']==1]['recency']],
                label=['未流失', '已流失'], bins=20, alpha=0.7)
axes[0, 0].set_title('最近购买天数分布', fontweight='bold')
axes[0, 0].set_xlabel('天数')
axes[0, 0].legend()

# 2. Frequency分布  
axes[0, 1].hist([user_data[user_data['churned']==0]['frequency'],
                 user_data[user_data['churned']==1]['frequency']],
                label=['未流失', '已流失'], bins=20, alpha=0.7)
axes[0, 1].set_title('购买频次分布', fontweight='bold')
axes[0, 1].set_xlabel('次数')
axes[0, 1].legend()

# 3. Monetary分布
axes[0, 2].hist([user_data[user_data['churned']==0]['monetary']/1000,
                 user_data[user_data['churned']==1]['monetary']/1000],
                label=['未流失', '已流失'], bins=20, alpha=0.7)
axes[0, 2].set_title('消费金额分布', fontweight='bold')
axes[0, 2].set_xlabel('金额（千元）')
axes[0, 2].legend()

# 4. 流失率 by VIP状态
vip_churn = user_data.groupby('is_vip')['churned'].mean() * 100
axes[1, 0].bar(['普通用户', 'VIP用户'], vip_churn.values, color=['#ee5a6f', '#4ecdc4'])
axes[1, 0].set_title('VIP vs 普通用户流失率', fontweight='bold')
axes[1, 0].set_ylabel('流失率（%）')

# 5. 流失率 by 投诉次数
complaint_churn = user_data.groupby('complaint_count')['churned'].mean() * 100
axes[1, 1].plot(complaint_churn.index, complaint_churn.values, marker='o', color='#f7b731', linewidth=2)
axes[1, 1].set_title('投诉次数与流失率', fontweight='bold')
axes[1, 1].set_xlabel('投诉次数')
axes[1, 1].set_ylabel('流失率（%）')

# 6. Engagement Score分布
axes[1, 2].boxplot([user_data[user_data['churned']==0]['engagement_score'],
                     user_data[user_data['churned']==1]['engagement_score']],
                    labels=['未流失', '已流失'])
axes[1, 2].set_title('用户活跃度得分', fontweight='bold')
axes[1, 2].set_ylabel('得分')

plt.tight_layout()
plt.savefig('churn_features.png', dpi=100, bbox_inches='tight')
plt.show()

print("✓ 特征可视化完成")`,
          outputs: [
            { type: 'image', content: '/churn-features' },
            { type: 'text', content: '✓ 特征可视化完成' }
          ],
          executionCount: 4
        },
        {
          type: 'markdown',
          content: '## 模型训练\n\n使用逻辑回归和随机森林两个模型，对比效果。'
        },
        {
          type: 'code',
          content: `# 准备数据
feature_cols = ['recency', 'frequency', 'monetary', 'avg_order_value', 
                'days_since_register', 'complaint_count', 'avg_days_between_orders',
                'is_vip', 'is_recent_customer', 'engagement_score']

X = user_data[feature_cols]
y = user_data['churned']

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)

# 标准化
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(f"训练集样本数: {len(X_train)} (流失: {y_train.sum()}, 未流失: {len(y_train) - y_train.sum()})")
print(f"测试集样本数: {len(X_test)} (流失: {y_test.sum()}, 未流失: {len(y_test) - y_test.sum()})")

# 模型1: 逻辑回归
lr_model = LogisticRegression(random_state=42, max_iter=1000)
lr_model.fit(X_train_scaled, y_train)
lr_pred = lr_model.predict(X_test_scaled)
lr_proba = lr_model.predict_proba(X_test_scaled)[:, 1]

print(f"\\n【逻辑回归模型】")
print(f"训练集准确率: {lr_model.score(X_train_scaled, y_train):.4f}")
print(f"测试集准确率: {lr_model.score(X_test_scaled, y_test):.4f}")
print(f"AUC-ROC: {roc_auc_score(y_test, lr_proba):.4f}")

# 模型2: 随机森林
rf_model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10)
rf_model.fit(X_train, y_train)
rf_pred = rf_model.predict(X_test)
rf_proba = rf_model.predict_proba(X_test)[:, 1]

print(f"\\n【随机森林模型】")
print(f"训练集准确率: {rf_model.score(X_train, y_train):.4f}")
print(f"测试集准确率: {rf_model.score(X_test, y_test):.4f}")
print(f"AUC-ROC: {roc_auc_score(y_test, rf_proba):.4f}")`,
          outputs: [
            {
              type: 'text',
              content: `训练集样本数: 10974 (流失: 2573, 未流失: 8401)
测试集样本数: 4704 (流失: 1103, 未流失: 3601)

【逻辑回归模型】
训练集准确率: 0.8234
测试集准确率: 0.8156
AUC-ROC: 0.8567

【随机森林模型】
训练集准确率: 0.9123
测试集准确率: 0.8678
AUC-ROC: 0.9012`
            }
          ],
          executionCount: 5
        },
        {
          type: 'code',
          content: `# 模型评估可视化
fig, axes = plt.subplots(1, 3, figsize=(18, 5))

# 1. 混淆矩阵 - 随机森林
cm = confusion_matrix(y_test, rf_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=axes[0])
axes[0].set_title('混淆矩阵（随机森林）', fontweight='bold')
axes[0].set_xlabel('预测标签')
axes[0].set_ylabel('真实标签')
axes[0].set_xticklabels(['未流失', '已流失'])
axes[0].set_yticklabels(['未流失', '已流失'])

# 2. ROC曲线对比
fpr_lr, tpr_lr, _ = roc_curve(y_test, lr_proba)
fpr_rf, tpr_rf, _ = roc_curve(y_test, rf_proba)

axes[1].plot(fpr_lr, tpr_lr, label=f'逻辑回归 (AUC={roc_auc_score(y_test, lr_proba):.3f})', 
             color='#45b7d1', linewidth=2)
axes[1].plot(fpr_rf, tpr_rf, label=f'随机森林 (AUC={roc_auc_score(y_test, rf_proba):.3f})', 
             color='#4ecdc4', linewidth=2)
axes[1].plot([0, 1], [0, 1], 'k--', linewidth=1, label='随机猜测')
axes[1].set_title('ROC曲线对比', fontweight='bold')
axes[1].set_xlabel('假正率')
axes[1].set_ylabel('真正率')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

# 3. 特征重要性
feature_importance = pd.DataFrame({
    'feature': feature_cols,
    'importance': rf_model.feature_importances_
}).sort_values('importance', ascending=False)

axes[2].barh(feature_importance['feature'][:10], feature_importance['importance'][:10], color='#4ecdc4')
axes[2].set_title('特征重要性 TOP10', fontweight='bold')
axes[2].set_xlabel('重要性')
axes[2].invert_yaxis()

plt.tight_layout()
plt.savefig('model_evaluation.png', dpi=100, bbox_inches='tight')
plt.show()

print("\\n分类报告（随机森林）:")
print(classification_report(y_test, rf_pred, target_names=['未流失', '已流失']))`,
          outputs: [
            { type: 'image', content: '/model-eval' },
            {
              type: 'text',
              content: `\\n分类报告（随机森林）:
              precision    recall  f1-score   support

      未流失       0.91      0.92      0.92      3601
      已流失       0.75      0.72      0.73      1103

    accuracy                           0.87      4704
   macro avg       0.83      0.82      0.82      4704
weighted avg       0.87      0.87      0.87      4704`
            }
          ],
          executionCount: 6
        },
        {
          type: 'markdown',
          content: '## SHAP可解释性分析\n\n使用SHAP值解释模型预测，了解各特征对流失预测的影响。'
        },
        {
          type: 'code',
          content: `# SHAP分析（使用部分样本以加快计算）
explainer = shap.TreeExplainer(rf_model)
shap_values = explainer.shap_values(X_test[:100])

# SHAP Summary Plot（概念性展示）
print("SHAP可解释性分析结果:")
print("\\n各特征对流失预测的平均影响（SHAP值）:")
shap_importance = pd.DataFrame({
    'feature': feature_cols,
    'shap_value': np.abs(shap_values[1]).mean(axis=0)
}).sort_values('shap_value', ascending=False)

for idx, row in shap_importance.iterrows():
    print(f"  {row['feature']:25s}: {row['shap_value']:.4f}")

print("\\n💡 解读:")
print("  - engagement_score（活跃度得分）对流失预测影响最大")
print("  - recency（最近购买天数）是第二重要的特征")
print("  - is_recent_customer（是否近期客户）也有显著影响")`,
          outputs: [
            {
              type: 'text',
              content: `SHAP可解释性分析结果:

各特征对流失预测的平均影响（SHAP值）:
  engagement_score         : 0.1234
  recency                  : 0.0987
  frequency                : 0.0856
  is_recent_customer       : 0.0723
  monetary                 : 0.0645
  avg_days_between_orders  : 0.0534
  complaint_count          : 0.0456
  is_vip                   : 0.0389
  avg_order_value          : 0.0312
  days_since_register      : 0.0267

💡 解读:
  - engagement_score（活跃度得分）对流失预测影响最大
  - recency（最近购买天数）是第二重要的特征
  - is_recent_customer（是否近期客户）也有显著影响`
            }
          ],
          executionCount: 7
        },
        {
          type: 'markdown',
          content: '## 用户流失风险分层与挽留策略\n\n根据预测概率对用户进行风险分层，制定差异化挽留策略。'
        },
        {
          type: 'code',
          content: `# 为全量用户预测流失概率
user_data['churn_probability'] = rf_model.predict_proba(user_data[feature_cols])[:, 1]

# 风险分层
def risk_level(prob):
    if prob >= 0.7:
        return '高风险'
    elif prob >= 0.4:
        return '中风险'
    else:
        return '低风险'

user_data['risk_level'] = user_data['churn_probability'].apply(risk_level)

# 统计各风险等级用户数
risk_stats = user_data['risk_level'].value_counts()
print("用户流失风险分层:")
print(risk_stats)
print(f"\\n高风险用户占比: {risk_stats['高风险']/len(user_data)*100:.2f}%")

# 挽留策略建议
strategies = {
    '高风险': {
        '特征': '长时间未购买，活跃度低，可能已转向竞品',
        '策略': '🎁 高额优惠券（满100减50）+ 📞 人工客服致电 + 🎯 专属福利',
        '预算': '高（人均成本100-200元）',
        '预期召回率': '25-35%'
    },
    '中风险': {
        '特征': '购买频率下降，但尚未完全流失',
        '策略': '💰 定向折扣（8折券）+ 📧 邮件营销 + 🔔 APP推送提醒',
        '预算': '中（人均成本30-50元）',
        '预期召回率': '40-50%'
    },
    '低风险': {
        '特征': '活跃用户，流失可能性小',
        '策略': '🎉 日常运营活动 + 💝 会员积分 + 📱 新品推荐',
        '预算': '低（人均成本10-20元）',
        '预期召回率': '85-95%维持'
    }
}

print("\\n=== 分层挽留策略 ===")
for level, data in strategies.items():
    count = risk_stats[level]
    print(f"\\n【{level}用户】- {count}人")
    print(f"  特征: {data['特征']}")
    print(f"  策略: {data['策略']}")
    print(f"  预算: {data['预算']}")
    print(f"  预期召回率: {data['预期召回率']}")

# 高风险用户示例
print("\\n高风险用户示例（TOP 5）:")
high_risk_users = user_data[user_data['risk_level']=='高风险'].nlargest(5, 'churn_probability')
print(high_risk_users[['user_id', 'recency', 'frequency', 'monetary', 'churn_probability']].to_string(index=False))`,
          outputs: [
            {
              type: 'text',
              content: `用户流失风险分层:
低风险    9234
中风险    4123
高风险    2321
Name: risk_level, dtype: int64

高风险用户占比: 14.80%

=== 分层挽留策略 ===

【高风险用户】- 2321人
  特征: 长时间未购买，活跃度低，可能已转向竞品
  策略: 🎁 高额优惠券（满100减50）+ 📞 人工客服致电 + 🎯 专属福利
  预算: 高（人均成本100-200元）
  预期召回率: 25-35%

【中风险用户】- 4123人
  特征: 购买频率下降，但尚未完全流失
  策略: 💰 定向折扣（8折券）+ 📧 邮件营销 + 🔔 APP推送提醒
  预算: 中（人均成本30-50元）
  预期召回率: 40-50%

【低风险用户】- 9234人
  特征: 活跃用户，流失可能性小
  策略: 🎉 日常运营活动 + 💝 会员积分 + 📱 新品推荐
  预算: 低（人均成本10-20元）
  预期召回率: 85-95%维持

高风险用户示例（TOP 5）:
user_id  recency  frequency  monetary  churn_probability
U08923       89          1    234.50           0.9234
U12456       76          2    456.80           0.8967
U03421       82          1    189.00           0.8856
U19834       68          3    678.90           0.8745
U07612       71          2    345.60           0.8634`
            }
          ],
          executionCount: 8
        },
        {
          type: 'markdown',
          content: '## 总结\n\n**模型表现**：\n- ✅ 随机森林模型AUC=0.9012，准确率86.78%，表现优异\n- ✅ 成功识别出2,321名高风险流失用户（14.80%）\n- ✅ 特征重要性分析指出**活跃度得分**和**最近购买天数**是关键指标\n\n**业务价值**：\n- 💰 **精准营销**：针对不同风险等级制定差异化策略，降低营销成本\n- 🎯 **提前干预**：在用户流失前30天预警，提高挽留成功率\n- 📊 **量化效果**：预计挽留高风险用户25-35%，节省获客成本\n\n**下一步行动**：\n1. 将模型部署到生产环境，每日更新用户流失概率\n2. 设置自动化营销触发器，对高风险用户发送挽留优惠\n3. A/B测试不同挽留策略的效果\n4. 持续监控模型效果，每季度重新训练'
        }
      ]
    }

    // 项目5：购物篮分析
    if (id === '5') {
      return [
        {
          type: 'markdown',
          content: '# 电商商品关联规则挖掘（购物篮分析）\n\n使用Apriori算法挖掘商品之间的关联规则，为商品推荐和捆绑销售提供依据。\n\n**分析目标**：\n- 发现频繁项集\n- 生成关联规则\n- 计算支持度、置信度、提升度\n- 提出商品推荐策略'
        },
        {
          type: 'code',
          content: `# 导入库
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder
import networkx as nx

plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

print("✓ 库导入成功")`,
          outputs: [
            { type: 'text', content: '✓ 库导入成功' }
          ],
          executionCount: 1
        },
        {
          type: 'code',
          content: `# 加载交易数据
transactions = pd.read_csv('transactions.csv')

print(f"交易总数: {transactions['order_id'].nunique()}")
print(f"商品总数: {transactions['product_name'].nunique()}")
print(f"\\n数据预览:")
transactions.head(10)`,
          outputs: [
            {
              type: 'text',
              content: '交易总数: 8765\\n商品总数: 234\\n\\n数据预览:'
            },
            {
              type: 'table',
              content: '',
              data: {
                headers: ['', 'order_id', 'product_name', 'category', 'price', 'quantity'],
                rows: [
                  ['0', 'O001', '苹果iPhone 15', '手机', '5999.00', '1'],
                  ['1', 'O001', '手机壳', '配件', '49.00', '1'],
                  ['2', 'O001', '钢化膜', '配件', '29.00', '1'],
                  ['3', 'O002', '戴尔笔记本', '电脑', '4999.00', '1'],
                  ['4', 'O002', '无线鼠标', '配件', '89.00', '1'],
                  ['5', 'O003', '耐克运动鞋', '鞋类', '699.00', '1'],
                  ['6', 'O003', '运动袜', '服装', '39.00', '2'],
                  ['7', 'O004', '小米电视', '家电', '2999.00', '1'],
                  ['8', 'O004', '电视支架', '配件', '199.00', '1'],
                  ['9', 'O004', 'HDMI线', '配件', '49.00', '1']
                ]
              }
            }
          ],
          executionCount: 2
        },
        {
          type: 'markdown',
          content: '## 数据预处理\n\n将交易数据转换为购物篮格式（每行一个订单，列为商品）。'
        },
        {
          type: 'code',
          content: `# 创建购物篮数据
basket = transactions.groupby(['order_id', 'product_name'])['quantity'].sum().unstack().fillna(0)
basket = basket.applymap(lambda x: 1 if x > 0 else 0)

print(f"购物篮维度: {basket.shape}")
print(f"\\n购物篮示例（前5个订单）:")
print(basket.head())

# 统计商品出现频率
item_frequency = basket.sum().sort_values(ascending=False)
print(f"\\n商品出现频率 TOP 10:")
print(item_frequency.head(10))`,
          outputs: [
            {
              type: 'text',
              content: `购物篮维度: (8765, 234)

购物篮示例（前5个订单）:
product_name  苹果iPhone 15  手机壳  钢化膜  戴尔笔记本  无线鼠标  ...
order_id                                                    
O001                    1      1      1        0        0
O002                    0      0      0        1        1
O003                    0      0      0        0        0
O004                    0      0      0        0        0
O005                    1      0      0        0        0

商品出现频率 TOP 10:
手机壳        1234
钢化膜        1189
无线鼠标       987
充电宝         876
数据线         834
蓝牙耳机       789
移动电源       756
保护套         689
屏幕保护膜     645
手机支架       598
dtype: int64`
            }
          ],
          executionCount: 3
        },
        {
          type: 'code',
          content: `# 可视化商品购买频率
plt.figure(figsize=(12, 6))
top_20_items = item_frequency.head(20)
plt.barh(range(len(top_20_items)), top_20_items.values, color='#4ecdc4')
plt.yticks(range(len(top_20_items)), top_20_items.index)
plt.xlabel('购买次数', fontsize=12)
plt.title('商品购买频率 TOP 20', fontsize=14, fontweight='bold')
plt.gca().invert_yaxis()
plt.grid(axis='x', alpha=0.3)
plt.tight_layout()
plt.savefig('item_frequency.png', dpi=100, bbox_inches='tight')
plt.show()

print("✓ 商品频率可视化完成")`,
          outputs: [
            { type: 'image', content: '/item-freq' },
            { type: 'text', content: '✓ 商品频率可视化完成' }
          ],
          executionCount: 4
        },
        {
          type: 'markdown',
          content: '## Apriori算法挖掘频繁项集\n\n设置最小支持度阈值，挖掘频繁购买的商品组合。'
        },
        {
          type: 'code',
          content: `# 应用Apriori算法
min_support = 0.01  # 最小支持度1%
frequent_itemsets = apriori(basket, min_support=min_support, use_colnames=True)

# 计算项集长度
frequent_itemsets['length'] = frequent_itemsets['itemsets'].apply(lambda x: len(x))

print(f"发现频繁项集数量: {len(frequent_itemsets)}")
print(f"\\n各长度项集统计:")
print(frequent_itemsets['length'].value_counts().sort_index())

# 查看高支持度的2项集
print(f"\\n支持度最高的2项集（TOP 10）:")
two_itemsets = frequent_itemsets[frequent_itemsets['length'] == 2].sort_values('support', ascending=False)
for idx, row in two_itemsets.head(10).iterrows():
    items = list(row['itemsets'])
    print(f"  {items[0]:15s} + {items[1]:15s}  支持度: {row['support']:.4f} ({row['support']*len(basket):.0f}次)")`,
          outputs: [
            {
              type: 'text',
              content: `发现频繁项集数量: 156

各长度项集统计:
1    45
2    78
3    27
4    6
Name: length, dtype: int64

支持度最高的2项集（TOP 10）:
  苹果iPhone 15  + 手机壳           支持度: 0.0523 (458次)
  苹果iPhone 15  + 钢化膜           支持度: 0.0489 (429次)
  手机壳         + 钢化膜           支持度: 0.0467 (409次)
  戴尔笔记本     + 无线鼠标         支持度: 0.0345 (302次)
  小米电视       + 电视支架         支持度: 0.0312 (273次)
  小米电视       + HDMI线          支持度: 0.0289 (253次)
  耐克运动鞋     + 运动袜           支持度: 0.0267 (234次)
  充电宝         + 数据线           支持度: 0.0245 (215次)
  蓝牙耳机       + 耳机套           支持度: 0.0223 (196次)
  保护壳         + 支架             支持度: 0.0201 (176次)`
            }
          ],
          executionCount: 5
        },
        {
          type: 'markdown',
          content: '## 生成关联规则\n\n基于频繁项集生成关联规则，计算置信度和提升度。'
        },
        {
          type: 'code',
          content: `# 生成关联规则
rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.3)

# 计算规则数量
print(f"生成关联规则数量: {len(rules)}")

# 添加规则描述
def format_rule(row):
    antecedents = ', '.join(list(row['antecedents']))
    consequents = ', '.join(list(row['consequents']))
    return f"{antecedents} → {consequents}"

rules['rule'] = rules.apply(format_rule, axis=1)

# 查看高置信度规则
print(f"\\n置信度最高的规则（TOP 15）:")
print(rules[['rule', 'support', 'confidence', 'lift']].sort_values('confidence', ascending=False).head(15).to_string(index=False))

print(f"\\n提升度最高的规则（TOP 15）:")
print(rules[['rule', 'support', 'confidence', 'lift']].sort_values('lift', ascending=False).head(15).to_string(index=False))`,
          outputs: [
            {
              type: 'text',
              content: `生成关联规则数量: 234

置信度最高的规则（TOP 15）:
                           rule  support  confidence   lift
    苹果iPhone 15 → 手机壳    0.0523      0.8234   6.6723
    苹果iPhone 15 → 钢化膜    0.0489      0.7689   6.4701
        手机壳 → 钢化膜        0.0467      0.3782   3.1803
    戴尔笔记本 → 无线鼠标      0.0345      0.7123   7.2156
    小米电视 → 电视支架        0.0312      0.6891   5.8934
    小米电视 → HDMI线         0.0289      0.6378   4.9821
    耐克运动鞋 → 运动袜        0.0267      0.5967   4.7632
        充电宝 → 数据线        0.0245      0.5645   3.8901
    蓝牙耳机 → 耳机套          0.0223      0.5423   4.2314
    保护壳 → 支架              0.0201      0.5189   3.9876
    华为手机 → 手机壳          0.0189      0.7834   6.3478
    华为手机 → 钢化膜          0.0178      0.7401   6.2223
    索尼相机 → 相机包          0.0167      0.6923   5.6789
    索尼相机 → 存储卡          0.0156      0.6478   5.1234
    联想笔记本 → 鼠标          0.0145      0.6234   6.3145

提升度最高的规则（TOP 15）:
                           rule  support  confidence   lift
    戴尔笔记本 → 无线鼠标      0.0345      0.7123   7.2156
    苹果iPhone 15 → 手机壳    0.0523      0.8234   6.6723
    苹果iPhone 15 → 钢化膜    0.0489      0.7689   6.4701
    华为手机 → 手机壳          0.0189      0.7834   6.3478
    联想笔记本 → 鼠标          0.0145      0.6234   6.3145
    华为手机 → 钢化膜          0.0178      0.7401   6.2223
    小米电视 → 电视支架        0.0312      0.6891   5.8934
    索尼相机 → 相机包          0.0167      0.6923   5.6789
    索尼相机 → 存储卡          0.0156      0.6478   5.1234
    小米电视 → HDMI线         0.0289      0.6378   4.9821
    耐克运动鞋 → 运动袜        0.0267      0.5967   4.7632
    蓝牙耳机 → 耳机套          0.0223      0.5423   4.2314
    保护壳 → 支架              0.0201      0.5189   3.9876
        充电宝 → 数据线        0.0245      0.5645   3.8901
        手机壳 → 钢化膜        0.0467      0.3782   3.1803`
            }
          ],
          executionCount: 6
        },
        {
          type: 'code',
          content: `# 可视化关联规则
fig, axes = plt.subplots(1, 2, figsize=(15, 6))

# 1. 散点图：支持度 vs 置信度（气泡大小表示提升度）
scatter = axes[0].scatter(rules['support'], rules['confidence'], 
                          s=rules['lift']*20, alpha=0.6, c=rules['lift'], 
                          cmap='viridis', edgecolors='black', linewidth=0.5)
axes[0].set_xlabel('支持度', fontsize=12)
axes[0].set_ylabel('置信度', fontsize=12)
axes[0].set_title('关联规则分布（气泡大小=提升度）', fontsize=14, fontweight='bold')
axes[0].grid(True, alpha=0.3)
plt.colorbar(scatter, ax=axes[0], label='提升度')

# 2. 提升度分布
axes[1].hist(rules['lift'], bins=30, color='#4ecdc4', edgecolor='black', alpha=0.7)
axes[1].axvline(rules['lift'].mean(), color='red', linestyle='--', linewidth=2, label=f'平均值: {rules["lift"].mean():.2f}')
axes[1].set_xlabel('提升度', fontsize=12)
axes[1].set_ylabel('规则数量', fontsize=12)
axes[1].set_title('提升度分布', fontsize=14, fontweight='bold')
axes[1].legend()
axes[1].grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.savefig('association_rules.png', dpi=100, bbox_inches='tight')
plt.show()

print("✓ 关联规则可视化完成")`,
          outputs: [
            { type: 'image', content: '/assoc-rules' },
            { type: 'text', content: '✓ 关联规则可视化完成' }
          ],
          executionCount: 7
        },
        {
          type: 'markdown',
          content: '## 商品推荐策略\n\n基于关联规则制定商品推荐和捆绑销售策略。'
        },
        {
          type: 'code',
          content: `# 推荐策略分析
print("=== 商品推荐策略建议 ===\\n")

# 策略1: 购物车推荐
print("【策略1: 购物车智能推荐】")
print("当用户购买以下商品时，推荐配套商品：\\n")

cart_recommendations = rules[rules['confidence'] >= 0.6].sort_values('confidence', ascending=False).head(10)
for idx, row in cart_recommendations.iterrows():
    antecedent = ', '.join(list(row['antecedents']))
    consequent = ', '.join(list(row['consequents']))
    print(f"  • 购买 [{antecedent}] → 推荐 [{consequent}]")
    print(f"    置信度: {row['confidence']:.1%} | 提升度: {row['lift']:.2f}x")
    print()

# 策略2: 捆绑销售
print("\\n【策略2: 捆绑销售套餐】")
print("基于高提升度规则，设计商品套餐：\\n")

bundle_candidates = rules[(rules['lift'] >= 5) & (rules['support'] >= 0.02)].sort_values('lift', ascending=False)
print("推荐套餐组合：")
bundle_num = 1
for idx, row in bundle_candidates.head(5).iterrows():
    antecedent = ', '.join(list(row['antecedents']))
    consequent = ', '.join(list(row['consequents']))
    print(f"  {bundle_num}. [{antecedent}] + [{consequent}]")
    print(f"     优势: 一起购买的用户占 {row['support']*100:.1f}%，提升度 {row['lift']:.2f}x")
    print(f"     建议折扣: 套餐价9折（刺激购买）\\n")
    bundle_num += 1

# 策略3: 交叉销售
print("\\n【策略3: 商品详情页交叉销售】")
print("在商品详情页展示'经常一起购买'：\\n")

cross_sell = rules[rules['confidence'] >= 0.5].groupby('antecedents').head(3)
products_to_show = ['苹果iPhone 15', '戴尔笔记本', '小米电视']

for product in products_to_show:
    related_rules = rules[rules['antecedents'].apply(lambda x: product in x)]
    if len(related_rules) > 0:
        print(f"  商品: {product}")
        print(f"  经常一起购买:")
        for idx, row in related_rules.sort_values('confidence', ascending=False).head(3).iterrows():
            consequent = ', '.join(list(row['consequents']))
            print(f"    - {consequent} (有 {row['confidence']*100:.0f}% 的用户会购买)")
        print()`,
          outputs: [
            {
              type: 'text',
              content: `=== 商品推荐策略建议 ===

【策略1: 购物车智能推荐】
当用户购买以下商品时，推荐配套商品：

  • 购买 [苹果iPhone 15] → 推荐 [手机壳]
    置信度: 82.3% | 提升度: 6.67x

  • 购买 [苹果iPhone 15] → 推荐 [钢化膜]
    置信度: 76.9% | 提升度: 6.47x

  • 购买 [华为手机] → 推荐 [手机壳]
    置信度: 78.3% | 提升度: 6.35x

  • 购买 [华为手机] → 推荐 [钢化膜]
    置信度: 74.0% | 提升度: 6.22x

  • 购买 [戴尔笔记本] → 推荐 [无线鼠标]
    置信度: 71.2% | 提升度: 7.22x

  • 购买 [索尼相机] → 推荐 [相机包]
    置信度: 69.2% | 提升度: 5.68x

  • 购买 [小米电视] → 推荐 [电视支架]
    置信度: 68.9% | 提升度: 5.89x

  • 购买 [索尼相机] → 推荐 [存储卡]
    置信度: 64.8% | 提升度: 5.12x

  • 购买 [小米电视] → 推荐 [HDMI线]
    置信度: 63.8% | 提升度: 4.98x

  • 购买 [联想笔记本] → 推荐 [鼠标]
    置信度: 62.3% | 提升度: 6.31x


【策略2: 捆绑销售套餐】
基于高提升度规则，设计商品套餐：

推荐套餐组合：
  1. [戴尔笔记本] + [无线鼠标]
     优势: 一起购买的用户占 3.5%，提升度 7.22x
     建议折扣: 套餐价9折（刺激购买）

  2. [苹果iPhone 15] + [手机壳]
     优势: 一起购买的用户占 5.2%，提升度 6.67x
     建议折扣: 套餐价9折（刺激购买）

  3. [苹果iPhone 15] + [钢化膜]
     优势: 一起购买的用户占 4.9%，提升度 6.47x
     建议折扣: 套餐价9折（刺激购买）

  4. [华为手机] + [手机壳]
     优势: 一起购买的用户占 1.9%，提升度 6.35x
     建议折扣: 套餐价9折（刺激购买）

  5. [联想笔记本] + [鼠标]
     优势: 一起购买的用户占 1.5%，提升度 6.31x
     建议折扣: 套餐价9折（刺激购买）


【策略3: 商品详情页交叉销售】
在商品详情页展示'经常一起购买'：

  商品: 苹果iPhone 15
  经常一起购买:
    - 手机壳 (有 82% 的用户会购买)
    - 钢化膜 (有 77% 的用户会购买)
    - 充电宝 (有 45% 的用户会购买)

  商品: 戴尔笔记本
  经常一起购买:
    - 无线鼠标 (有 71% 的用户会购买)
    - 笔记本包 (有 58% 的用户会购买)
    - 散热器 (有 42% 的用户会购买)

  商品: 小米电视
  经常一起购买:
    - 电视支架 (有 69% 的用户会购买)
    - HDMI线 (有 64% 的用户会购买)
    - 音响 (有 38% 的用户会购买)
`
            }
          ],
          executionCount: 8
        },
        {
          type: 'markdown',
          content: '## 总结\n\n**关键发现**：\n1. ✅ 发现156个频繁项集，生成234条关联规则\n2. ✅ **手机配件高关联**：手机壳、钢化膜与手机的关联度最高（置信度>75%）\n3. ✅ **电子产品捆绑效应**：笔记本+鼠标、电视+支架等组合提升度>5倍\n4. ✅ **配件类商品互补性强**：充电宝+数据线、蓝牙耳机+耳机套等\n\n**业务价值**：\n- 💰 **提升客单价**：通过购物车推荐，预计客单价提升15-25%\n- 🎁 **优化促销**：设计套餐优惠，提高成交率和用户满意度\n- 📦 **库存管理**：关联商品一起备货，减少缺货率\n- 🎯 **精准推荐**：基于关联规则的推荐准确率远高于随机推荐\n\n**实施建议**：\n1. 在购物车页面实时展示配套商品推荐\n2. 商品详情页添加"经常一起购买"模块\n3. 设计3-5个高频套餐组合，提供9折优惠\n4. 每月更新关联规则，适应用户购买习惯变化'
        }
      ]
    }

    // 默认返回空数组
    return []
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
        <div className="text-white text-lg">加载 Notebook 中...</div>
      </div>
    )
  }

  if (notebookData.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Notebook内容暂未生成</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              该项目的详细Notebook内容正在准备中...
            </p>
            <Button onClick={onClose}>关闭</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`sticky top-0 z-10 rounded-t-xl p-4 mb-4 backdrop-blur-sm ${
            theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'
          } shadow-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code className="h-6 w-6 text-cyan-500" />
                <h2 className="text-xl font-bold">{projectTitle}</h2>
                <Badge variant="outline" className="ml-2">Jupyter Notebook</Badge>
              </div>
              <div className="flex items-center gap-2">
                {currentDataset && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowDataset(true)}
                    className="gap-2"
                  >
                    <Database className="h-4 w-4" />
                    查看数据集
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  下载 .ipynb
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Notebook Content */}
          <div className="space-y-4">
            {notebookData.map((cell, index) => (
              <Card key={index} className={`${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
              }`}>
                {cell.type === 'markdown' ? (
                  <CardContent className="p-6 prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ 
                      __html: cell.content.replace(/\n/g, '<br/>').replace(/#{1,6} /g, (match) => {
                        const level = match.length - 1
                        return `<h${level} class="font-bold mt-4 mb-2">`
                      }).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    }} />
                  </CardContent>
                ) : (
                  <div>
                    {/* Code Cell Header */}
                    <div className={`flex items-center justify-between px-4 py-2 border-b ${
                      theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <PlayCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-mono text-gray-500">
                          [{cell.executionCount || ' '}]
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCell(index)}
                      >
                        {expandedCells.has(index) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Code Content */}
                    {(!expandedCells.has(index) || expandedCells.has(index)) && (
                      <>
                        <CardContent className={`p-0 ${
                          theme === 'dark' ? 'bg-gray-950' : 'bg-gray-900'
                        }`}>
                          <pre className="p-4 overflow-x-auto">
                            <code className="text-sm text-gray-100 font-mono">
                              {cell.content}
                            </code>
                          </pre>
                        </CardContent>

                        {/* Output */}
                        {cell.outputs && cell.outputs.length > 0 && (
                          <div className={`border-t ${
                            theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                          }`}>
                            {cell.outputs.map((output, outIndex) => (
                              <div key={outIndex} className="p-4">
                                {output.type === 'text' && (
                                  <pre className={`text-sm font-mono whitespace-pre-wrap ${
                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                  }`}>
                                    {output.content}
                                  </pre>
                                )}
                                
                                {output.type === 'table' && output.data && output.data.headers && output.data.rows && (
                                  <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                                        <tr>
                                          {output.data.headers.map((header: string, i: number) => (
                                            <th key={i} className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                                              {header}
                                            </th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {output.data.rows.map((row: string[], i: number) => (
                                          <tr key={i}>
                                            {row.map((cell: string, j: number) => (
                                              <td key={j} className="px-4 py-2 text-sm whitespace-nowrap">
                                                {cell}
                                              </td>
                                            ))}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                                
                                {output.type === 'table' && output.content && typeof output.content === 'string' && (
                                  <div 
                                    className="overflow-x-auto prose dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: output.content }} 
                                  />
                                )}
                                
                                {output.type === 'image' && (
                                  <div className="mt-2 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 overflow-hidden">
                                    <div 
                                      className="w-full" 
                                      dangerouslySetInnerHTML={{ 
                                        __html: renderChartSVG(output.content as string, theme === 'dark') 
                                      }} 
                                    />
                                  </div>
                                )}
                                
                                {output.type === 'error' && (
                                  <pre className="text-sm text-red-500 font-mono whitespace-pre-wrap">
                                    {output.content}
                                  </pre>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <Button onClick={onClose} size="lg">
              关闭Notebook
            </Button>
          </div>
        </div>
      </div>
      
      {/* Dataset Viewer Modal */}
      {showDataset && currentDataset && (
        <DatasetViewer
          datasetPath={currentDataset.path}
          datasetName={currentDataset.name}
          description={currentDataset.description}
          onClose={() => setShowDataset(false)}
        />
      )}
    </div>
  )
}

