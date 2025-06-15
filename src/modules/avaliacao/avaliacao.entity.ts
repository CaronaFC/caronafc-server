import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../usuario/usuario.entity";
import { Viagem } from "../viagem/viagem.entity";

@Entity('avaliacao')
export class Avaliacao {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, usuario => usuario.avaliacoes, { nullable: true })
    usuario_reportado: Usuario;

    @ManyToOne(() => Usuario, { nullable: false })
    usuario_reportante: Usuario;

    @Column()
    mensagem: string;

    @Column()
    nota: number;

    @ManyToOne(() => Viagem, { nullable: false })
    viagem: Viagem;
}