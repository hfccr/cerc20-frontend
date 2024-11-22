import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function UseCasesPage() {
  return (
    <Container>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
          <Card variant="outlined">
            <CardHeader title="Payment" />
            <Divider />
            <CardContent>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Private Cross Border Payments"
                    secondary="Enable private international transactions, protecting sensitive
                    financial details while complying with local regulations"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Private Token Vesting"
                    secondary="Manage and automate the distribution of vested tokens,
                        ensuring confidentiality of allocation schedules and amounts"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Private B2B Payroll"
                    secondary="Facilitate private payroll between businesses, safeguarding
                        salary details and ensuring compliance with regulatory requirements"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="International Remittances"
                    secondary="Provide a secure and private channel for transferring funds
                        across borders"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
          <Card variant="outlined">
            <CardHeader title="DeFi" />
            <Divider />
            <CardContent>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Private AMM & Darkpools"
                    secondary="Execute private token swaps,
                    preventing frontrunning and protecting trading strategies
                    with encrypted balances"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Private RWA Tokenization"
                    secondary="Tokenize real-world assets with privacy-preserving features,
                    safeguarding sensitive ownership and transaction details"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Blind Auction"
                    secondary="Facilitate auctions where the bid remains confidential until the
                    auction concludes, ensuring a fair bidding process"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Private Lending"
                    secondary="Enable private loans with confidential terms and collateral,
                    preserving borrower privacy"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
          <Card variant="outlined">
            <CardHeader title="The Post Web" />
            <Divider />
            <CardContent>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Confidential Token Purchase"
                    secondary="AI Agents investing in confidential tokens, participating
                    in confidential payment and DeFi on behalf of users"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Confidential Payment For Services"
                    secondary="AI Agents accepting confidential payments for using
                    owners devices for DePIN or other services"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Confidential Agentic Network"
                    secondary="AI Agents collaborating and competing in a confidential
                    payment network"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
}
