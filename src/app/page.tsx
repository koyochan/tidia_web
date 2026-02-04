'use client'

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Product from "@/components/Product";
import BrandStory from "@/components/BrandStory";
import ProductDetails from "@/components/ProductDetails";
import FocusSection from "@/components/FocusSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchProducts, getCurrency } from "@/lib/firestore";
import { useLanguage } from "@/context/LanguageContext";
import type { Product as ProductType } from "@/types/product";

export default function Home() {
  const { language } = useLanguage();
  const currency = getCurrency(language);
  const [featuredProduct, setFeaturedProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    fetchProducts(currency).then(products => {
      if (products.length > 0) {
        setFeaturedProduct(products[0]);
      }
    });
  }, [currency]);

  return (
    // bg-black -> bg-ivory に変更
    <div className="bg-ivory min-h-screen flex flex-col font-noto">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <Product />
        <BrandStory />
        <ProductDetails product={featuredProduct || undefined} />
        <FocusSection />
      </main>

      <Footer />
    </div>
  );
}