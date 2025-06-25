import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';
import { AuthJwtPayload } from '../dto/auth-jwtPayload.dto';
import { compare } from 'bcrypt';
import { Usuario } from 'src/modules/usuario/usuario.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
        private jwtService: JwtService
    ) { }

    async validateUser(identificador: string, password: string) {
        let usuario: Usuario;
        try {
            if (identificador.includes('@')) {
                usuario = await this.usuarioService.findOneByEmail(identificador);
            } else {
                usuario = await this.usuarioService.findOneByNumber(identificador);
            }
        } catch (err) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        if (!usuario) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const isPasswordMatch = await compare(password, usuario.senha);
        if (!isPasswordMatch) throw new UnauthorizedException("Credenciais inválidas");

        return { id: usuario.id };
    }


    login(userId: number) {
        const payload: AuthJwtPayload = { sub: userId }
        return this.jwtService.sign(payload);
    }

}
