import Hero from "@/components/Hero";
import Product from "@/components/Product";
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
      </main>

      <Footer />
    </div>
  );
}