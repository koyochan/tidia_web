'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchProducts, ParsedProduct } from '@/lib/firestore'

const footerNavigation = {
  company: [
    { name: 'TiDiaについて', href: '/about' },
    { name: 'ライセンス', href: '#' },
    { name: '利用規約', href: '#' },
  ],
  customerService: [
    { name: 'お問い合わせ', href: '/contact' },
  ],
}

export default function Footer() {
  const [products, setProducts] = useState<ParsedProduct[]>([])

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data)
    }).catch(err => {
      console.error("Failed to fetch products for footer", err)
    })
  }, [])

  return (
    <footer aria-labelledby="footer-heading" className="bg-ivory border-t border-brass/20">
      <h2 id="footer-heading" className="sr-only">
        フッター
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-20">
          <div className="flex flex-col md:flex-row justify-between gap-16">
            
            {/* ブランドロゴエリア */}
            <div className="md:w-1/3">
               <span className="font-playfair text-3xl font-bold tracking-tight text-racing-green">
                  TiDia
                </span>
                <p className="mt-4 text-sm text-deep-black/60 font-noto">
                  アナログを、再実装する。
                </p>
            </div>

            {/* サイトマップエリア */}
            <div className="md:w-2/3 grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-medium text-deep-black font-jetbrains">商品</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {products.map((item) => (
                    <li key={item.id} className="text-sm">
                      <Link href={`/products/${item.id}`} className="text-deep-black/60 hover:text-racing-green font-noto transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-deep-black font-jetbrains">企業情報</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name} className="text-sm">
                      <Link href={item.href} className="text-deep-black/60 hover:text-racing-green font-noto transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-deep-black font-jetbrains">サポート</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {footerNavigation.customerService.map((item) => (
                    <li key={item.name} className="text-sm">
                      <Link href={item.href} className="text-deep-black/60 hover:text-racing-green font-noto transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brass/10 py-10 text-center">
          <p className="text-sm text-deep-black/50 font-jetbrains">&copy; 2024 TiDia Inc. 全著作権所有</p>
        </div>
      </div>
    </footer>
  )
}