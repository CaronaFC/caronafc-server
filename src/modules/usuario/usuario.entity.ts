import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn,BeforeUpdate } from 'typeorm';
import { Avaliacao } from '../avaliacao/avaliacao.entity';
import { Veiculo } from '../veiculo/veiculo.entity';

import * as bcrypt from "bcrypt";
@Entity('usuario')
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, unique: true })
    googleuid?: string;

    @Column({ nullable: false })
    nome_completo: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false, unique: true })
    numero: string;

    @Column({ nullable: false, unique: true })
    cpf: string;

    @Column({ nullable: false })
    senha: string;

    @Column({ nullable: true, type: 'text' })
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
        this.senha = await bcrypt.hash(this.senha, 10);
    }

    @BeforeUpdate()
    async hashPasswordOnUpdate() {
      // Verifica se a senha foi modificada para evitar re-hashing desnecessário
      if (this.senha) {
        // É uma boa prática verificar se a senha não é já um hash.
        // Hashes do bcrypt geralmente começam com "$2b$".
        if (!this.senha.startsWith('$2b$')) {
          this.senha = await bcrypt.hash(this.senha, 10);
        }
      }
    }
}