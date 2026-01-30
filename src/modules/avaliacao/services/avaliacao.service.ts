import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Avaliacao } from "../avaliacao.entity";
import { Repository } from "typeorm";
import { Viagem } from "src/modules/viagem/viagem.entity";
import { Usuario } from "src/modules/usuario/usuario.entity";
import { CreateAvaliacaoDto } from "../dto/create-avaliacao.dto";

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacaoRepo: Repository<Avaliacao>,

    @InjectRepository(Viagem)
    private readonly viagemRepo: Repository<Viagem>,

    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async create(
    dto: CreateAvaliacaoDto,
    avaliadorId: number,
  ): Promise<Avaliacao> {
    const viagem = await this.viagemRepo.findOne({
      where: { id: dto.viagemId },
      relations: ['motorista', 'passageiros'],
    });

    if (!viagem) {
      throw new NotFoundException('Viagem não encontrada');
    }

    const avaliador = await this.usuarioRepo.findOneBy({ id: avaliadorId });

    if (!avaliador)
      throw new NotFoundException('usuario avaliador não encontrado');
    const avaliado = await this.usuarioRepo.findOneBy({
      id: dto.avaliadoId,
    });

    if (!avaliado) {
      throw new NotFoundException('Usuário avaliado não encontrado');
    }

    const participou =
      viagem.motorista.id === avaliadorId ||
      viagem.passageiros.some((p) => p.id === avaliadorId);

    if (!participou) {
      throw new ForbiddenException('Você não participou desta viagem');
    }

    const avaliacao = this.avaliacaoRepo.create({
      nota: dto.nota,
      comentario: dto.comentario,
      usuario_avaliado: avaliado,
      usuario_avaliador: avaliador,
      viagem,
    });

    return this.avaliacaoRepo.save(avaliacao);
  }
  async calcularMediaUsuario(usuarioId: number): Promise<{
  usuarioId: number;
  media: number;
  totalAvaliacoes: number;
}> {
  const result = await this.avaliacaoRepo
    .createQueryBuilder('avaliacao')
    .select('AVG(avaliacao.nota)', 'media')
    .addSelect('COUNT(avaliacao.id)', 'total')
    .where('avaliacao.usuario_avaliado = :usuarioId', { usuarioId })
    .getRawOne();

  
  const totalAvaliacoes = Number(result.total) || 0;
  if (totalAvaliacoes === 0) {
    throw new NotFoundException(
      'Usuário ainda não possui avaliações',
    );
  }
  const media = Number(result.media) || 0;

  return {
    usuarioId,
    media: Number(media.toFixed(2)),
    totalAvaliacoes,
  };
}

}
