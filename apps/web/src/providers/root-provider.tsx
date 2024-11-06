"use client";

import { ApolloProvider } from "@recycle-chain/network/src/providers/apollo-provider";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider>{children}</ApolloProvider>;
}
