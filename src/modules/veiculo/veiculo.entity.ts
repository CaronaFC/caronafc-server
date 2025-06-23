// src/modules/veiculo/veiculo.entity.ts

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoVeiculo } from "../tipo-veiculo/tipo-veiculo.entity";
import { Usuario } from "../usuario/usuario.entity";

@Entity('veiculo')
export class Veiculo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    placa: string;

    @Column({ nullable: false, unique: true })
    renavam: string;

    @Column({ nullable: false })
    marca: string;

    @Column({ nullable: false })
    cor: string; //Thiago: foi retirado o atributo combustivel e adicionado o atributo cor

    @ManyToOne(() => TipoVeiculo, { nullable: false, eager: true })
    tipoVeiculo: TipoVeiculo;

    @ManyToOne(() => Usuario, usuario => usuario.veiculos, { 
        nullable: false, 
        onDelete: 'CASCADE' 
    })
    usuario: Usuario;
}