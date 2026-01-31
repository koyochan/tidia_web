'use client'

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Product from "@/components/Product";
import BrandStory from "@/components/BrandStory";
import ProductDetails from "@/components/ProductDetails";
import FocusSection from "@/components/FocusSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchProducts } from "@/lib/firestore";
import type { Product as ProductType } from "@/types/product";

export default function Home() {
  const [featuredProduct, setFeaturedProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    fetchProducts().then(products => {
      if (products.length > 0) {
        setFeaturedProduct(products[0]);
      }
    });
  }, []);

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