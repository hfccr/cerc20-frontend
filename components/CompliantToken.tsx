"use client";
import deployment from "@/util/deployment";
import { rivest } from "@/util/rivest";
import {
  Box,
  CardContent,
  Grid2,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Addreth } from "addreth";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import Audit from "./Audit";
import DecryptBalanceOfAddress from "./DecryptBalanceOfAddress";

export default function CompliantToken() {
  const theme = useTheme();
  return (
    <>
      <Stack direction="column" spacing={4}>
        <Paper variant="outlined">
          <CardContent>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Box sx={{ pt: 1 }}>
                <AssuredWorkloadIcon fontSize="large" />
              </Box>
              <Stack direction="column" spacing={2} sx={{ flexGrow: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h4">Compliant cUSDC</Typography>
                  <Typography variant="h6">$ccUSDC</Typography>
                </Stack>
                <Addreth
                  address={deployment.compliant}
                  icon={false}
                  theme={theme.palette.mode === "dark" ? "dark" : "light"}
                  explorer={(address) => ({
                    name: "Rivest Explorer",
                    accountUrl: `${rivest.blockExplorers.default.url}/address/${address}`,
                  })}
                />
              </Stack>
            </Stack>
          </CardContent>
        </Paper>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }}>
            <Audit />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }}>
            <DecryptBalanceOfAddress />
          </Grid2>
        </Grid2>
      </Stack>
    </>
  );
}
