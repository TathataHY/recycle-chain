import {
  ArgsType,
  Field,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { ProductItemOrderByWithRelationInput } from './order-by.args';
import {
  ProductItemWhereInput,
  ProductItemWhereUniqueInput,
} from './where.args';

registerEnumType(Prisma.ProductItemScalarFieldEnum, {
  name: 'ProductItemScalarFieldEnum',
});

@ArgsType()
class FindManyProductItemArgsStrict
  implements
    RestrictProperties<
      FindManyProductItemArgsStrict,
      Omit<Prisma.ProductItemFindManyArgs, 'include' | 'select'>
    >
{
  where: ProductItemWhereInput;
  orderBy: ProductItemOrderByWithRelationInput[];
  cursor: ProductItemWhereUniqueInput;
  take: number;
  skip: number;
  @Field(() => [Prisma.ProductItemScalarFieldEnum])
  distinct: Prisma.ProductItemScalarFieldEnum[];
}

@ArgsType()
export class FindManyProductItemArgs extends PartialType(
  FindManyProductItemArgsStrict,
) {}

@ArgsType()
export class FindUniqueProductItemArgs {
  where: ProductItemWhereUniqueInput;
}
