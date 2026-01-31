'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
// 翻訳ファイルをインポート
import { ja } from '@/translations/ja'
import { en } from '@/translations/en'

type Language = 'ja' | 'en'

// 翻訳データの型定義（jaファイルを基準にする）
type TranslationType = typeof ja

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// インポートしたデータを使用
const translations: Record<Language, TranslationType> = {
  ja,
  en
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ja')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // 警告回避のため、localStorageの読み込みを非同期（次のイベントループ）に回します
    const timer = setTimeout(() => {
      const savedLang = localStorage.getItem('tidia-lang') as Language
      if (savedLang && (savedLang === 'ja' || savedLang === 'en')) {
        setLanguage(savedLang)
      } else {
        const browserLang = navigator.language || navigator.languages?.[0] || ''
        setLanguage(browserLang.startsWith('ja') ? 'ja' : 'en')
      }
      setIsInitialized(true)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('tidia-lang', language)
    }
  }, [language, isInitialized])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: unknown = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k]
      } else {
        // キーが見つからない場合はコンソールに警告を出し、キー自体を返す
        console.warn(`Translation key not found: ${key}`)
        return key 
      }
    }
    
    return String(value)
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