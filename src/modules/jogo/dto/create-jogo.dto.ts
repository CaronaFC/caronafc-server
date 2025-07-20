import { ApiProperty } from '@nestjs/swagger';

export class CreateJogoDto {
    @ApiProperty({ example: 950250 })
    idMatch: number;

    @ApiProperty({ example: 'Estádio Alfredo Jaconi' })
    nomeEstadio: string;

    @ApiProperty({ example: -29.1629 })
    latitude: number;

    @ApiProperty({ example: -51.1791 })
    longitude: number;

    @ApiProperty({ type: String, example: '2025-07-12T22:00:00Z' })
    dataJogo: Date;
}
