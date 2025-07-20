import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { TipoVeiculo } from "../tipo-veiculo.entity";

@Injectable()
export class TipoVeiculoRepository extends Repository<TipoVeiculo>{
    constructor(private dataSource: DataSource){
        super(TipoVeiculo, dataSource.createEntityManager());
    }
}