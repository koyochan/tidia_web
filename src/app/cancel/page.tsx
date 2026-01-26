'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { XCircleIcon } from '@heroicons/react/24/outline'

export default function CancelPage() {
  return (
    <div className="bg-ivory min-h-screen flex flex-col font-noto text-deep-black">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex justify-center">
              <XCircleIcon className="size-24 text-deep-black/40 stroke-1" />
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-deep-black sm:text-5xl font-playfair mb-6">
              Payment Cancelled
            </h1>
            
            <p className="text-lg leading-8 text-deep-black/70 font-cormorant italic mb-10">
              決済処理がキャンセルされたか、完了しませんでした。<br />
              カートの内容は保持されています。
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/cart"
                className="rounded-md bg-deep-black px-8 py-3.5 text-sm font-bold text-ivory shadow-sm hover:bg-racing-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-black font-jetbrains uppercase tracking-widest transition-all"
              >
                カートに戻る
              </Link>
              <Link href="/contact" className="text-sm font-semibold leading-6 text-deep-black hover:text-racing-green transition-colors font-noto">
                サポートへ連絡 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}