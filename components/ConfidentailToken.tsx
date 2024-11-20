"use client";
import confidentailToken from "@/util/confidentialToken";
import deployment from "@/util/deployment";
import { rivest } from "@/util/rivest";
import {
  CardContent,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Addreth } from "addreth";
import { useReadContract } from "wagmi";

export default function ConfidentailToken() {
  const { data: name, isFetched: isNameFetched } = useReadContract({
    abi: confidentailToken.abi,
    address: deployment.confidentialToken,
    functionName: "name",
  });
  const { data: symbol, isFetched: isSymbolFetched } = useReadContract({
    abi: confidentailToken.abi,
    address: deployment.confidentialToken,
    functionName: "symbol",
  });
  const theme = useTheme();
  return (
    <>
      <Stack direction="column">
        <Paper variant="outlined">
          <CardContent>
            <Stack direction="column" spacing={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h4">
                  {isNameFetched && <>{name}</>}
                  {!isNameFetched && <Skeleton width={150} variant="text" />}
                </Typography>
                <Typography variant="h6">
                  {isSymbolFetched && <>${symbol}</>}
                  {!isSymbolFetched && <Skeleton width={50} variant="text" />}
                </Typography>
              </Stack>
              <Addreth
                address={deployment.confidentialToken}
                icon={false}
                theme={theme.palette.mode === "dark" ? "dark" : "light"}
                explorer={(address) => ({
                  name: "Rivest Explorer",
                  accountUrl: `${rivest.blockExplorers.default.url}/address/${address}`,
                })}
              />
            </Stack>
          </CardContent>
        </Paper>
      </Stack>
    </>
  );
}
