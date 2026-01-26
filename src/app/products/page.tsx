'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { fetchProducts, ParsedProduct } from '@/lib/firestore'

// Collectionセクション用データ（現在コメントアウト中）
/*
const collections = [
  {
    name: "Digital Tools",
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    imageAlt: 'Vintage electronics and digital screens.',
  },
  {
    name: "Analog Goods",
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1452838886369-1c9f80214828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    imageAlt: 'Leather notebook and fountain pen on desk.',
  },
  {
    name: "Workspace",
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    imageAlt: 'Clean minimalist workspace organization.',
  },
]
*/

const perks = [
  {
    name: 'Lifetime Warranty',
    imageUrl: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-returns-light.svg',
    description: '長く使い続ける道具だからこそ、すべての製品に生涯保証を提供しています。',
  },
  {
    name: 'Express Shipping',
    imageUrl: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-calendar-light.svg',
    description: 'ご注文から24時間以内に発送。追跡可能な配送で、大切にお届けします。',
  },
  {
    name: 'Member Benefits',
    imageUrl: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-gift-card-light.svg',
    description: 'TiDiaメンバーに登録すると、新作の先行予約や限定イベントへご招待します。',
  },
  {
    name: 'Sustainability',
    imageUrl: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-planet-light.svg',
    description: '売上の1%を、森林保全と伝統工芸の継承支援活動に寄付しています。',
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<ParsedProduct[]>([])
  const [loading, setLoading] = useState(true)

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
          {/* Background image and overlap */}
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

          {/* Collectionセクション非表示のため pb-96 -> pb-24 */}
          <div className="relative mx-auto max-w-3xl px-4 pb-24 text-center sm:px-6 sm:pb-0 lg:px-8">
            {/* Background image and overlap (Mobile) */}
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
                New Collection
              </h1>
              <p className="mt-4 text-xl text-ivory/80 font-cormorant italic">
                Analog warmth for the digital age.
              </p>
              <div className="mt-8 sm:mt-12">
                <a
                  href="#trending"
                  className="inline-block rounded-md border border-transparent bg-ivory px-8 py-3 font-bold text-deep-black hover:bg-white font-jetbrains uppercase tracking-widest transition-colors"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>

          {/* Collection Section - 一時的にコメントアウト */}
          {/*
          <section aria-labelledby="collection-heading" className="relative -mt-96 sm:mt-0">
            <h2 id="collection-heading" className="sr-only">
              Collections
            </h2>
            <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
              {collections.map((collection) => (
                <div
                  key={collection.name}
                  className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-4/5 sm:h-auto border border-brass/10 overflow-hidden"
                >
                  <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <img alt={collection.imageAlt} src={collection.imageSrc} className="size-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-deep-black opacity-60" />
                  </div>
                  <div className="absolute inset-0 flex items-end rounded-lg p-6">
                    <div>
                      <p aria-hidden="true" className="text-sm text-ivory font-jetbrains opacity-80">
                        View collection
                      </p>
                      <h3 className="mt-1 font-bold text-ivory font-playfair text-xl">
                        <a href={collection.href}>
                          <span className="absolute inset-0" />
                          {collection.name}
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          */}
        </div>

        <section id="trending" aria-labelledby="trending-heading">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
            <div className="md:flex md:items-center md:justify-between">
              <h2 id="favorites-heading" className="text-2xl font-bold tracking-tight text-deep-black font-playfair">
                Trending Products
              </h2>
              <a href="#" className="hidden text-sm font-bold text-racing-green hover:text-deep-black md:block font-jetbrains uppercase tracking-widest transition-colors">
                Shop all products
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
              {loading ? (
                // Loading Skeletons
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
                Shop all products
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
                      {/* imgタグに変更 */}
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