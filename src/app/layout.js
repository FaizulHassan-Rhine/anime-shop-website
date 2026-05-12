import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "AuraCards — Premium Anime Trading Cards",
  description:
    "Shop official Naruto, One Piece, and premium anime trading cards. SSR, MR, Kayou, waves, and collector-grade packaging.",
};

export default function RootLayout({ children }) {
  const whatsappUrl = "https://wa.me/1234567890";

  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable} dark`}>
      <body className="min-h-screen">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#20ba57] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="h-7 w-7 fill-current"
              aria-hidden="true"
            >
              <path d="M16.01 3.2C8.92 3.2 3.18 8.94 3.18 16.03c0 2.25.59 4.45 1.7 6.39l-1.81 6.6 6.76-1.77a12.8 12.8 0 0 0 6.17 1.57h.01c7.08 0 12.82-5.74 12.82-12.83S23.1 3.2 16.01 3.2Zm0 23.48h-.01a10.7 10.7 0 0 1-5.45-1.5l-.39-.23-4.01 1.05 1.08-3.91-.25-.4a10.67 10.67 0 0 1-1.63-5.66c0-5.9 4.8-10.7 10.7-10.7 2.85 0 5.52 1.11 7.54 3.13a10.59 10.59 0 0 1 3.14 7.56c0 5.9-4.8 10.7-10.72 10.7Zm5.87-8.02c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.58-1.58-.95-.85-1.59-1.89-1.78-2.2-.19-.32-.02-.49.14-.65.15-.15.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.35-.26-.62-.53-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.69 0 1.58 1.15 3.11 1.31 3.32.16.21 2.25 3.43 5.46 4.81.76.33 1.36.52 1.82.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
            </svg>
          </a>
        </CartProvider>
      </body>
    </html>
  );
}
