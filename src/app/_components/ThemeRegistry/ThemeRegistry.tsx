"use client";

import { ThemeProvider } from "@mui/material";
import React, { ReactNode } from "react";
import { createTheme } from "@mui/material";

type Props = {};

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    spacing: 8,
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
