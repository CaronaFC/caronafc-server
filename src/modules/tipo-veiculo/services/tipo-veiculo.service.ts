import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoVeiculoDto } from '../dto/create-tipo-veiculo.dto';
import { UpdateTipoVeiculoDto } from '../dto/update-tipo-veiculo.dto';
import { TipoVeiculo } from '../tipo-veiculo.entity';

@Injectable()
export class TipoVeiculoService {
  constructor(
    @InjectRepository(TipoVeiculo)
    private readonly tipoVeiculoRepository: Repository<TipoVeiculo>,
  ) {}

  async create(createTipoVeiculoDto: CreateTipoVeiculoDto): Promise<TipoVeiculo> {
    const tipoVeiculo = this.tipoVeiculoRepository.create(createTipoVeiculoDto);
    return this.tipoVeiculoRepository.save(tipoVeiculo);
  }

  async findAll(): Promise<TipoVeiculo[]> {
    return this.tipoVeiculoRepository.find();
  }

  async findOne(id: number): Promise<TipoVeiculo> {
    const tipoVeiculo = await this.tipoVeiculoRepository.findOneBy({ id });
    if (!tipoVeiculo) {
      throw new NotFoundException(`Tipo de veículo com id ${id} não encontrado`);
    }
    return tipoVeiculo;
  }

  async update(id: number, updateTipoVeiculoDto: UpdateTipoVeiculoDto): Promise<TipoVeiculo> {
    const tipoVeiculo = await this.tipoVeiculoRepository.findOneBy({ id });

    if (!tipoVeiculo) {
      throw new NotFoundException(`Tipo de veículo com id ${id} não encontrado`);
    }

    Object.assign(tipoVeiculo, updateTipoVeiculoDto);
    return this.tipoVeiculoRepository.save(tipoVeiculo);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tipoVeiculoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo de veículo com id ${id} não encontrado`);
    }
  }
}
