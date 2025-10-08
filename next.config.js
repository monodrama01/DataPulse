/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
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
