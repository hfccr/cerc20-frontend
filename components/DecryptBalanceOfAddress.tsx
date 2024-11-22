"use client";
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import DecryptBalanceOfAddressButton from "./DecryptBalanceOfAddressButton";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CodeViewer from "./CodeViewer";
import { auditorRoleViewBalanceCode } from "@/util/codeBlocks";

export default function DecryptBalanceOfAddress() {
  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Stack direction="row" alignItems="center">
            <Typography variant="h5">Audit Address</Typography>
            <CodeViewer
              title="Decrypt Confidential Balance"
              codeBlock={auditorRoleViewBalanceCode}
              description="View the confidential balance of an address as an auditor"
            />
          </Stack>
        }
        avatar={<VerifiedUserIcon fontSize="large" />}
        disableTypography
      />
      <CardContent>
        <DecryptBalanceOfAddressButton />
      </CardContent>
    </Card>
  );
}
