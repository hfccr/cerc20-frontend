"use client";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Addreth } from "addreth";
import deployment from "@/util/deployment";
import { rivest } from "@/util/rivest";

export default function Wrapper() {
  const theme = useTheme();
  return (
    <Card variant="outlined">
      <CardHeader
        title={<Typography variant="h5">Wrapped cUSDC</Typography>}
        subheader={
          <Addreth
            address={deployment.wrapper}
            icon={false}
            theme={theme.palette.mode === "dark" ? "dark" : "light"}
            explorer={(address) => ({
              name: "Rivest Explorer",
              accountUrl: `${rivest.blockExplorers.default.url}/address/${address}`,
            })}
          />
        }
        avatar={<LockIcon fontSize="large" />}
        disableTypography
        action={
          <Typography variant="h6" sx={{ mt: 0.5, ml: 4, mr: 1 }}>
            $wcUSDC
          </Typography>
        }
      />
      <CardContent></CardContent>
    </Card>
  );
}
