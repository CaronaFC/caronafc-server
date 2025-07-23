import { Module } from '@nestjs/common';
import { DashboardController } from './controller/dashboard.controller';
import { DashboardService } from './service/dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Veiculo } from '../veiculo/veiculo.entity';
import { Viagem } from '../viagem/viagem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Veiculo, Viagem])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
