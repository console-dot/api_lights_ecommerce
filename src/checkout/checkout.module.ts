import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Checkout, CheckoutSchema } from './checkout.schema';
import { CheckoutService } from './checkout.service';
import { Cart, CartSchema } from 'src/cart/cart.schema';
import { Product, ProductSchema } from 'src/products/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Checkout.name, schema: CheckoutSchema },
      { name: Cart.name, schema: CartSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule {}
