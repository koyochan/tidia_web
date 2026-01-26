'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ApplicationPage() {
  return (
    <div className="bg-ivory min-h-screen flex flex-col font-noto">
      <Header />
      
      <main className="flex-grow py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-bold text-racing-green font-jetbrains uppercase tracking-widest">Digital Artifacts</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-bold tracking-tight text-balance text-deep-black sm:text-5xl font-playfair">
            Analog, Re-implemented.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Apple Store Button */}
            <a href="#" className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-all duration-300 w-full sm:w-auto shadow-sm group">
              <svg viewBox="0 0 384 512" className="size-6 fill-white">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-20.8-82-20.8C74.3 140.3 0 192.3 0 285.5c0 54.5 21.7 107.7 51.5 150.4 15.3 21.9 31.1 43.1 52.6 42.4 21.5-.7 29.9-13.3 56.1-13.3 26.2 0 33.7 13.3 56.1 12.8 22.4-.4 37.1-19.3 52.3-41.1 17.5-25 24.7-49.1 25.1-50.5-.5-.2-48.7-18.6-49.2-74.5zM280.3 78c16-19.1 26.8-45.7 23.8-72.3-22.9 1-50.8 15.4-67.3 34.6-14.8 17.1-27.7 44.5-24.3 70.2 25.4 1.9 51.9-13.4 67.8-32.5z" />
              </svg>
              <div className="text-left leading-tight">
                <p className="text-[10px] uppercase font-sans font-bold">Download on the</p>
                <p className="text-xl font-sans font-semibold">App Store</p>
              </div>
            </a>

            {/* Google Play Button */}
            <a href="#" className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-all duration-300 w-full sm:w-auto shadow-sm group">
              <svg viewBox="0 0 512 512" className="size-6">
                <path fill="#4285F4" d="M12 24.5v463c0 12.5 10 22.5 22.5 22.5 4.5 0 9-1.5 12.5-4L443 277.5c10-7 14-19 9.5-29.5-.5-1-1-2-1.5-3L47 4.5c-3.5-2.5-8-4-12.5-4C22 0.5 12 10.5 12 23v1.5z" />
                <path fill="#34A853" d="M12 24.5v463c0 3.5.5 6.5 1.5 9.5l237-237L13.5 15c-1 3-1.5 6-1.5 9.5z" />
                <path fill="#FBBC04" d="M451 245l-105-60.5-98.5 98.5 98.5 98.5 105-60.5c11.5-6.5 18-18 18-31s-6.5-24.5-18-31v6z" />
                <path fill="#EA4335" d="M13.5 15l237 237 95.5-95.5L47 4.5c-3.5-2.5-8-4-12.5-4s-9 1.5-12.5 4c-1 1-1.5 2.5-1.5 4v1.5l13 10.5z" />
              </svg>
              <div className="text-left leading-tight">
                <p className="text-[10px] uppercase font-sans font-bold">Get it on</p>
                <p className="text-xl font-sans font-semibold">Google Play</p>
              </div>
            </a>
          </div>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            
            {/* Mobile Friendly Section */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl border border-brass/10" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-bold tracking-tight text-deep-black max-lg:text-center font-playfair">
                    Mobile Friendly
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-deep-black/60 max-lg:text-center font-noto">
                    TiDiaの製品体験は、スマートフォンやタブレットでも変わらぬ美しさを保ちます。外出先でも直感的な操作が可能です。
                  </p>
                </div>
                <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-deep-black bg-deep-black shadow-2xl">
                    <img
                      alt="Mobile interface"
                      src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png"
                      className="size-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl" />
            </div>

            {/* Performance Section */}
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl border border-brass/10" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-bold tracking-tight text-deep-black max-lg:text-center font-playfair">Unrivaled Performance</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-deep-black/60 max-lg:text-center font-noto">
                    最新のテクノロジーを駆使し、一瞬の澱みもない滑らかな動作を実現。アナログの即応性をデジタルで再現しました。
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <img
                    alt="Performance graph"
                    src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                    className="w-full max-lg:max-w-xs opacity-80"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl" />
            </div>

            {/* Security Section */}
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white border border-brass/10" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-bold tracking-tight text-deep-black max-lg:text-center font-playfair">Absolute Security</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-deep-black/60 max-lg:text-center font-noto">
                    あなたのデータは、厳重な暗号化によって保護されます。プライバシーこそが、真のラグジュアリーの基礎です。
                  </p>
                </div>
                <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                  <img
                    alt="Security visualization"
                    src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                    className="h-[min(152px,40cqw)] object-cover grayscale"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
            </div>

            {/* Powerful APIs Section */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl border border-brass/10" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-bold tracking-tight text-deep-black max-lg:text-center font-playfair">
                    Powerful Integrations
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-deep-black/60 max-lg:text-center font-noto">
                    外部ツールとのシームレスな連携を可能にする強力なAPI。既存のエコシステムをTiDiaが拡張します。
                  </p>
                </div>
                <div className="relative min-h-120 w-full grow">
                  <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-deep-black shadow-2xl border-l border-t border-brass/20">
                    <div className="flex bg-deep-black border-b border-brass/10">
                      <div className="-mb-px flex text-sm/6 font-medium text-ivory/40">
                        <div className="border-r border-brass/10 bg-white/5 px-4 py-2 text-ivory font-jetbrains text-xs">
                          TiDia_Config.ts
                        </div>
                        <div className="border-r border-brass/10 px-4 py-2 font-jetbrains text-xs">App.tsx</div>
                      </div>
                    </div>
                    <div className="px-6 pt-6 pb-14 font-jetbrains text-xs text-brass/80 leading-relaxed overflow-hidden">
                      <pre><code>{`export const config = {
  theme: "analog-modern",
  artifact: "digital-pen",
  security: "e2e-encryption",
  performance: "edge-optimized",
  metadata: {
    brand: "TiDia",
    quality: "extreme"
  }
};

function initialize() {
  console.log("TiDia System Active.");
  return true;
}`}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
