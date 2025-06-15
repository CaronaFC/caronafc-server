import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    tipo: TipoVeiculo;

    @Column()
    usuario: Usuario;
}