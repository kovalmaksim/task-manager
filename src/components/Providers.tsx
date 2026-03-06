"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { PropsWithChildren, FC } from "react";
import { ThemeProvider } from "next-themes";

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ThemeProvider>
);

export default Providers;
