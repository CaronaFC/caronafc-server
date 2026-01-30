/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuario/usuario.entity';
import { Veiculo } from '../../veiculo/veiculo.entity';
import { Viagem } from '../../viagem/viagem.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Veiculo) private veiculoRepo: Repository<Veiculo>,
    @InjectRepository(Viagem) private viagemRepo: Repository<Viagem>,
  ) {}

  async getMetrics() {
    const totalUsuarios = await this.usuarioRepo.count();
    const totalVeiculos = await this.veiculoRepo.count();
    const totalViagens = await this.viagemRepo.count();

    const totalMotoristas = await this.usuarioRepo
      .createQueryBuilder('usuario')
      .leftJoin('usuario.veiculos', 'veiculo')
      .where('veiculo.id IS NOT NULL')
      .getCount();

    const viagensStatus = await this.viagemRepo
      .createQueryBuilder('viagem')
      .select('viagem.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('viagem.status')
      .getRawMany();

    const viagensPorStatus = {
      espera: 0,
      andamento: 0,
      finalizada: 0,
    };

    viagensStatus.forEach((item) => {
      viagensPorStatus[item.status] = parseInt(item.count, 10);
    });

    const topEstadios = await this.viagemRepo
      .createQueryBuilder('viagem')
      .select("viagem.jogo -> 'estadio' ->> 'nome'", 'estadio')
      .addSelect('COUNT(*)', 'count')
      .groupBy("viagem.jogo -> 'estadio' ->> 'nome'")
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    const mediaValorPorPessoa = await this.viagemRepo
      .createQueryBuilder('viagem')
      .select('AVG(viagem.valorPorPessoa)', 'media')
      .where('viagem.valorPorPessoa IS NOT NULL')
      .getRawOne();

    const viagensPorMes = await this.viagemRepo
      .createQueryBuilder('viagem')
      .select("TO_CHAR(viagem.criadoEm, 'YYYY-MM')", 'mes')
      .addSelect('COUNT(*)', 'count')
      .where("viagem.criadoEm >= NOW() - INTERVAL '6 months'")
      .groupBy('mes')
      .orderBy('mes', 'ASC')
      .getRawMany();

    const topMarcasVeiculos = await this.veiculoRepo
      .createQueryBuilder('veiculo')
      .select('veiculo.marca', 'marca')
      .addSelect('COUNT(*)', 'count')
      .groupBy('veiculo.marca')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    const topModelosVeiculos = await this.veiculoRepo
      .createQueryBuilder('veiculo')
      .select('veiculo.modelo', 'modelo')
      .addSelect('COUNT(*)', 'count')
      .groupBy('veiculo.modelo')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    const tiposVeiculoCount = await this.veiculoRepo
      .createQueryBuilder('veiculo')
      .leftJoin('veiculo.tipoVeiculo', 'tipoVeiculo')
      .select('tipoVeiculo.descricao', 'tipo')
      .addSelect('COUNT(*)', 'count')
      .groupBy('tipoVeiculo.descricao')
      .getRawMany();

    return {
      totalUsuarios,
      totalMotoristas,
      totalVeiculos,
      totalViagens,
      viagensPorStatus,
      topEstadios,
      mediaValorPorPessoa: parseFloat(mediaValorPorPessoa.media).toFixed(2),
      viagensPorMes,
      topMarcasVeiculos,
      topModelosVeiculos,
      tiposVeiculoCount,
    };
  }
}
