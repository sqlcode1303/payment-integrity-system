"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Claim } from "@/types/claims"

interface ClaimsListProps {
  claims: Claim[]
  onClaimSelect: (claimId: string) => void
}

export function ClaimsList({ claims, onClaimSelect }: ClaimsListProps) {
  return (
    <Tabs defaultValue="recent-claims" className="w-full">
      <TabsList>
        <TabsTrigger value="recent-claims">Recent Claims</TabsTrigger>
        <TabsTrigger value="routing-rules">Routing Rules</TabsTrigger>
      </TabsList>
      <TabsContent value="recent-claims">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Source System</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow
                  key={claim.claimId}
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => onClaimSelect(claim.claimId)}
                >
                  <TableCell className="font-medium">{claim.claimId}</TableCell>
                  <TableCell>{claim.sourceSystem}</TableCell>
                  <TableCell>{claim.status}</TableCell>
                  <TableCell>{claim.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      <TabsContent value="routing-rules">
        <div className="text-center py-4">Routing Rules configuration will be implemented here</div>
      </TabsContent>
    </Tabs>
  )
}
