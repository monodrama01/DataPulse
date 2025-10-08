import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[80vh] w-full bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-3xl mx-auto text-center">
        {/* 标题 */}
        <div className="text-[72px] md:text-[108px] font-extrabold leading-none select-none">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            404
          </span>
        </div>
        <p className="mt-2 text-white/90 text-base md:text-lg">页面未找到 · Page not found</p>

        {/* 局部图片卡片（非全屏） */}
        <div className="mt-6 md:mt-8 mx-auto relative w-[300px] h-[300px] max-w-full rounded-2xl overflow-hidden border border-gray-700 shadow-xl bg-white">
          <img
            src="/images/404.webp"
            alt="404 illustration"
            className="absolute inset-0 h-full w-full object-contain"
            loading="eager"
          />
          {/* 去掉任何覆盖层，确保图片清晰可见 */}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-7 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-transform hover:scale-[1.02]"
          >
            返回首页
          </Link>
        </div>
      </div>
    </main>
  )
}


