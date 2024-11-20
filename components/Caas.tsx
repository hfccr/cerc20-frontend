import { Stack } from "@mui/material";
import Erc20 from "./Erc20";
import Wrapper from "./Wrapper";

export default function Caas() {
  return (
    <Stack
      direction={{ sm: "column", md: "row" }}
      justifyContent="space-between"
      spacing={4}
    >
      <Erc20 />
      <Wrapper />
    </Stack>
  );
}
