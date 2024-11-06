import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  FindManyManufacturerArgs,
  FindUniqueManufacturerArgs,
} from './dtos/find.args';

@Injectable()
export class ManufacturersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyManufacturerArgs) {
    return this.prisma.manufacturer.findMany(args);
  }

  findOne(args: FindUniqueManufacturerArgs) {
    return this.prisma.manufacturer.findUnique(args);
  }
}
