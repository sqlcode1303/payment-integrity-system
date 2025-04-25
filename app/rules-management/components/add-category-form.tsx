"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import type { RuleCategory } from "@/types/rules"

// This should be fetched from the server in a real application
const schemaFields = [
  "claim.line.placeOfService",
  "claim.line.procedureCode",
  "claim.line.billedAmount",
  "claim.line.quantity",
  "claim.line.modifiers",
  "claim.line.diagnosis",
]

interface AddCategoryFormProps {
  onSuccess: (category: RuleCategory) => void
}

export function AddCategoryForm({ onSuccess }: AddCategoryFormProps) {
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
    applicableFields: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSuccess({
      categoryId: `CAT${Date.now()}`,
      ...formData,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="categoryName">Category Name</Label>
        <Input
          id="categoryName"
          value={formData.categoryName}
          onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="categoryDescription">Description</Label>
        <Input
          id="categoryDescription"
          value={formData.categoryDescription}
          onChange={(e) => setFormData({ ...formData, categoryDescription: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Applicable Fields</Label>
        <MultiSelect
          options={schemaFields.map((field) => ({ label: field, value: field }))}
          selected={formData.applicableFields}
          onChange={(selected) => setFormData({ ...formData, applicableFields: selected })}
        />
      </div>
      <Button type="submit">Add Category</Button>
    </form>
  )
}
