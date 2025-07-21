<<<<<<< HEAD
import { Body, Controller, Get, Post, UseGuards, Param, Patch, Delete } from '@nestjs/common';
=======
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
>>>>>>> 0f155520eaa393342b5db16c8dfe37d372667d12
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ViagemService } from '../services/viagem.service';
import { CreateViagemDto } from '../dto/create-viagem.dto';
import { Viagem } from '../viagem.entity';
import { AuthGuard } from '@nestjs/passport';
import { Query } from '@nestjs/common';
<<<<<<< HEAD
import { FiltroViagemDto } from '../dto/filtro-viagem.dto';
=======
>>>>>>> 0f155520eaa393342b5db16c8dfe37d372667d12

@ApiTags('Viagem')
@Controller('viagem')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
@UseGuards(AuthGuard('jwt'))
export class ViagemController {
    constructor(private readonly viagemService: ViagemService) { }

    @Post()
    @ApiOperation({ summary: 'Cria uma nova viagem' })
    @ApiResponse({ status: 201, description: 'Viagem criada com sucesso', type: Viagem })
    @ApiResponse({ status: 400, description: 'Erro de validação ou dados inválidos' })
    async create(@Body() dto: CreateViagemDto): Promise<Viagem> {
        return this.viagemService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Lista todas as viagens ou filtra por motoristaId' })
    @ApiResponse({ status: 200, description: 'Viagens encontradas com sucesso', type: [Viagem] })
    @ApiResponse({ status: 404, description: 'Nenhuma viagem encontrada' })
    @ApiOkResponse({ description: 'Lista todas as viagens ou filtradas por motoristaId', type: [Viagem] })
<<<<<<< HEAD
    async findAll(@Query() filtro: FiltroViagemDto): Promise<Viagem[]> {
        if (filtro.motoristaId) {
            return this.viagemService.findByMotoristaId(Number(filtro.motoristaId));
        }
        return this.viagemService.findAll();
    }

    @Patch(':id/adicionar-passageiro/:usuarioId')
    @ApiOperation({ summary: 'Adiciona um passageiro a uma viagem' })
    @ApiResponse({ status: 200, description: 'Passageiro adicionado com sucesso' })
    @ApiResponse({ status: 404, description: 'Viagem ou usuário não encontrado' })
    async adicionarPassageiro(
      @Param('id') viagemId: number,
      @Param('usuarioId') usuarioId: number,
    ): Promise<Viagem> {
      return this.viagemService.adicionarPassageiro(Number(viagemId), Number(usuarioId));
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Remove uma viagem pelo ID' })
    @ApiResponse({ status: 200, description: 'Viagem removida com sucesso' })
    @ApiResponse({ status: 404, description: 'Viagem não encontrada' })
    async delete(@Param('id') id: number): Promise<{ message: string }> {
        await this.viagemService.delete(Number(id));
        return { message: 'Viagem removida com sucesso' };
    }
=======
    async findAll(
        @Query('motoristaId') motoristaId?: number
    ): Promise<Viagem[]> {
        if (motoristaId) {
            return this.viagemService.findByMotoristaId(Number(motoristaId));
        }
        return this.viagemService.findAll();
    }
>>>>>>> 0f155520eaa393342b5db16c8dfe37d372667d12
}