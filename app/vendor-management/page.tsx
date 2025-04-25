"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VendorList } from "./components/vendor-list"
import { VendorOnboarding } from "./components/vendor-onboarding"
import { RoutingRules } from "./components/routing-rules"
import type { Vendor } from "@/types/vendor"

export default function VendorManagement() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)

  const handleAddVendor = (newVendor: Vendor) => {
    setVendors([...vendors, newVendor])
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Vendor Management</h1>

      <Tabs defaultValue="vendors" className="w-full">
        <TabsList>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="onboarding">Vendor Onboarding</TabsTrigger>
          <TabsTrigger value="routing">Routing Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="vendors">
          <Card>
            <CardHeader>
              <CardTitle>Vendor List</CardTitle>
            </CardHeader>
            <CardContent>
              <VendorList vendors={vendors} onSelectVendor={setSelectedVendor} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onboarding">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Onboarding</CardTitle>
            </CardHeader>
            <CardContent>
              <VendorOnboarding onAddVendor={handleAddVendor} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routing">
          <Card>
            <CardHeader>
              <CardTitle>Routing Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <RoutingRules vendors={vendors} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
