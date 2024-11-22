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

export default function FhePage() {
  return (
    <Container maxWidth="md">
      <Card variant="outlined">
        <CardHeader title="Applying FHE To EVM" />
        <Divider />
        <CardContent>
          <List>
            <ListItem>
              <ListItemText
                primary="Global Network Key"
                secondary="All transaction inputs and on-chain states
                are encrypted under a global network key, ensuring state
                confidentiality and composability across smart contracts"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="New Encrypted Data Types"
                secondary="This includes encrypted boolean (ebool), address
                (eaddress), and various unsigned integers (euint(8,16,32,64,128,256))."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Operations"
                secondary="Arithmetic, Bitwise, Comparison, min, max, negation,
                onchain encrypted PRNG generation are supported"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Integration"
                secondary="FHE can be integrated into the EVM at the precompile level or
                as a coprocessor to existing chains"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}
