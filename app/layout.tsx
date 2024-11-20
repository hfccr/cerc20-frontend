"use client";
import * as React from "react";
import { AppProvider } from "@toolpad/core/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CircleIcon from "@mui/icons-material/Circle";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import type { Navigation } from "@toolpad/core/AppProvider";
import theme from "../theme";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./global.css";
import config from "@/util/wagmiConfig";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
    title: "Token",
    icon: <CircleIcon />,
  },
  {
    segment: "caas",
    title: "CaaS",
    icon: <EnhancedEncryptionIcon />,
  },
];

const BRANDING = {
  title: "CERC20",
  logo: <> </>,
};

const queryClient = new QueryClient();

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
