export interface Claim {
  claimId: string
  sourceSystem: string
  status: "Routing" | "Vendor Processing" | "Completed"
  timestamp: string
  payerId: string
  submissionDate: string
  claimType: string
  lineOfBusiness: string
  patientInfo: PatientInfo
  providerInfo: ProviderInfo
  serviceInfo: ServiceInfo
  clinicalInfo: ClinicalInfo
  lines: ClaimLine[]
}

export interface PatientInfo {
  name: string
  dateOfBirth: string
  gender: string
  memberId: string
  groupId: string
  policyId: string
}

export interface ProviderInfo {
  billingProvider: string
  renderingProvider: string
  facilityProvider: string
  networkId: string
}

export interface ServiceInfo {
  serviceDateFrom: string
  serviceDateTo: string
}

export interface ClinicalInfo {
  primaryDiagnosis: string
  secondaryDiagnosis: string
  admissionType: string
  lengthOfStay: string
}

export interface ClaimLine {
  lineId: string
  serviceDate: string
  procedure: string
  placeOfService: string
  modifiers: string
  diagnosis: string
  quantity: number
  billedAmount: string
  status: string
}
