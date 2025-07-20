import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Viagem } from '../viagem/viagem.entity';
import { Avaliacao } from './avaliacao.entity';
import { AvaliacaoController } from './controller/avaliacao.controller';
import { AvaliacaoService } from './services/avaliacao.service';

@Module({
  imports:[TypeOrmModule.forFeature([Avaliacao,Usuario,Viagem])],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService]
})
export class AvaliacaoModule {}
