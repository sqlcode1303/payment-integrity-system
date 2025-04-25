export interface Vendor {
  id: string
  name: string
  type: string
  interfaceMode: "real-time" | "batch"
  protocol: string
  securityDetails: string
  ipAddress: string
  additionalDetails?: string
}
