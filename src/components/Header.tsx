'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const navigation = {
  pages: [
    { name: 'About', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Support', href: '#' },
    { name: 'Contact', href: '#' },
  ],
}

interface HeaderProps {
  hideUntilScroll?: boolean
}

export default function Header({ hideUntilScroll = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(!hideUntilScroll)

  useEffect(() => {
    if (!hideUntilScroll) {
      setIsVisible(true)
      return
    }

    const handleScroll = () => {
      // Heroセクション（100vh）を過ぎたら表示
      // 少し手前（-100px）で表示開始するとスムーズ
      const threshold = window.innerHeight - 100
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [hideUntilScroll])

  return (
    <header 
      className={`bg-ivory border-b border-brass/20 z-50 transition-transform duration-300 ease-in-out ${
        hideUntilScroll ? 'fixed w-full top-0 left-0' : 'relative'
      } ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* 配送無料バナー */}
      <p className="flex h-10 items-center justify-center bg-racing-green px-4 text-sm font-medium text-ivory sm:px-6 lg:px-8 font-jetbrains tracking-wide">
        50,000円以上のご注文で送料無料
      </p>

      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          {/* モバイルメニューボタン */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="relative rounded-md bg-ivory p-2 text-deep-black lg:hidden"
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>

          {/* ロゴ */}
          <div className="ml-4 flex lg:ml-0">
            <Link href="/">
              <span className="font-playfair text-2xl font-bold tracking-tight text-deep-black cursor-pointer">
                TiDia
              </span>
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
            <div className="flex h-full space-x-8 items-center">
              {navigation.pages.map((page) => (
                <Link
                  key={page.name}
                  href={page.href}
                  className="flex items-center text-sm font-medium text-deep-black hover:text-brass font-playfair transition-colors"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </PopoverGroup>

          {/* 右側アイコンエリア */}
          <div className="ml-auto flex items-center">
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
              <Link href="#" className="text-sm font-medium text-deep-black hover:text-brass font-jetbrains">
                Sign in
              </Link>
              <span aria-hidden="true" className="h-6 w-px bg-brass/30" />
              <Link href="#" className="text-sm font-medium text-deep-black hover:text-brass font-jetbrains">
                Create account
              </Link>
            </div>

            {/* 検索 */}
            <div className="flex lg:ml-6">
              <Link href="#" className="p-2 text-deep-black/60 hover:text-deep-black">
                <span className="sr-only">Search</span>
                <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
              </Link>
            </div>

            {/* カート */}
            <div className="ml-4 flow-root lg:ml-6">
              <Link href="/cart" className="group -m-2 flex items-center p-2">
                <ShoppingBagIcon
                  aria-hidden="true"
                  className="size-6 shrink-0 text-deep-black/60 group-hover:text-brass transition-colors"
                />
                <span className="ml-2 text-sm font-medium text-deep-black group-hover:text-brass font-jetbrains">
                  2
                </span>
                <span className="sr-only">items in cart, view bag</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* モバイルメニュー */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/40 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-ivory pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-deep-black/60 hover:text-deep-black"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="space-y-6 border-t border-brass/20 px-4 py-6 font-playfair">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link href={page.href} className="-m-2 block p-2 font-medium text-deep-black">
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-brass/20 px-4 py-6">
              <div className="flow-root">
                <Link href="#" className="-m-2 block p-2 font-medium text-deep-black font-jetbrains">
                  Sign in
                </Link>
              </div>
              <div className="flow-root">
                <Link href="#" className="-m-2 block p-2 font-medium text-deep-black font-jetbrains">
                  Create account
                </Link>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  )
}