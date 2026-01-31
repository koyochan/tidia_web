"use client";

import { useLanguage } from '@/context/LanguageContext'

export default function FocusSection() {
  const { t } = useLanguage()

  return (
    <section aria-labelledby="comfort-heading" className="bg-ivory mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 border-t border-brass/20">
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0">
          <img
            alt=""
            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-01-feature-section-02.jpg"
            className="size-full object-cover"
          />
        </div>
        <div className="relative bg-gray-900/75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 id="comfort-heading" className="text-3xl font-bold tracking-tight text-ivory sm:text-4xl font-playfair">
              {t('home.focus_title')}
            </h2>
            <p className="mt-3 text-xl text-ivory font-cormorant italic">
              {t('home.focus_text')}
            </p>
            <a
              href="#"
              className="mt-8 block w-full rounded-md border border-transparent bg-ivory px-8 py-3 text-base font-bold text-deep-black hover:bg-white sm:w-auto font-jetbrains uppercase tracking-widest"
            >
              {t('home.focus_cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
