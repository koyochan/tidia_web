'use client'

import { StarIcon } from '@heroicons/react/20/solid'

const products = [
  {
    id: 1,
    name: 'TiDia Flip',
    href: '/products/tidia-flip',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg',
    imageAlt: 'TiDia Flip',
    price: '¥28,000',
    color: 'シームレスなアニメーション',
  },
]

export default function Product() {
  return (
    <section className="bg-ivory py-24 px-4 sm:px-6 lg:px-8 border-t border-brass/20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight text-deep-black font-playfair mb-12 text-center">
          おすすめの商品
        </h2>

        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md border border-brass/10 bg-gray-200">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-bold text-deep-black font-playfair text-lg">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-deep-black/60 font-cormorant italic">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-brass font-jetbrains">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}