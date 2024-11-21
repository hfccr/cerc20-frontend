import { Grid2 } from "@mui/material";
import Erc20 from "./Erc20";
import Wrapper from "./Wrapper";

export default function Caas() {
  return (
    <Grid2 spacing={4} container>
      <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }}>
        <Erc20 />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }}>
        <Wrapper />
      </Grid2>
    </Grid2>
  );
}
