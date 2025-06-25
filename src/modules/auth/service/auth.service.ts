import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';
import { AuthJwtPayload } from '../dto/auth-jwtPayload.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {
        const usuario = await this.usuarioService.findOneByEmail(email);
        if (!usuario) throw new UnauthorizedException("Usuário não foi encontrado");

        const isPasswordMatch = await compare(password, usuario.senha);
        if (!isPasswordMatch) throw new UnauthorizedException("Credenciais inválidas");

        return { id: usuario.id };
    }


    login(userId: number) {
        const payload: AuthJwtPayload = { sub: userId }
        return this.jwtService.sign(payload);
    }

}
