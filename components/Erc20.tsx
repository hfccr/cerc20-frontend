"use client";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import { Addreth } from "addreth";
import deployment from "@/util/deployment";
import { rivest } from "@/util/rivest";
import MintButton from "./MintButton";
import usdcToken from "@/util/usdcToken";
import BurnButton from "./BurnButton";
import ApprovalButton from "./ApprovalButton";
import Balance from "./Balance";

export default function Erc20() {
  const theme = useTheme();
  return (
    <Card variant="outlined">
      <CardHeader
        title={<Typography variant="h5">USD Coin</Typography>}
        subheader={
          <Addreth
            address={deployment.usdcToken}
            icon={false}
            theme={theme.palette.mode === "dark" ? "dark" : "light"}
            explorer={(address) => ({
              name: "Rivest Explorer",
              accountUrl: `${rivest.blockExplorers.default.url}/address/${address}`,
            })}
          />
        }
        avatar={<PaidIcon fontSize="large" />}
        disableTypography
        action={
          <Typography variant="h6" sx={{ mt: 0.5, ml: 4, mr: 1 }}>
            $USDC
          </Typography>
        }
      />
      <CardContent>
        <Balance />
        <MintButton
          address={deployment.usdcToken}
          abi={usdcToken.abi}
          mintFunction="mint"
        />
        <BurnButton
          address={deployment.usdcToken}
          abi={usdcToken.abi}
          burnFunction="burn"
        />
        <ApprovalButton />
      </CardContent>
    </Card>
  );
}
