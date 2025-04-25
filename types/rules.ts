export interface RuleCategory {
  categoryId: string
  categoryName: string
  categoryDescription: string
  applicableFields: string[]
}

export interface DecisionTable {
  decisionTableId: string
  tableName: string
  tableDescription: string
  categoryId: string
  rows: DecisionTableRow[]
}

export interface DecisionTableRow {
  rowId: string
  conditions: Condition[]
  actions: Action[]
}

export interface Condition {
  field: string
  operator: OperatorType
  value: string | number | boolean
}

export type OperatorType =
  | "="
  | "!="
  | ">"
  | "<"
  | ">="
  | "<="
  | "contains"
  | "startsWith"
  | "endsWith"
  | "in"
  | "notIn"

export interface Action {
  actionType: ActionType
  parameters?: {
    vendorId?: string
    [key: string]: any
  }
}

export type ActionType = "accept" | "reject" | "route"
