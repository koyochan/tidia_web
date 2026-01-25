import type { Metadata } from "next";
import { 
  Playfair_Display, 
  JetBrains_Mono, 
  Cormorant_Garamond, 
  Noto_Sans_JP,
  Shippori_Mincho_B1,
  BIZ_UDGothic,
  Zen_Old_Mincho
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const shippori = Shippori_Mincho_B1({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-shippori" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const bizUdGothic = BIZ_UDGothic({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-biz-ud" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "700"], style: ["italic", "normal"], variable: "--font-cormorant" });
const zenOldMincho = Zen_Old_Mincho({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-zen-old" });
const noto = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto" });

export const metadata: Metadata = {
  title: "Codegrid - Luxury UI Kit",
  description: "High-end design resources for developers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${playfair.variable} ${shippori.variable} ${jetbrains.variable} ${bizUdGothic.variable} ${cormorant.variable} ${zenOldMincho.variable} ${noto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}