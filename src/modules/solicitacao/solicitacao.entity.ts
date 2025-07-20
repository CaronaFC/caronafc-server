import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from 'src/modules/usuario/usuario.entity';
import { Viagem } from 'src/modules/viagem/viagem.entity';

export enum StatusSolicitacao {
  PENDENTE = 'pendente',
  ACEITA = 'aceita',
  RECUSADA = 'recusada',
}

@Entity('solicitacao_viagem')
export class SolicitacaoViagem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, { eager: true })
  usuario: Usuario;

  @ManyToOne(() => Viagem, (viagem) => viagem.solicitacoes)
  viagem: Viagem;

  @Column({
    type: 'enum',
    enum: StatusSolicitacao,
    default: StatusSolicitacao.PENDENTE,
  })
  status: StatusSolicitacao;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataSolicitacao: Date;
}
