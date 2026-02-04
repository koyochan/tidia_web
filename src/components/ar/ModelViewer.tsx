'use client';

import { useEffect, useRef } from 'react';
import type { Product } from '@/types/product';

// Extend JSX intrinsic elements for model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          'ios-src'?: string;
          poster?: string;
          alt?: string;
          ar?: boolean;
          'ar-modes'?: string;
          'ar-scale'?: string;
          'ar-placement'?: string;
          'camera-controls'?: boolean;
          'touch-action'?: string;
          'auto-rotate'?: boolean;
          'shadow-intensity'?: string;
          loading?: string;
          reveal?: string;
        },
        HTMLElement
      >;
    }
  }
}

interface ModelViewerProps {
  product: Product;
  className?: string;
  showARButton?: boolean;
}

export default function ModelViewer({ product, className = '', showARButton = true }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import model-viewer to avoid SSR issues
    import('@google/model-viewer');
  }, []);

  if (!product.ar?.enabled || !product.ar?.modelGlb) {
    return null;
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <model-viewer
        src={product.ar.modelGlb}
        ios-src={product.ar.modelUsdz}
        poster={product.ar.poster || product.images[0]}
        alt={`${product.name} 3D model`}
        ar={showARButton}
        ar-modes="webxr scene-viewer quick-look"
        ar-scale={product.ar.scale || 'auto'}
        ar-placement={product.ar.placement || 'floor'}
        camera-controls
        touch-action="pan-y"
        auto-rotate
        shadow-intensity="1"
        loading="lazy"
        reveal="auto"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '300px',
          backgroundColor: 'transparent',
        }}
      />
    </div>
  );
}
