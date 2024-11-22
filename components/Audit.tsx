import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import AuditorButton from "./AuditorButton";
import DecryptBalance from "./DecryptBalance";
import deployment from "@/util/deployment";
import compliant from "@/util/compliant";
import MintButton from "./MintButton";
import BurnButton from "./BurnButton";
import {
  auditorRoleAssignCode,
  burnConfidentialToken,
  getConfidentialBalance,
  mintConfidentialToken,
} from "@/util/codeBlocks";
import CodeViewer from "./CodeViewer";

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
              primary={
                <Stack direction="row" alignItems="center">
                  <Typography>Auditor Role</Typography>
                  <CodeViewer
                    title="Auditor Role"
                    codeBlock={auditorRoleAssignCode}
                    description="Get or revoke auditor role"
                  />
                </Stack>
              }
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
            <ListItemText
              primary={
                <Stack direction="row" alignItems="center">
                  <Typography>wcUSDC Balance</Typography>
                  <CodeViewer
                    title="wcUSDC Balance"
                    codeBlock={getConfidentialBalance}
                    description="Get confidential balance of Compliant Confidential USDC Token"
                  />
                </Stack>
              }
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
              <MintButton
                address={deployment.compliant}
                abi={compliant.abi}
                mintFunction="openMint"
              />
            }
          >
            <ListItemText
              primary={
                <Stack direction="row" alignItems="center">
                  <Typography>Mint wcUSDC</Typography>
                  <CodeViewer
                    title="Mint ccUSDC"
                    codeBlock={mintConfidentialToken}
                    description="Mints Compliant Confidential USDC Token"
                  />
                </Stack>
              }
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
              <BurnButton
                address={deployment.compliant}
                abi={compliant.abi}
                burnFunction="openBurn"
              />
            }
          >
            <ListItemText
              primary={
                <Stack direction="row" alignItems="center">
                  <Typography>Burn wcUSDC</Typography>
                  <CodeViewer
                    title="Burn ccUSDC"
                    codeBlock={burnConfidentialToken}
                    description="Burns Compliant Confidential USDC Token"
                  />
                </Stack>
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
