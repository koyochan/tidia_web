'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon, XMarkIcon as XMarkIconMini, InformationCircleIcon } from '@heroicons/react/20/solid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import { fetchProducts, ParsedProduct } from '@/lib/firestore'
import { useNotification } from '@/context/NotificationContext'
import { useLanguage } from '@/context/LanguageContext'

export default function CartPage() {
  const { cart, removeItem, updateQuantity, subtotal } = useCart()
  const { showNotification } = useNotification()
  const { t } = useLanguage()
  const [relatedProducts, setRelatedProducts] = useState<ParsedProduct[]>([])
  
  useEffect(() => {
    fetchProducts().then(allProducts => {
      const cartIds = cart.map(item => item.id)
      const related = allProducts.filter(p => !cartIds.includes(p.id)).slice(0, 4)
      setRelatedProducts(related)
    })
  }, [cart])

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        showNotification(
          'エラー',
          '決済画面への移動に失敗しました: ' + (data.error || '不明なエラー')
        )
      }
    } catch (err) {
      console.error(err)
      showNotification(
        '通信エラー',
        '通信エラーが発生しました。インターネット接続を確認してください。'
      )
    }
  }
  
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + tax

  return (
    <div className="bg-ivory text-deep-black font-noto min-h-screen flex flex-col">
      <Header />

      <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8 flex-grow w-full">
        <h1 className="text-3xl font-bold tracking-tight text-deep-black sm:text-4xl font-playfair">{t('cart.title')}</h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">Items</h2>

            <ul role="list" className="divide-y divide-brass/20 border-t border-b border-brass/20">
              {cart.map((item) => (
                <li key={`${item.id}-${item.color}`} className="flex py-6 sm:py-10">
                  <div className="shrink-0 border border-brass/20 rounded-md overflow-hidden">
                    <img
                      alt={item.imageAlt}
                      src={item.imageSrc}
                      className="size-24 object-cover sm:size-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <span className="font-bold text-deep-black font-playfair text-lg">
                              {item.name}
                            </span>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm text-deep-black/70 font-cormorant italic text-lg">
                          <p>{item.color}</p>
                          {item.material ? (
                            <p className="ml-4 border-l border-brass/30 pl-4">{item.material}</p>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-brass font-jetbrains">{item.priceString}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="inline-grid w-full max-w-16 grid-cols-1">
                          <select
                            id={`quantity-${item.id}`}
                            name={`quantity-${item.id}`}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value), item.color, item.material)}
                            className="col-start-1 row-start-1 appearance-none rounded-md bg-ivory py-1.5 pr-8 pl-3 text-base text-deep-black outline-1 -outline-offset-1 outline-brass/30 focus:outline-2 focus:-outline-offset-2 focus:outline-racing-green sm:text-sm/6 font-jetbrains"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-deep-black/50 sm:size-4"
                          />
                        </div>

                        <div className="absolute top-0 right-0">
                          <button 
                            type="button" 
                            onClick={() => removeItem(item.id, item.color, item.material)}
                            className="-m-2 inline-flex p-2 text-deep-black/40 hover:text-racing-green transition-colors"
                          >
                            <span className="sr-only">{t('cart.delete')}</span>
                            <XMarkIconMini aria-hidden="true" className="size-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-deep-black/70 font-noto">
                      <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-racing-green" />
                      <span>{t('cart.in_stock')}</span>
                    </p>
                  </div>
                </li>
              ))}
              {cart.length === 0 && (
                <li className="py-12 text-center text-deep-black/50 font-noto">
                  {t('cart.empty')}
                </li>
              )}
            </ul>
          </section>

          {/* 注文概要 */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-ivory border border-brass/20 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 shadow-md"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-deep-black font-playfair">
              {t('cart.summary_title')}
            </h2>

            <dl className="mt-6 space-y-4 font-jetbrains text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-deep-black/60 font-noto">{t('cart.subtotal')}</dt>
                <dd className="font-medium text-deep-black">¥{subtotal.toLocaleString()}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-brass/10 pt-4">
                <dt className="flex items-center text-deep-black/60 font-noto">
                  <span>{t('cart.shipping')}</span>
                </dt>
                <dd className="font-medium text-deep-black/60 text-xs">{t('cart.shipping_calculating')}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-brass/10 pt-4">
                <dt className="flex text-deep-black/60 font-noto">
                  <span>{t('cart.tax')}</span>
                </dt>
                <dd className="font-medium text-deep-black">¥{tax.toLocaleString()}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-brass/20 pt-4">
                <dt className="text-base font-medium text-deep-black font-playfair">{t('cart.total')} <span className="text-xs font-normal text-deep-black/60 font-noto">{t('cart.total_note')}</span></dt>
                <dd className="text-base font-medium text-racing-green">¥{total.toLocaleString()}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <div className="rounded-md bg-brass/5 p-4 mb-6">
                <div className="flex">
                  <div className="shrink-0">
                    <InformationCircleIcon aria-hidden="true" className="size-5 text-brass" />
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-deep-black/80 font-noto">
                      {t('cart.shipping_note')}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleCheckout}
                className="w-full rounded-md border border-transparent bg-racing-green px-4 py-3 text-base font-bold text-ivory shadow-sm hover:bg-deep-black transition-all focus:ring-2 focus:ring-racing-green focus:ring-offset-2 focus:ring-offset-ivory focus:outline-hidden font-jetbrains uppercase tracking-widest"
              >
                {t('cart.checkout')}
              </button>
            </div>
          </section>
        </form>

        {/* 関連商品 */}
        <section aria-labelledby="related-heading" className="mt-24 border-t border-brass/20 pt-16">
          <h2 id="related-heading" className="text-2xl font-bold text-deep-black font-playfair">
            {t('products.trending_title')}
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group relative">
                <div className="aspect-square w-full rounded-md overflow-hidden border border-brass/10">
                  <img
                    alt={relatedProduct.name}
                    src={relatedProduct.images[0]}
                    className="h-full w-full object-cover group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-deep-black font-playfair font-bold">
                      <Link href={`/products/${relatedProduct.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {relatedProduct.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-deep-black/60 font-cormorant italic">{relatedProduct.subDescription}</p>
                  </div>
                  <p className="text-sm font-medium text-brass font-jetbrains">¥{(relatedProduct.price || 0).toLocaleString()}</p>
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