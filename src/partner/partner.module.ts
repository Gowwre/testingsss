import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import {PartnerRepository} from "./repositories/partner.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PartnersEntity} from "./entities/partner.entity";
import {BaseRepository} from "../base/repositories/base.repository";

@Module({
  controllers: [PartnerController],
  providers: [PartnerService,PartnerRepository,BaseRepository],
  imports:[TypeOrmModule.forFeature([PartnersEntity])]
})
export class PartnerModule {}
