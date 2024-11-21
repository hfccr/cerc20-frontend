"use client";
import * as React from "react";
import { AppProvider } from "@toolpad/core/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import HomeIcon from "@mui/icons-material/Home";
import CircleIcon from "@mui/icons-material/Circle";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import type { Navigation } from "@toolpad/core/AppProvider";
import theme from "../theme";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./global.css";
import config from "@/util/wagmiConfig";
import localFont from "next/font/local";
import "@fontsource/ibm-plex-sans";
import "@fontsource/ibm-plex-sans/100.css";
import "@fontsource/ibm-plex-sans/200.css";
import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";

const generalSansMedium = localFont({
  src: "./fonts/GeneralSans-Medium.woff2",
  weight: "500",
});
const generalSansRegular = localFont({
  src: "./fonts/GeneralSans-Regular.woff2",
  weight: "400",
});

const generalSansSemibold = localFont({
  src: "./fonts/GeneralSans-Semibold.woff2",
  weight: "600",
});

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "CERC20 Playground",
  },
  {
    segment: "",
    title: "Home",
    icon: <HomeIcon />,
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
  {
    segment: "compliance",
    title: "Compliance",
    icon: <AssuredWorkloadIcon />,
  },
];

const BRANDING = {
  title: "CERC20 Playground",
  logo: <> </>,
};

const queryClient = new QueryClient();

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        <React.Suspense>
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
        </React.Suspense>
      </body>
    </html>
  );
}
