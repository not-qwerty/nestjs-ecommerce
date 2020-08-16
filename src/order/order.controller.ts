import { IUser } from 'src/types/user';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/utilities/user.decorator';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}
    
    @Get()
    @UseGuards(AuthGuard('jwt'))
    getOrders(@User() { id }: IUser) {
        return this.orderService.getOrdersByUser(id);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    createOrder(
        @Body() order: CreateOrderDTO,
        @User() { id }: IUser
        ) {
            return this.orderService.createOrder(order, id);
    }
}
