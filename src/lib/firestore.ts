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
import type { ProductDocument, Product } from "@/types/product";

export type Currency = "jpy" | "usd";

export function getCurrency(language: string): Currency {
  return language === "ja" ? "jpy" : "usd";
}

export function formatPrice(amount: number, currency: Currency): string {
  if (currency === "usd") {
    return `$${(amount / 100).toFixed(2)}`;
  }
  return `¥${amount.toLocaleString()}`;
}

/**
 * Fetch all active products with their prices
 */
export const fetchProducts = async (currency: Currency = "jpy"): Promise<Product[]> => {
  const productsCol = collection(db, "products");
  const q = query(productsCol, orderBy("index", "asc"));
  const productSnapshot = await getDocs(q);

  const products = await Promise.all(productSnapshot.docs.map(async (productDoc) => {
    const data = productDoc.data() as ProductDocument;
    const price = await fetchPriceForProduct(productDoc.id, currency);

    return {
      ...data,
      id: productDoc.id,
      price: price?.amount ?? 0,
      priceId: price?.id ?? "",
      currency,
    } as Product;
  }));

  return products;
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (productId: string, currency: Currency = "jpy"): Promise<Product | null> => {
  const productRef = doc(db, "products", productId);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) return null;

  const data = productSnap.data() as ProductDocument;
  const price = await fetchPriceForProduct(productId, currency);

  return {
    ...data,
    id: productId,
    price: price?.amount ?? 0,
    priceId: price?.id ?? "",
    currency,
  } as Product;
};

/**
 * Helper to fetch an active price for a product in the specified currency
 */
const fetchPriceForProduct = async (productId: string, currency: Currency) => {
  const pricesCol = collection(db, "products", productId, "prices");
  const q = query(
    pricesCol,
    where("active", "==", true),
    where("currency", "==", currency)
  );
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
