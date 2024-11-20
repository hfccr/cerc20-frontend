import deployment from "@/util/deployment";
import { rivest } from "@/util/rivest";
import usdcToken from "@/util/usdcToken";
import { LoadingButton } from "@mui/lab";
import { useAccount, useChainId, useReadContract } from "wagmi";

export default function Balance() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance, isFetched } = useReadContract({
    abi: usdcToken.abi,
    address: deployment.usdcToken,
    functionName: "balanceOf",
    args: [address],
  });
  const chainId = useChainId();
  const wrongChain = chainId !== chain?.id;
  let title = "";
  if (!isConnected) {
    title = "Connect Wallet";
  } else if (wrongChain) {
    title = "Switch To " + rivest.name;
  } else {
    title = "Balance: " + balance?.toString();
  }
  return (
    <LoadingButton loading={!isFetched} variant="contained" disabled={true}>
      {title}
    </LoadingButton>
  );
}
