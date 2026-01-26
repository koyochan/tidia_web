'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

interface NotificationContextType {
  showNotification: (title: string, message: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const showNotification = (newTitle: string, newMessage: string) => {
    setTitle(newTitle)
    setMessage(newMessage)
    setShow(true)

    // Automatically hide after 3 seconds
    setTimeout(() => {
      setShow(false)
    }, 3000)
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {/* Global notification live region */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-[9999]"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition show={show}>
            <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg border border-brass/10 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <CheckCircleIcon aria-hidden="true" className="size-6 text-racing-green" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-bold text-deep-black font-playfair">{title}</p>
                    <p className="mt-1 text-sm text-deep-black/60 font-noto">{message}</p>
                  </div>
                  <div className="ml-4 flex shrink-0">
                    <button
                      type="button"
                      onClick={() => setShow(false)}
                      className="inline-flex rounded-md text-deep-black/30 hover:text-racing-green focus:outline-hidden transition-colors"
                    >
                      <span className="sr-only">閉じる</span>
                      <XMarkIcon aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
