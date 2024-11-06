import { Manufacturer } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class ManufacturerEntity
  implements RestrictProperties<ManufacturerEntity, Manufacturer>
{
  id: string;
  name: string;
  location: string;
  contact: string;
  timestamp: Date;
}
