"use client";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Addreth } from "addreth";
import deployment from "@/util/deployment";
import { rivest } from "@/util/rivest";
import DecryptBalance from "./DecryptBalance";
import wrapper from "@/util/wrapper";
import WrapButton from "./WrapButton";
import UnwrapButton from "./UnwrapButton";
import CodeViewer from "./CodeViewer";
import {
  getConfidentialBalance,
  unwrapCode,
  wrapCode,
  wrapperCode,
} from "@/util/codeBlocks";

export default function Wrapper() {
  const theme = useTheme();
  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Stack direction="row" alignItems="center">
            <Typography variant="h4">Wrapped cUSDC</Typography>
            <CodeViewer
              title="Wrapper Contract"
              codeBlock={wrapperCode}
              description="Wraps and unwraps USDC tokens to wcUSDC tokens"
            />
          </Stack>
        }
        subheader={
          <Addreth
            address={deployment.wrapper}
            icon={false}
            theme={theme.palette.mode === "dark" ? "dark" : "light"}
            explorer={(address) => ({
              name: "Rivest Explorer",
              accountUrl: `${rivest.blockExplorers.default.url}/address/${address}`,
            })}
          />
        }
        avatar={<LockIcon fontSize="large" />}
        disableTypography
        action={
          <Typography variant="h5" sx={{ mt: 0.5, ml: 4, mr: 1 }}>
            $wcUSDC
          </Typography>
        }
      />
      <CardContent>
        <List>
          <ListItem
            component="div"
            sx={{
              pr: "200px",
              "& .MuiListItemSecondaryAction-root": {
                transform: "none",
                top: "calc(50% - 20px)",
              },
            }}
            secondaryAction={
              <DecryptBalance address={deployment.wrapper} abi={wrapper.abi} />
            }
          >
            <ListItemText
              primary={
                <Stack direction="row" alignItems="center">
                  <Typography>Decrypt Balance</Typography>
                  <CodeViewer
                    title="Decrypt Balance"
                    codeBlock={getConfidentialBalance}
                  />
                </Stack>
              }
              // secondary={`Decrypt balance of wcUSDC tokens. Balance increases when
              //   a user wraps USDC tokens or receives wcUSDC tokens from another user.
              //   Balance reduces when a user unwraps wcUSDC tokens or sends wcUSDC tokens
              //   to another user.`}
            />
          </ListItem>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <ListItem
            secondaryAction={<WrapButton />}
            component="div"
            sx={{
              pr: "200px",
              "& .MuiListItemSecondaryAction-root": {
                transform: "none",
                top: "calc(50% - 20px)",
              },
            }}
          >
            <ListItemText
              primary={
                <Stack direction="row" alignItems="center">
                  <Typography>Wrap USDC</Typography>
                  <CodeViewer title="Wrap USDC" codeBlock={wrapCode} />
                </Stack>
              }
              // secondary={`Wrapping USDC tokens converts them into wcUSDC tokens.
              //    Wrapper moves approved tokens to the wrapper contract and tracks
              //     user balance internally using encrypted numbers. Wrapper contract itself is
              //   a Confidential ERC20 token with wrap and unwrap methods linked to another
              //   non confidential ERC20 token.`}
            />
          </ListItem>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <ListItem
            secondaryAction={<UnwrapButton />}
            sx={{
              pr: "200px",
              "& .MuiListItemSecondaryAction-root": {
                transform: "none",
                top: "calc(50% - 20px)",
              },
            }}
          >
            <ListItemText
              primary={
                <Stack direction="row" alignItems="center">
                  <Typography>Unwrap wcUSDC</Typography>
                  <CodeViewer
                    title="Unwrap wcUSDC"
                    codeBlock={unwrapCode}
                    description="Converts the wrapped USDC back to standard ERC20 USDC"
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
