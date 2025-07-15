import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ViagemService } from '../services/viagem.service';
import { CreateViagemDto } from '../dto/create-viagem.dto';
import { Viagem } from '../viagem.entity';
import { AuthGuard } from '@nestjs/passport';
import { Query } from '@nestjs/common';

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
    async findAll(
        @Query('motoristaId') motoristaId?: number
    ): Promise<Viagem[]> {
        if (motoristaId) {
            return this.viagemService.findByMotoristaId(Number(motoristaId));
        }
        return this.viagemService.findAll();
    }
}