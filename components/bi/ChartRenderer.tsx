"use client"
import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import { ChartType } from './ChartSelector'
import { ChartConfig } from './ChartConfigPanel'

interface ChartRendererProps {
  chartType: ChartType
  config: ChartConfig
  data: any[]
}

export default function ChartRenderer({ chartType, config, data }: ChartRendererProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current || !data.length) return

    // 初始化或获取图表实例
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current)
    }

    // 生成图表配置
    const option = generateChartOption(chartType, config, data)
    
    if (option) {
      chartInstance.current.setOption(option, true)
    }

    // 响应式调整
    const handleResize = () => {
      chartInstance.current?.resize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [chartType, config, data])

  useEffect(() => {
    // 组件卸载时销毁图表
    return () => {
      chartInstance.current?.dispose()
      chartInstance.current = null
    }
  }, [])

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <div className="text-gray-500 dark:text-gray-400">暂无数据</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {config.title && (
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{config.title}</h3>
      )}
      <div ref={chartRef} className="w-full h-96" />
    </div>
  )
}

function generateChartOption(chartType: ChartType, config: ChartConfig, data: any[]): any {
  const baseOption = {
    title: config.title ? { text: config.title, left: 'center' } : undefined,
    tooltip: { trigger: 'axis' as const },
    legend: config.showLegend !== false ? { bottom: 0 } : undefined,
    grid: config.showGrid !== false ? { left: '3%', right: '4%', bottom: '10%', containLabel: true } : undefined,
  }

  switch (chartType) {
    case 'line':
    case 'area':
      return generateLineOrAreaChart(config, data, chartType === 'area', baseOption)
    case 'bar':
    case 'horizontal-bar':
      return generateBarChart(config, data, chartType === 'horizontal-bar', baseOption)
    case 'pie':
    case 'rose':
      return generatePieChart(config, data, chartType === 'rose', baseOption)
    case 'scatter':
      return generateScatterChart(config, data, baseOption)
    case 'histogram':
      return generateHistogramChart(config, data, baseOption)
    case 'funnel':
      return generateFunnelChart(config, data, baseOption)
    case 'radar':
      return generateRadarChart(config, data, baseOption)
    case 'wordcloud':
      return generateWordCloudChart(config, data, baseOption)
    default:
      return null
  }
}

function generateLineOrAreaChart(config: ChartConfig, data: any[], isArea: boolean, baseOption: any) {
  if (!config.xAxis || !config.yAxis) return null

  const yFields = Array.isArray(config.yAxis) ? config.yAxis : [config.yAxis]
  const aggregation = config.aggregation || 'sum'

  // 按X轴分组聚合数据
  const aggregatedData = aggregateData(data, config.xAxis, yFields, aggregation)
  const categories = Object.keys(aggregatedData).sort()

  const series = yFields.map(field => ({
    name: field,
    type: 'line' as const,
    data: categories.map(cat => aggregatedData[cat][field]),
    smooth: true,
    areaStyle: isArea ? {} : undefined,
  }))

  return {
    ...baseOption,
    xAxis: { 
      type: 'category' as const, 
      data: categories, 
      boundaryGap: !isArea,
      axisLabel: {
        interval: 'auto',
        rotate: categories.length > 10 ? 45 : 0
      }
    },
    yAxis: { type: 'value' as const },
    series,
  }
}

function generateBarChart(config: ChartConfig, data: any[], isHorizontal: boolean, baseOption: any) {
  if (!config.xAxis || !config.yAxis) return null

  // 按类别聚合数据
  const categoryField = config.xAxis
  const yFields = Array.isArray(config.yAxis) ? config.yAxis : [config.yAxis]
  const aggregation = config.aggregation || 'sum'

  const aggregatedData = aggregateData(data, categoryField, yFields, aggregation)
  const categories = Object.keys(aggregatedData)

  const series = yFields.map(field => ({
    name: field,
    type: 'bar' as const,
    data: categories.map(cat => aggregatedData[cat][field]),
  }))

  if (isHorizontal) {
    return {
      ...baseOption,
      xAxis: { type: 'value' as const },
      yAxis: { type: 'category' as const, data: categories },
      series,
    }
  } else {
    return {
      ...baseOption,
      xAxis: { type: 'category' as const, data: categories },
      yAxis: { type: 'value' as const },
      series,
    }
  }
}

function generatePieChart(config: ChartConfig, data: any[], isRose: boolean, baseOption: any) {
  if (!config.categoryField || !config.valueField) return null

  // 聚合数据
  const aggregated: Record<string, number> = {}
  data.forEach(row => {
    const category = String(row[config.categoryField!])
    const value = Number(row[config.valueField!]) || 0
    aggregated[category] = (aggregated[category] || 0) + value
  })

  // 排序并取前N项
  const topN = config.top || 10
  let pieData = Object.entries(aggregated)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  if (pieData.length > topN) {
    const top = pieData.slice(0, topN)
    const others = pieData.slice(topN).reduce((sum, item) => sum + item.value, 0)
    if (others > 0) {
      top.push({ name: '其他', value: others })
    }
    pieData = top
  }

  return {
    ...baseOption,
    tooltip: { trigger: 'item' as const, formatter: '{a} <br/>{b}: {c} ({d}%)' },
    series: [{
      name: config.categoryField,
      type: 'pie' as const,
      radius: isRose ? [30, '60%'] : '60%',
      roseType: isRose ? 'radius' as const : undefined,
      data: pieData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }
}

function generateScatterChart(config: ChartConfig, data: any[], baseOption: any) {
  if (!config.xAxis || !config.yAxis || typeof config.yAxis !== 'string') return null

  // 如果有系列字段，按系列分组
  if (config.seriesField) {
    const seriesMap: Record<string, any[]> = {}
    data.forEach(row => {
      const seriesValue = String(row[config.seriesField!] || '未分类')
      if (!seriesMap[seriesValue]) {
        seriesMap[seriesValue] = []
      }
      seriesMap[seriesValue].push([
        Number(row[config.xAxis!]) || 0, 
        Number(row[config.yAxis as string]) || 0
      ])
    })

    // 为每个系列生成不同颜色
    const colors = [
      '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
      '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#d14a61'
    ]

    const series = Object.keys(seriesMap).map((seriesName, index) => ({
      name: seriesName,
      type: 'scatter' as const,
      data: seriesMap[seriesName],
      symbolSize: 10,
      itemStyle: {
        color: colors[index % colors.length]
      }
    }))

    return {
      ...baseOption,
      tooltip: {
        trigger: 'item' as const,
        formatter: (params: any) => {
          return `${params.seriesName}<br/>${config.xAxis}: ${params.value[0]}<br/>${config.yAxis}: ${params.value[1]}`
        }
      },
      xAxis: { 
        type: 'value' as const, 
        name: config.xAxis,
        nameLocation: 'middle',
        nameGap: 30
      },
      yAxis: { 
        type: 'value' as const, 
        name: config.yAxis,
        nameLocation: 'middle',
        nameGap: 40
      },
      series
    }
  } else {
    // 没有系列字段，所有点一个颜色
    const scatterData = data.map(row => [
      Number(row[config.xAxis!]) || 0,
      Number(row[config.yAxis as string]) || 0
    ])

    return {
      ...baseOption,
      tooltip: {
        trigger: 'item' as const,
        formatter: (params: any) => {
          return `${config.xAxis}: ${params.value[0]}<br/>${config.yAxis}: ${params.value[1]}`
        }
      },
      xAxis: { 
        type: 'value' as const, 
        name: config.xAxis,
        nameLocation: 'middle',
        nameGap: 30
      },
      yAxis: { 
        type: 'value' as const, 
        name: config.yAxis,
        nameLocation: 'middle',
        nameGap: 40
      },
      series: [{
        type: 'scatter' as const,
        data: scatterData,
        symbolSize: 10,
        itemStyle: {
          color: '#5470c6'
        }
      }]
    }
  }
}

function generateHistogramChart(config: ChartConfig, data: any[], baseOption: any) {
  if (!config.yAxis || typeof config.yAxis !== 'string') return null

  const values = data.map(row => Number(row[config.yAxis as string])).filter(v => !isNaN(v))
  
  // 计算直方图bins
  const min = Math.min(...values)
  const max = Math.max(...values)
  const binCount = 20
  const binWidth = (max - min) / binCount
  const bins = Array(binCount).fill(0)

  values.forEach(v => {
    const binIndex = Math.min(Math.floor((v - min) / binWidth), binCount - 1)
    bins[binIndex]++
  })

  const binLabels = bins.map((_, i) => {
    const start = min + i * binWidth
    const end = start + binWidth
    return `${start.toFixed(1)}-${end.toFixed(1)}`
  })

  return {
    ...baseOption,
    xAxis: { type: 'category' as const, data: binLabels },
    yAxis: { type: 'value' as const, name: '频数' },
    series: [{
      name: config.yAxis,
      type: 'bar' as const,
      data: bins,
      itemStyle: { color: '#5470c6' }
    }]
  }
}

function generateFunnelChart(config: ChartConfig, data: any[], baseOption: any) {
  if (!config.categoryField || !config.valueField) return null

  const funnelData = data.map(row => ({
    name: String(row[config.categoryField!]),
    value: Number(row[config.valueField!]) || 0
  })).sort((a, b) => b.value - a.value)

  return {
    ...baseOption,
    tooltip: { trigger: 'item' as const, formatter: '{a} <br/>{b} : {c}' },
    series: [{
      name: config.categoryField,
      type: 'funnel' as const,
      left: '10%',
      top: 60,
      bottom: 60,
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending' as const,
      gap: 2,
      label: {
        show: true,
        position: 'inside' as const
      },
      data: funnelData
    }]
  }
}

function generateRadarChart(config: ChartConfig, data: any[], baseOption: any) {
  if (!config.radarIndicators || config.radarIndicators.length === 0) return null

  // 计算每个指标的最大值
  const indicators = config.radarIndicators.map(field => {
    const values = data.map(row => Number(row[field]) || 0)
    const max = Math.max(...values, 1)
    return { name: field, max: max * 1.2 }
  })

  const radarData = data.slice(0, 5).map((row, index) => ({
    value: config.radarIndicators!.map(field => Number(row[field]) || 0),
    name: config.seriesField ? String(row[config.seriesField]) : `数据${index + 1}`
  }))

  return {
    ...baseOption,
    radar: { indicator: indicators },
    series: [{
      type: 'radar' as const,
      data: radarData
    }]
  }
}

function generateWordCloudChart(config: ChartConfig, data: any[], baseOption: any) {
  if (!config.textField) return null

  // 提取所有文本并分词
  const delimiter = config.delimiter || '[,，;；\\s|/]+'
  const stopwords = config.stopwords ? config.stopwords.split(/[,，\n]/).map(w => w.trim()).filter(Boolean) : []
  
  const wordCount: Record<string, number> = {}
  data.forEach(row => {
    const text = String(row[config.textField!] || '')
    const words = text.split(new RegExp(delimiter)).filter(w => {
      const trimmed = w.trim()
      return trimmed.length > 0 && !stopwords.includes(trimmed)
    })
    words.forEach(word => {
      const trimmed = word.trim()
      if (trimmed) {
        wordCount[trimmed] = (wordCount[trimmed] || 0) + 1
      }
    })
  })

  const wordData = Object.entries(wordCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 100) // 显示前100个

  if (wordData.length === 0) {
    return null
  }

  // 真正的词云图
  return {
    title: config.title ? { text: config.title, left: 'center', top: 10 } : { text: '关键词词云', left: 'center', top: 10 },
    tooltip: {
      show: true,
      formatter: (params: any) => {
        return `${params.name}: ${params.value} 次`
      }
    },
    series: [{
      type: 'wordCloud',
      shape: 'circle',
      left: 'center',
      top: 'center',
      width: '90%',
      height: '90%',
      right: null,
      bottom: null,
      sizeRange: [14, 80],
      rotationRange: [0, 0], // 不旋转，更易阅读
      rotationStep: 0,
      gridSize: 8,
      drawOutOfBound: false,
      layoutAnimation: true,
      textStyle: {
        fontFamily: 'Microsoft YaHei, SimHei, sans-serif',
        fontWeight: 'bold',
        color: function () {
          // 使用更鲜艳的颜色
          const colors = [
            '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
            '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#d14a61',
            '#5d7092', '#96bfff', '#ffa940', '#ff6b9d', '#c23531'
          ]
          return colors[Math.floor(Math.random() * colors.length)]
        }
      },
      emphasis: {
        focus: 'self',
        textStyle: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: wordData
    }]
  }
}

function aggregateData(data: any[], categoryField: string, valueFields: string[], aggregation: string) {
  const result: Record<string, any> = {}

  data.forEach(row => {
    const category = String(row[categoryField])
    if (!result[category]) {
      result[category] = {}
      valueFields.forEach(field => {
        result[category][field] = []
      })
    }
    valueFields.forEach(field => {
      const value = Number(row[field]) || 0
      result[category][field].push(value)
    })
  })

  // 执行聚合
  Object.keys(result).forEach(category => {
    valueFields.forEach(field => {
      const values = result[category][field]
      switch (aggregation) {
        case 'sum':
          result[category][field] = values.reduce((a: number, b: number) => a + b, 0)
          break
        case 'avg':
          result[category][field] = values.reduce((a: number, b: number) => a + b, 0) / values.length
          break
        case 'count':
          result[category][field] = values.length
          break
        case 'min':
          result[category][field] = Math.min(...values)
          break
        case 'max':
          result[category][field] = Math.max(...values)
          break
        default:
          result[category][field] = values.reduce((a: number, b: number) => a + b, 0)
      }
    })
  })

  return result
}
