import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Overpayments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
        <h1 className="text-2xl font-bold">Overpayments</h1>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <p className="text-muted-foreground">Overpayments management coming soon...</p>
      </div>
    </div>
  )
}
