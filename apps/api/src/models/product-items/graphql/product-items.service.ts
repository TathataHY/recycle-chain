import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  FindManyProductItemArgs,
  FindUniqueProductItemArgs,
} from './dtos/find.args';

@Injectable()
export class ProductItemsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyProductItemArgs) {
    return this.prisma.productItem.findMany(args);
  }

  findOne(args: FindUniqueProductItemArgs) {
    return this.prisma.productItem.findUnique(args);
  }
}
