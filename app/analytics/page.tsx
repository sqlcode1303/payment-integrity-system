import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DollarSign, FileCheck, FileSearch, Users } from "lucide-react"

export default function Analytics() {
  // Mock data for demonstration
  const analytics = {
    claimsProcessed: 15234,
    claimsAudited: 4567,
    vendorAudits: 2345,
    savingsAmount: 1234567,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
        <h1 className="text-2xl font-bold">Analytics & Reporting</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Claims Processed</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.claimsProcessed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total claims processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Internal Audits</CardTitle>
            <FileSearch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.claimsAudited.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Claims audited by internal teams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendor Audits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.vendorAudits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Claims audited by vendors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(analytics.savingsAmount / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground">Amount saved through audits</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for future charts and detailed analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Detailed Analytics</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Detailed analytics coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
