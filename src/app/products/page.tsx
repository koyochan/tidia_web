'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { fetchProducts, ParsedProduct } from '@/lib/firestore'
import { useLanguage } from '@/context/LanguageContext'

export default function ProductsPage() {
  const { t } = useLanguage()
  const [products, setProducts] = useState<ParsedProduct[]>([])
  const [loading, setLoading] = useState(true)

  const perks = [
    {
      name: t('products.perks.warranty_title'),
      imageUrl: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-returns-light.svg',
      description: t('products.perks.warranty_desc'),
    },
    {
      name: t('products.perks.shipping_title'),
      imageUrl: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-calendar-light.svg',
      description: t('products.perks.shipping_desc'),
    },
    {
      name: t('products.perks.benefits_title'),
      imageUrl: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-gift-card-light.svg',
      description: t('products.perks.benefits_desc'),
    },
    {
      name: t('products.perks.sustainability_title'),
      imageUrl: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-planet-light.svg',
      description: t('products.perks.sustainability_desc'),
    },
  ]

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data)
      setLoading(false)
    }).catch(err => {
      console.error("Failed to fetch products", err)
      setLoading(false)
    })
  }, [])

  return (
    <div className="bg-ivory font-noto text-deep-black min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero section */}
        <div className="relative">
          <div aria-hidden="true" className="absolute inset-0 hidden sm:flex sm:flex-col">
            <div className="relative w-full flex-1 bg-deep-black">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2301&q=80"
                  className="size-full object-cover opacity-60"
                />
              </div>
              <div className="absolute inset-0 bg-deep-black opacity-40" />
            </div>
            <div className="h-32 w-full bg-ivory md:h-40 lg:h-48" />
          </div>

          <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
            <div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
              <div className="relative w-full flex-1 bg-deep-black">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2301&q=80"
                    className="size-full object-cover opacity-60"
                  />
                </div>
                <div className="absolute inset-0 bg-deep-black opacity-40" />
              </div>
              <div className="h-48 w-full bg-ivory" />
            </div>
            <div className="relative py-32">
              <h1 className="text-4xl font-bold tracking-tight text-ivory sm:text-5xl md:text-6xl font-playfair">
                {t('products.title')}
              </h1>
              <p className="mt-4 text-xl text-ivory/80 font-cormorant italic">
                {t('products.subtitle')}
              </p>
              <div className="mt-8 sm:mt-12">
                <a
                  href="#trending"
                  className="inline-block rounded-md border border-transparent bg-ivory px-8 py-3 font-bold text-deep-black hover:bg-white font-jetbrains uppercase tracking-widest transition-colors"
                >
                  {t('common.shop_now')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <section id="trending" aria-labelledby="trending-heading">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
            <div className="md:flex md:items-center md:justify-between">
              <h2 id="favorites-heading" className="text-2xl font-bold tracking-tight text-deep-black font-playfair">
                {t('products.trending_title')}
              </h2>
              <a href="#" className="hidden text-sm font-bold text-racing-green hover:text-deep-black md:block font-jetbrains uppercase tracking-widest transition-colors">
                {t('products.shop_all')}
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-56 w-full rounded-md bg-gray-200 lg:h-72 xl:h-80" />
                    <div className="mt-4 h-4 w-3/4 bg-gray-200 rounded" />
                    <div className="mt-2 h-4 w-1/4 bg-gray-200 rounded" />
                  </div>
                ))
              ) : (
                products.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="h-56 w-full overflow-hidden rounded-md border border-brass/10 bg-gray-100 group-hover:opacity-75 lg:h-72 xl:h-80 transition-opacity">
                      <img 
                        alt={product.name} 
                        src={product.images[0]} 
                        className="size-full object-cover object-center" 
                      />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-deep-black font-playfair">
                      <Link href={`/products/${product.id}`}>
                        <span className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-deep-black/60 font-noto">
                      {product.colors && product.colors.length > 0 ? product.colors[0] : 'Standard'}
                    </p>
                    <p className="mt-1 text-sm font-medium text-brass font-jetbrains">
                      ¥{(product.price || 0).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 text-sm md:hidden">
              <a href="#" className="font-bold text-racing-green hover:text-deep-black font-jetbrains uppercase tracking-widest transition-colors">
                {t('products.shop_all')}
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="perks-heading" className="border-t border-brass/20 bg-ivory">
          <h2 id="perks-heading" className="sr-only">
            Our perks
          </h2>

          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
              {perks.map((perk) => (
                <div
                  key={perk.name}
                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                >
                  <div className="md:shrink-0">
                    <div className="flow-root">
                      <img alt="" src={perk.imageUrl} className="mx-auto -my-1 h-24 w-auto" />
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                    <h3 className="text-base font-bold text-deep-black font-playfair">{perk.name}</h3>
                    <p className="mt-3 text-sm text-deep-black/60 font-noto">{perk.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}