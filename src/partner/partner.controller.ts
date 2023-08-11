import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import {PartnerGetListFilterDto} from "./dto/partner-get-list-filter.dto";
import {ApiBody} from "@nestjs/swagger";

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

 @Post('get-list')
 @ApiBody({ type: PartnerGetListFilterDto })
 async getList(@Body() PartnerFilterDto:Partial<PartnerGetListFilterDto>) {
   return this.partnerService.getList(PartnerFilterDto.query, PartnerFilterDto.page, PartnerFilterDto.limit, PartnerFilterDto.sort);
 }
}
