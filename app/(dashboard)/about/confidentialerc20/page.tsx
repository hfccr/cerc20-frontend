import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function ConfidentialErc20Page() {
  return (
    <Container maxWidth="sm">
      <Card variant="outlined">
        <CardHeader title="Features" />
        <Divider />
        <CardContent>
          <List>
            <ListItem>
              <ListItemText
                primary="Encrypted Balances"
                secondary="User balances are encrypted, ensuring that only authorized parties,
                such as the users themselves or designated regulators, can view them"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Encrypted Transfers"
                secondary="When transferring wrapped assets, transfer amounts between
                addresses are encrypted so that the details of the transactions are not exposed to the public"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Delegated Viewing (Optional)"
                secondary="Delegation of view permissions to specific parties, such as
                 auditors or regulators, without compromising the privacy of token holders"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Programmable Transfer Rules (Optional)"
                secondary="Transfer rules can be programmed at the smart contract level
                to enforce compliance rules such as anti-money laundering (AML) blacklisting
                or transaction limits"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}
