import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCheck, GitMerge, Settings, BarChart } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Payment Integrity System</h1>
      <p className="text-xl text-muted-foreground">
        A comprehensive solution for healthcare claims processing and management.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Claims Processed"
          description="Total claims processed today"
          icon={<FileCheck className="h-6 w-6" />}
          value="1,234"
        />
        <DashboardCard
          title="Active Rules"
          description="Current active processing rules"
          icon={<GitMerge className="h-6 w-6" />}
          value="56"
        />
        <DashboardCard
          title="Vendors"
          description="Connected vendor systems"
          icon={<Settings className="h-6 w-6" />}
          value="8"
        />
        <DashboardCard
          title="Savings"
          description="Estimated savings this month"
          icon={<BarChart className="h-6 w-6" />}
          value="$123,456"
        />
      </div>
    </div>
  )
}

interface DashboardCardProps {
  title: string
  description: string
  icon: React.ReactNode
  value: string
}

function DashboardCard({ title, description, icon, value }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
