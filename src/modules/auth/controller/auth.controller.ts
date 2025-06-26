import { Controller, Headers, HttpCode, HttpStatus, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUsuarioDto } from 'src/modules/usuario/dto/create-usuario.dto';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';
import admin from '../../firebase/firebase-admin';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly usuarioService: UsuarioService
    ) { };

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(AuthGuard('local'))
    @ApiBody({ type: LoginDto })
    async login(@Request() req) {
        const token = this.authService.login(req.user.id);
        return { id: req.user.id, token }
    }

    @Post('firebase')
    async firebaseLogin(@Headers('authorization') authHeader: string){
        if(!authHeader) throw new UnauthorizedException('No token provided');
        const token = authHeader.split(' ')[1];
        try{
            const decoded = await admin.auth().verifyIdToken(token);
            let user = await this.usuarioService.findOneByEmail(String(decoded.email));

            if (!user) {
                const newUser: CreateUsuarioDto = {
                    nome_completo: decoded.name,
                    email: String(decoded.email),
                    numero: '',
                    cpf: '',
                    senha: '',
                    imagem: decoded.picture,
                    data_nascimento: new Date(),
                    veiculos:[],
                }
                user = await this.usuarioService.create(newUser);
            }
            return { id: user.id, email: user.email};
        } catch (e) {
            throw new UnauthorizedException('Invalid Firebase token')
        }
    }
}
