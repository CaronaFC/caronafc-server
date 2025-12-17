import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jogo } from '../jogo/jogo.entity';
import { Usuario } from '../usuario/usuario.entity';
import { ViagemController } from './controller/viagem.controller';
import { ViagemService } from './services/viagem.service';
import { Viagem } from './viagem.entity';
import { Veiculo } from '../veiculo/veiculo.entity';
import { ViagemGateway } from './viagem.gateway';
import { SolicitacaoViagem } from '../solicitacao/solicitacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Viagem, Usuario, Jogo, Veiculo, SolicitacaoViagem])],
  providers: [ViagemService, ViagemGateway],
  controllers: [ViagemController],
})
export class ViagemModule {}
