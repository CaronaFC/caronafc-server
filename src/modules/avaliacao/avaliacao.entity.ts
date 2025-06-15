import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../usuario/usuario.entity";
import { Viagem } from "../viagem/viagem.entity";

@Entity('avaliacao')
export class Avaliacao{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usuario_reportado: Usuario;

    @Column()
    usuario_reportante: Usuario;

    @Column()
    mensagem: string;

    @Column()
    nota: number;

    @Column()
    viagem: Viagem;
}