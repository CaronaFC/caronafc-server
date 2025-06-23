import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoVeiculo } from 'src/modules/tipo-veiculo/tipo-veiculo.entity';
import { Usuario } from 'src/modules/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { CreateVeiculoDto } from '../dto/create-veiculo.dto';
import { UpdateVeiculoDto } from '../dto/update-veiculo.dto';
import { Veiculo } from '../veiculo.entity';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculo)
    private readonly veiculoRepository: Repository<Veiculo>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(TipoVeiculo)
    private readonly tipoVeiculoRepository: Repository<TipoVeiculo>,
  ) {}

  async create(createVeiculoDto: CreateVeiculoDto): Promise<Veiculo> {
    const { usuarioId, tipoVeiculoId, ...veiculoData } = createVeiculoDto;

    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${usuarioId} não encontrado.`);
    }

    const tipoVeiculo = await this.tipoVeiculoRepository.findOneBy({ id: tipoVeiculoId });
    if (!tipoVeiculo) {
        throw new NotFoundException(`Tipo de Veículo com ID ${tipoVeiculoId} não encontrado.`);
    }

    const veiculo = this.veiculoRepository.create({
      ...veiculoData, // placa, renavam, marca, cor
      usuario: usuario,
      tipoVeiculo: tipoVeiculo,
    });

    return this.veiculoRepository.save(veiculo);
  }

  findAll(): Promise<Veiculo[]> {
    return this.veiculoRepository.find({ relations: ['usuario', 'tipoVeiculo'] });
  }

  async findOne(id: number): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findOne({
      where: { id },
      relations: ['usuario', 'tipoVeiculo'],
    });

    if (!veiculo) {
      throw new NotFoundException(`Veículo com ID ${id} não encontrado.`);
    }
    return veiculo;
  }

  async update(id: number, updateVeiculoDto: UpdateVeiculoDto): Promise<Veiculo> {
    const veiculo = await this.findOne(id);
    const { usuarioId, tipoVeiculoId, ...veiculoData } = updateVeiculoDto;

    if (tipoVeiculoId) {
      const tipoVeiculo = await this.tipoVeiculoRepository.findOneBy({ id: tipoVeiculoId });
      if (!tipoVeiculo) {
        throw new NotFoundException(`Tipo de Veículo com ID ${tipoVeiculoId} não encontrado.`);
      }
      veiculo.tipoVeiculo = tipoVeiculo;
    }

    if (usuarioId) {
        const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
        if (!usuario) {
          throw new NotFoundException(`Usuário com ID ${usuarioId} não encontrado.`);
        }
        veiculo.usuario = usuario;
      }

    Object.assign(veiculo, veiculoData);
    return this.veiculoRepository.save(veiculo);
  }

  async remove(id: number): Promise<void> {
    const result = await this.veiculoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Veículo com ID ${id} não encontrado.`);
    }
  }
}