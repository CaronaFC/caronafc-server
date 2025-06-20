import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvaliacaoModule } from './modules/avaliacao/avaliacao.module';
import { JogoModule } from './modules/jogo/jogo.module';
import { TipoVeiculoModule } from './modules/tipo-veiculo/tipo-veiculo.module';
import { UsuarioController } from './modules/usuario/controller/usuario.controller';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { VeiculoModule } from './modules/veiculo/veiculo.module';
import { ViagemModule } from './modules/viagem/viagem.module';
import { TimeModule } from './modules/time/time.module';


@Module({
  imports: [
    UsuarioModule, 
    ViagemModule, 
    JogoModule, 
    VeiculoModule, 
    AvaliacaoModule, 
    TipoVeiculoModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER || 'nestuser',
      password: process.env.DATABASE_PASSWORD || 'nestpassword',
      database: process.env.DATABASE_NAME || 'nestdb',
      entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
      synchronize: true, // ativar false ao ativar modo produção
    }),
    TimeModule
],
  controllers: [AppController, UsuarioController],
  providers: [AppService]
})
export class AppModule {}
