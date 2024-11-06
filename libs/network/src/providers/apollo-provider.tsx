"use client";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider as Provider,
} from "@apollo/client";
import React, { ReactNode } from "react";

export interface IApolloProviderProps {
  children: ReactNode;
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
    cache: new InMemoryCache(),
  });

  return <Provider client={apolloClient}>{children}</Provider>;
};
