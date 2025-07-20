import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avaliacao } from '../avaliacao/avaliacao.entity';
import { Veiculo } from '../veiculo/veiculo.entity';
import { UsuarioController } from './controller/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { Usuario } from './usuario.entity';
import { VeiculoRepository } from '../veiculo/repository/veiculo.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario, Avaliacao, Veiculo])],
    controllers: [UsuarioController],
    providers: [UsuarioService],
    exports: [UsuarioService]
})
export class UsuarioModule { }
