import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnersEntity } from './entities/partner.entity';
import { PartnerService } from './services/partner.service';
import { PartnerRepository } from './repositories/partner.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PartnersEntity])],
  exports: [PartnerService],
  providers: [PartnerService, PartnerRepository],
})
export class PartnersModule {}
