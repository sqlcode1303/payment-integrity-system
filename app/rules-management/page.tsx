"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RuleCategories } from "./components/rule-categories"
import { DecisionTableEditor } from "./components/decision-table-editor"
import { DecisionTableList } from "./components/decision-table-list"
import type { RuleCategory, DecisionTable } from "@/types/rules"
import type { Vendor } from "@/types/vendor"
import Link from "next/link"

// Mock data for demonstration
const mockCategories: RuleCategory[] = [
  {
    categoryId: "CAT001",
    categoryName: "Place of Service Rules",
    categoryDescription: "Rules for validating place of service codes",
    applicableFields: ["claim.line.placeOfService", "claim.line.procedureCode"],
  },
  {
    categoryId: "CAT002",
    categoryName: "Pricing Rules",
    categoryDescription: "Rules for pricing validation",
    applicableFields: ["claim.line.billedAmount", "claim.line.quantity"],
  },
]

const mockDecisionTables: DecisionTable[] = [
  {
    decisionTableId: "DT001",
    tableName: "POS Validation",
    tableDescription: "Validates place of service codes",
    categoryId: "CAT001",
    rows: [
      {
        rowId: "ROW001",
        conditions: [
          {
            field: "claim.line.procedureCode",
            operator: "=",
            value: "99213",
          },
          {
            field: "claim.line.placeOfService",
            operator: "=",
            value: "11",
          },
        ],
        actions: [
          {
            actionType: "accept",
          },
        ],
      },
    ],
  },
  {
    decisionTableId: "DT002",
    tableName: "Pricing Validation",
    tableDescription: "Validates claim pricing",
    categoryId: "CAT002",
    rows: [
      {
        rowId: "ROW001",
        conditions: [
          {
            field: "claim.line.billedAmount",
            operator: ">",
            value: "1000",
          },
        ],
        actions: [
          {
            actionType: "route",
            parameters: {
              vendorId: "V1",
            },
          },
        ],
      },
    ],
  },
]

const mockVendors: Vendor[] = [
  {
    id: "V1",
    name: "Vendor A",
    type: "Clinical",
    interfaceMode: "real-time",
    protocol: "HTTPS",
    securityDetails: "",
    ipAddress: "",
    additionalDetails: "",
  },
  {
    id: "V2",
    name: "Vendor B",
    type: "Payment",
    interfaceMode: "batch",
    protocol: "SFTP",
    securityDetails: "",
    ipAddress: "",
    additionalDetails: "",
  },
]

export default function RulesManagement() {
  const [categories, setCategories] = useState<RuleCategory[]>(mockCategories)
  const [decisionTables, setDecisionTables] = useState<DecisionTable[]>(mockDecisionTables)
  const [selectedCategory, setSelectedCategory] = useState<RuleCategory | null>(null)
  const [selectedTable, setSelectedTable] = useState<DecisionTable | null>(null)
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors)

  const handleAddCategory = (newCategory: RuleCategory) => {
    setCategories([...categories, newCategory])
  }

  const handleUpdateTable = (updatedTable: DecisionTable) => {
    setDecisionTables(
      decisionTables.map((table) => (table.decisionTableId === updatedTable.decisionTableId ? updatedTable : table)),
    )
    setSelectedTable(updatedTable)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
        <h1 className="text-2xl font-bold">Rules Management</h1>
      </div>

      <Tabs defaultValue="decision-tables" className="w-full">
        <TabsList className="bg-muted/50 p-0 h-10">
          <TabsTrigger value="categories" className="rounded-none data-[state=active]:bg-background">
            Rule Categories
          </TabsTrigger>
          <TabsTrigger value="decision-tables" className="rounded-none data-[state=active]:bg-background">
            Decision Tables
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-6">
          <RuleCategories
            categories={categories}
            onCategorySelect={setSelectedCategory}
            onAddCategory={handleAddCategory}
          />
        </TabsContent>

        <TabsContent value="decision-tables" className="mt-6">
          {selectedTable ? (
            <DecisionTableEditor
              table={selectedTable}
              category={categories.find((c) => c.categoryId === selectedTable.categoryId) || null}
              onUpdateTable={handleUpdateTable}
            />
          ) : (
            <DecisionTableList
              tables={decisionTables}
              categories={categories}
              vendors={vendors}
              onSelectTable={setSelectedTable}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
