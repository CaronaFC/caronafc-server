import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Jogo } from "../jogo/jogo.entity";
import { Usuario } from "../usuario/usuario.entity";
import { CreateJogoDto } from "../jogo/dto/create-jogo.dto";

@Entity('viagem')
export class Viagem {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, { nullable: false })
    @JoinTable()
    motorista: Usuario;

    @ManyToMany(() => Usuario, { cascade: true })
    @JoinTable()
    passageiros: Usuario[];

    @Column('json', { nullable: false })
    jogo: CreateJogoDto;

    @Column('double precision', { nullable: false })
    origem_lat: number;

    @Column('double precision', { nullable: false })
    origem_long: number;

    @Column({ nullable: true })
    horario: Date;

    @Column({ nullable: false })
    qtdVagas: number;

    @Column({ default: false })
    temRetorno: boolean;

    @Column('decimal', { nullable: true })
    valorPorPessoa: number;
}