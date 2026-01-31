'use client'

import { 
  CubeTransparentIcon, 
  FingerPrintIcon, 
  SparklesIcon,
  CheckIcon 
} from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'

function classNames(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function About() {
  const { t } = useLanguage()

  const origins = [
    {
      name: 'Tactile & Time',
      id: 'origin-ti',
      tagline: 'Touch the Real',
      description: t('about.etymology_desc_ti'),
      features: ['Tactile Experience', 'Aging (Time)', 'Physical Weight', 'Texture'],
      highlight: false,
    },
    {
      name: 'Dialogue & Interface',
      id: 'origin-di',
      tagline: 'Feel the Connection',
      description: t('about.etymology_desc_di'),
      features: ['Emotional Dialogue', 'Seamless Interface', 'Human Connection', 'Interactive'],
      highlight: true,
    },
    {
      name: 'Idea & Artifact',
      id: 'origin-a',
      tagline: 'Shape the Moment',
      description: t('about.etymology_desc_a'),
      features: ['Creative Idea', 'Digital Artifact', 'Unique Identity', 'Craftsmanship'],
      highlight: false,
    },
  ]

  return (
    <div className="bg-ivory min-h-screen flex flex-col font-noto text-deep-black">
      <Header />
      
      <main className="flex-grow">
        
        {/* Philosophy Section */}
        <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg
              aria-hidden="true"
              className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-brass/10"
            >
              <defs>
                <pattern
                  x="50%"
                  y={-1}
                  id="tidia-pattern"
                  width={200}
                  height={200}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M100 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-ivory">
                <path
                  d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect fill="url(#tidia-pattern)" width="100%" height="100%" strokeWidth={0} />
            </svg>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                  <p className="text-base/7 font-bold text-racing-green font-jetbrains uppercase tracking-widest">
                    {t('about.philosophy_sub')}
                  </p>
                  <h1 className="mt-2 text-4xl font-bold tracking-tight text-deep-black sm:text-5xl font-playfair whitespace-nowrap">
                    {t('about.philosophy_title')}
                  </h1>
                  <p className="mt-6 text-xl/8 text-deep-black/60 font-cormorant italic">
                    {t('about.philosophy_text')}
                  </p>
                </div>
              </div>
            </div>

            <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
              <div className="relative aspect-[3/2] w-[48rem] max-w-none rounded-xl bg-deep-black/5 shadow-xl ring-1 ring-brass/10 sm:w-[57rem] overflow-hidden">
                 <img
                  alt="TiDia App Interface"
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
                  className="absolute inset-0 size-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-brass/5 mix-blend-multiply" />
              </div>
            </div>

            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="max-w-xl text-base/7 text-deep-black/70 lg:max-w-lg font-noto">
                  <p>{t('about.philosophy_desc')}</p>
                  <ul role="list" className="mt-8 space-y-8 text-deep-black/60">
                    <li className="flex gap-x-3">
                      <CubeTransparentIcon aria-hidden="true" className="mt-1 size-5 flex-none text-brass" />
                      <span>
                        <strong className="font-bold text-deep-black font-playfair">Tactile Experience.</strong>{' '}
                        {t('about.value_tactile')}
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      <FingerPrintIcon aria-hidden="true" className="mt-1 size-5 flex-none text-brass" />
                      <span>
                        <strong className="font-bold text-deep-black font-playfair">Unique Identity.</strong>{' '}
                        {t('about.value_identity')}
                      </span>
                    </li>
                    <li className="flex gap-x-3">
                      <SparklesIcon aria-hidden="true" className="mt-1 size-5 flex-none text-brass" />
                      <span>
                        <strong className="font-bold text-deep-black font-playfair">Timeless Value.</strong>{' '}
                        {t('about.value_timeless')}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-ivory pt-16 pb-12 sm:pt-32 sm:pb-24 xl:pb-32">
          <div className="bg-deep-black pb-20 sm:pb-24 xl:pb-0">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
              <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
                <div className="relative aspect-2/1 h-full after:absolute after:inset-0 after:rounded-2xl after:inset-ring after:inset-ring-white/15 md:-mx-8 xl:mx-0 xl:aspect-auto">
                  <img
                    alt="Creative professional working"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                    className="absolute inset-0 size-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                  />
                </div>
              </div>
              <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
                <figure className="relative isolate pt-6 sm:pt-12">
                  <svg
                    fill="none"
                    viewBox="0 0 162 128"
                    aria-hidden="true"
                    className="absolute top-0 left-0 -z-10 h-32 stroke-brass/20"
                  >
                    <path
                      d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                      id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                    />
                    <use x={86} href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" />
                  </svg>
                  <blockquote className="text-xl/8 font-medium text-ivory sm:text-2xl/9 font-cormorant italic">
                    <p>&quot;{t('about.ceo_quote')}&quot;</p>
                  </blockquote>
                  <figcaption className="mt-8 text-base">
                    <div className="font-semibold text-brass font-playfair">{t('about.ceo_name')}</div>
                    <div className="mt-1 text-ivory/60 font-jetbrains text-sm">{t('about.ceo_title')}</div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>

        {/* Etymology Section */}
        <div className="py-24 sm:py-32 bg-ivory">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-base/7 font-bold text-racing-green font-jetbrains uppercase tracking-widest">
                {t('about.etymology_sub')}
              </h2>
              <p className="mt-2 text-5xl font-bold tracking-tight text-balance text-deep-black sm:text-6xl font-playfair">
                {t('about.etymology_title')}
              </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-deep-black/60 sm:text-xl/8 font-cormorant italic">
              {t('about.etymology_desc')}
            </p>
            
            <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {origins.map((item, idx) => (
                <div
                  key={item.id}
                  className={classNames(
                    item.highlight ? 'lg:z-10 lg:rounded-b-none ring-1 ring-brass shadow-xl relative' : 'lg:mt-8 ring-1 ring-brass/20',
                    idx === 0 ? 'lg:rounded-r-none' : '',
                    idx === origins.length - 1 ? 'lg:rounded-l-none' : '',
                    'flex flex-col justify-between rounded-3xl bg-ivory p-8 xl:p-10 transition-transform hover:scale-[1.02] duration-300',
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-x-4">
                      <h3 className={classNames(item.highlight ? 'text-racing-green' : 'text-deep-black', 'text-lg/8 font-bold font-playfair')}>
                        {item.name}
                      </h3>
                      {item.highlight && (
                        <p className="rounded-full bg-racing-green/10 px-2.5 py-1 text-xs/5 font-bold text-racing-green font-jetbrains">
                          Core Concept
                        </p>
                      )}
                    </div>
                    <p className="mt-4 text-sm/6 text-deep-black/70 font-noto">{item.description}</p>
                    <p className="mt-6 text-3xl font-bold tracking-tight text-deep-black font-playfair">
                      {item.tagline}
                    </p>
                    <ul role="list" className="mt-8 space-y-3 text-sm/6 text-deep-black/60 font-jetbrains">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-brass" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our People Section */}
        <section className="overflow-hidden bg-ivory py-32 border-t border-brass/10">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
              <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 className="text-4xl font-bold tracking-tight text-deep-black sm:text-5xl font-playfair">
                  {t('about.people_title')}
                </h2>
                <p className="mt-6 text-xl/8 text-deep-black/60 font-cormorant italic">
                  {t('about.people_intro')}
                </p>
                <p className="mt-6 text-base/7 text-deep-black/70 font-noto">
                  {t('about.people_desc')}
                </p>
                <div className="mt-10 flex">
                  <a href="/contact" className="rounded-md bg-racing-green px-6 py-3 text-sm font-bold text-ivory shadow-xs hover:bg-deep-black transition-colors font-jetbrains uppercase tracking-widest">
                    {t('about.join_team')} <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                  <img
                    alt="Team member"
                    src="https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1152&q=80"
                    className="aspect-7/5 w-148 max-w-none rounded-2xl bg-gray-50 object-cover max-sm:w-120 border border-brass/10 grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-148 lg:items-start lg:justify-end lg:gap-x-8">
                  <div className="order-first flex w-64 flex-none justify-end self-end max-sm:w-40 lg:w-auto">
                    <img
                      alt="Team member"
                      src="https://images.unsplash.com/photo-1605656816944-971cd5c1407f?ixlib=rb-4.0.3&auto=format&fit=crop&w=768&h=604&q=80"
                      className="aspect-4/3 w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover border border-brass/10 grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                    <img
                      alt="Team member"
                      src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=1152&h=842&q=80"
                      className="aspect-7/5 w-148 max-w-none flex-none rounded-2xl bg-gray-50 object-cover max-sm:w-120 border border-brass/10 grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                    <img
                      alt="Team member"
                      src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=768&h=604&q=80"
                      className="aspect-4/3 w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover border border-brass/10 grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  )
}