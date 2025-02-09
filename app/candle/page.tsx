"use client"

import { Button } from "@/components/ui/button"
import { MiniKit, PayCommandInput, Tokens, tokenToDecimals } from "@worldcoin/minikit-js"
import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { toast } from "sonner"

function CandlePageContent() {
  //
  const searchParams = useSearchParams()
  const type = searchParams.get("type")
  const [isLit, setIsLit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const lightCandle = async () => {
    //
    try {
      setIsLoading(true)

      // Example payload - adjust according to your needs
      const payload: PayCommandInput = {
				reference: `candle-${type}`,
				to: "0xB92B00d21f9Fa2c4C41FeD88B06ad305dcAC28B2",
				description: `Candle for ${type}`,
				tokens: [{
					symbol: Tokens.WLD,
					token_amount: tokenToDecimals(1, Tokens.WLD).toString(),
				}],
			};

      const { finalPayload } = await MiniKit.commandsAsync.pay(payload)

      // Validate the payment with your backend
      const response = await fetch("/api/validate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPayload),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error("Payment validation failed")
      }

      setIsLit(true)
      toast.success("Candle lit successfully!")
    } catch (error) {
      toast.error("Failed to light candle. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!MiniKit.isInstalled()) {
    return <div className="text-center text-sm text-gray-500">Only available through the World App.</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Light a Candle for {type === "church" ? "Church" : "NGO"}</h2>
      <div className={`w-32 h-64 bg-yellow-100 relative ${isLit ? "animate-flicker" : ""}`}>
        <div
          className={`absolute bottom-0 left-0 right-0 h-1/2 bg-orange-400 transition-all duration-300 ${isLit ? "opacity-100" : "opacity-0"}`}
        ></div>
      </div>
      <Button onClick={lightCandle} className="mt-8" disabled={isLit || isLoading}>
        {isLoading ? "Processing..." : isLit ? "Candle Lit" : "Light a Candle"}
      </Button>
    </div>
  )
}

export default function CandlePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CandlePageContent />
    </Suspense>
  )
}

