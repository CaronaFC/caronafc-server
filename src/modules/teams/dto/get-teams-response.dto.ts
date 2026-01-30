import { ApiProperty } from '@nestjs/swagger';

export class GetTeamsResponseDto {
  @ApiProperty({ example: 3963 })
  id: number;

  @ApiProperty({ example: 'Juventude' })
  name: string;
}
