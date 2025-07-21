import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException
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

    if (jaSolicitou) throw new ForbiddenException('Você já solicitou essa viagem.');

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
      relations: ['viagem', 'viagem.motorista'],
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
      relations: ['viagem', 'viagem.motorista', 'viagem.passageiros', 'usuario'],
    });

    if (!solicitacao) throw new NotFoundException('Solicitação não encontrada');

    if (solicitacao.viagem.motorista.id !== usuario.id)
      throw new ForbiddenException('Apenas o motorista pode alterar o status');

    if (status === StatusSolicitacao.ACEITA) {
      const viagem = solicitacao.viagem;

      if (viagem.qtdVagas <= 0) {
        throw new BadRequestException('Não há vagas disponíveis nesta viagem');
      }

      const jaPassageiro = viagem.passageiros.some(
        (p) => p.id === solicitacao.usuario.id,
      );

      if (!jaPassageiro) {
        viagem.passageiros.push(solicitacao.usuario);
        viagem.qtdVagas -= 1;
        await this.viagemRepository.save(viagem);
      }
    }

    solicitacao.status = status;
    return this.solicitacaoRepository.save(solicitacao);
  }

  async listarSolicitacoesPorViagem(
    viagemId: number,
  ): Promise<SolicitacaoViagem[]> {
    return this.solicitacaoRepository.find({
      where: { viagem: { id: viagemId } },
      relations: ['usuario', 'viagem'],
      order: { dataSolicitacao: 'DESC' },
    });
  }
}
