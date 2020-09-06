// import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { User } from 'src/utilities/user.decorator';
// import { OrderService } from './order.service';
// import { CreateOrderDTO } from './dto/create-order.dto';
// import { Order } from './../types/order';
// import { IUser } from 'src/types/user';


// @Controller('order')
// export class OrderController {
//     constructor(private readonly orderService: OrderService) { }

//     @Get()
//     @UseGuards(AuthGuard('jwt'))
//     getOrders(@User() { id }: IUser): Promise<Order[]> {
//         return this.orderService.getOrdersByUser(id);
//     }

//     @Post()
//     @UseGuards(AuthGuard('jwt'))
//     createOrder(
//         @Body() order: CreateOrderDTO,
//         @User() { id }: IUser
//     ): Promise<Order> {
//         return this.orderService.createOrder(order, id);
//     }
// }
