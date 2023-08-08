import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnersEntity } from './entities/partner.entity';

@Module({ imports: [TypeOrmModule.forFeature([PartnersEntity])] })
export class PartnersModule {}
