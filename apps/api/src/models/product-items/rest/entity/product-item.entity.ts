import { registerEnumType } from '@nestjs/graphql';
import { $Enums, ProductItem } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

registerEnumType($Enums.ProductStatus, {
  name: 'ProductStatus',
});

export class ProductItemEntity
  implements RestrictProperties<ProductItemEntity, ProductItem>
{
  id: string;
  productId: string;
  status: $Enums.ProductStatus;
  timestamp: Date;
}
