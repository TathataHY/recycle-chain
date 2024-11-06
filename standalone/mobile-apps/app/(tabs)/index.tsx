import { FlatList } from "react-native";

import { ProductCard } from "@/components/recycle-chain/ProductCard";
import { View } from "@/components/Themed";
import { ProductsDocument, ProductsQuery } from "@/generated/generated";
import { useQuery } from "@apollo/client";

export default function TabOneScreen() {
  const { data, loading, fetchMore } = useQuery(ProductsDocument);

  const loadMore = async () => {
    await fetchMore({
      variables: {
        skip: data?.products?.length,
        take: 8,
      },
    });
  };

  return (
    <View>
      <FlatList<ProductsQuery["products"][0]>
        data={data?.products || []}
        renderItem={({ item }) => <ProductCard product={item} />}
        onEndReached={loadMore}
      />
    </View>
  );
}
