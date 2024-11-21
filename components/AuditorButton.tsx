"use client";
import { useEffect, useState } from "react";
import { rivest } from "@/util/rivest";
import { Alert, Box, Tooltip } from "@mui/material";
import { useAccount, useChainId, useWaitForTransactionReceipt } from "wagmi";
import { useWriteContract } from "wagmi";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import { useReadContract } from "wagmi";
import deployment from "@/util/deployment";
import compliant from "@/util/compliant";

export default function AuditorButton() {
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
    data: isAuditor,
    isPending: isAuditorRoleReadPending,
    refetch: refetchAuditorRole,
  } = useReadContract({
    abi: compliant.abi,
    address: deployment.compliant,
    functionName: "isAddressAuditor",
    args: [address],
  });
  const {
    data: hash,
    isPending,
    writeContract,
    isError,
    isSuccess,
    error,
  } = useWriteContract({});
  const handleAuditorRole = () => {
    setSuccessDismissed(false);
    setErrorDismissed(false);
    writeContract({
      abi: compliant.abi,
      address: deployment.compliant,
      functionName: isAuditor === true ? "revokeAuditor" : "becomeAuditor",
      args: [],
    });
  };
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  useEffect(() => {
    refetchAuditorRole();
  }, [isConfirmed]);
  let buttonTitle = "Become Auditor";
  if (isAuditor) {
    buttonTitle = "Revoke Auditor Role";
  } else if (isError) {
    buttonTitle = "Try Again";
  }
  return (
    <>
      <Tooltip title={title}>
        <Box>
          <LoadingButton
            loading={
              (isAuditorRoleReadPending || isPending || isConfirming) &&
              isConnected &&
              !wrongChain
            }
            variant="outlined"
            disabled={!isConnected || wrongChain}
            onClick={handleAuditorRole}
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
        <Alert severity="error">Failed To Change Role</Alert>
      </Snackbar>
      <Snackbar
        open={isConfirmed && !successDismissed}
        autoHideDuration={2000}
        onClose={() => setSuccessDismissed(true)}
      >
        <Alert severity="success">Role Change Approved</Alert>
      </Snackbar>
    </>
  );
}
