"use client";

export default function Hero() {
  return (
    <div className="relative bg-deep-black font-sans h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          alt=""
          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-hero-full-width.jpg"
          className="size-full object-cover"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-deep-black opacity-50" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
        <h1 className="text-4xl font-bold tracking-tight text-ivory lg:text-6xl font-playfair">
          アナログを、再実装する。
        </h1>
        <p className="mt-4 text-xl text-ivory font-cormorant italic">
          最新のサマーシリーズが入荷しました。数量限定の特別なラインナップを、在庫があるうちにぜひご覧ください。
        </p>
        <a
          href="#"
          className="mt-8 inline-block rounded-md border border-transparent bg-ivory px-8 py-3 text-base font-bold text-deep-black hover:bg-white transition-colors font-jetbrains uppercase tracking-widest"
        >
          新作を見る
        </a>
      </div>
    </div>
  );
}
