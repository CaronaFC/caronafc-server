import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvaliacaoModule } from './modules/avaliacao/avaliacao.module';
import { JogoModule } from './modules/jogo/jogo.module';
import { UsuarioController } from './modules/usuario/controller/usuario.controller';
import { UsuarioService } from './modules/usuario/services/usuario.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { VeiculoModule } from './modules/veiculo/veiculo.module';
import { ViagemModule } from './modules/viagem/viagem.module';
import { TipoVeiculoModule } from './modules/tipo-veiculo/tipo-veiculo.module';

@Module({
  imports: [UsuarioModule, ViagemModule, JogoModule, VeiculoModule, AvaliacaoModule, TipoVeiculoModule],
  controllers: [AppController, UsuarioController],
  providers: [AppService, UsuarioService],
})
export class AppModule {}
