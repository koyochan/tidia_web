'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fetchProducts, ParsedProduct } from '@/lib/firestore'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
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
        Footer
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
                  {t('footer.tagline')}
                </p>
            </div>

            {/* サイトマップエリア */}
            <div className="md:w-2/3 grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-medium text-deep-black font-jetbrains">{t('footer.products')}</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {products.slice(0, 5).map((item) => (
                    <li key={item.id} className="text-sm">
                      <Link href={`/products/${item.id}`} className="text-deep-black/60 hover:text-racing-green font-noto transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-deep-black font-jetbrains">{t('footer.company')}</h3>
                <ul role="list" className="mt-6 space-y-6">
                  <li className="text-sm"><Link href="/about" className="text-deep-black/60 hover:text-racing-green transition-colors">{t('footer.about_tidia')}</Link></li>
                  <li className="text-sm"><Link href="#" className="text-deep-black/60 hover:text-racing-green transition-colors">{t('footer.license')}</Link></li>
                  <li className="text-sm"><Link href="#" className="text-deep-black/60 hover:text-racing-green transition-colors">{t('footer.terms')}</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-deep-black font-jetbrains">{t('footer.support')}</h3>
                <ul role="list" className="mt-6 space-y-6">
                  <li className="text-sm"><Link href="/contact" className="text-deep-black/60 hover:text-racing-green transition-colors">{t('footer.contact')}</Link></li>
                  <li className="text-sm"><Link href="/contact" className="text-deep-black/60 hover:text-racing-green transition-colors">{t('footer.faq')}</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brass/10 py-10 text-center">
          <p className="text-sm text-deep-black/50 font-jetbrains">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}