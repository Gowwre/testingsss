import {Injectable} from "@nestjs/common";
import {DataSource, Repository} from "typeorm";
import {PartnersEntity} from "../entities/partner.entity";
import {BaseRepository} from "../../base/repositories/base.repository";

@Injectable()
export class PartnerRepository extends Repository<PartnersEntity> {
    constructor(private dataSource:DataSource,private baseRepository:BaseRepository) {
    super(PartnersEntity, dataSource.createEntityManager());

    }

    getList(condition?: object, page?: Number, limit?: Number, sort?: any): Promise<PartnersEntity[]> {
        const offset = (Number(page) - 1) * Number(limit);
        let queryBuilder = this.createQueryBuilder()
            .limit(Number(limit))
            .offset(offset)
            .orderBy(sort);
        queryBuilder = this.baseRepository.buildWhere(queryBuilder, condition);
        return queryBuilder.getMany();
    }
}