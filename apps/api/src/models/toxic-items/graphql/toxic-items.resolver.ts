import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Product } from 'src/models/products/graphql/entity/product.entity';
import {
  FindManyToxicItemArgs,
  FindUniqueToxicItemArgs,
} from './dtos/find.args';
import { ToxicItem } from './entity/toxic-item.entity';
import { ToxicItemsService } from './toxic-items.service';

@Resolver(() => ToxicItem)
export class ToxicItemsResolver {
  constructor(
    private readonly toxicItemsService: ToxicItemsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [ToxicItem], { name: 'toxicItems' })
  findAll(@Args() args: FindManyToxicItemArgs) {
    return this.toxicItemsService.findAll(args);
  }

  @Query(() => ToxicItem, { name: 'toxicItem' })
  findOne(@Args() args: FindUniqueToxicItemArgs) {
    return this.toxicItemsService.findOne(args);
  }

  @ResolveField(() => Product, { name: 'product' })
  resolveProduct(@Parent() toxicItem: ToxicItem) {
    return this.prisma.product.findUnique({
      where: { id: toxicItem.productId },
    });
  }
}
