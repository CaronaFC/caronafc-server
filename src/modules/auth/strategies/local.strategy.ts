import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../service/auth.service";
import { Strategy } from "passport-local";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'senha',
        });
    }


    validate(email: string, senha: string) {
        return this.authService.validateUser(email, senha);
    }


}