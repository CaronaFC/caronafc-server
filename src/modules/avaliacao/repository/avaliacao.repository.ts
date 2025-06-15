import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Avaliacao } from "../avaliacao.entity";

@Injectable()
export class UsuarioRepository extends Repository<Avaliacao>{
    constructor(private dataSource: DataSource){
        super(Avaliacao, dataSource.createEntityManager());
    }
}