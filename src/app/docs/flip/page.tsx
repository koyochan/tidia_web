'use client'

import { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'

const sectionIds = [
  'overview',
  'features',
  'usage',
  'specs',
  'care',
] as const

type SectionId = (typeof sectionIds)[number]

interface NavGroup {
  titleKey: string
  links: { titleKey: string; id: SectionId }[]
}

const navGroups: NavGroup[] = [
  {
    titleKey: 'docs_flip.group_product',
    links: [
      { titleKey: 'docs_flip.overview_title', id: 'overview' },
      { titleKey: 'docs_flip.features_title', id: 'features' },
      { titleKey: 'docs_flip.usage_title', id: 'usage' },
    ],
  },
  {
    titleKey: 'docs_flip.group_reference',
    links: [
      { titleKey: 'docs_flip.specs_title', id: 'specs' },
      { titleKey: 'docs_flip.care_title', id: 'care' },
    ],
  },
]

export default function DocsFlipPage() {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState<SectionId>('overview')
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id as SectionId)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    sectionIds.forEach((id) => {
      const el = sectionRefs.current[id]
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id]
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-ivory font-noto text-deep-black min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <div className="border-b border-brass/20 bg-ivory py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4">
              <Link
                href="/docs"
                className="text-sm text-deep-black/50 hover:text-deep-black transition-colors font-noto"
              >
                ← {t('docs.page_title')}
              </Link>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-deep-black font-playfair sm:text-5xl">
              {t('docs_flip.page_title')}
            </h1>
            <p className="mt-4 text-lg text-deep-black/60 font-cormorant italic max-w-2xl">
              {t('docs_flip.page_subtitle')}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 xl:grid-cols-[320px_1fr]">
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <nav className="sticky top-24 py-12">
                {navGroups.map((group) => (
                  <div key={group.titleKey} className="mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-deep-black/40 font-jetbrains">
                      {t(group.titleKey)}
                    </h3>
                    <ul className="mt-3 border-l border-brass/20">
                      {group.links.map((link) => {
                        const isActive = activeSection === link.id
                        return (
                          <li key={link.id} className="relative">
                            {isActive && (
                              <span className="absolute left-0 top-0 h-full w-px bg-racing-green" />
                            )}
                            <button
                              onClick={() => scrollTo(link.id)}
                              className={`block w-full text-left py-1.5 pl-4 text-sm transition-colors ${
                                isActive
                                  ? 'text-racing-green font-bold'
                                  : 'text-deep-black/60 hover:text-deep-black'
                              } font-noto`}
                            >
                              {t(link.titleKey)}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Mobile section nav */}
            <div className="lg:hidden border-b border-brass/20 py-6 overflow-x-auto">
              <div className="flex gap-4">
                {navGroups.flatMap((g) => g.links).map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-full border transition-colors ${
                      activeSection === link.id
                        ? 'border-racing-green text-racing-green font-bold'
                        : 'border-brass/20 text-deep-black/60 hover:text-deep-black'
                    }`}
                  >
                    {t(link.titleKey)}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="py-12 lg:py-12">
              {/* Overview */}
              <section
                id="overview"
                ref={(el) => { sectionRefs.current.overview = el }}
                className="scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-deep-black font-playfair">
                  {t('docs_flip.overview_title')}
                </h2>
                <div className="mt-4 h-px bg-brass/20" />
                <p className="mt-6 text-base leading-7 text-deep-black/80">
                  {t('docs_flip.overview_text')}
                </p>
                <p className="mt-4 text-base leading-7 text-deep-black/80">
                  {t('docs_flip.overview_text_2')}
                </p>
              </section>

              {/* Features */}
              <section
                id="features"
                ref={(el) => { sectionRefs.current.features = el }}
                className="mt-20 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-deep-black font-playfair">
                  {t('docs_flip.features_title')}
                </h2>
                <div className="mt-4 h-px bg-brass/20" />
                <p className="mt-6 text-base leading-7 text-deep-black/80">
                  {t('docs_flip.features_text')}
                </p>
                <div className="mt-8 space-y-8">
                  {(['mechanism', 'material', 'sound'] as const).map((f) => (
                    <div key={f} className="border-l-2 border-brass/30 pl-6">
                      <h3 className="text-lg font-bold text-deep-black font-playfair">
                        {t(`docs_flip.features_${f}`)}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-deep-black/70">
                        {t(`docs_flip.features_${f}_desc`)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Usage */}
              <section
                id="usage"
                ref={(el) => { sectionRefs.current.usage = el }}
                className="mt-20 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-deep-black font-playfair">
                  {t('docs_flip.usage_title')}
                </h2>
                <div className="mt-4 h-px bg-brass/20" />
                <p className="mt-6 text-base leading-7 text-deep-black/80">
                  {t('docs_flip.usage_text')}
                </p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {(['focus', 'fidget', 'decision'] as const).map((u) => (
                    <div key={u} className="rounded-lg border border-brass/10 bg-white p-6">
                      <h3 className="text-lg font-bold text-deep-black font-playfair">
                        {t(`docs_flip.usage_${u}_title`)}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-deep-black/70">
                        {t(`docs_flip.usage_${u}_desc`)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Specs */}
              <section
                id="specs"
                ref={(el) => { sectionRefs.current.specs = el }}
                className="mt-20 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-deep-black font-playfair">
                  {t('docs_flip.specs_title')}
                </h2>
                <div className="mt-4 h-px bg-brass/20" />
                <p className="mt-6 text-base leading-7 text-deep-black/80">
                  {t('docs_flip.specs_text')}
                </p>
                <div className="mt-8 overflow-hidden rounded-lg border border-brass/10">
                  <table className="w-full text-sm">
                    <tbody>
                      {(['dimensions', 'weight', 'material', 'finish', 'origin'] as const).map((s, i) => (
                        <tr key={s} className={i % 2 === 0 ? 'bg-white' : 'bg-ivory'}>
                          <td className="py-3 px-6 font-bold text-deep-black/80">
                            {t(`docs_flip.specs_${s}`)}
                          </td>
                          <td className="py-3 px-6 text-deep-black/70">
                            {t(`docs_flip.specs_${s}_value`)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Care */}
              <section
                id="care"
                ref={(el) => { sectionRefs.current.care = el }}
                className="mt-20 scroll-mt-24 pb-12"
              >
                <h2 className="text-2xl font-bold text-deep-black font-playfair">
                  {t('docs_flip.care_title')}
                </h2>
                <div className="mt-4 h-px bg-brass/20" />
                <p className="mt-6 text-base leading-7 text-deep-black/80">
                  {t('docs_flip.care_text')}
                </p>
                <div className="mt-8 space-y-8">
                  {(['daily', 'patina', 'storage'] as const).map((c) => (
                    <div key={c} className="rounded-lg border border-brass/10 bg-white p-6">
                      <h3 className="text-lg font-bold text-deep-black font-playfair">
                        {t(`docs_flip.care_${c}_title`)}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-deep-black/70">
                        {t(`docs_flip.care_${c}_desc`)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
