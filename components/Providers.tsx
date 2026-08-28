"use client";

import { StoreProvider } from "./Store";
import { Shell } from "./Shell";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Shell>{children}</Shell>
    </StoreProvider>
  );
}
