import { $Enums, Transaction } from '@prisma/client';
import { IsDate, IsString, IsInt } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class TransactionEntity
  implements RestrictProperties<TransactionEntity, Transaction>
{
  id: number;
  timestamp: Date;
  status: $Enums.ProductStatus;
  productItemId: string;
}
