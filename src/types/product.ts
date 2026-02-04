/**
 * TiDia Product Types
 * Shared between web and mobile apps.
 */

export type Language = 'ja' | 'en';

/** Localized fields for a single language */
export interface ProductLocalizedFields {
  description: string;
  subDescription: string;
  shippingEstimate: string;
  detailTitle: string;
  detailDescription: string;
  feature1Desc: string;
  feature2Desc: string;
}

/** i18n map keyed by language code */
export type ProductI18nMap = { [lang: string]: Partial<ProductLocalizedFields> };

/**
 * Firestore document shape for products/{id}
 * Fields are stored directly on the document (no metadata map).
 */
/** AR configuration for a product */
export interface ProductAR {
  enabled: boolean;
  modelGlb?: string;
  modelUsdz?: string;
  poster?: string;
  scale?: string;
  placement?: 'floor' | 'wall';
}

export interface ProductDocument {
  name: string;
  images: string[];
  index: number;
  active: boolean;
  colors: string[];
  materials: string[];
  priceModifiers: Record<string, number>;
  variantImages: Record<string, string>;
  dimensions: string;
  weight: string;
  stock: number;
  feature1Img?: string;
  feature2Img?: string;
  i18n?: ProductI18nMap;
  ar?: ProductAR;
}

/**
 * UI-ready product (Firestore doc + resolved id)
 */
export interface Product extends ProductDocument {
  id: string;
  price: number;
  priceId: string;
  currency: string;
}
