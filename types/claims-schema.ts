export const claimSchemaFields = {
  claim: {
    claimId: "claim.claimId",
    payerId: "claim.payerId",
    submissionDate: "claim.submissionDate",
    claimType: "claim.claimType",
    lineOfBusiness: "claim.lineOfBusiness",
    sourceSystem: "claim.sourceSystem",
    patientInfo: {
      name: "claim.patientInfo.name",
      dateOfBirth: "claim.patientInfo.dateOfBirth",
      gender: "claim.patientInfo.gender",
      memberId: "claim.patientInfo.memberId",
      groupId: "claim.patientInfo.groupId",
      policyId: "claim.patientInfo.policyId",
    },
    providerInfo: {
      billingProvider: "claim.providerInfo.billingProvider",
      renderingProvider: "claim.providerInfo.renderingProvider",
      facilityProvider: "claim.providerInfo.facilityProvider",
      networkId: "claim.providerInfo.networkId",
    },
    serviceInfo: {
      serviceDateFrom: "claim.serviceInfo.serviceDateFrom",
      serviceDateTo: "claim.serviceInfo.serviceDateTo",
    },
    clinicalInfo: {
      primaryDiagnosis: "claim.clinicalInfo.primaryDiagnosis",
      secondaryDiagnosis: "claim.clinicalInfo.secondaryDiagnosis",
      admissionType: "claim.clinicalInfo.admissionType",
      lengthOfStay: "claim.clinicalInfo.lengthOfStay",
    },
    line: {
      lineId: "claim.line.lineId",
      serviceDate: "claim.line.serviceDate",
      procedure: "claim.line.procedure",
      placeOfService: "claim.line.placeOfService",
      modifiers: "claim.line.modifiers",
      diagnosis: "claim.line.diagnosis",
      quantity: "claim.line.quantity",
      billedAmount: "claim.line.billedAmount",
      status: "claim.line.status",
    },
  },
}

// Helper function to flatten the schema into an array of field paths
export function getFlattenedSchemaFields(schema: any, prefix = ""): string[] {
  return Object.entries(schema).reduce((acc: string[], [key, value]) => {
    if (typeof value === "string") {
      acc.push(value)
    } else if (typeof value === "object") {
      acc.push(...getFlattenedSchemaFields(value, `${prefix}${key}.`))
    }
    return acc
  }, [])
}

export const allClaimFields = getFlattenedSchemaFields(claimSchemaFields)
