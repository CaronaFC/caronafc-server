import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../usuario/usuario.entity";
import { Viagem } from "../viagem/viagem.entity";

@Entity('avaliacao')
export class Avaliacao {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    criadoEm: Date;

    @Column()
    nota: number;

    @ManyToOne(() => Usuario, { nullable: true })
    usuario_avaliado: Usuario;

    @ManyToOne(() => Usuario, { nullable: false })
    usuario_avaliador: Usuario;

    @Column({ type: 'text', nullable: true })
    comentario?: string;

    @ManyToOne(() => Viagem, { nullable: false })
    viagem: Viagem;
}