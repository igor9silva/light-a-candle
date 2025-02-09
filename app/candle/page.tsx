"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function CandlePage() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const [isLit, setIsLit] = useState(false)

  const lightCandle = () => {
    setIsLit(true)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Light a Candle for {type === "church" ? "Church" : "NGO"}</h2>
      <div className={`w-32 h-64 bg-yellow-100 relative ${isLit ? "animate-flicker" : ""}`}>
        <div
          className={`absolute bottom-0 left-0 right-0 h-1/2 bg-orange-400 transition-all duration-300 ${isLit ? "opacity-100" : "opacity-0"}`}
        ></div>
      </div>
      <Button onClick={lightCandle} className="mt-8" disabled={isLit}>
        {isLit ? "Candle Lit" : "Light a Candle"}
      </Button>
    </div>
  )
}

