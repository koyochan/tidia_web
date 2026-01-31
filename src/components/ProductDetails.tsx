'use client'

import type { Product } from '@/types/product'
import { useLanguage } from '@/context/LanguageContext'

interface ProductDetailsProps {
  product?: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { t } = useLanguage()

  const data = {
    detailTitle: t('product_detail.detail_title_default'),
    detailDescription: t('product_detail.detail_desc_default'),
    feature1Img: product?.feature1Img || "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
    feature1Desc: t('product_detail.feature1_desc_default'),
    feature2Img: product?.feature2Img || "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-02.jpg",
    feature2Desc: t('product_detail.feature2_desc_default'),
  }

  return (
    <div className="bg-ivory text-deep-black font-noto">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        {/* Details section */}
        <section aria-labelledby="details-heading">
          <div className="flex flex-col items-center text-center">
            <h2 id="details-heading" className="text-3xl font-bold tracking-tight text-deep-black sm:text-4xl font-playfair">
              {data.detailTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-deep-black/60 font-cormorant italic">
              {data.detailDescription}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
            <div>
              <div className="aspect-3/2 w-full overflow-hidden rounded-lg border border-brass/10">
                <img
                  alt="Feature image 1"
                  src={data.feature1Img}
                  className="size-full object-cover"
                />
              </div>
              <p className="mt-8 text-base text-deep-black/70 leading-relaxed">
                {data.feature1Desc}
              </p>
            </div>
            <div>
              <div className="aspect-3/2 w-full overflow-hidden rounded-lg border border-brass/10">
                <img
                  alt="Feature image 2"
                  src={data.feature2Img}
                  className="size-full object-cover"
                />
              </div>
              <p className="mt-8 text-base text-deep-black/70 leading-relaxed">
                {data.feature2Desc}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
