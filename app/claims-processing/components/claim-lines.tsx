import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ClaimLine } from "@/types/claims"

interface ClaimLinesProps {
  lines: ClaimLine[]
}

export function ClaimLines({ lines }: ClaimLinesProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Line ID</TableHead>
            <TableHead>Service Date</TableHead>
            <TableHead>Procedure</TableHead>
            <TableHead>Place of Service</TableHead>
            <TableHead>Modifiers</TableHead>
            <TableHead>Diagnosis</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Billed Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lines.map((line) => (
            <TableRow key={line.lineId}>
              <TableCell className="font-medium">{line.lineId}</TableCell>
              <TableCell>{line.serviceDate}</TableCell>
              <TableCell>{line.procedure}</TableCell>
              <TableCell>{line.placeOfService}</TableCell>
              <TableCell>{line.modifiers}</TableCell>
              <TableCell>{line.diagnosis}</TableCell>
              <TableCell>{line.quantity}</TableCell>
              <TableCell>{line.billedAmount}</TableCell>
              <TableCell>{line.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
