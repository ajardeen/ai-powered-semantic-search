"use client"; // This is the fix

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProviders } from "@/components/ThemeProvider";

export default function Providers({ children }) {
  // We use useState to ensure the QueryClient is only created once
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 0,
          },
        },
      }),
  );

  return (
    <ThemeProviders>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProviders>
  );
}
