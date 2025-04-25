"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { DecisionTable, RuleCategory } from "@/types/rules"
import type { Vendor } from "@/types/vendor"

interface DecisionTableListProps {
  tables: DecisionTable[]
  categories: RuleCategory[]
  vendors: Vendor[]
  onSelectTable: (table: DecisionTable) => void
}

export function DecisionTableList({ tables, categories, vendors, onSelectTable }: DecisionTableListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [vendorFilter, setVendorFilter] = useState("")

  const filteredTables = tables.filter((table) => {
    const matchesSearch =
      table.tableName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      table.tableDescription.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "" || table.categoryId === categoryFilter
    const matchesVendor =
      vendorFilter === "" ||
      table.rows.some((row) =>
        row.actions.some((action) => action.actionType === "route" && action.parameters?.vendorId === vendorFilter),
      )
    return matchesSearch && matchesCategory && matchesVendor
  })

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Input
          placeholder="Search tables..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={vendorFilter} onValueChange={setVendorFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by vendor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vendors</SelectItem>
            {vendors.map((vendor) => (
              <SelectItem key={vendor.id} value={vendor.id}>
                {vendor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Table Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTables.map((table) => (
            <TableRow key={table.decisionTableId}>
              <TableCell>{table.tableName}</TableCell>
              <TableCell>{table.tableDescription}</TableCell>
              <TableCell>{categories.find((c) => c.categoryId === table.categoryId)?.categoryName}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => onSelectTable(table)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
