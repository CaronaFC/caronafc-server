import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario')
export class Usuario{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nome_completo: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false})
    numero: string;

    @Column({ nullable: false })
    cpf: string;

    @Column({ nullable: false })
    senha: string;
    
    @Column({ nullable: true, type: 'varchar', length: 255 })
    imagem: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_criacao: Date;

    @Column({ type: 'float', default: 0 })
    avaliacao: number;

    @Column("simple-array", { nullable: true })
    veiculos: string[];
}