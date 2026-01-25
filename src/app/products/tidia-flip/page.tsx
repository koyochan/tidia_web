'use client'

import { Fragment, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'

const product = {
  name: 'TiDia Flip',
  price: '¥28,000',
  rating: 4,
  images: [
    {
      id: 1,
      name: '正面から見た図',
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg',
      alt: 'シームレスなデザインのTiDia Flip正面。',
    },
    {
      id: 2,
      name: '斜めから見た図',
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-01.jpg',
      alt: 'スリムなプロファイルを示す斜めからの視点。',
    },
    {
      id: 3,
      name: 'ディテール表示',
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-02.jpg',
      alt: '質感と素材のクローズアップ。',
    },
    {
      id: 4,
      name: '使用例',
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-03.jpg',
      alt: '使用シーンでのTiDia Flip。',
    },
  ],
  colors: [
    { id: 'ivory-brass', name: 'アイボリー & ブラス', classes: 'bg-[#FDFCF8] border border-[#B59A5A] checked:ring-2 checked:ring-[#B59A5A]' },
    { id: 'racing-green', name: 'レーシンググリーン', classes: 'bg-[#004225] border border-white/10 checked:ring-2 checked:ring-[#004225]' },
    { id: 'deep-black', name: 'ディープブラック', classes: 'bg-[#1A1A1A] border border-white/10 checked:ring-2 checked:ring-[#1A1A1A]' },
  ],
  description: `
    <p>TiDia Flipは、シームレスなアニメーションと洗練されたデザインを兼ね備えたデジタルライフスタイル製品です。直感的なインターフェースと高品質な素材が、あなたのデジタル体験をより豊かにします。</p>
    <p>最新のフリップテクノロジーにより、情報はかつてないほどスムーズに表示され、操作する喜びを感じることができます。</p>
  `,
  details: [
    {
      name: '特徴',
      items: [
        'シームレスなフリップアニメーション',
        '高品質な真鍮（Brass）仕上げのアクセント',
        '耐久性のあるアイボリーコーティング',
        '直感的なジェスチャーコントロール',
        '防滴・防塵設計',
      ],
    },
    {
      name: 'お手入れ方法',
      items: [
        '柔らかい布で拭いてください',
        '研磨剤入りのクリーナーは避けてください',
        '直射日光や高温多湿を避けて保管してください',
      ],
    },
    {
      name: '配送について',
      items: [
        '国内配送：2-3営業日',
        '海外配送：7-10営業日',
        '追跡番号付き配送',
      ],
    },
    {
      name: '返品・交換について',
      items: [
        '30日以内の返品・交換が可能',
        '未使用・未開封の商品に限ります',
        '返送料はお客様負担となります（不良品を除く）',
      ],
    },
  ],
}

const relatedProducts = [
  {
    id: 1,
    name: 'SaaSマーケティングキット',
    color: 'Figma',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg',
    imageAlt: 'SaaSマーケティングキット',
    price: '¥28,000',
  },
  {
    id: 2,
    name: 'EコマースUIバンドル',
    color: 'React & Vue',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-01-related-product-02.jpg',
    imageAlt: 'EコマースUIバンドル',
    price: '¥56,000',
  },
  {
    id: 3,
    name: 'アプリケーションUIアイコンパック',
    color: 'アウトライン & ソリッド',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-05-product-01.jpg',
    imageAlt: 'アイコンパックのプレビュー',
    price: '¥32,000',
  },
  {
    id: 4,
    name: 'ダッシュボードテンプレート',
    color: 'ダークモード',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
    imageAlt: 'ダッシュボードテンプレートのプレビュー',
    price: '¥48,000',
  },
]

function classNames(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function TiDiaFlipPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-ivory font-noto">
      {/* Mobile menu (reused structure if needed, but we use Global Header usually. 
          The provided snippet integrated Menu into the Page, but we have a Header.
          We will just use the Header component.) 
      */}
      <Header />

      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <TabGroup className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabList className="grid grid-cols-4 gap-6">
                  {product.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-deep-black uppercase hover:bg-gray-50 focus:ring-3 focus:ring-brass/50 focus:ring-offset-4 focus:outline-hidden"
                    >
                      <span className="sr-only">{image.name}</span>
                      <span className="absolute inset-0 overflow-hidden rounded-md border border-brass/20">
                        <img alt="" src={image.src} className="size-full object-cover" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-brass"
                      />
                    </Tab>
                  ))}
                </TabList>
              </div>

              <TabPanels className="aspect-square w-full">
                {product.images.map((image) => (
                  <TabPanel key={image.id}>
                    <img 
                      alt={image.alt} 
                      src={image.src} 
                      className="aspect-square w-full object-cover sm:rounded-lg shadow-lg border border-brass/10" 
                    />
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-4xl font-bold tracking-tight text-deep-black font-playfair">{product.name}</h1>

              <div className="mt-3">
                <h2 className="sr-only">商品の情報</h2>
                <p className="text-3xl tracking-tight text-brass font-jetbrains font-medium">{product.price}</p>
              </div>

              {/* レビュー */}
              <div className="mt-3">
                <h3 className="sr-only">レビュー</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          product.rating > rating ? 'text-brass' : 'text-gray-300',
                          'size-5 shrink-0',
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">商品説明</h3>

                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  className="space-y-6 text-base text-deep-black/80 font-cormorant text-lg italic leading-relaxed"
                />
              </div>

              <form className="mt-6">
                {/* Colors */}
                <div>
                  <h3 className="text-sm text-deep-black font-jetbrains">カラー</h3>

                  <fieldset aria-label="カラーを選択" className="mt-2">
                    <div className="flex items-center gap-x-3">
                      {product.colors.map((color) => (
                        <div key={color.id} className="flex rounded-full">
                          <input
                            defaultValue={color.id}
                            defaultChecked={color === product.colors[0]}
                            name="color"
                            type="radio"
                            aria-label={color.name}
                            className={classNames(
                              color.classes,
                              'size-8 appearance-none rounded-full forced-color-adjust-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass cursor-pointer shadow-sm',
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="mt-10 flex">
                  <button
                    type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-racing-green px-8 py-3 text-base font-bold text-ivory hover:bg-deep-black focus:ring-2 focus:ring-racing-green focus:ring-offset-2 focus:ring-offset-ivory focus:outline-hidden sm:w-full font-jetbrains uppercase tracking-widest transition-colors"
                  >
                    カートに追加
                  </button>


                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  追加情報
                </h2>

                <div className="divide-y divide-brass/20 border-t border-brass/20">
                  {product.details.map((detail) => (
                    <Disclosure key={detail.name} as="div">
                      <h3>
                        <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                          <span className="text-sm font-medium text-deep-black group-data-open:text-racing-green font-playfair text-lg">
                            {detail.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="block size-6 text-brass/60 group-hover:text-brass group-data-open:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="hidden size-6 text-racing-green group-hover:text-racing-green/80 group-data-open:block"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pb-6">
                        <ul
                          role="list"
                          className="list-disc space-y-1 pl-5 text-sm/6 text-deep-black/70 marker:text-brass/50 font-noto"
                        >
                          {detail.items.map((item) => (
                            <li key={item} className="pl-2">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <section aria-labelledby="related-heading" className="mt-10 border-t border-brass/20 px-4 py-16 sm:px-0">
            <h2 id="related-heading" className="text-2xl font-bold text-deep-black font-playfair">
              こちらの商品もおすすめです
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative">
                    <div className="relative h-72 w-full overflow-hidden rounded-lg border border-brass/10">
                      <img alt={product.imageAlt} src={product.imageSrc} className="size-full object-cover group-hover:opacity-75 transition-opacity" />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-lg font-medium text-deep-black font-playfair">{product.name}</h3>
                      <p className="mt-1 text-sm text-deep-black/60 font-cormorant italic">{product.color}</p>
                    </div>
                    <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-deep-black/60 to-transparent opacity-50"
                      />
                      <p className="relative text-lg font-semibold text-ivory font-jetbrains">{product.price}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <a
                      href={product.href}
                      className="relative flex items-center justify-center rounded-md border border-brass/30 bg-ivory/50 px-8 py-2 text-sm font-medium text-deep-black hover:bg-brass hover:text-deep-black transition-all font-jetbrains uppercase"
                    >
                      カートに追加<span className="sr-only">, {product.name}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
