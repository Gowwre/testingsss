import {ApiProperty} from "@nestjs/swagger";

class QueryPartnerDto {


}

class SortPartnerDto {

}
export class PartnerGetListFilterDto {
    @ApiProperty()
    page: number;
    @ApiProperty()
    limit: number;
    @ApiProperty()
    query:QueryPartnerDto;
    @ApiProperty()
    sort:SortPartnerDto;
}