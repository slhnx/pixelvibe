"use client";
import { ProgressProvider } from "@bprogress/next/app";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "@bprogress/core/css";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ProgressProvider
        height="3px"
        color="oklch(59.6% 0.145 163.225)"
        options={{ showSpinner: true, spinnerSelector: ".spinner" }}
        style=""
        shallowRouting
      >
        {children}
      </ProgressProvider>
    </NextThemesProvider>
  );
};

export default Providers;
