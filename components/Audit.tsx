import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function Audit() {
  return (
    <Card variant="outlined">
      <CardHeader
        disableTypography
        title={<Typography variant="h4">Audit</Typography>}
      />
      <CardContent></CardContent>
    </Card>
  );
}
