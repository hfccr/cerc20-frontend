"use client";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import DecryptBalanceOfAddressButton from "./DecryptBalanceOfAddressButton";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export default function DecryptBalanceOfAddress() {
  return (
    <Card variant="outlined">
      <CardHeader
        title={<Typography variant="h5">Audit Address</Typography>}
        avatar={<VerifiedUserIcon fontSize="large" />}
        disableTypography
      />
      <CardContent>
        <DecryptBalanceOfAddressButton />
      </CardContent>
    </Card>
  );
}
