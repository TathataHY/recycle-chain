import { Field, ObjectType } from '@nestjs/graphql';
import { $Enums, ProductItem as ProductItemType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class ProductItem
  implements RestrictProperties<ProductItem, ProductItemType>
{
  id: string;
  productId: string;
  @Field(() => $Enums.ProductStatus)
  status: $Enums.ProductStatus;
  timestamp: Date;
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
