import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from './order/orders.module';
import { BaseRepository } from './base/repositories/base.repository';
import { OrderItemModule } from './order-item/order-item.module';
import { PartnerModule } from './partner/partner.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: +configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [__dirname + '/**/*.entity.ts'],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        extra: {
          decimalNumbers: true,
        },
      }),
      inject: [ConfigService],
    }),
    OrdersModule,
    OrderItemModule,
    PartnerModule,
  ],
  controllers: [AppController],
  providers: [AppService, BaseRepository],
})
export class AppModule {}
