import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Jogo } from "../jogo/jogo.entity";
import { Usuario } from "../usuario/usuario.entity";

@Entity('viagem')
export class Viagem{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable:false })
    motorista: Usuario;

    @Column({ nullable:false })
    passageiro: Usuario;

    @Column({ nullable: false})
    jogo: Jogo;

    @Column({ nullable: false})
    origim_lat: number;

    @Column({ nullable: false})
    origim_long: number;

    @Column({ nullable: false})
    horiario: Date;

    @Column({ nullable:false })
    qtdVagas: number;
}