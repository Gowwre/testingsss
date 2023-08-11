import { Injectable } from '@nestjs/common';
import { isObject } from 'class-validator';
import { Any, Between, In, Like, Raw } from 'typeorm';

@Injectable()
export class BaseRepository {
  buildWhere(queryBuilder, condition) {
    for (const [key, value] of Object.entries(condition)) {
      if (isObject(value)) {
        for (const [subKey, SubValue] of Object.entries(value)) {
          /**
           * Xử lý trường hợp data là between
           */
          if (subKey == 'between') {
            queryBuilder.andWhere({
              [key]: Between(SubValue[0] ?? '', SubValue[1] ?? ''),
            });
          }
          /**
           * Có một số trường hợp khác sẽ bổ sung vào đây
           */
          if (subKey == 'like') {
            /**
             * Xử lý trường hợp data là between
             */
            queryBuilder.andWhere({
              [key]: Like('%' + SubValue.toString() + '%'),
            });
            // queryBuilder.andWhere(Raw((key) => `FIND_IN_SET("q", "${key}")`));
          }
          if (subKey == 'in') {
            queryBuilder.andWhere({ [key]: In(SubValue) });
          }
        }
      } else {
        /**
         * Sử dụng trường hợp where bình thường
         */
        queryBuilder.andWhere({ [key]: value });
      }
    }

    return queryBuilder;
  }
}
