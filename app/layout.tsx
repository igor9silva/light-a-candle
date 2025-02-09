import MiniKitProvider from "@/components/MiniKitProvider";
import { Inter } from "next/font/google";
import type React from "react"; // Import React
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Light a Candle App",
  description: "An app to light virtual candles for organizations",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //
  const appId = process.env.WLD_CLIENT_ID as string;
	if (!appId) throw new Error('WLD_CLIENT_ID is not set');

  return (
    <html lang="en">
      <body className={inter.className}>
        <MiniKitProvider appId={appId}>
          <main className="container mx-auto px-4 py-8">{children}</main>
        </MiniKitProvider>
      </body>
    </html>
  )
}

