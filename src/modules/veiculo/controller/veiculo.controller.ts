import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVeiculoDto } from '../dto/create-veiculo.dto';
import { UpdateVeiculoDto } from '../dto/update-veiculo.dto';
import { VeiculoService } from '../services/veiculo.service';

@ApiTags('veiculo')
@Controller('veiculo')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo veículo' })
  @ApiResponse({ status: 201, description: 'O veículo foi criado com sucesso.' })
  create(@Body() createVeiculoDto: CreateVeiculoDto) {
    return this.veiculoService.create(createVeiculoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os veículos' })
  findAll() {
    return this.veiculoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um veículo pelo ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.veiculoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um veículo' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVeiculoDto: UpdateVeiculoDto,
  ) {
    return this.veiculoService.update(id, updateVeiculoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um veículo' })
  @ApiResponse({ status: 204, description: 'Veículo deletado com sucesso' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.veiculoService.remove(id);
  }
}