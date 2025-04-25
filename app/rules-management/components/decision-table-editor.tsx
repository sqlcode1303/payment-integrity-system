"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { DecisionTable, RuleCategory, DecisionTableRow, Condition, Action } from "@/types/rules"
import { allClaimFields } from "@/types/claims-schema"
import type { Vendor } from "@/types/vendor"

interface DecisionTableEditorProps {
  table: DecisionTable
  category: RuleCategory | null
  onUpdateTable: (table: DecisionTable) => void
}

export function DecisionTableEditor({ table, category, onUpdateTable }: DecisionTableEditorProps) {
  const [vendors, setVendors] = useState<Vendor[]>([])

  // In a real app, this would fetch from your API
  useEffect(() => {
    // Mock vendors for demonstration
    setVendors([
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
    ])
  }, [])

  const handleAddRow = () => {
    const newRow: DecisionTableRow = {
      rowId: `ROW${Date.now()}`,
      conditions: [],
      actions: [],
    }
    onUpdateTable({
      ...table,
      rows: [...table.rows, newRow],
    })
  }

  const handleAddCondition = (rowId: string) => {
    const updatedRows = table.rows.map((row) => {
      if (row.rowId === rowId) {
        return {
          ...row,
          conditions: [
            ...row.conditions,
            {
              field: "",
              operator: "=",
              value: "",
            },
          ],
        }
      }
      return row
    })
    onUpdateTable({ ...table, rows: updatedRows })
  }

  const handleUpdateCondition = (rowId: string, conditionIndex: number, updates: Partial<Condition>) => {
    const updatedRows = table.rows.map((row) => {
      if (row.rowId === rowId) {
        const updatedConditions = [...row.conditions]
        updatedConditions[conditionIndex] = { ...updatedConditions[conditionIndex], ...updates }
        return { ...row, conditions: updatedConditions }
      }
      return row
    })
    onUpdateTable({ ...table, rows: updatedRows })
  }

  const handleAddAction = (rowId: string) => {
    const updatedRows = table.rows.map((row) => {
      if (row.rowId === rowId) {
        return {
          ...row,
          actions: [
            ...row.actions,
            {
              actionType: "accept",
            },
          ],
        }
      }
      return row
    })
    onUpdateTable({ ...table, rows: updatedRows })
  }

  const handleUpdateAction = (rowId: string, actionIndex: number, updates: Partial<Action>) => {
    const updatedRows = table.rows.map((row) => {
      if (row.rowId === rowId) {
        const updatedActions = [...row.actions]
        updatedActions[actionIndex] = { ...updatedActions[actionIndex], ...updates }
        return { ...row, actions: updatedActions }
      }
      return row
    })
    onUpdateTable({ ...table, rows: updatedRows })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Decision Table: {table.tableName}</h2>
        <p className="text-sm text-muted-foreground mt-1">{table.tableDescription}</p>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleAddRow} className="bg-gray-900 text-white hover:bg-gray-800">
          <Plus className="mr-2 h-4 w-4" />
          Add Row
        </Button>
      </div>

      {table.rows.map((row) => (
        <div key={row.rowId} className="space-y-4 rounded-lg border p-4">
          <div className="space-y-4">
            <h3 className="font-medium">Conditions</h3>
            {row.conditions.map((condition, index) => (
              <div key={index} className="flex items-center gap-2">
                <Select
                  value={condition.field}
                  onValueChange={(value) => handleUpdateCondition(row.rowId, index, { field: value })}
                >
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    {allClaimFields.map((field) => (
                      <SelectItem key={field} value={field}>
                        {field}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={condition.operator}
                  onValueChange={(value) => handleUpdateCondition(row.rowId, index, { operator: value as any })}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="=">=</SelectItem>
                    <SelectItem value="!=">!=</SelectItem>
                    <SelectItem value=">">{">"}</SelectItem>
                    <SelectItem value="<">{"<"}</SelectItem>
                    <SelectItem value=">=">{"≥"}</SelectItem>
                    <SelectItem value="<=">{"≤"}</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="startsWith">Starts with</SelectItem>
                    <SelectItem value="endsWith">Ends with</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  value={condition.value.toString()}
                  onChange={(e) => handleUpdateCondition(row.rowId, index, { value: e.target.value })}
                  className="w-[200px]"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const updatedRows = table.rows.map((r) => {
                      if (r.rowId === row.rowId) {
                        return {
                          ...r,
                          conditions: r.conditions.filter((_, i) => i !== index),
                        }
                      }
                      return r
                    })
                    onUpdateTable({ ...table, rows: updatedRows })
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => handleAddCondition(row.rowId)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Condition
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Actions</h3>
            {row.actions.map((action, index) => (
              <div key={index} className="flex items-center gap-2">
                <Select
                  value={action.actionType}
                  onValueChange={(value) => handleUpdateAction(row.rowId, index, { actionType: value as any })}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accept">Accept</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                    <SelectItem value="route">Route to Vendor</SelectItem>
                  </SelectContent>
                </Select>

                {action.actionType === "route" && (
                  <Select
                    value={action.parameters?.vendorId}
                    onValueChange={(value) =>
                      handleUpdateAction(row.rowId, index, {
                        parameters: { ...action.parameters, vendorId: value },
                      })
                    }
                  >
                    <SelectTrigger className="w-[200px]">
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
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const updatedRows = table.rows.map((r) => {
                      if (r.rowId === row.rowId) {
                        return {
                          ...r,
                          actions: r.actions.filter((_, i) => i !== index),
                        }
                      }
                      return r
                    })
                    onUpdateTable({ ...table, rows: updatedRows })
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => handleAddAction(row.rowId)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Action
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
