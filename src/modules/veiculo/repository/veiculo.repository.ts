import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Veiculo } from "../veiculo.entity";

@Injectable()
export class VeiculoRepository extends Repository<Veiculo>{
    constructor(private dataSource: DataSource){
        super(Veiculo, dataSource.createEntityManager())
    }
}