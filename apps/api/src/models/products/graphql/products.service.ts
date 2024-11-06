import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { FindManyProductArgs, FindUniqueProductArgs } from './dtos/find.args';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyProductArgs) {
    return this.prisma.product.findMany(args);
  }

  findOne(args: FindUniqueProductArgs) {
    return this.prisma.product.findUnique(args);
  }
}
