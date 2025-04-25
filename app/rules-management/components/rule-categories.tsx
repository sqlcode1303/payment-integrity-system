"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { RuleCategory } from "@/types/rules"
import { AddCategoryForm } from "./add-category-form"

interface RuleCategoriesProps {
  categories: RuleCategory[]
  onCategorySelect: (category: RuleCategory) => void
  onAddCategory: (category: RuleCategory) => void
}

export function RuleCategories({ categories, onCategorySelect, onAddCategory }: RuleCategoriesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <Button onClick={() => setIsDialogOpen(true)} className="bg-gray-900 text-white hover:bg-gray-800">
        <Plus className="mr-2 h-4 w-4" />
        Add Category
      </Button>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-10 px-4 text-left align-middle font-medium">Category Name</th>
              <th className="h-10 px-4 text-left align-middle font-medium">Description</th>
              <th className="h-10 px-4 text-left align-middle font-medium">Applicable Fields</th>
              <th className="h-10 px-4 text-left align-middle font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.categoryId} className="border-b">
                <td className="p-4">{category.categoryName}</td>
                <td className="p-4">{category.categoryDescription}</td>
                <td className="p-4">{category.applicableFields.join(", ")}</td>
                <td className="p-4">
                  <Button variant="ghost" onClick={() => onCategorySelect(category)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Rule Category</DialogTitle>
          </DialogHeader>
          <AddCategoryForm
            onSuccess={(newCategory) => {
              onAddCategory(newCategory)
              setIsDialogOpen(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
