import { Stack, Typography } from "@mui/material";

export default function BlockchainPrivacy() {
  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="body1">
        Blockchain disintermediates traditional finance but falls short on
        privacy, as its pseudonymous design lacks the robust confidentiality
        needed for widespread enterprise and consumer adoption. Advanced
        analytics can easily trace transactions, revealing participant
        identities.
      </Typography>
      <Typography variant="body1">
        {" "}
        Privacy is vital for the financial systems integrity, protecting
        consumers and businesses from misuse, identity theft, and fraud. Laws
        often mandate privacy to secure sensitive information like payroll,
        vendor payments, and strategic financial data.
      </Typography>
    </Stack>
  );
}
