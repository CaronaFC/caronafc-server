import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import jwtConfig from './config/jwt.config';
import { AuthController } from './controller/auth.controller';
import { PasswordResetToken } from './password-reset-token.entity';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      PasswordResetToken
    ]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsuarioModule,
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
