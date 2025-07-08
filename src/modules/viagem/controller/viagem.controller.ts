import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ViagemService } from '../services/viagem.service';
import { CreateViagemDto } from '../dto/create-viagem.dto';
import { Viagem } from '../viagem.entity';
import { AuthGuard } from '@nestjs/passport';

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
    @ApiOperation({ summary: 'Lista todas as viagens' })
    @ApiResponse({ status: 200, description: 'Viagens encontradas com sucesso', type: [Viagem] })
    @ApiResponse({ status: 404, description: 'Nenhuma viagem encontrada' })
    @ApiOkResponse({ description: 'Lista todas as viagens', type: [Viagem] })
    async findAll(): Promise<Viagem[]> {
        return this.viagemService.findAll();
    }
}