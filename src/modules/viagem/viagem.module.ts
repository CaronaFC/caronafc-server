import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jogo } from '../jogo/jogo.entity';
import { Usuario } from '../usuario/usuario.entity';
import { ViagemController } from './controller/viagem.controller';
import { ViagemService } from './services/viagem.service';
import { Viagem } from './viagem.entity';
<<<<<<< HEAD
import { Veiculo } from '../veiculo/veiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Viagem, Usuario, Jogo, Veiculo])],
=======

@Module({
  imports: [TypeOrmModule.forFeature([Viagem, Usuario, Jogo])],
>>>>>>> 0f155520eaa393342b5db16c8dfe37d372667d12
  providers: [ViagemService],
  controllers: [ViagemController],
})
export class ViagemModule {}
