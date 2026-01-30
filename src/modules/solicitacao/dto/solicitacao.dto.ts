import { ApiProperty } from '@nestjs/swagger';

export class CreateSolicitacaoDto {
  @ApiProperty()
  viagemId: number;
}
