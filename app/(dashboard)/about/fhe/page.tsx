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
        <CardHeader title="About FHE" />
        <Divider />
        <CardContent>
          <List>
            <ListItem>
              <ListItemText
                primary="What is FHE?"
                secondary="Fully Homomorphic Encryption (FHE) enables
                computations on encrypted data without decryption"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Homomorphic Property"
                secondary="Homomorphic property allows arithmetic
                operations on ciphertexts that, upon decryption,
                yield results identical to those of operations
                performed on the original plaintext data"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Encryption Scheme"
                secondary="FHE builds on public-key encryption (PKE),
                using a pair of keys: a public key for encryption and
                a private key for decryption"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Global Private Key"
                secondary="Ciphertexts are encrypted under a global FHE
                public key for composability, with decryption done by a
                trusted authority that holds the private key with key
                rotation, m out of n MPC and TEE used to mitigate risk"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}
