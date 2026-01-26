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
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorParticles from "@/components/CursorParticles";
import { CartProvider } from "@/context/CartContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const shippori = Shippori_Mincho_B1({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-shippori" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const bizUdGothic = BIZ_UDGothic({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-biz-ud" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "700"], style: ["italic", "normal"], variable: "--font-cormorant" });
const zenOldMincho = Zen_Old_Mincho({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-zen-old" });
const noto = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto" });

export const metadata: Metadata = {
  title: "TiDia",
  description: "Analog, Re-implemented. High-end digital artifacts for the modern creative.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${playfair.variable} ${shippori.variable} ${jetbrains.variable} ${bizUdGothic.variable} ${cormorant.variable} ${zenOldMincho.variable} ${noto.variable} antialiased`}>
        <LanguageProvider>
          <NotificationProvider>
            <CartProvider>
              <CursorParticles />
              {children}
            </CartProvider>
          </NotificationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}