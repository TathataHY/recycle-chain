import { Module } from '@nestjs/common';
import { ListenerModule } from 'src/listener/listener.module';
import { ResyncController } from './resync.controller';

@Module({
  imports: [ListenerModule],
  controllers: [ResyncController],
})
export class ResyncModule {}
