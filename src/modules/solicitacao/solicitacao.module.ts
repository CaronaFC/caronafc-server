import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitacaoViagem } from './solicitacao.entity';
import { SolicitacaoService } from './service/solicitacao.service';
import { SolicitacaoController } from './controller/solicitacao.controller';
import { Viagem } from '../viagem/viagem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitacaoViagem, Viagem])],
  providers: [SolicitacaoService],
  controllers: [SolicitacaoController],
})
export class SolicitacaoModule {}
