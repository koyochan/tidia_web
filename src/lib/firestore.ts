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


/**
 * Fetch all active products with their prices
 */
export const fetchProducts = async (): Promise<Product[]> => {
  const productsCol = collection(db, "products");
  const q = query(productsCol, orderBy("index", "asc"));
  const productSnapshot = await getDocs(q);

  const products = await Promise.all(productSnapshot.docs.map(async (productDoc) => {
    const data = productDoc.data() as ProductDocument;
    const price = await fetchPriceForProduct(productDoc.id);

    return {
      ...data,
      id: productDoc.id,
      price: price?.amount ?? data.price ?? 0,
      priceId: price?.id ?? data.priceId ?? "",
    } as Product;
  }));

  return products;
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (productId: string): Promise<Product | null> => {
  const productRef = doc(db, "products", productId);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) return null;

  const data = productSnap.data() as ProductDocument;
  const price = await fetchPriceForProduct(productId);

  return {
    ...data,
    id: productId,
    price: price?.amount ?? data.price ?? 0,
    priceId: price?.id ?? data.priceId ?? "",
  } as Product;
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
