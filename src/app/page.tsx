import Hero from "@/components/Hero";
import Product from "@/components/Product";
import BrandStory from "@/components/BrandStory";
import ProductDetails from "@/components/ProductDetails";
import FocusSection from "@/components/FocusSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    // bg-black -> bg-ivory に変更
    <div className="bg-ivory min-h-screen flex flex-col font-noto">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <Product />
        <BrandStory />
        <ProductDetails />
        <FocusSection />
      </main>

      <Footer />
    </div>
  );
}