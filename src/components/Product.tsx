'use client'

import { StarIcon } from '@heroicons/react/20/solid'

const product = {
  name: 'Application UI Icon Pack',
  version: { name: '1.0', date: '2021年6月5日' },
  price: '¥32,000',
  description:
    'Application UI Icon Packは、アウトライン、フィル、ブランドスタイルの3つのスタイルで200以上のアイコンを提供します。',
  highlights: [
    '3つのユニークなスタイルによる200以上のSVGアイコン',
    'Figma, Sketch, Adobe XDに対応',
    '24 x 24 ピクセルの精密なグリッド設計',
  ],
  imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-05-product-01.jpg',
  imageAlt: 'Icon pack preview',
}

export default function Product() {
  return (
    // bg-deep-black -> bg-ivory, text-ivory -> text-deep-black に変更
    <section className="bg-ivory text-deep-black py-24 px-4 sm:px-6 lg:px-8 border-t border-brass/20">
      <div className="mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-16">
          
          {/* 左側: 商品画像 */}
          <div className="relative group">
            <div className="absolute -inset-4 border border-brass/30 group-hover:border-brass/60 transition-colors duration-700" />
            <div className="relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.2)]"> {/* 影を少し薄く調整 */}
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="aspect-square w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>

          {/* 右側: 商品詳細 */}
          <div className="mt-12 flex flex-col sm:mt-16 lg:mt-0">
            <h1 className="font-playfair text-5xl font-bold tracking-tight leading-tight">
              {product.name}
            </h1>
            
            <div className="mt-6 flex items-center justify-between border-b border-brass/30 pb-6">
              <p className="font-jetbrains text-3xl text-brass font-medium">
                {product.price}
              </p>
              <div className="flex items-center gap-1 text-brass">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="size-5" />)}
              </div>
            </div>

            {/* text-ivory/80 -> text-deep-black/80 に変更 */}
            <p className="mt-8 font-cormorant text-2xl italic text-deep-black/80 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-10">
              <h3 className="font-playfair text-sm uppercase tracking-[0.3em] text-brass/80">
                Key Highlights
              </h3>
              <ul className="font-noto mt-6 space-y-4 text-sm">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-4">
                    <span className="h-[1px] w-6 bg-brass" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button className="font-jetbrains bg-racing-green py-5 text-sm font-bold uppercase tracking-widest text-ivory hover:bg-deep-black hover:text-ivory transition-all">
                Add to Cart
              </button>
              <button className="font-jetbrains border border-brass text-brass py-5 text-sm font-bold uppercase tracking-widest hover:bg-brass hover:text-deep-black transition-all">
                Walkthrough
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}