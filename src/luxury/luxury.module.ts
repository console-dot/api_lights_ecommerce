import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Luxury, LuxurySchema } from './luxury.schema';
import { LuxuryController } from './luxury.controller';
import { LuxuryService } from './luxury.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Luxury.name, schema: LuxurySchema }]),
  ],
  controllers: [LuxuryController],
  providers: [LuxuryService],
  exports: [LuxuryService],
})
export class LuxurysModule {}
