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

export default function ZkVsFhePage() {
  return (
    <Container maxWidth="md">
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <Card variant="outlined">
            <CardHeader title="Commitment Based" />
            <Divider />
            <CardContent>
              <List dense>
                <ListItem>
                  <ListItemText secondary="ZK" primary="Tech" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="Each user maintains own private/public encryption
                    key and encryption decryption happens on client side"
                    primary="Privacy"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="User managed with no third party"
                    primary="Decryption Liveness"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="Rigid, viewing key cannot change,
                    view key rotation or revocation is not possible"
                    primary="Decryption Rules"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="Cannot perform state transition directly
                    over encrypted data"
                    primary="Composability Over Private State"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <Card variant="outlined">
            <CardHeader title="Encryption Based" />
            <Divider />
            <CardContent>
              <List dense>
                <ListItem>
                  <ListItemText secondary="FHE, MPC & TEE" primary="Tech" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="Relies on shared private key management
                  via one or more authorities via MPC"
                    primary="Privacy"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="Depends on availability of decryption authority"
                    primary="Decrpytion Liveness"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="Flexible via smart contracts, with possible key
                    rotation and viewing rules change and revocation"
                    primary="Decryption Rules"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="Highly composable with single shared public key
                    enabling seamless computation across encrypted data"
                    primary="Composability Over Private State"
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
