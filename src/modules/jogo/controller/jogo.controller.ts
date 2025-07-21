import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { JogoService } from '../services/jogo.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('jogo')
export class JogoController {
<<<<<<< HEAD
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
=======
    constructor(private readonly jogoService: JogoService){}

    // Aqui você pode definir os endpoints do controlador de Jogo
    // Exemplo: listarJogos
    // @Get('listar')
    @ApiOperation({ summary: 'Lista todos os jogos' })
    @ApiResponse({ status: 200, description: 'Lista de jogos retornada com sucesso' })
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
>>>>>>> 0f155520eaa393342b5db16c8dfe37d372667d12
}
