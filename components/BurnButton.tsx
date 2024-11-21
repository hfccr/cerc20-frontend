"use client";
import { useState } from "react";
import { rivest } from "@/util/rivest";
import { Alert, Box, Tooltip } from "@mui/material";
import { useAccount, useChainId, useWaitForTransactionReceipt } from "wagmi";
import { useWriteContract } from "wagmi";
import deployment from "@/util/deployment";
import confidentailToken from "@/util/confidentialToken";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";

interface BurnButtonProps {
  address: `0x${string}`;
  abi: any;
  burnFunction: string;
}

export default function BurnButton({
  address,
  abi,
  burnFunction,
}: BurnButtonProps) {
  const { isConnected, chain } = useAccount();
  const [successDismissed, setSuccessDismissed] = useState(false);
  const [errorDismissed, setErrorDismissed] = useState(false);
  const chainId = useChainId();
  const wrongChain = chainId !== chain?.id;
  let title = "";
  if (!isConnected) {
    title = "Connect Wallet";
  } else if (wrongChain) {
    title = "Switch To " + rivest.name;
  }
  const {
    data: hash,
    isPending,
    writeContract,
    isError,
    isSuccess,
    error,
  } = useWriteContract();
  const handleBurn = () => {
    setSuccessDismissed(false);
    setErrorDismissed(false);
    writeContract({
      abi: abi,
      address: address,
      functionName: burnFunction,
      args: [10],
    });
  };
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  return (
    <>
      <Tooltip title={title}>
        <Box>
          <LoadingButton
            loading={isPending || isConfirming}
            variant="outlined"
            disabled={!isConnected || wrongChain}
            onClick={handleBurn}
            color={isConfirmed ? "success" : isError ? "error" : "primary"}
          >
            {isConfirmed
              ? `Burn Again`
              : isError
                ? "Try Again"
                : `Burn 10 Tokens`}
          </LoadingButton>
        </Box>
      </Tooltip>
      <Snackbar open={isPending} autoHideDuration={2000}>
        <Alert severity="info">Waiting for confirmation</Alert>
      </Snackbar>
      <Snackbar
        open={isSuccess && !isError && !isConfirmed}
        autoHideDuration={2000}
      >
        <Alert severity="info">Waiting for transaction</Alert>
      </Snackbar>
      <Snackbar
        open={isError && !errorDismissed}
        autoHideDuration={2000}
        onClose={() => setErrorDismissed(true)}
      >
        <Alert severity="error">Failed to Burn tokens</Alert>
      </Snackbar>
      <Snackbar
        open={isConfirmed && !successDismissed}
        autoHideDuration={2000}
        onClose={() => setSuccessDismissed(true)}
      >
        <Alert severity="success">Tokens Burned</Alert>
      </Snackbar>
    </>
  );
}
