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
export type ProductI18nMap = { [lang: string]: ProductLocalizedFields };

/**
 * Firestore document shape for products/{id}
 */
export interface ProductDocument {
  name: string;
  images: string[];
  index: number;
  active: boolean;
  price: number;
  priceId: string;
  colors: string[];
  materials: string[];
  priceModifiers: Record<string, number>;
  variantImages: Record<string, string>;
  dimensions: string;
  weight: string;
  stockLimit: number;
  feature1Img: string;
  feature2Img: string;
  i18n: ProductI18nMap;
}

/**
 * UI-ready product (Firestore doc + resolved id/price from subcollection)
 */
export interface Product extends ProductDocument {
  id: string;
}
