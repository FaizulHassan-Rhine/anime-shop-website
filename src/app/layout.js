import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "TCG Shop BD — Premium Anime Trading Cards",
  description:
    "Shop official Naruto, One Piece, and premium anime trading cards. SSR, MR, Kayou, waves, and collector-grade packaging.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} dark`}>
      <body className="min-h-screen">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-[4.5rem] sm:pt-20">{children}</main>
            <Footer />
          </div>
          <FloatingContactButtons />
        </CartProvider>
      </body>
    </html>
  );
}
