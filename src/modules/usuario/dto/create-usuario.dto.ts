export class CreateUsuarioDto {
    nome_completo: string;
    email: string;
    numero: string;
    cpf: string;
    senha: string;
    imagem?: string;
    data_nascimento: Date;
    veiculos?: number[];
}