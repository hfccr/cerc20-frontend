"use client";
import * as React from "react";
import { AppProvider } from "@toolpad/core/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CircleIcon from "@mui/icons-material/Circle";
import type { Navigation } from "@toolpad/core/AppProvider";
import theme from "../theme";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { rivest } from "@/util/rivest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "token",
    title: "Confidential Token",
    icon: <CircleIcon />,
  },
];

const BRANDING = {
  title: "CERC20",
  logo: <> </>,
};

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "CERC",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  chains: [rivest],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              theme={darkTheme({
                fontStack: "system",
              })}
            >
              <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <AppProvider
                  navigation={NAVIGATION}
                  branding={BRANDING}
                  theme={theme}
                >
                  {props.children}
                </AppProvider>
              </AppRouterCacheProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
