"use client";
import { useEffect, useState } from "react";
import { rivest } from "@/util/rivest";
import { Alert, Box, Tooltip } from "@mui/material";
import { useAccount, useChainId, useWaitForTransactionReceipt } from "wagmi";
import { useWriteContract } from "wagmi";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import { useReadContract } from "wagmi";
import usdcToken from "@/util/usdcToken";
import deployment from "@/util/deployment";

export default function ApprovalButton() {
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
    data: allowance,
    isPending: isAllowancePending,
    refetch: refetchAllowance,
  } = useReadContract({
    abi: usdcToken.abi,
    address: deployment.usdcToken,
    functionName: "allowance",
    args: [address, deployment.wrapper],
  });
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
      abi: usdcToken.abi,
      address: deployment.usdcToken,
      functionName: "approve",
      args: [deployment.wrapper, 10],
    });
  };
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  useEffect(() => {
    refetchAllowance();
  }, [isConfirmed]);
  const approved = typeof allowance === "bigint" && allowance >= 10;
  let buttonTitle = "Approve 10 Tokens";
  if (approved) {
    buttonTitle = "10 Tokens Approved";
  } else if (isConfirmed) {
    buttonTitle = "Fetching Approval";
  } else if (isError) {
    buttonTitle = "Try Again";
  }
  return (
    <>
      <Tooltip title={title}>
        <Box>
          <LoadingButton
            loading={
              (isAllowancePending || isPending || isConfirming) &&
              isConnected &&
              !wrongChain
            }
            variant="contained"
            disabled={approved || !isConnected || wrongChain}
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
        <Alert severity="error">Failed To Approve Tokens</Alert>
      </Snackbar>
      <Snackbar
        open={isConfirmed && !successDismissed}
        autoHideDuration={2000}
        onClose={() => setSuccessDismissed(true)}
      >
        <Alert severity="success">Approval Set</Alert>
      </Snackbar>
    </>
  );
}
