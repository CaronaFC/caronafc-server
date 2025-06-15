import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Viagem } from "../viagem.entity";

@Injectable()
export class ViagemRepository extends Repository<Viagem>{
    constructor(private dataSource: DataSource){
        super(Viagem, dataSource.createEntityManager());
    }
}