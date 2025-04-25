"use client"

import { useState } from "react"
import { ClaimsList } from "./components/claims-list"
import { ClaimDetails } from "./components/claim-details"
import type { Claim } from "@/types/claims"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data for demonstration
const mockClaims: Claim[] = [
  {
    claimId: "CLM001",
    sourceSystem: "System A",
    status: "Routing",
    timestamp: "2024-03-20 10:30",
    payerId: "PAY123",
    submissionDate: "2024-03-20",
    claimType: "Medical",
    lineOfBusiness: "Commercial",
    patientInfo: {
      name: "John Doe",
      dateOfBirth: "1980-01-01",
      gender: "Male",
      memberId: "MEM123",
      groupId: "GRP456",
      policyId: "POL789",
    },
    providerInfo: {
      billingProvider: "BIL123",
      renderingProvider: "REN456",
      facilityProvider: "FAC789",
      networkId: "NET123",
    },
    serviceInfo: {
      serviceDateFrom: "2024-03-15",
      serviceDateTo: "2024-03-15",
    },
    clinicalInfo: {
      primaryDiagnosis: "ICD-10: J20.9",
      secondaryDiagnosis: "ICD-10: R05",
      admissionType: "Elective",
      lengthOfStay: "3 days",
    },
    lines: Array.from({ length: 11 }, (_, i) => ({
      lineId: `LINE${String(i + 1).padStart(3, "0")}`,
      serviceDate: "2024-03-15",
      procedure: "99213",
      placeOfService: "11",
      modifiers: "25, 59",
      diagnosis: "J20.9, R05",
      quantity: 1,
      billedAmount: `$${150 + i}.00`,
      status: "Processing",
    })),
  },
  // Add more mock claims as needed
]

export default function ClaimsProcessing() {
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null)

  const selectedClaim = mockClaims.find((claim) => claim.claimId === selectedClaimId)

  return (
    <div className="space-y-6">
      <Button asChild variant="outline">
        <Link href="/">Back to Home</Link>
      </Button>
      <ClaimsList claims={mockClaims} onClaimSelect={setSelectedClaimId} />
      {selectedClaim && <ClaimDetails claim={selectedClaim} />}
    </div>
  )
}
