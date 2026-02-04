'use client';

import { useState, useEffect } from 'react';
import { CubeTransparentIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { isMobile } from '@/lib/device';
import type { Product } from '@/types/product';
import QRCodeModal from './QRCodeModal';
import dynamic from 'next/dynamic';

// Dynamically import ModelViewer to avoid SSR issues
const ModelViewer = dynamic(() => import('./ModelViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
      <CubeTransparentIcon className="h-12 w-12 text-gray-300" />
    </div>
  ),
});

interface ARButtonProps {
  product: Product;
}

export default function ARButton({ product }: ARButtonProps) {
  const { t } = useLanguage();
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [show3DPreview, setShow3DPreview] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  // Don't render if AR is not enabled for this product
  if (!product.ar?.enabled) {
    return null;
  }

  // Mobile: Show 3D viewer with AR button
  if (isMobileDevice) {
    return (
      <div className="mt-6">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="aspect-square bg-gray-50">
            <ModelViewer
              product={product}
              className="w-full h-full"
              showARButton
            />
          </div>
          <div className="p-4 bg-white border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              {t('ar.place_in_room')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Show QR code option with optional 3D preview
  return (
    <div className="mt-6">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* 3D Preview (optional, toggled) */}
        {show3DPreview && (
          <div className="aspect-square bg-gray-50">
            <ModelViewer
              product={product}
              className="w-full h-full"
              showARButton={false}
            />
          </div>
        )}

        {/* Action buttons */}
        <div className="p-4 bg-white">
          <div className="flex gap-3">
            {/* 3D Preview toggle - only show if modelGlb exists */}
            {product.ar?.modelGlb && (
              <button
                onClick={() => setShow3DPreview(!show3DPreview)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <CubeTransparentIcon className="h-5 w-5" />
                {t('ar.view_3d')}
              </button>
            )}

            {/* QR Code for mobile AR */}
            <button
              onClick={() => setIsQRModalOpen(true)}
              className={`flex items-center justify-center gap-2 px-4 py-3 bg-brass text-white rounded-lg text-sm font-medium hover:bg-brass/90 transition-colors ${product.ar?.modelGlb ? 'flex-1' : 'w-full'}`}
            >
              <QrCodeIcon className="h-5 w-5" />
              {t('ar.view_in_ar')}
            </button>
          </div>

          <p className="mt-3 text-xs text-gray-400 text-center">
            {t('ar.open_on_phone')}
          </p>
        </div>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        productId={product.id}
        productName={product.name}
      />
    </div>
  );
}
