import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateAvaliacaoDto {
  @ApiProperty({
    description: 'Nota da avaliação (1 a 5)',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  nota: number;

  @ApiProperty({
    description: 'Comentário opcional sobre a viagem',
    example: 'Motorista pontual e carro limpo',
    required: false,
  })
  @IsOptional()
  @IsString()
  comentario?: string;

  @ApiProperty({
    description: 'ID do usuário que está sendo avaliado',
    example: 3,
  })
  @IsInt()
  avaliadoId: number;

  @ApiProperty({
    description: 'ID da viagem avaliada',
    example: 12,
  })
  @IsInt()
  viagemId: number;
}
