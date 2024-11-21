import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AuditorButton from "./AuditorButton";
import DecryptBalance from "./DecryptBalance";
import deployment from "@/util/deployment";
import compliant from "@/util/compliant";
import MintButton from "./MintButton";
import BurnButton from "./BurnButton";

export default function Audit() {
  return (
    <Card variant="outlined">
      <CardContent>
        <List component="div">
          <ListItem
            component="div"
            sx={{
              pr: "250px",
              "& .MuiListItemSecondaryAction-root": {
                transform: "none",
                top: "calc(50% - 20px)",
              },
            }}
            secondaryAction={<AuditorButton />}
          >
            <ListItemText
              primary="Auditor Role"
              secondary="Having this role allows you to view encrypted balance of other addresses and add them to blacklist"
            />
          </ListItem>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <ListItem
            component="div"
            sx={{
              "& .MuiListItemSecondaryAction-root": {
                transform: "none",
                top: "calc(50% - 20px)",
              },
            }}
            secondaryAction={
              <DecryptBalance
                address={deployment.compliant}
                abi={compliant.abi}
              />
            }
          >
            <ListItemText primary="ccUSDC Balance" />
          </ListItem>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <ListItem
            component="div"
            sx={{
              "& .MuiListItemSecondaryAction-root": {
                transform: "none",
                top: "calc(50% - 20px)",
              },
            }}
            secondaryAction={
              <MintButton
                address={deployment.compliant}
                abi={compliant.abi}
                mintFunction="openMint"
              />
            }
          >
            <ListItemText primary="Mint ccUSDC" />
          </ListItem>
          <Divider sx={{ mt: 1, mb: 2 }} />
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
                address={deployment.compliant}
                abi={compliant.abi}
                burnFunction="openBurn"
              />
            }
          >
            <ListItemText primary="Burn ccUSDC" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
