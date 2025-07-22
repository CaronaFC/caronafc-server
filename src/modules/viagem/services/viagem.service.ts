import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/modules/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { Viagem } from '../viagem.entity';
import { CreateViagemDto } from '../dto/create-viagem.dto';
import { Veiculo } from 'src/modules/veiculo/veiculo.entity';
import { ViagemStatus } from "../viagem.entity"

@Injectable()
export class ViagemService {
  constructor(
    @InjectRepository(Viagem)
    private viagemRepository: Repository<Viagem>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Veiculo)
    private veiculoRepository: Repository<Veiculo>,
  ) {}

  async create(createViagemDto: CreateViagemDto): Promise<Viagem> {
    const {
      motoristaId,
      jogo,
      origem_lat,
      origem_long,
      destino_lat,
      destino_long,
      horario,
      qtdVagas,
      temRetorno,
      valorPorPessoa,
    } = createViagemDto;
    const motorista = await this.usuarioRepository.findOneBy({
      id: motoristaId,
    });
    if (!motorista) throw new Error('Motorista não encontrado');

    const veiculo = await this.veiculoRepository.findOneBy({
      id: createViagemDto.veiculoId,
    });
    if (!veiculo) throw new NotFoundException('Veículo não encontrado');

    const viagem = this.viagemRepository.create({
      motorista,
      jogo,
      origem_lat,
      origem_long,
      destino_lat,
      destino_long,
      horario: new Date(horario),
      qtdVagas,
      temRetorno,
      valorPorPessoa,
      passageiros: [], // inicia vazio
      veiculo,
    });
    console.log('Criando viagem:', viagem);
    return this.viagemRepository.save(viagem);
  }

  async findAll(): Promise<Viagem[]> {
    return this.viagemRepository.find({
      relations: ['motorista', 'passageiros'], // Carrega relações importantes
    });
  }

  async findByMotoristaId(motoristaId: number): Promise<Viagem[]> {
    return this.viagemRepository.find({
      where: {
        motorista: {
          id: motoristaId,
        },
      },
      relations: ['motorista', 'passageiros'], // adjust as needed
    });
  }

  async adicionarPassageiro(
    viagemId: number,
    usuarioId: number,
  ): Promise<Viagem> {
    const viagem = await this.viagemRepository.findOne({
      where: { id: viagemId },
      relations: ['passageiros'],
    });

    if (!viagem) throw new Error('Viagem não encontrada');

    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!usuario) throw new Error('Usuário não encontrado');

    const jaEstaNaViagem = viagem.passageiros.some((p) => p.id === usuario.id);
    if (jaEstaNaViagem) throw new Error('Usuário já está na viagem');

    viagem.passageiros.push(usuario);
    return this.viagemRepository.save(viagem);
  }

  async delete(id: number): Promise<void> {
    const viagem = await this.viagemRepository.findOneBy({ id });
    if (!viagem) {
      throw new NotFoundException('Viagem não encontrada');
    }
    await this.viagemRepository.remove(viagem);
  }

  async findById(viagemId: number): Promise<Viagem> {
    const viagem = await this.viagemRepository.findOne({
      where: { id: viagemId },
      relations: ['motorista', 'passageiros', 'veiculo'],
    });

    if (!viagem) {
      throw new NotFoundException('Viagem não encontrada');
    }

    return viagem;
  }

  async updateStatus(id: number, status: ViagemStatus): Promise<Viagem> {
  const viagem = await this.findById(id);
  viagem.status = status;
  return this.viagemRepository.save(viagem);
}
}
