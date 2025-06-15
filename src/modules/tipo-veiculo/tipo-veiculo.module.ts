import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from '../veiculo/veiculo.entity';
import { TipoVeiculoController } from './controller/tipo-veiculo.controller';
import { TipoVeiculoService } from './services/tipo-veiculo.service';
import { TipoVeiculo } from './tipo-veiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoVeiculo,Veiculo])],
  controllers: [TipoVeiculoController],
  providers: [TipoVeiculoService]
})
export class TipoVeiculoModule {}
