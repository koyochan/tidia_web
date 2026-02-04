'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';
import { fetchProductById } from '@/lib/firestore';
import { useLanguage } from '@/context/LanguageContext';
import type { Product } from '@/types/product';
import dynamic from 'next/dynamic';

// Dynamically import ModelViewer
const ModelViewer = dynamic(
  () => import('@/components/ar/ModelViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
        <CubeTransparentIcon className="h-16 w-16 text-gray-300" />
      </div>
    ),
  }
);

export default function ARPage() {
  const params = useParams();
  const productId = params.productId as string;
  const { t, language } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const currency = language === 'ja' ? 'jpy' : 'usd';
        const fetchedProduct = await fetchProductById(productId, currency);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      loadProduct();
    }
  }, [productId, language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <CubeTransparentIcon className="h-16 w-16 text-brass mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500">{t('ar.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-500 mb-4">{error || 'Product not found'}</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-brass hover:underline"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product.ar?.enabled) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
        <div className="text-center">
          <CubeTransparentIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">{t('ar.not_supported')}</p>
          <Link
            href={`/products/${productId}`}
            className="inline-flex items-center gap-2 text-brass hover:underline"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {product.name}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            href={`/products/${productId}`}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="text-sm">{product.name}</span>
          </Link>
        </div>
      </header>

      {/* AR Viewer */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 bg-gray-50">
          <ModelViewer
            product={product}
            className="w-full h-full min-h-[60vh]"
            showARButton
          />
        </div>

        {/* Product info */}
        <div className="bg-white p-4 border-t border-gray-100">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            {t('ar.place_in_room')}
          </p>
          <Link
            href={`/products/${productId}`}
            className="block w-full text-center px-4 py-3 bg-brass text-white rounded-lg font-medium hover:bg-brass/90 transition-colors"
          >
            {t('product_detail.product_info')}
          </Link>
        </div>
      </main>
    </div>
  );
}
