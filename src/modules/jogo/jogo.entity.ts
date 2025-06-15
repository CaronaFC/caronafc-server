import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('jogo')
export class Jogo{

    @PrimaryGeneratedColumn()
    id: number;

    // @Column({ nullable: false})
    // fora: Time;

    // @Column({ nullable: false})
    // origem: Time;

    @Column({ nullable: false})
    descricao: string;

    @Column({ nullable: false})
    origem_lat: number;

    @Column({ nullable: false})
    origem_long: number;

    @Column({nullable: false})
    horario: Date;
}