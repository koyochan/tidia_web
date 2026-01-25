'use client'

const features = [
  {
    name: 'ミニマルで考え抜かれたデザイン',
    description:
      '私たちのラップトップスリーブはコンパクトで、13インチのデバイスに精密にフィットします。ジッパーにより内部に簡単にアクセスでき、フロントポーチは充電ケーブルの収納に便利です。',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-07-detail-01.jpg',
    imageAlt: '白いキャンバス地のラップトップスリーブ。グレーのフェルトの裏地、シルバーのジッパー、タンレザーのジッパープル。',
  },
  {
    name: '洗練されたディテール',
    description:
      '細部に至るまで、最高の素材と仕上げでデザインしています。このラップトップスリーブは、耐久性のあるキャンバス地にダブルステッチを施し、フェルトの裏地と日常の使用に耐える高品質なジッパーを採用しています。',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-07-detail-02.jpg',
    imageAlt: 'タンレザーとシルバーのリベットが付いたジッパープルのディテール。',
  },
]

function classNames(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function BrandStory() {
  return (
    <div className="bg-ivory text-deep-black font-noto">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-deep-black sm:text-4xl font-playfair">あなたのデバイスを守る</h2>
          <p className="mt-4 text-deep-black/60 font-cormorant text-lg italic">
            デジタルクリエイティブとして、ラップトップやタブレットは仕事の中心です。その品質と外見に見合った、ファブリックスリーブでデバイスを安全に保ちましょう。
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {features.map((feature, featureIdx) => (
            <div
              key={feature.name}
              className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
            >
              <div
                className={classNames(
                  featureIdx % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-8 xl:col-start-9',
                  'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4',
                )}
              >
                <h3 className="text-lg font-medium text-deep-black font-playfair text-2xl">{feature.name}</h3>
                <p className="mt-2 text-sm text-deep-black/70 font-noto leading-relaxed">{feature.description}</p>
              </div>
              <div
                className={classNames(
                  featureIdx % 2 === 0 ? 'lg:col-start-6 xl:col-start-5' : 'lg:col-start-1',
                  'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8',
                )}
              >
                <div className="aspect-5/2 w-full overflow-hidden rounded-lg bg-gray-100 border border-brass/10">
                  <img
                    alt={feature.imageAlt}
                    src={feature.imageSrc}
                    className="object-cover object-center size-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
