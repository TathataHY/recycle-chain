import { useQuery } from '@apollo/client'
import {
  ProductItemsDocument,
  ProductManufacturerDocument,
} from '@recycle-chain/network/src/generated/graphql'
import { useAccount } from '@recycle-chain/utils/src/hooks/ether'
import { useTakeSkip } from '@recycle-chain/utils/src/hooks/pagination'
import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import { PageTitle } from '../atoms/PageTitle'
import { AddProductItems } from '../organisms/AddProductItemsDialog'
import { BulkStatusUpdateDialog } from '../organisms/BulkStatusUpdateDialog'
import { ProductItemCard } from '../organisms/ProductItemCard'
import { ShowData } from '../organisms/ShowData'

export const ShowProductItems = ({ productId }: { productId: string }) => {
  const { setSkip, setTake, skip, take } = useTakeSkip(0, 12)
  const [searchTerm, setSearchTerm] = useState('')

  const { account } = useAccount()
  const { data: productData } = useQuery(ProductManufacturerDocument, {
    variables: { where: { id: productId } },
  })

  const { loading, data } = useQuery(ProductItemsDocument, {
    variables: {
      skip,
      take,
      where: {
        productId: { equals: productId },
        ...(searchTerm ? { id: { contains: searchTerm } } : null),
      },
    },
  })

  const isOwner =
    account.toLowerCase() === productData?.product.manufacturerId.toLowerCase()

  return (
    <div>
      <PageTitle>Product Items</PageTitle>
      <div className="flex items-baseline justify-between mb-4">
        <div className="flex items-center gap-2 max-w-sm shadow-xl bg-white px-4 rounded">
          <IconSearch />
          <input
            placeholder="Search item id"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow py-4 bg-transparent"
          />
        </div>
        <div>
          {isOwner ? (
            <div className="flex gap-2">
              <AddProductItems productId={productId} />
              <BulkStatusUpdateDialog />
            </div>
          ) : null}
        </div>
      </div>
      <ShowData
        loading={loading}
        pagination={{
          resultCount: data?.productItems?.length,
          totalCount: data?.productItemsCount,
          setSkip,
          setTake,
          skip,
          take,
        }}
      >
        {data?.productItems?.map((item) => (
          <ProductItemCard key={item.id} productItem={item} isOwner={isOwner} />
        ))}
      </ShowData>
    </div>
  )
}
