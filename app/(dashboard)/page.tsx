import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button, CardContent, Container, Paper, Stack } from "@mui/material";
import Image from "next/image";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Stack
        direction="column"
        spacing={4}
        justifyContent="center"
        alignContent="center"
        alignItems="center"
      >
        <Paper variant="outlined">
          <CardContent>
            <Stack direction="column" spacing={4}>
              <Typography variant="h1" sx={{ textAlign: "center" }}>
                Confidential ERC20 Playground
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "center", pl: 4, pr: 4 }}
              >
                Transforms ERC20 tokens into a confidential form that conceals
                balances and transaction amounts, with optional viewing and
                transfer rules to meet regulatory obligations
              </Typography>
            </Stack>
          </CardContent>
        </Paper>
        <Container maxWidth="sm">
          <Paper variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Image src="/inco.svg" height={40} width={139} alt="inco" />
                <Button
                  startIcon={<OpenInNewIcon />}
                  variant="outlined"
                  href="https://docs.inco.org/getting-started/connect-metamask"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Add To MetaMask
                </Button>
                <Button
                  startIcon={<OpenInNewIcon />}
                  variant="outlined"
                  href="https://faucet.rivest.inco.org/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Faucet
                </Button>
              </Stack>
            </CardContent>
          </Paper>
        </Container>
      </Stack>
    </Container>
  );
}
