<<<<<<< HEAD
import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
=======
import { Injectable, NotFoundException } from '@nestjs/common';
>>>>>>> 0f155520eaa393342b5db16c8dfe37d372667d12
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoVeiculoDto } from '../dto/create-tipo-veiculo.dto';
import { UpdateTipoVeiculoDto } from '../dto/update-tipo-veiculo.dto';
import { TipoVeiculo } from '../tipo-veiculo.entity';

@Injectable()
<<<<<<< HEAD
export class TipoVeiculoService implements OnApplicationBootstrap {
=======
export class TipoVeiculoService {
>>>>>>> 0f155520eaa393342b5db16c8dfe37d372667d12
  constructor(
    @InjectRepository(TipoVeiculo)
    private readonly tipoVeiculoRepository: Repository<TipoVeiculo>,
  ) {}

<<<<<<< HEAD
  async onApplicationBootstrap() {
    await this.ensureDefaultTipos();
  }

  private async ensureDefaultTipos() {
    const tipos = ['Carro', 'Moto'];

    for (const descricao of tipos) {
      const exists = await this.tipoVeiculoRepository.findOneBy({ descricao });
      if (!exists) {
        const tipo = this.tipoVeiculoRepository.create({ descricao });
        await this.tipoVeiculoRepository.save(tipo);
        console.log(`TipoVeiculo "${descricao}" criado`);
      }
    }
  }

=======
>>>>>>> 0f155520eaa393342b5db16c8dfe37d372667d12
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
