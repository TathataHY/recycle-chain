import { ToxicItem } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class ToxicItemEntity
  implements RestrictProperties<ToxicItemEntity, ToxicItem>
{
  name: string;
  id: number;
  weight: number;
  productId: string;
  timestamp: Date;
}
