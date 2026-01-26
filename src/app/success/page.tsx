'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'
import { useEffect } from 'react'

export default function SuccessPage() {
  const { clearCart } = useCart()

  // 注文完了時にカートをクリア
  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="bg-ivory min-h-screen flex flex-col font-noto text-deep-black">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex justify-center">
              <CheckCircleIcon className="size-24 text-racing-green stroke-1" />
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-deep-black sm:text-5xl font-playfair mb-6">
              Thank you for your order
            </h1>
            
            <p className="text-lg leading-8 text-deep-black/70 font-cormorant italic mb-10">
              ご注文ありがとうございます。確認メールをお送りしました。<br />
              TiDiaの製品が、あなたの創造性を刺激する一助となることを願っています。
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                className="rounded-md bg-racing-green px-8 py-3.5 text-sm font-bold text-ivory shadow-sm hover:bg-deep-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-racing-green font-jetbrains uppercase tracking-widest transition-all"
              >
                ホームに戻る
              </Link>
              <Link href="/contact" className="text-sm font-semibold leading-6 text-deep-black hover:text-racing-green transition-colors font-noto">
                お問い合わせ <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}