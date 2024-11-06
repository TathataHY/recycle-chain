import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Product } from 'src/models/products/graphql/entity/product.entity';
import { Transaction } from 'src/models/transactions/graphql/entity/transaction.entity';
import {
  FindManyProductItemArgs,
  FindUniqueProductItemArgs,
} from './dtos/find.args';
import { ProductItemWhereInput } from './dtos/where.args';
import { ProductItem } from './entity/product-item.entity';
import { ProductItemsService } from './product-items.service';

@Resolver(() => ProductItem)
export class ProductItemsResolver {
  constructor(
    private readonly productItemsService: ProductItemsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [ProductItem], { name: 'productItems' })
  findAll(@Args() args: FindManyProductItemArgs) {
    return this.productItemsService.findAll(args);
  }

  @Query(() => Number, { name: 'productItemsCount' })
  resolveProductItemsCount(
    @Args('where', { nullable: true }) where: ProductItemWhereInput,
  ) {
    return this.prisma.productItem.count({ where });
  }

  @Query(() => ProductItem, { name: 'productItem' })
  findOne(@Args() args: FindUniqueProductItemArgs) {
    return this.productItemsService.findOne(args);
  }

  @ResolveField(() => Product, { name: 'product' })
  resolveProduct(@Parent() productItem: ProductItem) {
    return this.prisma.product.findUnique({
      where: { id: productItem.productId },
    });
  }

  @ResolveField(() => [Transaction], { name: 'transactions' })
  resolveTransactions(@Parent() productItem: ProductItem) {
    return this.prisma.transaction.findMany({
      where: { productItemId: productItem.id },
    });
  }
}
