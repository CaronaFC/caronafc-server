import { Controller, UseGuards } from '@nestjs/common';
import { Body, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateTipoVeiculoDto } from '../dto/create-tipo-veiculo.dto';
import { TipoVeiculoService } from '../services/tipo-veiculo.service';
import { UpdateTipoVeiculoDto } from '../dto/update-tipo-veiculo.dto';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('tipoveiculo')
@Controller('tipoveiculo')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Token JWT ausente ou inválido' })
@UseGuards(AuthGuard('jwt'))
export class TipoVeiculoController {
  constructor(private readonly tipoVeiculoService: TipoVeiculoService) { }

  @Post()
  create(@Body() createTipoVeiculoDto: CreateTipoVeiculoDto) {
    return this.tipoVeiculoService.create(createTipoVeiculoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Todos os tipos' })
  @ApiResponse({ status: 200, description: 'Lista de todos os tipos de veículos' })
  findAll() {
    return this.tipoVeiculoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'tipos por id' })
  findOne(@Param('id') id: number) {
    return this.tipoVeiculoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update no  tipo por id' })
  update(@Param('id') id: string, @Body() updateTipoVeiculoDto: UpdateTipoVeiculoDto) {
    return this.tipoVeiculoService.update(+id, updateTipoVeiculoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete no  tipo por id' })
  remove(@Param('id') id: number) {
    return this.tipoVeiculoService.remove(id);
  }

}