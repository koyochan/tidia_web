import type { Metadata } from "next";
import { 
  Playfair_Display, 
  JetBrains_Mono, 
  Cormorant_Garamond, 
  Noto_Sans_JP 
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "700"], style: ["italic", "normal"], variable: "--font-cormorant" });
const noto = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto" });

export const metadata: Metadata = {
  title: "Codegrid - Luxury UI Kit",
  description: "High-end design resources for developers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${playfair.variable} ${jetbrains.variable} ${cormorant.variable} ${noto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}