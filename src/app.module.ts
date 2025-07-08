import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AvaliacaoModule } from './modules/avaliacao/avaliacao.module';
import { JogoModule } from './modules/jogo/jogo.module';
import { TipoVeiculoModule } from './modules/tipo-veiculo/tipo-veiculo.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { VeiculoModule } from './modules/veiculo/veiculo.module';
import { ViagemModule } from './modules/viagem/viagem.module';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';


@Module({
  imports: [
    UsuarioModule, 
    ViagemModule, 
    JogoModule, 
    VeiculoModule, 
    AvaliacaoModule, 
    TipoVeiculoModule,
    AuthModule,
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

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST'),
          port: config.get<number>('MAIL_PORT'),
          secure: config.get<string>('MAIL_SECURE') === 'true',
          auth: {
            user: config.get<string>('MAIL_USER'),
            pass: config.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: config.get<string>('MAIL_FROM'),
        },
        template: {
          dir: join(__dirname, '..', 'templates', 'email'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
