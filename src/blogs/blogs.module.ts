import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import {
  Blogs,
  BlogsSchema,
} from './blogs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blogs.name, schema: BlogsSchema },
    ]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
  exports: [BlogsService],
})
export class BlogsModule {}
