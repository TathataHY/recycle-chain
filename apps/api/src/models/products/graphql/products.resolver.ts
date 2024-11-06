import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductStatus } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Manufacturer } from 'src/models/manufacturers/graphql/entity/manufacturer.entity';
import { ProductItem } from 'src/models/product-items/graphql/entity/product-item.entity';
import { ToxicItem } from 'src/models/toxic-items/graphql/entity/toxic-item.entity';
import { FindManyProductArgs, FindUniqueProductArgs } from './dtos/find.args';
import { ProductWhereInput } from './dtos/where.args';
import { Product } from './entity/product.entity';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Product], { name: 'products' })
  findAll(@Args() args: FindManyProductArgs) {
    return this.productsService.findAll(args);
  }

  @Query(() => Number, { name: 'productsCount' })
  resolveProductsCount(
    @Args('where', { nullable: true }) where: ProductWhereInput,
  ) {
    return this.prisma.product.count({ where });
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args() args: FindUniqueProductArgs) {
    return this.productsService.findOne(args);
  }

  @ResolveField(() => Manufacturer, { name: 'manufacturer' })
  resolveManufacturer(@Parent() product: Product) {
    return this.prisma.manufacturer.findUnique({
      where: { id: product.manufacturerId },
    });
  }

  @ResolveField(() => [ProductItem], { name: 'productItems' })
  resolveProductItems(@Parent() product: Product) {
    return this.prisma.productItem.findMany({
      where: { productId: product.id },
    });
  }

  @ResolveField(() => [ToxicItem], { name: 'toxicItems' })
  resolveToxicItems(@Parent() product: Product) {
    return this.prisma.toxicItem.findMany({
      where: { productId: product.id },
    });
  }

  @ResolveField(() => Number, { name: 'totalCount' })
  resolveTotalCount(@Parent() product: Product) {
    return this.prisma.productItem.count({
      where: { productId: product.id },
    });
  }

  @ResolveField(() => Number, { name: 'getCountPerStatus' })
  resolveGetCountPerStatus(
    @Parent() parent: Product,
    @Args('status', { type: () => ProductStatus }) status: ProductStatus,
  ) {
    return this.prisma.productItem.count({
      where: { status, productId: parent.id },
    });
  }
}
