import { Product } from '@prisma/client';
import { IsDate, IsString, IsInt } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class ProductEntity
  implements RestrictProperties<ProductEntity, Product>
{
  id: string;
  name: string;
  manufacturerId: string;
  timestamp: Date;
}
