'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()

  const faqs = [
    {
      question: t('contact.faqs.warranty.q'),
      answer: t('contact.faqs.warranty.a'),
    },
    {
      question: t('contact.faqs.shipping.q'),
      answer: t('contact.faqs.shipping.a'),
    },
    {
      question: t('contact.faqs.device.q'),
      answer: t('contact.faqs.device.a'),
    },
    {
      question: t('contact.faqs.cancel.q'),
      answer: t('contact.faqs.cancel.a'),
    },
    {
      question: t('contact.faqs.bulk.q'),
      answer: t('contact.faqs.bulk.a'),
    },
    {
      question: t('contact.faqs.gift.q'),
      answer: t('contact.faqs.gift.a'),
    },
  ]

  return (
    <div className="bg-ivory min-h-screen flex flex-col font-noto">
      <Header />
      
      <main className="flex-grow">
        <div className="relative isolate bg-ivory px-6 py-24 sm:py-32 lg:px-8">
          
          <div className="absolute inset-x-0 top-0 -z-10 h-[80rem] overflow-hidden bg-brass/5 ring-1 ring-brass/10 sm:h-[100rem] opacity-50">
            <svg
              aria-hidden="true"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full mask-[radial-gradient(closest-side,white,transparent)] stroke-brass/10"
            >
              <defs>
                <pattern
                  x="50%"
                  y={0}
                  id="contact-pattern"
                  width={200}
                  height={200}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M100 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={0} className="overflow-visible fill-ivory/50">
                <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" strokeWidth={0} />
              </svg>
              <rect fill="url(#contact-pattern)" width="100%" height="100%" strokeWidth={0} />
            </svg>
          </div>

          <div className="mx-auto max-w-2xl text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight text-deep-black sm:text-5xl font-playfair">
              {t('contact.title')}
            </h2>
            <p className="mt-6 text-lg/8 text-deep-black/60 font-cormorant italic">
              {t('contact.desc')}
            </p>
          </div>

          {/* FAQ Section */}
          <div className="mx-auto max-w-4xl mb-24 border border-brass/20 rounded-2xl bg-white/50 p-8 sm:p-12 shadow-sm">
             <h3 className="text-2xl font-bold text-deep-black font-playfair mb-8 text-center">{t('contact.faq_title')}</h3>
             <dl className="divide-y divide-brass/10">
               {faqs.map((faq) => (
                 <Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
                   <dt>
                     <DisclosureButton className="group flex w-full items-start justify-between text-left text-deep-black">
                       <span className="text-base/7 font-bold font-noto group-data-open:text-racing-green transition-colors">{faq.question}</span>
                       <span className="ml-6 flex h-7 items-center">
                         <PlusIcon aria-hidden="true" className="size-6 text-brass group-data-open:hidden" />
                         <MinusIcon aria-hidden="true" className="size-6 text-racing-green group-not-data-open:hidden" />
                       </span>
                     </DisclosureButton>
                   </dt>
                   <DisclosurePanel as="dd" className="mt-4 pr-12">
                     <p className="text-base/7 text-deep-black/60 font-noto leading-relaxed">{faq.answer}</p>
                   </DisclosurePanel>
                 </Disclosure>
               ))}
             </dl>
          </div>

          {/* Contact Info & Form */}
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2 border-t border-brass/20 pt-24">
            <div className="relative lg:static">
              <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                <h3 className="text-3xl font-bold font-playfair text-deep-black mb-8">{t('contact.info_title')}</h3>
                <p className="text-base/7 text-deep-black/60 font-noto mb-10">
                  {t('contact.info_desc')}
                </p>
                <dl className="space-y-6 text-base/7 text-deep-black/70 font-jetbrains">
                  <div className="flex gap-x-4 items-start">
                    <dt className="flex-none mt-1">
                      <span className="sr-only">Address</span>
                      <BuildingOffice2Icon aria-hidden="true" className="h-6 w-6 text-brass" />
                    </dt>
                    <dd className="font-noto whitespace-pre-line">
                      {t('contact.address')}
                    </dd>
                  </div>
                  <div className="flex gap-x-4 items-center">
                    <dt className="flex-none">
                      <span className="sr-only">Phone</span>
                      <PhoneIcon aria-hidden="true" className="h-6 w-6 text-brass" />
                    </dt>
                    <dd>
                      <a href="tel:+81 (03) 1234-5678" className="hover:text-racing-green transition-colors">
                        +81 (03) 1234-5678
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-x-4 items-center">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <EnvelopeIcon aria-hidden="true" className="h-6 w-6 text-brass" />
                    </dt>
                    <dd>
                      <a href="mailto:contact@tidia.jp" className="hover:text-racing-green transition-colors">
                        contact@tidia.jp
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <form action="#" method="POST" className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="last-name" className="block text-sm/6 font-semibold text-deep-black font-jetbrains uppercase tracking-tight">
                    {t('contact.form_last_name')}
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-deep-black outline-1 -outline-offset-1 outline-brass/30 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-racing-green font-noto transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="first-name" className="block text-sm/6 font-semibold text-deep-black font-jetbrains uppercase tracking-tight">
                    {t('contact.form_first_name')}
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-deep-black outline-1 -outline-offset-1 outline-brass/30 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-racing-green font-noto transition-all"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm/6 font-semibold text-deep-black font-jetbrains uppercase tracking-tight">
                    {t('contact.form_email')}
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-deep-black outline-1 -outline-offset-1 outline-brass/30 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-racing-green font-jetbrains transition-all"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-deep-black font-jetbrains uppercase tracking-tight">
                    {t('contact.form_phone')}
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="phone-number"
                      name="phone-number"
                      type="tel"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-deep-black outline-1 -outline-offset-1 outline-brass/30 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-racing-green font-jetbrains transition-all"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm/6 font-semibold text-deep-black font-jetbrains uppercase tracking-tight">
                    {t('contact.form_message')}
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-deep-black outline-1 -outline-offset-1 outline-brass/30 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-racing-green font-noto transition-all"
                      defaultValue={''}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-racing-green px-6 py-2.5 text-center text-sm font-bold text-ivory shadow-xs hover:bg-deep-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-racing-green font-jetbrains uppercase tracking-widest transition-all"
                >
                  {t('contact.form_submit')}
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}