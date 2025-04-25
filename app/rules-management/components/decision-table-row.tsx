import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react"
import type { DecisionTableRow as DecisionTableRowType } from "@/types/rules"

interface DecisionTableRowProps {
  row: DecisionTableRowType
  applicableFields: string[]
}

export function DecisionTableRow({ row, applicableFields }: DecisionTableRowProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Conditions</h4>
            <div className="space-y-2">
              {row.conditions.map((condition, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Select defaultValue={condition.field}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {applicableFields.map((field) => (
                        <SelectItem key={field} value={field}>
                          {field}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select defaultValue={condition.operator}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select operator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="=">=</SelectItem>
                      <SelectItem value="!=">!=</SelectItem>
                      <SelectItem value=">">{">"}</SelectItem>
                      <SelectItem value="<">{"<"}</SelectItem>
                      <SelectItem value=">=">{">="}</SelectItem>
                      <SelectItem value="<=">{"<="}</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input type="text" value={condition.value.toString()} className="w-[200px]" />

                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Condition
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Actions</h4>
            <div className="space-y-2">
              {row.actions.map((action, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Select defaultValue={action.actionType}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accept">Accept</SelectItem>
                      <SelectItem value="reject">Reject</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                      <SelectItem value="sendToVendor">Send to Vendor</SelectItem>
                      <SelectItem value="modifyField">Modify Field</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Action
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
