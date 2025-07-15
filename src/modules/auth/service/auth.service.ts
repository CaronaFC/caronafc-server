import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
        const existingToken = await this.tokenRepository.findOne({
            where: { usuario: { id: usuario.id } },
            order: { createdAt: 'DESC' },
        });

        if (existingToken) {
            const now = Date.now();
            const lastRequestTime = existingToken.createdAt.getTime();

            const minInterval = this.configService.get<number>('MIN_INTERVAL_MS') || 86400000;

            if (now - lastRequestTime < minInterval) {
            // Tempo mínimo ainda não passou
                throw new BadRequestException('Voce solicitou a redefinição de senha recentemente. Tente novamente mais tarde.');
        }
    }

        const rawToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
        const expiresAt = new Date(Date.now() + 3600000);

        await this.tokenRepository.delete({ usuario: { id: usuario.id } });

        const resetToken = this.tokenRepository.create({
            token: hashedToken,
            usuario,
            expiresAt,
        });
        await this.tokenRepository.save(resetToken);

        const resetLink = `${this.configService.get<string>('FRONTEND_URL')}/--/ResetPassword?token=${rawToken}`;

        // Envia o e-mail usando o template Handlebars
        await this.mailerService.sendMail({
            to: usuario.email,
            subject: 'Recuperação de Senha - CaronaFC',
            template: 'recuperacao-senha', // Nome do arquivo .hbs
            context: {
                nome: usuario.nome_completo,
                link: resetLink,
            },
        });
    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        if (!token || !newPassword) {
            throw new UnauthorizedException('Token ou nova senha inválidos.');
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        
        const resetToken = await this.tokenRepository.findOne({
            where: { token: hashedToken },
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
