import { Module } from '@nestjs/common';
import { ViagemService } from './service/viagem.service';
import { ViagemController } from './viagem.controller';

@Module({
  providers: [ViagemService],
  controllers: [ViagemController]
})
export class ViagemModule {}
