import { Field, ObjectType } from '@nestjs/graphql';
import { $Enums, Transaction as TransactionType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Transaction
  implements RestrictProperties<Transaction, TransactionType>
{
  id: number;
  @Field(() => $Enums.ProductStatus)
  status: $Enums.ProductStatus;
  productItemId: string;
  timestamp: Date;
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
