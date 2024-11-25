"use client";
import { useState } from "react";
import { rivest } from "@/util/rivest";
import { Alert, Box, Tooltip, Typography } from "@mui/material";
import { useAccount, useChainId } from "wagmi";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import { createInstance, initFhevm } from "fhevmjs/web";
import { useEthersSigner } from "@/hooks/useEthersSigner";
import { Contract } from "ethers";
import RefreshIcon from "@mui/icons-material/Refresh";

enum Activity {
  FHE_INSTANCE = "Creating FHE Instance",
  ENCRYPTED_ADDRESS_FETCH = "Fetching Encrypted Address",
  DECRYPT = "Decrypting",
}

interface DecryptBalanceProps {
  address: `0x${string}`;
  abi: any;
}

export default function DecryptBalance({ address, abi }: DecryptBalanceProps) {
  const { isConnected, chain } = useAccount();
  const [successDismissed, setSuccessDismissed] = useState(false);
  const [errorDismissed, setErrorDismissed] = useState(false);
  const [userBalance, setUserBalance] = useState("");
  const signer = useEthersSigner();
  const contract = new Contract(address, abi, signer);
  const [status, setStatus] = useState({
    isFetching: false,
    isSuccess: false,
    isError: false,
    error: "",
    activity: "",
  });
  const { isFetching, isSuccess, isError, error, activity } = status;
  const chainId = useChainId();
  const wrongChain = chainId !== chain?.id;
  let title = "";
  if (!isConnected) {
    title = "Connect Wallet";
  } else if (wrongChain) {
    title = "Switch To " + rivest.name;
  }
  const handleDecryption = async () => {
    setErrorDismissed(false);
    setSuccessDismissed(false);
    try {
      if (signer === undefined) {
        throw new Error("No signer found");
      }
      setStatus({
        isFetching: true,
        isSuccess: false,
        isError: false,
        error: "",
        activity: Activity.FHE_INSTANCE,
      });
      // get instance
      await initFhevm();
      const fhevmInstance = await createInstance({
        chainId: rivest.id,
        networkUrl: "https://validator.rivest.inco.org/",
        gatewayUrl: "https://gateway.rivest.inco.org/",
        aclAddress: "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92",
      });
      const { publicKey: genPublicKey, privateKey: genPrivateKey } =
        fhevmInstance.generateKeypair();
      const eip712 = fhevmInstance.createEIP712(genPublicKey, address);
      const signature = await signer.signTypedData(
        eip712.domain,
        { Reencrypt: eip712.types.Reencrypt },
        eip712.message
      );
      setStatus({
        isFetching: true,
        isSuccess: false,
        isError: false,
        error: "",
        activity: Activity.ENCRYPTED_ADDRESS_FETCH,
      });
      const balanceHandle = await contract.balanceOf(await signer.getAddress());
      if (balanceHandle.toString() === "0") {
        setUserBalance("0");
      } else {
        setStatus({
          isFetching: true,
          isSuccess: false,
          isError: false,
          error: "",
          activity: Activity.DECRYPT,
        });
        const balanceResult = await fhevmInstance.reencrypt(
          balanceHandle,
          genPrivateKey,
          genPublicKey,
          signature.replace("0x", ""),
          address,
          await signer.getAddress()
        );
        setUserBalance(balanceResult.toString());
      }
      setStatus({
        isFetching: false,
        isSuccess: true,
        isError: false,
        error: "",
        activity: "",
      });
    } catch (e) {
      setStatus({
        isFetching: false,
        isSuccess: false,
        isError: true,
        error: (e as Error).message,
        activity: "",
      });
    }
  };
  return (
    <>
      <Tooltip title={title}>
        <Box>
          <LoadingButton
            loading={isFetching}
            variant="outlined"
            disabled={!isConnected || wrongChain}
            onClick={handleDecryption}
            color={isSuccess ? "success" : isError ? "error" : "primary"}
            startIcon={isSuccess ? <RefreshIcon /> : null}
          >
            {isSuccess
              ? `Balance: ${userBalance}`
              : isError
                ? "Try Again"
                : `Decrypt Balance`}
          </LoadingButton>
        </Box>
      </Tooltip>
      <Snackbar open={isFetching && activity === ""} autoHideDuration={2000}>
        <Alert severity="info">Waiting for confirmation</Alert>
      </Snackbar>
      <Snackbar
        open={isFetching && activity === Activity.FHE_INSTANCE}
        autoHideDuration={2000}
      >
        <Alert severity="info">Waiting For Signature</Alert>
      </Snackbar>
      <Snackbar
        open={isFetching && activity === Activity.ENCRYPTED_ADDRESS_FETCH}
        autoHideDuration={2000}
      >
        <Alert severity="info">Fetching Encrypted Balance</Alert>
      </Snackbar>
      <Snackbar
        open={isFetching && activity === Activity.DECRYPT}
        autoHideDuration={2000}
      >
        <Alert severity="info">Decrypting Balance</Alert>
      </Snackbar>
      <Snackbar
        open={isError && !errorDismissed}
        autoHideDuration={2000}
        onClose={() => setErrorDismissed(true)}
      >
        <Alert severity="error">Failed To Decrypt Balance</Alert>
      </Snackbar>
      <Snackbar
        open={isSuccess && !successDismissed}
        autoHideDuration={2000}
        onClose={() => setSuccessDismissed(true)}
      >
        <Alert severity="success">Balance Successfully Decrypted</Alert>
      </Snackbar>
    </>
  );
}
