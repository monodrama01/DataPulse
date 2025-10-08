import React from 'react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart3, ChevronDown, ShoppingCart, Video, DollarSign, Gamepad2,
  GraduationCap, Store, Truck, Factory, Heart, Plane, Coffee
} from "lucide-react"

interface IndustryDropdownProps {
  theme: string
  currentIndustry: string
}

export function IndustryDropdown({ theme, currentIndustry }: IndustryDropdownProps) {
  const industries = [
    { href: '/business/industries/ecommerce', icon: ShoppingCart, name: '电商数据分析', key: 'ecommerce' },
    { href: '/business/industries/content', icon: Video, name: '内容平台数据分析', key: 'content' },
    { href: '/business/industries/fintech', icon: DollarSign, name: '金融科技数据分析', key: 'fintech' },
    { href: '/business/industries/gaming', icon: Gamepad2, name: '游戏行业数据分析', key: 'gaming' },
    { href: '/business/industries/education', icon: GraduationCap, name: '教育行业数据分析', key: 'education' },
    { href: '/business/industries/retail', icon: Store, name: '零售行业数据分析', key: 'retail' },
    { href: '/business/industries/logistics', icon: Truck, name: '物流行业数据分析', key: 'logistics' },
    { href: '/business/industries/manufacturing', icon: Factory, name: '制造业数据分析', key: 'manufacturing' },
    { href: '/business/industries/healthcare', icon: Heart, name: '医疗健康数据分析', key: 'healthcare' },
    { href: '/business/industries/travel', icon: Plane, name: '旅游出行数据分析', key: 'travel' },
    { href: '/business/industries/food', icon: Coffee, name: '餐饮O2O数据分析', key: 'food' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/50' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-400/50'
          }`}
        >
          <BarChart3 size={18} />
          <span>切换行业</span>
          <ChevronDown size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={`w-56 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        {industries.map(industry => {
          const Icon = industry.icon
          const isActive = industry.key === currentIndustry
          return (
            <Link href={industry.href} key={industry.key}>
              <DropdownMenuItem 
                className={`cursor-pointer ${
                  theme === 'dark' 
                    ? `hover:bg-gray-700 focus:bg-gray-700 ${isActive ? 'bg-blue-900/30' : ''}` 
                    : `hover:bg-gray-100 focus:bg-gray-100 ${isActive ? 'bg-blue-50' : ''}`
                }`}
              >
                <Icon size={16} className="mr-2" />
                <span>{industry.name}</span>
              </DropdownMenuItem>
            </Link>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

