"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "@/components/admin/Dashboard";

const queryClient = new QueryClient();

export default function AdminPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}
