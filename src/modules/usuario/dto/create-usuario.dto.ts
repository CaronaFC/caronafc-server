import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUsuarioDto {
    @ApiProperty({
        description: 'Nome completo do usuário',
        example: 'João da Silva'
    })
    nome_completo: string;

    @ApiPropertyOptional({
        description: 'UID do Google, se o usuário tiver',
        example: 'google-uid-1234567890'
    })
    googleuid?: string;

    @ApiProperty({
        description: 'Email do usuário',
        example: 'joao.silva@email.com'
    })
    email: string;

    @ApiProperty({
        description: 'Número de telefone',
        example: '+55 11 99999-9999'
    })
    numero: string;

    @ApiProperty({
        description: 'CPF do usuário',
        example: '123.456.789-00'
    })
    cpf: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'senhaSegura123'
    })
    senha: string;

    @ApiPropertyOptional({
        description: 'URL da imagem do usuário',
        example: 'https://meusite.com/imagens/usuario1.jpg'
    })
    imagem?: string;

    @ApiPropertyOptional({
        description: 'Data de nascimento do usuário',
        example: '1990-05-25',
        type: String,
        format: 'date'
    })
    data_nascimento?: Date;

    @ApiPropertyOptional({
        description: 'IDs dos veículos associados',
        example: [1, 2, 3],
        type: [Number]
    })
    veiculos?: number[];
}
