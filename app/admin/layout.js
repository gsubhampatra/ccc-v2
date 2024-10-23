"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  return (
    <html  >
      <QueryClientProvider client={queryClient}>
        <body className="min-h-screen ">{children}</body>
      </QueryClientProvider>
    </html>
  );
}
