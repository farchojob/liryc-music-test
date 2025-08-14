/**
 * Root layout for the App Router. We mount React Query provider here
 * to make it available across all routes.
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"], // Regular (400) and Bold (700)
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lyric Music - Discover Amazing Bands",
  description: "Explore and discover amazing musical bands with our modern, responsive music discovery platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
