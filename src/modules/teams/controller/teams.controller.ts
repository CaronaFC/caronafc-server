import { Controller, Get } from '@nestjs/common';
import { TeamsService } from '../services/teams.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTeamsResponseDto } from '../dto/get-teams-response.dto';

@ApiTags('times')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @ApiOperation({
    summary: 'Lista todos os times únicos extraídos das partidas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de times retornada com sucesso',
    type: [GetTeamsResponseDto],
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get('listar')
  listarTimes(): GetTeamsResponseDto[] {
    return this.teamsService.getAllTeams();
  }
}
