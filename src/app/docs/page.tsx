'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'

const sectionIds = [
  'introduction',
  'materials',
  'care',
  'size',
  'shipping',
  'returns',
] as const

type SectionId = (typeof sectionIds)[number]

interface NavLink {
  titleKey: string
  id?: SectionId
  href?: string
}

interface NavGroup {
  titleKey: string
  links: NavLink[]
}

const navGroups: NavGroup[] = [
  {
    titleKey: 'docs.group_product_guides',
    links: [
      { titleKey: 'docs.product_flip', href: '/docs/flip' },
    ],
  },
  {
    titleKey: 'docs.group_guides',
    links: [
      { titleKey: 'docs.introduction_title', id: 'introduction' },
      { titleKey: 'docs.materials_title', id: 'materials' },
      { titleKey: 'docs.care_title', id: 'care' },
    ],
  },
  {
    titleKey: 'docs.group_support',
    links: [
      { titleKey: 'docs.size_title', id: 'size' },
      { titleKey: 'docs.shipping_title', id: 'shipping' },
      { titleKey: 'docs.returns_title', id: 'returns' },
    ],
  },
]

export default function DocsPage() {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState<SectionId>('introduction')
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
            <h1 className="text-4xl font-bold tracking-tight text-deep-black font-playfair sm:text-5xl">
              {t('docs.page_title')}
            </h1>
            <p className="mt-4 text-lg text-deep-black/60 font-cormorant italic max-w-2xl">
              {t('docs.page_subtitle')}
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
                        if (link.href) {
                          return (
                            <li key={link.href} className="relative">
                              <Link
                                href={link.href}
                                className="block w-full text-left py-1.5 pl-4 text-sm transition-colors text-deep-black/60 hover:text-deep-black font-noto"
                              >
                                {t(link.titleKey)}
                              </Link>
                            </li>
                          )
                        }
                        const isActive = activeSection === link.id
                        return (
                          <li key={link.id} className="relative">
                            {isActive && (
                              <span className="absolute left-0 top-0 h-full w-px bg-racing-green" />
                            )}
                            <button
                              onClick={() => scrollTo(link.id!)}
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
                {navGroups.flatMap((g) => g.links).map((link) => {
                  if (link.href) {
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="whitespace-nowrap text-sm px-3 py-1.5 rounded-full border transition-colors border-brass/20 text-deep-black/60 hover:text-deep-black"
                      >
                        {t(link.titleKey)}
                      </Link>
                    )
                  }
                  return (
                    <button
                      key={link.id}
                      onClick={() => scrollTo(link.id!)}
                      className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-full border transition-colors ${
                        activeSection === link.id
                          ? 'border-racing-green text-racing-green font-bold'
                          : 'border-brass/20 text-deep-black/60 hover:text-deep-black'
                      }`}
                    >
                      {t(link.titleKey)}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Content */}
            <div className="py-12 lg:py-12">
              {/* Introduction */}
              <section
                id="introduction"
                ref={(el) => { sectionRefs.current.introduction = el }}
                className="scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-deep-black font-playfair">
                  {t('docs.introduction_title')}
                </h2>
                <div className="mt-4 h-px bg-brass/20" />
                <p className="mt-6 text-base leading-7 text-deep-black/80">
                  {t('docs.introduction_text')}
                </p>
                <p className="mt-4 text-base leading-7 text-deep-black/80">
                  {t('docs.introduction_text_2')}
                </p>
                <div className="mt-8 overflow-hidden rounded-lg border border-brass/10">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="TiDia workspace"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              </section>

              {/* Materials */}
              <section
                id="materials"
                ref={(el) => { sectionRefs.current.materials = el }}
                className="mt-20 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-deep-black font-playfair">
                  {t('docs.materials_title')}
                </h2>
                <div className="mt-4 h-px bg-brass/20" />
                <p className="mt-6 text-base leading-7 text-deep-black/80">
                  {t('docs.materials_text')}
                </p>
                <div className="mt-8 overflow-hidden rounded-lg border border-brass/10">
                  <img
                    src="https://images.unsplash.com/photo-1605656816944-971cd5c1407f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Materials"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
                <div className="mt-8 space-y-8">
                  {(['brass', 'leather', 'fabric'] as const).map((mat) => (
                    <div key={mat} className="border-l-2 border-brass/30 pl-6">
                      <h3 className="text-lg font-bold text-deep-black font-playfair">
                        {t(`docs.materials_${mat}`)}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-deep-black/70">
                        {t(`docs.materials_${mat}_desc`)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Care Guide */}
              <section
                id="care"
                ref={(el) => { sectionRefs.current.care = el }}
                className="mt-20 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-deep-black font-playfair">
                  {t('docs.care_title')}
                </h2>
                <div className="mt-4 h-px bg-brass/20" />
                <p className="mt-6 text-base leading-7 text-deep-black/80">
                  {t('docs.care_text')}
                </p>
                <div className="mt-8 overflow-hidden rounded-lg border border-brass/10">
                  <img
                    src="https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Care guide"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
                <div className="mt-8 space-y-8">
                  {(['brass', 'leather', 'fabric'] as const).map((mat) => (
                    <div key={mat} className="rounded-lg border border-brass/10 bg-white p-6">
                      <h3 className="text-lg font-bold text-deep-black font-playfair">
                        {t(`docs.care_${mat}_title`)}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-deep-black/70">
                        {t(`docs.care_${mat}_desc`)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Size Guide */}
              <section
                id="size"
                ref={(el) => { sectionRefs.current.size = el }}
                className="mt-20 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-deep-black font-playfair">
                  {t('docs.size_title')}
                </h2>
                <div className="mt-4 h-px bg-brass/20" />
                <p className="mt-6 text-base leading-7 text-deep-black/80">
                  {t('docs.size_text')}
                </p>
                <div className="mt-8 overflow-hidden rounded-lg border border-brass/10">
                  <img
                    src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Size guide"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {(['sleeve', 'desk'] as const).map((type) => (
                    <div key={type} className="rounded-lg border border-brass/10 bg-white p-6">
                      <h3 className="text-lg font-bold text-deep-black font-playfair">
                        {t(`docs.size_${type}_title`)}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-deep-black/70">
                        {t(`docs.size_${type}_desc`)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Shipping */}
              <section
                id="shipping"
                ref={(el) => { sectionRefs.current.shipping = el }}
                className="mt-20 scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-deep-black font-playfair">
                  {t('docs.shipping_title')}
                </h2>
                <div className="mt-4 h-px bg-brass/20" />
                <p className="mt-6 text-base leading-7 text-deep-black/80">
                  {t('docs.shipping_text')}
                </p>
                <div className="mt-8 overflow-hidden rounded-lg border border-brass/10">
                  <img
                    src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Shipping"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
                <div className="mt-8 space-y-8">
                  {(['domestic', 'international'] as const).map((type) => (
                    <div key={type} className="border-l-2 border-brass/30 pl-6">
                      <h3 className="text-lg font-bold text-deep-black font-playfair">
                        {t(`docs.shipping_${type}`)}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-deep-black/70">
                        {t(`docs.shipping_${type}_desc`)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Returns */}
              <section
                id="returns"
                ref={(el) => { sectionRefs.current.returns = el }}
                className="mt-20 scroll-mt-24 pb-12"
              >
                <h2 className="text-2xl font-bold text-deep-black font-playfair">
                  {t('docs.returns_title')}
                </h2>
                <div className="mt-4 h-px bg-brass/20" />
                <p className="mt-6 text-base leading-7 text-deep-black/80">
                  {t('docs.returns_text')}
                </p>
                <div className="mt-8 overflow-hidden rounded-lg border border-brass/10">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                    alt="Returns"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {(['policy', 'exchange'] as const).map((type) => (
                    <div key={type} className="rounded-lg border border-brass/10 bg-white p-6">
                      <h3 className="text-lg font-bold text-deep-black font-playfair">
                        {t(`docs.returns_${type}`)}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-deep-black/70">
                        {t(`docs.returns_${type}_desc`)}
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
