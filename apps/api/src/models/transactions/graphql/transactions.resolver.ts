import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ProductItem } from 'src/models/product-items/graphql/entity/product-item.entity';
import {
  FindManyTransactionArgs,
  FindUniqueTransactionArgs,
} from './dtos/find.args';
import { Transaction } from './entity/transaction.entity';
import { TransactionsService } from './transactions.service';

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Transaction], { name: 'transactions' })
  findAll(@Args() args: FindManyTransactionArgs) {
    return this.transactionsService.findAll(args);
  }

  @Query(() => Transaction, { name: 'transaction' })
  findOne(@Args() args: FindUniqueTransactionArgs) {
    return this.transactionsService.findOne(args);
  }

  @ResolveField(() => ProductItem, { name: 'productItem' })
  resolveProductItem(@Parent() transaction: Transaction) {
    return this.prisma.productItem.findUnique({
      where: { id: transaction.productItemId },
    });
  }
}
