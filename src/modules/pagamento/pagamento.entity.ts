import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../usuario/usuario.entity";

@Entity('pagamento')
export class Pagamento{
   @PrimaryGeneratedColumn()
   id: number;
   
   @Column()
   valor: number;

   @Column()
   data: Date;

   @Column()
   status: string;

   @Column()
   metodoPagamento: string;

   @OneToOne(() => Usuario, { nullable: false })   
   usuarioId: number;

   @OneToOne(() => Usuario, { nullable: false })
   motoristaId: number;

   @OneToOne(() => Usuario, { nullable: false })
   viagemId: number;

   // Outros campos relevantes
   // Relacionamentos, se necessário


}