import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoVeiculo } from "../tipo-veiculo/tipo-veiculo.entity";
import { Usuario } from "../usuario/usuario.entity";

@Entity('veiculo')
export class Veiculo{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    placa: string;

    @Column({ nullable: false})
    renavam: string;

    @Column({ nullable: false})
    marca: string;

    @Column({ nullable: false})
    combustivel: string;

    @ManyToOne(()=> TipoVeiculo,{ nullable: true})
    tipoVeiculo: TipoVeiculo;

    @ManyToOne(() => Usuario)
    usuario: Usuario;
}