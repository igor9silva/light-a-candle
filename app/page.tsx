import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Light a Candle</h1>
      <Link href="/select">
        <Button size="lg">Start Lighting a Candle</Button>
      </Link>
    </div>
  )
}

