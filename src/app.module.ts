import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@infrastructure/configs/ormconfig';
import { PaymentModule } from '@modules/payment/payment.module';
import { NotificationModule } from '@modules/notification/notification.module';
import { UnitOfWorkModule } from '@infrastructure/database/unit-of-work/unit-of-work.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UnitOfWorkModule,
    PaymentModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
