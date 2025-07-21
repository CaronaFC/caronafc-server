import { Injectable } from "@nestjs/common";
import { Pagamento } from "../pagamento.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class PagamentoRepository extends Repository<Pagamento> {
   constructor(private dataSource: DataSource) {
      super(Pagamento, dataSource.createEntityManager());
   }
}