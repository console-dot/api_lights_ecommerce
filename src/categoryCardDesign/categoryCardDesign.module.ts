import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CategoryCardDesign,
  CategoryCardDesignSchema,
} from './categoryCardDesign.schema';
import { CategoryCardDesignController } from './categoryCardDesign.controller';
import { CategoryCardDesignService } from './categoryCardDesign.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryCardDesign.name, schema: CategoryCardDesignSchema },
    ]),
  ],
  controllers: [CategoryCardDesignController],
  providers: [CategoryCardDesignService],
  exports: [CategoryCardDesignService],
})
export class CategoryCardDesignsModule {}
