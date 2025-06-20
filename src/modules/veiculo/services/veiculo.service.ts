import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculo } from '../veiculo.entity';
import { CreateVeiculoDto } from '../dto/create-veiculo.dto';
import { UpdateVeiculoDto } from '../dto/update-veiculo.dto';
import { Usuario } from '../../usuario/usuario.entity';
import { TipoVeiculo } from 'src/modules/tipo-veiculo/tipo-veiculo.entity';
import { VeiculoRepository } from '../repository/veiculo.repository';
import { UsuarioRepository } from 'src/modules/avaliacao/repository/avaliacao.repository';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculo)
    private readonly veiculoRepository: VeiculoRepository,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: UsuarioRepository,
    @InjectRepository(TipoVeiculo)
    private readonly tipoVeiculoRepository: VeiculoRepository
  ) {}

async create(usuarioId: number, createVeiculoDto: CreateVeiculoDto): Promise<Veiculo> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
    if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
    }

    // Busca a entidade TipoVeiculo
    const tipo = await this.tipoVeiculoRepository.findOne({ where: { id: createVeiculoDto.tipoVeiculo } });
    if(!tipo){
        throw new NotFoundException('TipoVeiculo não encontrado');
    }

    // Remove tipoVeiculo do DTO e monta o objeto corretamente
    const { tipoVeiculo, ...veiculoData } = createVeiculoDto;

    const veiculo = this.veiculoRepository.create({
        ...veiculoData,
        usuario,
        tipoVeiculo: tipo, // associa a entidade TipoVeiculo
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
      throw new NotFoundException('Veículo não encontrado');
    }
    return veiculo;
  }

  async update(id: number, updateVeiculoDto: UpdateVeiculoDto): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findOne({ where: { id } });
    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado');
    }

    // Se quiser permitir troca de usuário, busque o novo usuário
    if (updateVeiculoDto.usuario) {
      const usuario = await this.usuarioRepository.findOne({
        where: { id: updateVeiculoDto.usuario },
      });
      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
      }
    }

    Object.assign(veiculo, updateVeiculoDto);

    return this.veiculoRepository.save(veiculo);
  }

  async remove(id: number): Promise<void> {
    await this.veiculoRepository.delete(id);
  }
}