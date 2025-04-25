"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Vendor {
  id: string
  name: string
  type: string
  priority: number
}

export default function VendorManagement() {
  const [vendors, setVendors] = useState<Vendor[]>([
    { id: "V1", name: "Vendor A", type: "Radiology", priority: 1 },
    { id: "V2", name: "Vendor B", type: "Coding", priority: 2 },
  ])

  const [newVendor, setNewVendor] = useState({
    name: "",
    type: "",
    priority: 0,
  })

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault()
    const vendor: Vendor = {
      id: `V${Date.now()}`,
      ...newVendor,
    }
    setVendors([...vendors, vendor])
    setNewVendor({ name: "", type: "", priority: 0 })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Vendor Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Vendor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddVendor} className="space-y-4">
            <div>
              <Label htmlFor="vendorName">Vendor Name</Label>
              <Input
                id="vendorName"
                value={newVendor.name}
                onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="vendorType">Vendor Type</Label>
              <Input
                id="vendorType"
                value={newVendor.type}
                onChange={(e) => setNewVendor({ ...newVendor, type: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="vendorPriority">Priority</Label>
              <Input
                id="vendorPriority"
                type="number"
                value={newVendor.priority}
                onChange={(e) => setNewVendor({ ...newVendor, priority: Number.parseInt(e.target.value) })}
                required
              />
            </div>
            <Button type="submit">Add Vendor</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.type}</TableCell>
                  <TableCell>{vendor.priority}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
