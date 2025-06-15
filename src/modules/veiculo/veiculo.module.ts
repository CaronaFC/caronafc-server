import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoVeiculo } from '../tipo-veiculo/tipo-veiculo.entity';
import { Usuario } from '../usuario/usuario.entity';
import { VeiculoController } from './controller/veiculo.controller';
import { VeiculoService } from './services/veiculo.service';
import { Veiculo } from './veiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Veiculo, TipoVeiculo, Usuario])],
  providers: [VeiculoService],
  controllers: [VeiculoController]
})
export class VeiculoModule {}
