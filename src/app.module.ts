import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    SharedModule, 
    AuthModule, 
    ProductModule, 
    OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
