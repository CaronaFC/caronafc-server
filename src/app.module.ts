import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioController } from './modules/usuario/usuario.controller';
import { UsuarioService } from './modules/usuario/usuario.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ViagemModule } from './modules/viagem/viagem.module';
import { JogoModule } from './modules/jogo/jogo.module';
import { VeiculoModule } from './modules/veiculo/veiculo.module';
import { AvaliacaoModule } from './modules/avaliacao/avaliacao.module';

@Module({
  imports: [UsuarioModule, ViagemModule, JogoModule, VeiculoModule, AvaliacaoModule],
  controllers: [AppController, UsuarioController],
  providers: [AppService, UsuarioService],
})
export class AppModule {}
