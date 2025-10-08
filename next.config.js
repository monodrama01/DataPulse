/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出，便于在 4everland/IPFS 上托管
  output: 'export',
  // 使用静态导出时关闭 Next 内置图片优化
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // 允许在构建时跳过预渲染错误
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // 配置导出时的错误处理
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig
