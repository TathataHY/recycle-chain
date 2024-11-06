import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductStatus } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Product } from 'src/models/products/graphql/entity/product.entity';
import {
  FindManyManufacturerArgs,
  FindUniqueManufacturerArgs,
} from './dtos/find.args';
import { ManufacturerWhereInput } from './dtos/where.args';
import { Manufacturer } from './entity/manufacturer.entity';
import { ManufacturersService } from './manufacturers.service';

@Resolver(() => Manufacturer)
export class ManufacturersResolver {
  constructor(
    private readonly manufacturersService: ManufacturersService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Manufacturer], { name: 'manufacturers' })
  findAll(@Args() args: FindManyManufacturerArgs) {
    return this.manufacturersService.findAll(args);
  }

  @Query(() => Number, { name: 'manufacturersCount' })
  resolveManufacturersCount(
    @Args('where', { nullable: true }) where: ManufacturerWhereInput,
  ) {
    return this.prisma.manufacturer.count({ where });
  }

  @Query(() => Manufacturer, { name: 'manufacturer' })
  findOne(@Args() args: FindUniqueManufacturerArgs) {
    return this.manufacturersService.findOne(args);
  }

  @ResolveField(() => [Product], { name: 'products' })
  resolveProducts(@Parent() manufacturer: Manufacturer) {
    return this.prisma.product.findMany({
      where: { manufacturerId: manufacturer.id },
    });
  }

  @ResolveField(() => Number, { name: 'productsCount' })
  resolveProductsCount(@Parent() manufacturer: Manufacturer) {
    return this.prisma.product.count({
      where: { manufacturerId: manufacturer.id },
    });
  }

  @ResolveField(() => Number, { name: 'totalCount' })
  resolveTotalCount(@Parent() manufacturer: Manufacturer) {
    return this.prisma.productItem.count({
      where: { product: { manufacturerId: manufacturer.id } },
    });
  }

  @ResolveField(() => Number, { name: 'getCountPerStatus' })
  resolveGetCountPerStatus(
    @Parent() parent: Manufacturer,
    @Args('status', { type: () => ProductStatus }) status: ProductStatus,
  ) {
    return this.prisma.productItem.count({
      where: { status, product: { manufacturerId: parent.id } },
    });
  }
}
