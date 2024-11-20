import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { rivest } from "./rivest";

const config = getDefaultConfig({
  appName: "CERC",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  chains: [rivest],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default config;
