/* eslint-disable prettier/prettier */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import configuration from './common/config/configuration';
import { FileModule } from './file/file.module';
import { ProductsModule } from './products/products.module';
import { TestimonialModule } from './testimonials/testimonials.module';
import { CartModule } from './cart/cart.module';
import { BannersModule } from './banner/banner.module';
import { LuxurysModule } from './luxury/luxury.module';
import { DecorateLightsModule } from './decorateLight/decorateLight.module';
import { LightHousesModule } from './lightHouse/lightHouset.module';
import { CategoryCardDesignsModule } from './categoryCardDesign/categoryCardDesign.module';
import { DiscountOffersModule } from './discountOffer/discountOffer.module';
import { SignUpNewLettersModule } from './signUpNewLetter/signUpNewLetter.module';
import { BlogsModule } from './blogs/blogs.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    FileModule,
    ProductsModule,
    TestimonialModule,
    CartModule,
    BannersModule,
    LuxurysModule,
    DecorateLightsModule,
    LightHousesModule,
    CategoryCardDesignsModule,
    DiscountOffersModule,
    SignUpNewLettersModule,
    BlogsModule,
    CheckoutModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
  }
}
