import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltroViagemDto {
    @ApiPropertyOptional({ description: 'ID do motorista para filtro' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    motoristaId?: number;
}
