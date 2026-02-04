'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { QRCodeSVG } from 'qrcode.react';
import { useLanguage } from '@/context/LanguageContext';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
}

export default function QRCodeModal({ isOpen, onClose, productId, productName }: QRCodeModalProps) {
  const { t } = useLanguage();

  // Generate AR page URL
  const arUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/ar/${productId}`
    : `/ar/${productId}`;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
                <div className="absolute right-4 top-4">
                  <button
                    type="button"
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex justify-center mb-4">
                  <DevicePhoneMobileIcon className="h-12 w-12 text-brass" />
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold text-gray-900 mb-2"
                >
                  {t('ar.scan_qr')}
                </Dialog.Title>

                <p className="text-sm text-gray-500 mb-4">
                  {t('ar.qr_instruction')}
                </p>

                <p className="text-lg font-semibold text-gray-900 mb-4">
                  {productName}
                </p>

                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white rounded-xl shadow-inner border border-gray-100">
                    <QRCodeSVG
                      value={arUrl}
                      size={200}
                      level="H"
                      includeMargin
                      bgColor="#ffffff"
                      fgColor="#1a1a1a"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                  onClick={onClose}
                >
                  {t('ar.close')}
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
