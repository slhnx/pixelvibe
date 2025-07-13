"use client";
import "@bprogress/core/css";
import { ProgressProvider } from "@bprogress/next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
import ConvexClientProvider from "./convex-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        appearance={{
          baseTheme: dark,
        }}
      >
        <ConvexClientProvider>
          <ProgressProvider
            height="3px"
            color="oklch(59.6% 0.145 163.225)"
            options={{ showSpinner: true, spinnerSelector: ".spinner" }}
            style=""
            shallowRouting
          >
            {children}
          </ProgressProvider>
        </ConvexClientProvider>
      </ClerkProvider>
    </NextThemesProvider>
  );
};

export default Providers;
