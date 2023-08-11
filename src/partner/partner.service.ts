import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import {PartnerRepository} from "./repositories/partner.repository";

@Injectable()
export class PartnerService {
  constructor(private partnerRepository:PartnerRepository) {
  }

getList(condition?: object, page?: Number, limit?: Number, sort?: object) {
  return this.partnerRepository.getList(condition, page, limit, sort);
}

}
