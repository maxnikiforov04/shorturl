import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";
import { baseRouter } from "./app/providers/index.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./app/styles/normalize.css";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});
persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>error</div>}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={baseRouter} />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
