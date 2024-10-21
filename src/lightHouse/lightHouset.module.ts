import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LightHouse, LightHouseSchema } from './lightHouset.schema';
import { LightHouseController } from './lightHouse.controller';
import { LightHouseService } from './lightHouse.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LightHouse.name, schema: LightHouseSchema },
    ]),
  ],
  controllers: [LightHouseController],
  providers: [LightHouseService],
  exports: [LightHouseService],
})
export class LightHousesModule {}
