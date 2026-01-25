'use client'

import Link from 'next/link'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// サンプルデータ（商品情報）
const products = [
  {
    id: 1,
    name: 'アプリケーションUIアイコンパック',
    href: '#',
    price: '¥32,000',
    color: 'アウトライン & ソリッド',
    inStock: true,
    size: 'v1.0',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-05-product-01.jpg',
    imageAlt: 'アイコンパックのプレビュー',
  },
  {
    id: 2,
    name: 'ダッシュボードテンプレート',
    href: '#',
    price: '¥48,000',
    color: 'ダークモード',
    inStock: false,
    leadTime: '2–3週間',
    size: 'React',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
    imageAlt: 'ダッシュボードテンプレートのプレビュー',
  },
]

const relatedProducts = [
  {
    id: 1,
    name: 'SaaSマーケティングキット',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg',
    imageAlt: 'SaaSマーケティングキット',
    price: '¥28,000',
    color: 'Figma',
  },
  {
    id: 2,
    name: 'EコマースUIバンドル',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-01-related-product-02.jpg',
    imageAlt: 'EコマースUIバンドル',
    price: '¥56,000',
    color: 'React & Vue',
  },
]

export default function CartPage() {
  return (
    <div className="bg-ivory text-deep-black font-noto min-h-screen flex flex-col">
      <Header />

      <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8 flex-grow w-full">
        <h1 className="text-3xl font-bold tracking-tight text-deep-black sm:text-4xl font-playfair">ショッピングカート</h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              カート内の商品
            </h2>

            <ul role="list" className="divide-y divide-brass/20 border-t border-b border-brass/20">
              {products.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="shrink-0 border border-brass/20 rounded-md overflow-hidden">
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className="size-24 object-cover sm:size-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link href={product.href} className="font-bold text-deep-black hover:text-racing-green font-playfair text-lg">
                              {product.name}
                            </Link>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm text-deep-black/70 font-cormorant italic text-lg">
                          <p>{product.color}</p>
                          {product.size ? (
                            <p className="ml-4 border-l border-brass/30 pl-4">{product.size}</p>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-brass font-jetbrains">{product.price}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="inline-grid w-full max-w-16 grid-cols-1">
                          <select
                            id={`quantity-${productIdx}`}
                            name={`quantity-${productIdx}`}
                            aria-label={`数量, ${product.name}`}
                            className="col-start-1 row-start-1 appearance-none rounded-md bg-ivory py-1.5 pr-8 pl-3 text-base text-deep-black outline-1 -outline-offset-1 outline-brass/30 focus:outline-2 focus:-outline-offset-2 focus:outline-racing-green sm:text-sm/6 font-jetbrains"
                          >
                            {[1, 2, 3, 4, 5].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-deep-black/50 sm:size-4"
                          />
                        </div>

                        <div className="absolute top-0 right-0">
                          <button type="button" className="-m-2 inline-flex p-2 text-deep-black/40 hover:text-racing-green transition-colors">
                            <span className="sr-only">削除</span>
                            <XMarkIconMini aria-hidden="true" className="size-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-deep-black/70 font-noto">
                      {product.inStock ? (
                        <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-racing-green" />
                      ) : (
                        <ClockIcon aria-hidden="true" className="size-5 shrink-0 text-brass" />
                      )}

                      <span>{product.inStock ? '在庫あり' : `発送目安: ${product.leadTime}`}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* 注文概要 */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-ivory border border-brass/20 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 shadow-md"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-deep-black font-playfair">
              注文概要
            </h2>

            <dl className="mt-6 space-y-4 font-jetbrains text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-deep-black/60 font-noto">小計</dt>
                <dd className="font-medium text-deep-black">¥80,000</dd>
              </div>
              <div className="flex items-center justify-between border-t border-brass/10 pt-4">
                <dt className="flex items-center text-deep-black/60 font-noto">
                  <span>送料</span>
                  <Link href="#" className="ml-2 shrink-0 text-brass hover:text-racing-green">
                    <QuestionMarkCircleIcon aria-hidden="true" className="size-5" />
                  </Link>
                </dt>
                <dd className="font-medium text-deep-black">¥1,000</dd>
              </div>
              <div className="flex items-center justify-between border-t border-brass/10 pt-4">
                <dt className="flex text-deep-black/60 font-noto">
                  <span>消費税</span>
                  <Link href="#" className="ml-2 shrink-0 text-brass hover:text-racing-green">
                    <QuestionMarkCircleIcon aria-hidden="true" className="size-5" />
                  </Link>
                </dt>
                <dd className="font-medium text-deep-black">¥8,100</dd>
              </div>
              <div className="flex items-center justify-between border-t border-brass/20 pt-4">
                <dt className="text-base font-medium text-deep-black font-playfair">合計</dt>
                <dd className="text-base font-medium text-racing-green">¥89,100</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-racing-green px-4 py-3 text-base font-bold text-ivory shadow-sm hover:bg-deep-black transition-all focus:ring-2 focus:ring-racing-green focus:ring-offset-2 focus:ring-offset-ivory focus:outline-hidden font-jetbrains uppercase tracking-widest"
              >
                注文手続きへ
              </button>
            </div>
          </section>
        </form>

        {/* 関連商品 */}
        <section aria-labelledby="related-heading" className="mt-24 border-t border-brass/20 pt-16">
          <h2 id="related-heading" className="text-2xl font-bold text-deep-black font-playfair">
            おすすめの商品
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group relative">
                <div className="aspect-square w-full rounded-md overflow-hidden border border-brass/10">
                  <img
                    alt={relatedProduct.imageAlt}
                    src={relatedProduct.imageSrc}
                    className="h-full w-full object-cover group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-deep-black font-playfair font-bold">
                      <Link href={relatedProduct.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {relatedProduct.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-deep-black/60 font-cormorant italic">{relatedProduct.color}</p>
                  </div>
                  <p className="text-sm font-medium text-brass font-jetbrains">{relatedProduct.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}