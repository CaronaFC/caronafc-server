import { Module } from '@nestjs/common';
import { TipoVeiculoController } from './controller/tipo-veiculo.controller';
import { TipoVeiculoService } from './tipo-veiculo.service';

@Module({
  controllers: [TipoVeiculoController],
  providers: [TipoVeiculoService]
})
export class TipoVeiculoModule {}
