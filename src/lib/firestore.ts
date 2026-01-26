import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  where, 
  orderBy 
} from "firebase/firestore";
import { db } from "./firebase";

export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  metadata: {
    index?: string;
    sub_description?: string;
    color?: string; // CSV
    material?: string; // CSV
    price_modifiers?: string; // Key:Amount,Key:Amount
    variant_images?: string; // Key::Url|Key::Url
    dimensions?: string;
    weight?: string;
    shipping_estimate?: string;
    stock_limit?: string;
    detail_title?: string;
    detail_description?: string;
    feature_1_img?: string;
    feature_1_desc?: string;
    feature_2_img?: string;
    feature_2_desc?: string;
  };
  price?: number;
  priceId?: string;
}

export interface ParsedProduct extends Omit<StripeProduct, 'metadata'> {
  index: number;
  subDescription: string;
  colors: string[];
  materials: string[];
  priceModifiers: Record<string, number>;
  variantImages: Record<string, string>;
  dimensions: string;
  weight: string;
  shippingEstimate: string;
  stockLimit: number;
  detailTitle: string;
  detailDescription: string;
  feature1Img: string;
  feature1Desc: string;
  feature2Img: string;
  feature2Desc: string;
}

/**
 * Metadata parser logic matching Flutter app
 */
export const parseMetadata = (metadata: StripeProduct['metadata']): Partial<ParsedProduct> => {
  const result: any = {
    index: parseInt(metadata.index || "0"),
    subDescription: metadata.sub_description || "",
    colors: metadata.color ? metadata.color.split(",").map(s => s.trim()) : [],
    materials: metadata.material ? metadata.material.split(",").map(s => s.trim()) : [],
    priceModifiers: {},
    variantImages: {},
    dimensions: metadata.dimensions || "",
    weight: metadata.weight || "",
    shippingEstimate: metadata.shipping_estimate || "",
    stockLimit: parseInt(metadata.stock_limit || "99"),
    detailTitle: metadata.detail_title || "細部へのこだわり",
    detailDescription: metadata.detail_description || "",
    feature1Img: metadata.feature_1_img || "",
    feature1Desc: metadata.feature_1_desc || "",
    feature2Img: metadata.feature_2_img || "",
    feature2Desc: metadata.feature_2_desc || "",
  };

  // Parse price_modifiers: "Key:Amount,Key:Amount"
  if (metadata.price_modifiers) {
    metadata.price_modifiers.split(",").forEach(item => {
      const [key, amount] = item.split(":");
      if (key && amount) {
        result.priceModifiers[key.trim()] = parseInt(amount.trim());
      }
    });
  }

  // Parse variant_images: "Key::Url|Key::Url"
  if (metadata.variant_images) {
    metadata.variant_images.split("|").forEach(item => {
      const [key, url] = item.split("::");
      if (key && url) {
        result.variantImages[key.trim()] = url.trim();
      }
    });
  }

  return result;
};

/**
 * Fetch all active products with their prices
 */
export const fetchProducts = async (): Promise<ParsedProduct[]> => {
  const productsCol = collection(db, "products");
  const q = query(productsCol, orderBy("metadata.index", "asc"));
  const productSnapshot = await getDocs(q);
  
  const products = await Promise.all(productSnapshot.docs.map(async (productDoc) => {
    const data = productDoc.data() as StripeProduct;
    const price = await fetchPriceForProduct(productDoc.id);
    
    return {
      ...data,
      id: productDoc.id,
      ...parseMetadata(data.metadata),
      price: price?.amount || 0,
      priceId: price?.id || "",
    } as ParsedProduct;
  }));

  return products;
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (productId: string): Promise<ParsedProduct | null> => {
  const productRef = doc(db, "products", productId);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) return null;

  const data = productSnap.data() as StripeProduct;
  const price = await fetchPriceForProduct(productId);

  return {
    ...data,
    id: productId,
    ...parseMetadata(data.metadata),
    price: price?.amount || 0,
    priceId: price?.id || "",
  } as ParsedProduct;
};

/**
 * Helper to fetch the first active price for a product
 */
const fetchPriceForProduct = async (productId: string) => {
  const pricesCol = collection(db, "products", productId, "prices");
  const q = query(pricesCol, where("active", "==", true));
  const priceSnapshot = await getDocs(q);

  if (priceSnapshot.empty) return null;

  const priceDoc = priceSnapshot.docs[0];
  const data = priceDoc.data();
  
  return {
    id: priceDoc.id,
    amount: data.unit_amount || 0,
    currency: data.currency || "jpy"
  };
};
