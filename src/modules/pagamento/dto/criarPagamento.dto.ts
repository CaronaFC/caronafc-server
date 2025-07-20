import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CriarPagamentoDto {
  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsNotEmpty()
  description: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  method_payment_id: string;

  @IsBoolean()
  binary_mode?: boolean = true; // Define o modo binário como true por padrão
}
