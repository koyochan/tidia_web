import { ParsedProduct } from '@/lib/firestore'

interface ProductDetailsProps {
  product?: ParsedProduct
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  // 以前のハードコードされたデフォルトデータ
  const defaultData = {
    detailTitle: "細部へのこだわり",
    detailDescription: "特許取得済みのパッド入りスリーブ構造が、あなたの大切なアイテムを日々の冒険や長時間の移動、過酷な旅行スケジュールから守ります。",
    feature1Img: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
    feature1Desc: "20Lモデルは、370本のキャンディバー、6つのチップスシリンダー、1220個の標準的なガムボール、またはあなたが望むあらゆるお菓子の組み合わせを収納するのに十分なスペースがあります。はい、私たちが計算しました。",
    feature2Img: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-02.jpg",
    feature2Desc: "複数のコンパートメントオプションで、スナックの整理整頓をレベルアップ。クイックアクセスポーチは、予期せぬ空腹やシェアが必要な場面にもすぐに対応できます。"
  }

  const data = product ? {
    detailTitle: product.detailTitle || defaultData.detailTitle,
    detailDescription: product.detailDescription || defaultData.detailDescription,
    feature1Img: product.feature1Img || defaultData.feature1Img,
    feature1Desc: product.feature1Desc || defaultData.feature1Desc,
    feature2Img: product.feature2Img || defaultData.feature2Img,
    feature2Desc: product.feature2Desc || defaultData.feature2Desc,
  } : defaultData

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
