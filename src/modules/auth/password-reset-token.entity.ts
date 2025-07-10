import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('password_reset_tokens')
export class PasswordResetToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  token: string;

  @ManyToOne(() => Usuario, { eager: true, onDelete: 'CASCADE' })
  usuario: Usuario;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expiresAt: Date;
}