import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { UsuarioModule } from '../usuario/usuario.module';
import { UsuarioService } from '../usuario/services/usuario.service';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsuarioModule,
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
