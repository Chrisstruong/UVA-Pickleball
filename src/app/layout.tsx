import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "UVA Pickleball Club",
  description: "Official website for the UVA Pickleball Club",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
