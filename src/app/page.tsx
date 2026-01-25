import Hero from "@/components/Hero";
import Product from "@/components/Product";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* ヒーローセクション (黒背景・GSAPアニメーション) */}
      <Hero />
      
      {/* プロダクトセクション (アイボリー背景・ラグジュアリーデザイン) */}
      <Product />
    </main>
  );
}