import { ApiProperty } from '@nestjs/swagger';
import { CreateJogoDto } from '../../jogo/dto/create-jogo.dto';

export class CreateViagemDto {
    @ApiProperty()
    motoristaId: number;

    @ApiProperty({ type: CreateJogoDto })
    jogo: CreateJogoDto;

    @ApiProperty()
    origem_lat: number;

    @ApiProperty()
    origem_long: number;

    @ApiProperty({ type: String, example: '2025-07-12T22:00:00Z' })
    horario: Date;

    @ApiProperty()
    qtdVagas: number;

    @ApiProperty({ example: true })
    temRetorno: boolean;

    @ApiProperty({ example: 15.00 })
    valorPorPessoa: number;
}
