import { ObjectType } from '@nestjs/graphql';
import { Product as ProductType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Product implements RestrictProperties<Product, ProductType> {
  id: string;
  name: string;
  timestamp: Date;
  manufacturerId: string;
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
