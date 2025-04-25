"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import type { Claim } from "@/types/claims"
import { ClaimLines } from "./claim-lines"

interface ClaimDetailsProps {
  claim: Claim
}

export function ClaimDetails({ claim }: ClaimDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Claim Details</h1>
        <span className="text-muted-foreground">{claim.status}</span>
      </div>

      <Tabs defaultValue="claim-header">
        <TabsList>
          <TabsTrigger value="claim-header">Claim Header</TabsTrigger>
          <TabsTrigger value="claim-lines">Claim Lines</TabsTrigger>
        </TabsList>

        <TabsContent value="claim-header" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <InfoCard
              title="Claim Information"
              items={[
                { label: "Claim ID", value: claim.claimId },
                { label: "Payer ID", value: claim.payerId },
                { label: "Submission Date", value: claim.submissionDate },
                { label: "Claim Type", value: claim.claimType },
                { label: "Line of Business", value: claim.lineOfBusiness },
                { label: "Source System", value: claim.sourceSystem },
              ]}
            />

            <InfoCard
              title="Patient Information"
              items={[
                { label: "Name", value: claim.patientInfo.name },
                { label: "Date of Birth", value: claim.patientInfo.dateOfBirth },
                { label: "Gender", value: claim.patientInfo.gender },
                { label: "Member ID", value: claim.patientInfo.memberId },
                { label: "Group ID", value: claim.patientInfo.groupId },
                { label: "Policy ID", value: claim.patientInfo.policyId },
              ]}
            />

            <InfoCard
              title="Provider Information"
              items={[
                { label: "Billing Provider", value: claim.providerInfo.billingProvider },
                { label: "Rendering Provider", value: claim.providerInfo.renderingProvider },
                { label: "Facility Provider", value: claim.providerInfo.facilityProvider },
                { label: "Network ID", value: claim.providerInfo.networkId },
              ]}
            />

            <InfoCard
              title="Service Information"
              items={[
                { label: "Service Date From", value: claim.serviceInfo.serviceDateFrom },
                { label: "Service Date To", value: claim.serviceInfo.serviceDateTo },
              ]}
            />

            <InfoCard
              title="Clinical Information"
              items={[
                { label: "Primary Diagnosis", value: claim.clinicalInfo.primaryDiagnosis },
                { label: "Secondary Diagnosis", value: claim.clinicalInfo.secondaryDiagnosis },
                { label: "Admission Type", value: claim.clinicalInfo.admissionType },
                { label: "Length of Stay", value: claim.clinicalInfo.lengthOfStay },
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="claim-lines">
          <ClaimLines lines={claim.lines} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface InfoCardProps {
  title: string
  items: Array<{ label: string; value: string }>
}

function InfoCard({ title, items }: InfoCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <dl className="divide-y">
          {items.map((item) => (
            <div key={item.label} className="flex justify-between py-2">
              <dt className="text-sm text-muted-foreground">{item.label}</dt>
              <dd className="text-sm font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
