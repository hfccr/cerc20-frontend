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
import MintButton from "./MintButton";
import BurnButton from "./BurnButton";

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
      <Stack direction="column" spacing={4}>
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
        <Paper variant="outlined">
          <CardContent>
            <Typography variant="h5">Mint Tokens</Typography>
            <MintButton />
          </CardContent>
        </Paper>
        <Paper variant="outlined">
          <CardContent>
            <Typography variant="h5">Burn Tokens</Typography>
            <BurnButton />
          </CardContent>
        </Paper>
        <Paper variant="outlined">
          <CardContent>
            <Typography variant="h5">Balance</Typography>
          </CardContent>
        </Paper>
      </Stack>
    </>
  );
}
