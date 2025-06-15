import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Jogo } from "../jogo.entity";

@Injectable()
export class UsuarioRepository extends Repository<Jogo>{
    constructor(private dataSource: DataSource){
        super(Jogo, dataSource.createEntityManager());
    }
}