"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Vendor } from "@/types/vendor"

interface RoutingRule {
  id: string
  condition: string
  vendorId: string
}

interface RoutingRulesProps {
  vendors: Vendor[]
}

export function RoutingRules({ vendors }: RoutingRulesProps) {
  const [rules, setRules] = useState<RoutingRule[]>([])
  const [newRule, setNewRule] = useState<Omit<RoutingRule, "id">>({
    condition: "",
    vendorId: "",
  })

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault()
    setRules([...rules, { ...newRule, id: `R${Date.now()}` }])
    setNewRule({ condition: "", vendorId: "" })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddRule} className="space-y-4">
        <div>
          <Label htmlFor="condition">Condition</Label>
          <Input
            id="condition"
            value={newRule.condition}
            onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="vendorId">Vendor</Label>
          <Select value={newRule.vendorId} onValueChange={(value) => setNewRule({ ...newRule, vendorId: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select vendor" />
            </SelectTrigger>
            <SelectContent>
              {vendors.map((vendor) => (
                <SelectItem key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Add Rule</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Condition</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell>{rule.condition}</TableCell>
              <TableCell>{vendors.find((v) => v.id === rule.vendorId)?.name}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setRules(rules.filter((r) => r.id !== rule.id))
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
