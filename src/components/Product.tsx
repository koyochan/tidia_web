'use client'

import { StarIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { fetchProducts, ParsedProduct } from '@/lib/firestore'
import { useLanguage } from '@/context/LanguageContext'

export default function Product() {
  const [products, setProducts] = useState<ParsedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data)
      setLoading(false)
    }).catch(err => {
      console.error("Failed to fetch products", err)
      setLoading(false)
    })
  }, [])

  if (loading) return null; // またはスケルトン表示

  return (
    <section className="bg-ivory py-24 px-4 sm:px-6 lg:px-8 border-t border-brass/20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight text-deep-black font-playfair mb-12 text-center">
          {t('section_products')}
        </h2>

        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md border border-brass/10 bg-gray-200">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-bold text-deep-black font-playfair text-lg">
                    <a href={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-deep-black/60 font-cormorant italic">{product.subDescription}</p>
                </div>
                <p className="text-sm font-medium text-brass font-jetbrains">¥{(product.price || 0).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}