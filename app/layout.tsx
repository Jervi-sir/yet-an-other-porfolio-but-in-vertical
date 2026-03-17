import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bekhira Gacem | Platform Developer",
  description: "Portfolio of Bekhira Gacem - Full-stack developer specializing in Laravel, React, Go, and system design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${inter.className} antialiased selection:bg-amber-500/30 h-full overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
