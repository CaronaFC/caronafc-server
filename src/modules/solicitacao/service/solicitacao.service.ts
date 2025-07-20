import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitacaoViagem, StatusSolicitacao } from '../solicitacao.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/modules/usuario/usuario.entity';
import { Viagem } from 'src/modules/viagem/viagem.entity';
import { CreateSolicitacaoDto } from '../dto/solicitacao.dto';

@Injectable()
export class SolicitacaoService {
  constructor(
    @InjectRepository(SolicitacaoViagem)
    private readonly solicitacaoRepository: Repository<SolicitacaoViagem>,

    @InjectRepository(Viagem)
    private readonly viagemRepository: Repository<Viagem>,
  ) {}

  async criarSolicitacao(
    dto: CreateSolicitacaoDto,
    usuario: Usuario,
  ): Promise<SolicitacaoViagem> {
    const viagem = await this.viagemRepository.findOneBy({ id: dto.viagemId });
    if (!viagem) throw new NotFoundException('Viagem não encontrada');

    const jaSolicitou = await this.solicitacaoRepository.findOne({
      where: {
        usuario: { id: usuario.id },
        viagem: { id: dto.viagemId },
      },
    });

    if (jaSolicitou) throw new ForbiddenException('Solicitação já realizada.');

    const solicitacao = this.solicitacaoRepository.create({
      usuario,
      viagem,
      status: StatusSolicitacao.PENDENTE,
    });

    return this.solicitacaoRepository.save(solicitacao);
  }

  async listarMinhasSolicitacoes(
    usuarioId: number,
  ): Promise<SolicitacaoViagem[]> {
    return this.solicitacaoRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['viagem'],
      order: { dataSolicitacao: 'DESC' },
    });
  }

  async atualizarStatus(
    id: number,
    status: StatusSolicitacao,
    usuario: Usuario,
  ): Promise<SolicitacaoViagem> {
    const solicitacao = await this.solicitacaoRepository.findOne({
      where: { id },
      relations: ['viagem', 'viagem.motorista'],
    });

    if (!solicitacao) throw new NotFoundException('Solicitação não encontrada');
    if (solicitacao.viagem.motorista.id !== usuario.id)
      throw new ForbiddenException('Apenas o motorista pode alterar o status');

    solicitacao.status = status;
    return this.solicitacaoRepository.save(solicitacao);
  }

  async listarSolicitacoesPorMotorista(
    motoristaId: number,
  ): Promise<SolicitacaoViagem[]> {
    return this.solicitacaoRepository.find({
      relations: ['usuario', 'viagem', 'viagem.motorista'],
      where: {
        status: StatusSolicitacao.PENDENTE,
        viagem: {
          motorista: {
            id: motoristaId,
          },
        },
      },
      order: { dataSolicitacao: 'DESC' },
    });
  }
}
