"use client";
import { createTheme } from "@mui/material/styles";
import { brandingDarkTheme, brandingLightTheme } from "./brandingTheme";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: brandingLightTheme, dark: brandingDarkTheme },
});

export default theme;
