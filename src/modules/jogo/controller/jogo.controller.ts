import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JogoService } from '../services/jogo.service';

@Controller('jogo')
export class JogoController {
  constructor(private readonly jogoService: JogoService) {}

  @ApiOperation({ summary: 'Lista todos os jogos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de jogos retornada com sucesso',
  })
  @ApiResponse({ status: 500, description: 'Erro ao buscar jogos' })
  @Get('listar')
  async listarJogos() {
    return this.jogoService.listarJogos();
  }

  @Get('buscar/:id')
  @ApiOperation({ summary: 'Busca um time por ID' })
  @ApiResponse({ status: 200, description: 'time encontrado' })
  @ApiResponse({ status: 404, description: 'time não encontrado' })
  async buscarTimePorId(@Param('id') id: number) {
    const time = await this.jogoService.buscarTimePorId(id);
    if (!time) {
      throw new NotFoundException('Time não encontrado');
    }
    return time;
  }
}
