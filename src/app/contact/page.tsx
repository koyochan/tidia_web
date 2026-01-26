'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// TiDiaブランドに合わせたFAQデータ
const faqs = [
  {
    question: "製品の保証期間はありますか？",
    answer:
      "すべてのデジタルアーティファクトと物理製品には、購入日から1年間の限定保証が付帯しています。通常使用における不具合については、無償で修理または交換いたします。",
  },
  {
    question: "海外への配送は行っていますか？",
    answer:
      "はい、現在は北米、ヨーロッパ、アジアの主要国への配送に対応しています。配送料と納期は地域によって異なりますので、チェックアウト時にご確認ください。",
  },
  {
    question: "TiDiaアプリケーションの動作環境を教えてください。",
    answer:
      "iOS 15.0以上、またはAndroid 12.0以上のスマートフォンとタブレットに対応しています。最高の「触覚」体験を得るために、最新のハイエンド端末での使用を推奨しています。",
  },
  {
    question: "注文後のキャンセルは可能ですか？",
    answer:
      "物理製品については、発送処理が開始される前であればキャンセル可能です。デジタル製品については、ダウンロードまたはアクティベーション前であれば返金対応いたします。",
  },
  {
    question: "法人での大量購入は可能ですか？",
    answer:
      "はい、企業様向けの特別プランやカスタマイズも承っております。本ページのお問い合わせフォームより、「法人取引」を選択してご連絡ください。",
  },
  {
    question: "ギフトラッピングは対応していますか？",
    answer:
      "TiDia専用の真鍮箔押しギフトボックス（有料）をご用意しています。カート画面で「ギフトオプション」を選択してください。",
  },
]

export default function ContactPage() {
  return (
    <div className="bg-ivory min-h-screen flex flex-col font-noto">
      <Header />
      
      <main className="flex-grow">
        <div className="relative isolate bg-ivory">

          {/* FAQ Section */}
          <div className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8 border-t border-brass/20 pt-24">
            <div className="mx-auto max-w-4xl divide-y divide-brass/10">
              <h2 className="text-3xl font-bold tracking-tight text-deep-black sm:text-4xl font-playfair mb-10 text-center">
                よくある質問
              </h2>
              <dl className="mt-10 space-y-6 divide-y divide-brass/10">
                {faqs.map((faq) => (
                  <Disclosure key={faq.question} as="div" className="pt-6">
                    <dt>
                      <DisclosureButton className="group flex w-full items-start justify-between text-left text-deep-black">
                        <span className="text-base/7 font-bold font-noto group-data-open:text-racing-green transition-colors">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          <PlusIcon aria-hidden="true" className="size-6 text-brass group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-6 text-racing-green group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </dt>
                    <DisclosurePanel as="dd" className="mt-2 pr-12">
                      <p className="text-base/7 text-deep-black/60 font-noto">{faq.answer}</p>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </dl>
            </div>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
            <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
              <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-brass/5 ring-1 ring-brass/10 lg:w-1/2">
                  <svg
                    aria-hidden="true"
                    className="absolute inset-0 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-brass/10"
                  >
                    <defs>
                      <pattern
                        x="100%"
                        y={-1}
                        id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                        width={200}
                        height={200}
                        patternUnits="userSpaceOnUse"
                      >
                        <path d="M130 200V.5M.5 .5H200" fill="none" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" strokeWidth={0} className="fill-ivory" />
                    <svg x="100%" y={-1} className="overflow-visible fill-brass/5">
                      <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                    </svg>
                    <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-deep-black sm:text-5xl font-playfair">
                  お問い合わせ
                </h2>
                <p className="mt-6 text-lg/8 text-deep-black/60 font-cormorant italic">
                  TiDiaの製品やサービスに関するご質問、お仕事のご依頼など、お気軽にお問い合わせください。
                  通常、2営業日以内に専任の担当者よりご連絡させていただきます。
                </p>
                <dl className="mt-10 space-y-4 text-base/7 text-deep-black/70">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">住所</span>
                      <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-brass" />
                    </dt>
                    <dd>
                      〒100-0005
                      <br />
                      東京都千代田区丸の内 1-1-1
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">電話番号</span>
                      <PhoneIcon aria-hidden="true" className="h-7 w-6 text-brass" />
                    </dt>
                    <dd>
                      <a href="tel:+81 (03) 1234-5678" className="hover:text-racing-green transition-colors font-jetbrains">
                        +81 (03) 1234-5678
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">メールアドレス</span>
                      <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-brass" />
                    </dt>
                    <dd>
                      <a href="mailto:contact@tidia.jp" className="hover:text-racing-green transition-colors font-jetbrains">
                        contact@tidia.jp
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <form action="#" method="POST" className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
              <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="last-name" className="block text-sm/6 font-semibold text-deep-black font-jetbrains uppercase tracking-tight">
                      姓 <span className="text-xs font-normal opacity-50">(Last name)</span>
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-deep-black outline-1 -outline-offset-1 outline-brass/30 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-racing-green font-noto transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="first-name" className="block text-sm/6 font-semibold text-deep-black font-jetbrains uppercase tracking-tight">
                      名 <span className="text-xs font-normal opacity-50">(First name)</span>
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-deep-black outline-1 -outline-offset-1 outline-brass/30 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-racing-green font-noto transition-all"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm/6 font-semibold text-deep-black font-jetbrains uppercase tracking-tight">
                      メールアドレス
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-deep-black outline-1 -outline-offset-1 outline-brass/30 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-racing-green font-jetbrains transition-all"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-deep-black font-jetbrains uppercase tracking-tight">
                      電話番号
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="phone-number"
                        name="phone-number"
                        type="tel"
                        autoComplete="tel"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-deep-black outline-1 -outline-offset-1 outline-brass/30 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-racing-green font-jetbrains transition-all"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm/6 font-semibold text-deep-black font-jetbrains uppercase tracking-tight">
                      メッセージ内容
                    </label>
                    <div className="mt-2.5">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-deep-black outline-1 -outline-offset-1 outline-brass/30 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-racing-green font-noto transition-all"
                        defaultValue={''}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-md bg-racing-green px-6 py-2.5 text-center text-sm font-bold text-ivory shadow-xs hover:bg-deep-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-racing-green font-jetbrains uppercase tracking-widest transition-all"
                  >
                    メッセージを送信
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}