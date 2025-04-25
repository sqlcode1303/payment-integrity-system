"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Vendor } from "@/types/vendor"

interface VendorOnboardingProps {
  onAddVendor: (vendor: Vendor) => void
}

export function VendorOnboarding({ onAddVendor }: VendorOnboardingProps) {
  const [vendor, setVendor] = useState<Vendor>({
    id: "",
    name: "",
    type: "",
    interfaceMode: "real-time",
    protocol: "",
    securityDetails: "",
    ipAddress: "",
    additionalDetails: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddVendor({ ...vendor, id: `V${Date.now()}` })
    // Reset form
    setVendor({
      id: "",
      name: "",
      type: "",
      interfaceMode: "real-time",
      protocol: "",
      securityDetails: "",
      ipAddress: "",
      additionalDetails: "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Vendor Name</Label>
        <Input
          id="name"
          value={vendor.name}
          onChange={(e) => setVendor({ ...vendor, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Vendor Type</Label>
        <Input
          id="type"
          value={vendor.type}
          onChange={(e) => setVendor({ ...vendor, type: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="interfaceMode">Interface Mode</Label>
        <Select
          value={vendor.interfaceMode}
          onValueChange={(value) => setVendor({ ...vendor, interfaceMode: value as "real-time" | "batch" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select interface mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="real-time">Real-time</SelectItem>
            <SelectItem value="batch">Batch</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="protocol">Protocol</Label>
        <Input
          id="protocol"
          value={vendor.protocol}
          onChange={(e) => setVendor({ ...vendor, protocol: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="securityDetails">Security Details</Label>
        <Textarea
          id="securityDetails"
          value={vendor.securityDetails}
          onChange={(e) => setVendor({ ...vendor, securityDetails: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="ipAddress">IP Address</Label>
        <Input
          id="ipAddress"
          value={vendor.ipAddress}
          onChange={(e) => setVendor({ ...vendor, ipAddress: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="additionalDetails">Additional Details</Label>
        <Textarea
          id="additionalDetails"
          value={vendor.additionalDetails}
          onChange={(e) => setVendor({ ...vendor, additionalDetails: e.target.value })}
        />
      </div>
      <Button type="submit">Onboard Vendor</Button>
    </form>
  )
}
