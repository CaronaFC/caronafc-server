import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SolicitacaoService } from '../service/solicitacao.service';
import { CreateSolicitacaoDto } from '../dto/solicitacao.dto';
import { SolicitacaoViagem, StatusSolicitacao } from '../solicitacao.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Solicitações')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
@UseGuards(AuthGuard('jwt'))
@Controller('solicitacoes')
export class SolicitacaoController {
  constructor(private readonly solicitacaoService: SolicitacaoService) {}

  @Post()
  @ApiOperation({ summary: 'Solicitar participação em uma viagem' })
  @ApiResponse({
    status: 201,
    description: 'Solicitação criada com sucesso',
    type: SolicitacaoViagem,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async solicitar(
    @Body() dto: CreateSolicitacaoDto,
    @Req() req: any,
  ): Promise<SolicitacaoViagem> {
    return this.solicitacaoService.criarSolicitacao(dto, req.user);
  }

  @Get('minhas')
  @ApiOperation({ summary: 'Listar solicitações do usuário autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Solicitações retornadas com sucesso',
    type: [SolicitacaoViagem],
  })
  async minhas(@Req() req: any): Promise<SolicitacaoViagem[]> {
    return this.solicitacaoService.listarMinhasSolicitacoes(req.user.id);
  }

  @Patch(':id/status/:status')
  @ApiOperation({ summary: 'Atualizar status da solicitação (motorista)' })
  @ApiResponse({
    status: 200,
    description: 'Status atualizado com sucesso',
    type: SolicitacaoViagem,
  })
  @ApiResponse({ status: 403, description: 'Permissão negada' })
  async atualizarStatus(
    @Param('id') id: number,
    @Param('status') status: StatusSolicitacao,
    @Req() req: any,
  ): Promise<SolicitacaoViagem> {
    return this.solicitacaoService.atualizarStatus(id, status, req.user);
  }

  @Get('viagem/:id')
  @ApiOperation({
    summary: 'Lista as solicitações de uma viagem específica',
  })
  @ApiResponse({ status: 200, type: [SolicitacaoViagem] })
  async listarPorViagem(@Param('id') id: number): Promise<SolicitacaoViagem[]> {
    return this.solicitacaoService.listarSolicitacoesPorViagem(id);
  }
}
