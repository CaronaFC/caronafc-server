import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';
import { Usuario } from 'src/modules/usuario/usuario.entity';
import { AuthJwtPayload } from '../dto/auth-jwtPayload.dto';

import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { PasswordResetToken } from '../password-reset-token.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
        private jwtService: JwtService,

        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(PasswordResetToken)
        private readonly tokenRepository: Repository<PasswordResetToken>,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
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

async forgotPassword(email: string): Promise<void> {
        const usuario = await this.usuarioRepository.findOneBy({ email });
        if (!usuario) {
            return;
        }
        const rawCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedCode = crypto.createHash('sha256').update(rawCode).digest('hex');
        const expiresAt = new Date(Date.now() + 300000); 

        await this.tokenRepository.delete({ usuario: { id: usuario.id } });

        const resetToken = this.tokenRepository.create({
            token: hashedCode,
            usuario,
            expiresAt,
        });
        await this.tokenRepository.save(resetToken);

        //const resetLink = `${this.configService.get<string>('FRONTEND_URL')}/reset-password?token=${rawCode}`;

        // Envia o e-mail usando o template Handlebars
        await this.mailerService.sendMail({
            to: usuario.email,
            subject: 'Código de Recuperação de Senha - CaronaFC',
            template: 'recuperacao-senha', // Nome do caminho do arquivo .hbs
            context: {
                nome: usuario.nome_completo,
                code: rawCode,
                //link: resetLink,
            },
        });
    }

    async resetPassword(code: string, email: string, newPassword: string): Promise<void> {
        if (!code || !newPassword || !email) {
            throw new UnauthorizedException('Dados inválidos.');
        }

        const hashedCode = crypto.createHash('sha256').update(code).digest('hex');

        
        const resetToken = await this.tokenRepository.findOne({
            where: { token: hashedCode, usuario: { email } },
            relations: ['usuario'],
        });

        if (!resetToken || resetToken.expiresAt < new Date()) {
            throw new UnauthorizedException('Token inválido ou expirado.');
        }

        const usuario = resetToken.usuario;
        usuario.senha = newPassword;
        
        await this.usuarioRepository.save(usuario);
        await this.tokenRepository.delete(resetToken.id);
    }
}
