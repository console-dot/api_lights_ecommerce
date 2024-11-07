import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './cart.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { CartController } from './cart.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Ensure UserModel is imported here
  ],
  controllers:[CartController],
  providers: [CartService],
  exports: [CartService], // Optional: export if needed in other modules
})
export class CartModule {}
