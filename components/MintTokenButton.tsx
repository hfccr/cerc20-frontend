"use client";
import { useState } from "react";
import { rivest } from "@/util/rivest";
import { Box, Tooltip } from "@mui/material";
import { useAccount, useChainId, useWaitForTransactionReceipt } from "wagmi";
import { useWriteContract } from "wagmi";
import deployment from "@/util/deployment";
import confidentailToken from "@/util/confidentialToken";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";

export default function MintTokenButton() {
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
  } = useWriteContract();
  const handleMint = () => {
    setSuccessDismissed(false);
    setErrorDismissed(false);
    writeContract({
      abi: confidentailToken.abi,
      address: deployment.confidentialToken,
      functionName: "openMint",
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
            {isConfirmed ? "Mint Again" : isError ? "Try Again" : "Mint Tokens"}
          </LoadingButton>
        </Box>
      </Tooltip>
      <Snackbar
        open={isPending}
        autoHideDuration={2000}
        message="Waiting for confirmation"
      />
      <Snackbar
        open={isSuccess && !isError && !isConfirmed}
        autoHideDuration={2000}
        message="Minting 10 Tokens"
      />
      <Snackbar
        open={isError && !errorDismissed}
        autoHideDuration={2000}
        message="Failed to mint tokens"
        onClose={() => setErrorDismissed(true)}
      />
      <Snackbar
        open={isConfirmed && !successDismissed}
        autoHideDuration={2000}
        message="Tokens Minted"
        onClose={() => setSuccessDismissed(true)}
      />
    </>
  );
}
