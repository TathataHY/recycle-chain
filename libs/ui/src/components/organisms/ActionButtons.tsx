import { useApolloClient } from "@apollo/client";
import {
  ProductStatus,
  namedOperations,
} from "@recycle-chain/network/src/generated/graphql";
import { updateProductItemStatus } from "@recycle-chain/utils/src/actions/updateProductItemStatus";
import { useAccount } from "@recycle-chain/utils/src/hooks/ether";
import { useState } from "react";
import { Button } from "../atoms/Button";
import { toast } from "../molecules/Toast";

const statusToButtonText: Record<ProductStatus, string> = {
  [ProductStatus.Manufactured]: "Sell item",
  [ProductStatus.Sold]: "Return item",
  [ProductStatus.Returned]: "Recycle item",
  [ProductStatus.Recycled]: "Recycled",
};

export const UpdateProductItemStatusButton = ({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: ProductStatus;
}) => {
  const { contract } = useAccount();
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);

  return (
    <Button
      loading={loading}
      variant="text"
      disabled={currentStatus === ProductStatus.Recycled}
      onClick={async () => {
        if (!contract) {
          toast("Action failed.");
          return;
        }
        setLoading(true);
        const status = await updateProductItemStatus({
          contract,
          payload: { productItemIds: [id], currentStatus },
        });
        if (status) {
          toast("Item set to SOLD.");
          client.refetchQueries({
            include: [
              namedOperations.Query.ProductItems,
              namedOperations.Query.Product,
            ],
          });
        } else {
          toast("Action failed.");
        }
        setLoading(false);
      }}
    >
      {statusToButtonText[currentStatus]}
    </Button>
  );
};
