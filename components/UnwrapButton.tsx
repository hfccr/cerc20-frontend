"use client";
import { useEffect, useState } from "react";
import { rivest } from "@/util/rivest";
import { Alert, Box, Tooltip } from "@mui/material";
import { useAccount, useChainId, useWaitForTransactionReceipt } from "wagmi";
import { useWriteContract } from "wagmi";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import deployment from "@/util/deployment";
import wrapper from "@/util/wrapper";

export default function UnwrapButton() {
  const { address, isConnected, chain } = useAccount();
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
  } = useWriteContract({});
  const handleApproval = () => {
    setSuccessDismissed(false);
    setErrorDismissed(false);
    writeContract({
      abi: wrapper.abi,
      address: deployment.wrapper,
      functionName: "unwrap",
      args: [10],
    });
  };
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  let buttonTitle = "Unwrap 10 Tokens";
  if (isConfirmed) {
    buttonTitle = "Tokens Unwrapped";
  } else if (isError) {
    buttonTitle = "Try Again";
  }
  return (
    <>
      <Tooltip title={title}>
        <Box>
          <LoadingButton
            loading={(isPending || isConfirming) && isConnected && !wrongChain}
            variant="outlined"
            disabled={!isConnected || wrongChain}
            onClick={handleApproval}
            color={isConfirmed ? "success" : isError ? "error" : "primary"}
          >
            {buttonTitle}
          </LoadingButton>
        </Box>
      </Tooltip>
      <Snackbar open={isPending} autoHideDuration={2000}>
        <Alert severity="info">Waiting For Confirmation</Alert>
      </Snackbar>
      <Snackbar
        open={isSuccess && !isError && !isConfirmed}
        autoHideDuration={2000}
      >
        <Alert severity="info">Waiting For Transaction</Alert>
      </Snackbar>
      <Snackbar
        open={isError && !errorDismissed}
        autoHideDuration={2000}
        onClose={() => setErrorDismissed(true)}
      >
        <Alert severity="error">Failed To Unwrap Tokens</Alert>
      </Snackbar>
      <Snackbar
        open={isConfirmed && !successDismissed}
        autoHideDuration={2000}
        onClose={() => setSuccessDismissed(true)}
      >
        <Alert severity="success">Tokens Unwrapped</Alert>
      </Snackbar>
    </>
  );
}
