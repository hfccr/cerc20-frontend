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
                  <ListItemText primary="Who" secondary="Privacy" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="? sent $10 to ?"
                    secondary="Public Information"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Paying doctor or donating to political campaign"
                    secondary="Scenarios When Needed"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Tornado Cash" secondary="Examples" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="High Risk With Bad Actors Obfuscating Activity"
                    secondary="Risk"
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
                  <ListItemText primary="How Much" secondary="Privacy" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Alice sent ? to Bob"
                    secondary="Public Information"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Payroll, supply chain, vendory payments"
                    secondary="Scenarios When Needed"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Confidential ERC20"
                    secondary="Examples"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Low Risk With Provision For Audits"
                    secondary="Risk"
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
