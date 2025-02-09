import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}

