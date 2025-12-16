import { UseGuards, Controller, Post, Body, Req, Get, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { CreateAvaliacaoDto } from "../dto/create-avaliacao.dto";
import { AvaliacaoService } from "../services/avaliacao.service";


@ApiTags('Avaliação')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('avaliacoes')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  @ApiOperation({ summary: 'Avaliar uma viagem' })
  async create(@Body() dto: CreateAvaliacaoDto, @Req() req) {
    const avaliadorId = req.user.id;
    return this.avaliacaoService.create(dto, avaliadorId);
  }

  @Get('/:usuarioId')
  @ApiOperation({ summary: 'Calcula a média de avaliações de um usuário' })
  async mediaUsuario(@Param('usuarioId') usuarioId: number) {
    return this.avaliacaoService.calcularMediaUsuario(Number(usuarioId));
  }
}
