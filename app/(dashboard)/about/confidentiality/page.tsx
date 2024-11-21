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

export default function ConfidentialityPage() {
  return (
    <Container maxWidth="md">
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <Card variant="outlined">
            <CardHeader title="Anonymity" />
            <Divider />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText secondary="Who" primary="Privacy" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="? sent $10 to ?"
                    primary="Public Information"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="Paying doctor or donating to political campaign"
                    primary="Scenarios When Needed"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText secondary="Tornado Cash" primary="Examples" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="High Risk With Bad Actors Obfuscating Activity"
                    primary="Risk"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <Card variant="outlined">
            <CardHeader title="Confidentiality" />
            <Divider />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText secondary="How Much" primary="Privacy" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="Alice sent ? to Bob"
                    primary="Public Information"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="Payroll, supply chain, vendory payments"
                    primary="Scenarios When Needed"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="Confidential ERC20"
                    primary="Examples"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    secondary="Low Risk With Provision For Audits"
                    primary="Risk"
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
