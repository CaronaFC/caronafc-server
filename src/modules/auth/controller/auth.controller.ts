import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';

import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    const token = this.authService.login(req.user.id);
    return { id: req.user.id, token };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ForgotPasswordDto })
  async forgotPassword(@Body() { email }: ForgotPasswordDto) {
    await this.authService.forgotPassword(email);
    return { message: 'email enviado se existir usuario' };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() { email, code, newPassword }: ResetPasswordDto) {
    await this.authService.resetPassword(code, email, newPassword);
    return { message: 'Senha redefinida com sucesso.' };
  }

  @Post('login/google')
  async loginWithGoogle(@Body() { idToken }: { idToken: string }) {
    const user = await this.authService.loginWithGoogle(idToken);
    return { user };
  }
}

