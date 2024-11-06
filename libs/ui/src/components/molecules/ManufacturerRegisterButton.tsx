"use client";

import { useQuery } from "@apollo/client";
import { ManufacturerDocument } from "@recycle-chain/network/src/generated/graphql";
import { useAccount } from "@recycle-chain/utils/src/hooks/ether";
import { StyledLink } from "./StyledLink";

export const ManufacturerRegisterButton = () => {
  const { account } = useAccount();
  console.log("account ", account);
  const { loading, data } = useQuery(ManufacturerDocument, {
    variables: { where: { id: account } },
  });

  if (!data?.manufacturer) {
    return <StyledLink href="/manufacturers/register">Register</StyledLink>;
  }

  return null;
};
