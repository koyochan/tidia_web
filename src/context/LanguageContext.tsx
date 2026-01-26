'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'ja' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  ja: {
    // Header
    nav_about: 'About',
    nav_application: 'Application',
    nav_contact: 'Contact',
    cart_items: '点のアイテム',
    section_products: '商品',
    // Hero
    hero_tagline: 'アナログを、再実装する。',
    hero_description: 'フラットで無機質なデジタル生活に、『物理的な重みと音』を取り戻し、「手触りのある刺激で、あなたの創造性が心地よく研ぎ澄まされる毎日を約束します。',
    hero_cta: '製品を見る',
    // About (Brief for Hero area if needed)
    about_origin_title: 'ブランドの由来',
    about_origin_text: 'Tactile（触覚）, Interface（接点）, Dialogue（対話）。そして Dies（時）と Idea（アイディア）。',
  },
  en: {
    // Header
    nav_about: 'About',
    nav_application: 'Application',
    nav_contact: 'Contact',
    cart_items: 'items in cart',
    section_products: 'Products',
    // Hero
    hero_tagline: 'Analog, Re-implemented.',
    hero_description: 'Restoring software intelligence as a tactile experience. Digital artifacts that carve fleeting inspirations into physical time.',
    hero_cta: 'Explore Products',
    // About
    about_origin_title: 'Origin',
    about_origin_text: 'Tactile, Interface, Dialogue. Merging "Dies" (Time) and "Idea".',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ja')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem('tidia-lang') as Language
    if (savedLang && (savedLang === 'ja' || savedLang === 'en')) {
      setLanguage(savedLang)
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('tidia-lang', language)
    }
  }, [language, isInitialized])

  const t = (key: string) => {
    return (translations[language] as any)[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
