import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Avaliacao } from '../avaliacao.entity';
import { Repository } from 'typeorm';
import { CreateAvaliacaoDto } from '../dto/create-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
    constructor(@InjectRepository(Avaliacao) private readonly avaliacaoRepository: Repository<Avaliacao>) {}

    async create(createAvaliacaoDto: CreateAvaliacaoDto): Promise<Avaliacao> {
        const avaliacao = this.avaliacaoRepository.create(createAvaliacaoDto)
        return this.avaliacaoRepository.create(avaliacao);
    }
}