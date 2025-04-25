"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import type { Vendor } from "@/types/vendor"

interface VendorListProps {
  vendors: Vendor[]
  onSelectVendor: (vendor: Vendor) => void
}

export function VendorList({ vendors, onSelectVendor }: VendorListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Interface Mode</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vendors.map((vendor) => (
          <TableRow key={vendor.id}>
            <TableCell>{vendor.name}</TableCell>
            <TableCell>{vendor.type}</TableCell>
            <TableCell>{vendor.interfaceMode}</TableCell>
            <TableCell>
              <Button variant="ghost" onClick={() => onSelectVendor(vendor)}>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
