import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SelectOrganization() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Select an Organization</h2>
      <div className="space-y-4">
        <Link href="/candle?type=church">
          <Button size="lg" className="w-full">
            Church
          </Button>
        </Link>
        <Link href="/candle?type=ngo">
          <Button size="lg" className="w-full">
            NGO
          </Button>
        </Link>
      </div>
    </div>
  )
}

