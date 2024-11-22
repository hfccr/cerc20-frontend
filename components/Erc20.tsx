"use client";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
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
        title={<Typography variant="h4">USD Coin</Typography>}
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
          <Typography variant="h5" sx={{ mt: 0.5, ml: 4, mr: 1 }}>
            $USDC
          </Typography>
        }
      />
      <CardContent>
        <List component="div">
          <ListItem
            secondaryAction={<Balance />}
            component="div"
            sx={{
              "& .MuiListItemSecondaryAction-root": {
                transform: "none",
                top: "calc(50% - 20px)",
              },
            }}
          >
            <ListItemText primary="USDC Balance" />
          </ListItem>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <ListItem
            component="div"
            sx={{
              "& .MuiListItemSecondaryAction-root": {
                transform: "none",
                top: "calc(50% - 20px)",
              },
            }}
            secondaryAction={
              <Box>
                <MintButton
                  address={deployment.usdcToken}
                  abi={usdcToken.abi}
                  mintFunction="mint"
                />
              </Box>
            }
          >
            <ListItemText primary="Mint USDC" />
          </ListItem>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <ListItem
            component="div"
            sx={{
              "& .MuiListItemSecondaryAction-root": {
                transform: "none",
                top: "calc(50% - 20px)",
              },
            }}
            secondaryAction={
              <BurnButton
                address={deployment.usdcToken}
                abi={usdcToken.abi}
                burnFunction="burn"
              />
            }
          >
            <ListItemText primary="Burn USDC" />
          </ListItem>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <ListItem
            secondaryAction={<ApprovalButton />}
            component="div"
            sx={{
              "& .MuiListItemSecondaryAction-root": {
                transform: "none",
                top: "calc(50% - 20px)",
              },
            }}
          >
            <ListItemText primary="Approve Transfer To Wrapper" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
