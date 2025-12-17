import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ViagemStatus } from '../viagem.entity';

export class FiltroViagemDto {
    @ApiPropertyOptional({ description: 'ID do motorista para filtro' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    motoristaId?: number;

    @ApiPropertyOptional({ description: 'Status da viagem para filtro' })
    @IsOptional()
    @IsEnum(ViagemStatus, {
        message: `Status inválido. Valores permitidos: ${Object.values(ViagemStatus).join(', ')}`,
    })
    status?: ViagemStatus;
}
