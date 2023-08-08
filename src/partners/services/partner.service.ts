import { Injectable } from '@nestjs/common';
import { PartnerRepository } from '../repositories/partner.repository';

@Injectable()
export class PartnerService {
  constructor(private partnerRepo: PartnerRepository) {}

  getAll() {
    return this.partnerRepo.getAll();
  }
}
