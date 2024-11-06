import {
  Controller,
  Headers,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ListenerService } from 'src/listener/listener.service';

@Controller('resync-blockchain-data')
export class ResyncController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly listenerService: ListenerService,
  ) {}

  @Post()
  async resyncBlockchainData(@Headers('x-api-secret') apiSecret: string) {
    if (apiSecret !== process.env.API_SECRET) {
      throw new UnauthorizedException();
    }
    try {
      await this.prismaService.transaction.deleteMany();
      await this.prismaService.productItem.deleteMany();
      await this.prismaService.product.deleteMany();
      await this.prismaService.manufacturer.deleteMany();
      await this.prismaService.toxicItem.deleteMany();
      await this.listenerService.resyncBlockchainData();
      return { message: 'Blockchain data resynced' };
    } catch (error) {
      console.error('Error resyncing blockchain data', error);
      throw new InternalServerErrorException();
    }
  }
}
