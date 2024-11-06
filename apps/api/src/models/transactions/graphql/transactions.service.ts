import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  FindManyTransactionArgs,
  FindUniqueTransactionArgs,
} from './dtos/find.args';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyTransactionArgs) {
    return this.prisma.transaction.findMany(args);
  }

  findOne(args: FindUniqueTransactionArgs) {
    return this.prisma.transaction.findUnique(args);
  }
}
