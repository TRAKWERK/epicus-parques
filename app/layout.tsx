import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TRAKWERK PARQUES INDUSTRIALES",
  description: "Terrenos y lotes para tu negocio en Monterrey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  );
}
