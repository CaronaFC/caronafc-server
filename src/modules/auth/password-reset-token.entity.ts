import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity'; // <-- Caminho corrigido

@Entity('password_reset_tokens')
export class PasswordResetToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  token: string;

  // O caminho para a entidade Usuario já está correto segundo sua estrutura
  @ManyToOne(() => Usuario, { eager: true, onDelete: 'CASCADE' })
  usuario: Usuario;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expiresAt: Date;
}