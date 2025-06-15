import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipo_veiculo')
export class TipoVeiculo{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: String;
}