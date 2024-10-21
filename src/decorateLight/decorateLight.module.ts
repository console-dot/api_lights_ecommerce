import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DecorateLightController } from './decorateLight.controller';
import { DecorateLightService } from './decorateLight.service';
import { DecorateLight, DecorateLightSchema } from './decorateLight.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DecorateLight.name, schema: DecorateLightSchema },
    ]),
  ],
  controllers: [DecorateLightController],
  providers: [DecorateLightService],
  exports: [DecorateLightService],
})
export class DecorateLightsModule {}
