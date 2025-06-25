// src/modules/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'usuario@email.com' })
    email: string;

    @ApiProperty({ example: 'senhaSegura123' })
    password: string;
}
