import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('jogo')
export class Jogo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    idMatch: number; // id da api soccerdata

    @Column({ nullable: false })
    nomeEstadio: string;

    @Column({ nullable: false })
    latitude: number;

    @Column({ nullable: false })
    longitude: number;

    @Column({ nullable: false })
    dataJogo: Date;
}