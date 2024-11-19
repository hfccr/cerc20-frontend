"use client";
import confidentailToken from "@/util/confidentialToken";
import deployment from "@/util/deployment";
import { CardContent, Paper, Skeleton, Stack, Typography } from "@mui/material";
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
  return (
    <>
      <Stack direction="column">
        <Paper variant="outlined">
          <CardContent>
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
          </CardContent>
        </Paper>
      </Stack>
    </>
  );
}
