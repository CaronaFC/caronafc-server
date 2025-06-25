import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { };

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(AuthGuard('local'))
    @ApiBody({ type: LoginDto })
    async login(@Request() req) {
        const token = this.authService.login(req.user.id);
        return { id: req.user.id, token }
    }
}
