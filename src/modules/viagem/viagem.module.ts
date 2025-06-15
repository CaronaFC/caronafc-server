import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jogo } from '../jogo/jogo.entity';
import { Usuario } from '../usuario/usuario.entity';
import { ViagemController } from './controller/viagem.controller';
import { ViagemService } from './services/viagem.service';
import { Viagem } from './viagem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Viagem,Usuario, Jogo])],
  providers: [ViagemService],
  controllers: [ViagemController]
})
export class ViagemModule {}
