import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Avaliacao } from '../avaliacao/avaliacao.entity';
import { Veiculo } from '../veiculo/veiculo.entity';

import * as bycrypt from "bcrypt"

@Entity('usuario')
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nome_completo: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    numero: string;

    @Column({ nullable: false })
    cpf: string;

    @Column({ nullable: false })
    senha: string;

    @Column({ nullable: true, type: 'varchar', length: 255 })
    imagem: string;

    @Column({ type: 'date', nullable: true })
    data_nascimento: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_criacao: Date;

    @OneToMany(() => Avaliacao, avaliacao => avaliacao.usuario_reportado, { nullable: true })
    avaliacoes: Avaliacao[];

    @OneToMany(() => Veiculo, veiculo => veiculo.usuario, { nullable: true })
    veiculos: Veiculo[];

    @BeforeInsert()
    async hashPassword() {
        this.senha = await bycrypt.hash(this.senha, 10);
    }
}