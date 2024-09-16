import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";
import { baseRouter } from "./app/providers/index.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./app/styles/normalize.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>error</div>}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={baseRouter} />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
