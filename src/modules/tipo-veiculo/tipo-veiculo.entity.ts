import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Veiculo } from "../veiculo/veiculo.entity";

@Entity('tipo_veiculo')
export class TipoVeiculo{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: String;

    @OneToMany(() => Veiculo, veiculo => veiculo.tipoVeiculo)
    veiculos: Veiculo[]
}