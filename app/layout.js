import { Inter, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import Header from "./_Components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Innovation Crochet",
  description:
    "Beautifully handcrafted crochet pieces made with care, creativity, and a whole lot of yarn.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} min-h-screen bg-brand-cream text-brand-dark`}
      >
        <main>
          <Header />
          {children}
          <Toaster position="top-right" />
        </main>
      </body>
    </html>
  );
}
