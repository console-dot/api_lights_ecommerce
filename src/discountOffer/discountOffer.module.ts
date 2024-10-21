import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DiscountOfferController } from './discountOffer.controller';
import { DiscountOfferService } from './discountOffer.service';
import { DiscountOffer, DiscountOfferSchema } from './discountOffer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DiscountOffer.name, schema: DiscountOfferSchema },
    ]),
  ],
  controllers: [DiscountOfferController],
  providers: [DiscountOfferService],
  exports: [DiscountOfferService],
})
export class DiscountOffersModule {}
