import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Jogo } from '../jogo/jogo.entity';
import { SolicitacaoViagem } from '../solicitacao/solicitacao.entity';
import { Usuario } from '../usuario/usuario.entity';
import { CreateJogoDto } from '../jogo/dto/create-jogo.dto';
import { Veiculo } from '../veiculo/veiculo.entity';

export enum ViagemStatus {
  WAIT = 'wait',
  PROGRESS = 'progress',
  FINISHED = 'finished',
}

@Entity('viagem')
export class Viagem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinTable()
  motorista: Usuario;

  @OneToMany(() => SolicitacaoViagem, (solicitacao) => solicitacao.viagem)
  solicitacoes: SolicitacaoViagem[];

  @ManyToMany(() => Usuario, { cascade: true })
  @JoinTable()
  passageiros: Usuario[];

  @Column('json', { nullable: false })
  jogo: CreateJogoDto;

  @Column('double precision', { nullable: false })
  origem_lat: number;

  @Column('double precision', { nullable: false })
  origem_long: number;

  @Column('double precision', { nullable: false })
  destino_lat: number;

  @Column('double precision', { nullable: false })
  destino_long: number;

  @Column({ nullable: true })
  horario: Date;

  @Column({ nullable: false })
  qtdVagas: number;

  @Column({ default: false })
  temRetorno: boolean;

  @Column('decimal', { nullable: true })
  valorPorPessoa: number;

  @ManyToOne(() => Veiculo, { nullable: false, eager: true })
  veiculo: Veiculo;

  @Column({
    type: 'enum',
    enum: ViagemStatus,
    default: ViagemStatus.WAIT,
    nullable: false,
  })
  status: ViagemStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  criadoEm: Date;
}
