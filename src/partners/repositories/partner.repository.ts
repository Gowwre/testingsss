import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartnersEntity } from '../entities/partner.entity';

@Injectable()
export class PartnerRepository {
  constructor(
    @InjectRepository(PartnersEntity)
    private partnerRepo: Repository<PartnersEntity>,
  ) {}

  getAll() {
    return this.partnerRepo.find();
  }
}
