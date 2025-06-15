import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Jogo } from "../jogo/jogo.entity";
import { Usuario } from "../usuario/usuario.entity";

@Entity('viagem')
export class Viagem{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, { nullable: false})
    motorista: Usuario;

    @Column(() => Usuario)
    @JoinTable()
    passageiro: Usuario[];

    @ManyToOne(() => Jogo,{ nullable: false})
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