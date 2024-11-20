"use client";
import confidentailToken from "@/util/confidentialToken";
import deployment from "@/util/deployment";
import { rivest } from "@/util/rivest";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Addreth } from "addreth";
import { useReadContract } from "wagmi";
import MintButton from "./MintButton";
import BurnButton from "./BurnButton";
import DecryptBalance from "./DecryptBalance";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export default function ConfidentailToken() {
  const { data: name, isFetched: isNameFetched } = useReadContract({
    abi: confidentailToken.abi,
    address: deployment.confidentialToken,
    functionName: "name",
  });
  const { data: symbol, isFetched: isSymbolFetched } = useReadContract({
    abi: confidentailToken.abi,
    address: deployment.confidentialToken,
    functionName: "symbol",
  });
  const theme = useTheme();
  return (
    <>
      <Stack direction="column" spacing={4}>
        <Paper variant="outlined">
          <CardContent>
            <Stack direction="column" spacing={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h4">
                  {isNameFetched && <>{name}</>}
                  {!isNameFetched && <Skeleton width={150} variant="text" />}
                </Typography>
                <Typography variant="h6">
                  {isSymbolFetched && <>${symbol}</>}
                  {!isSymbolFetched && <Skeleton width={50} variant="text" />}
                </Typography>
              </Stack>
              <Addreth
                address={deployment.confidentialToken}
                icon={false}
                theme={theme.palette.mode === "dark" ? "dark" : "light"}
                explorer={(address) => ({
                  name: "Rivest Explorer",
                  accountUrl: `${rivest.blockExplorers.default.url}/address/${address}`,
                })}
              />
            </Stack>
          </CardContent>
        </Paper>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Card variant="outlined" sx={{ pb: 2 }}>
            <CardHeader
              title={<Typography variant="h4">Mint</Typography>}
              avatar={<AddCircleIcon />}
              disableTypography={true}
            />
            <CardContent>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Mint 10 confidential tokens. The count of minted tokens is
                currently sent in plain text but it is possible to send it
                encrypted. Your balance is stored an an encrypted int.{" "}
              </Typography>
            </CardContent>
            <CardActions>
              <MintButton />
            </CardActions>
          </Card>
          <Card variant="outlined" sx={{ pb: 2 }}>
            <CardHeader
              title={<Typography variant="h4">Burn</Typography>}
              avatar={<LocalFireDepartmentIcon />}
              disableTypography={true}
            />
            <CardContent>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Burn 10 confidential tokens. The count of minted tokens is
                currently sent in plain text but it is possible to send it
                encrypted. You can only burn tokens you own.{" "}
              </Typography>
            </CardContent>
            <CardActions>
              <BurnButton />
            </CardActions>
          </Card>
          <Card variant="outlined" sx={{ pb: 2, flexGrow: 1 }}>
            <CardHeader
              title={<Typography variant="h4">Balance</Typography>}
              avatar={<LockOpenIcon />}
              disableTypography={true}
            />
            <CardContent>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Decrypt your balance. The encrypted balance is fetched from the
                contract and a reencryption request is created with a locally
                generated key pair.
              </Typography>
            </CardContent>
            <CardActions>
              <DecryptBalance />
            </CardActions>
          </Card>
        </Stack>
      </Stack>
    </>
  );
}
