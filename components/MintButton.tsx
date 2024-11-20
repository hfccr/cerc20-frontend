"use client";
import { useState } from "react";
import { rivest } from "@/util/rivest";
import { Alert, Box, Tooltip } from "@mui/material";
import { useAccount, useChainId, useWaitForTransactionReceipt } from "wagmi";
import { useWriteContract } from "wagmi";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";

interface MintButtonProps {
  address: `0x${string}`;
  abi: any;
  mintFunction: string;
}

export default function MintButton({
  address,
  abi,
  mintFunction,
}: MintButtonProps) {
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
  const handleMint = () => {
    setSuccessDismissed(false);
    setErrorDismissed(false);
    writeContract({
      abi: abi,
      address: address,
      functionName: mintFunction,
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
            variant="contained"
            disabled={!isConnected || wrongChain}
            onClick={handleMint}
            color={isConfirmed ? "success" : isError ? "error" : "primary"}
          >
            {isConfirmed
              ? `Mint Again`
              : isError
                ? "Try Again"
                : `Mint 10 Tokens`}
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
        <Alert severity="error">Failed to Mint tokens</Alert>
      </Snackbar>
      <Snackbar
        open={isConfirmed && !successDismissed}
        autoHideDuration={2000}
        onClose={() => setSuccessDismissed(true)}
      >
        <Alert severity="success">Tokens Minted</Alert>
      </Snackbar>
    </>
  );
}
