import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IOrder } from './../types/order';
import { CreateOrderDTO } from './dto/create-order.dto';

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<IOrder>) { }

    async getOrdersByUser(userId: string): Promise<IOrder[]> {
        const orders = await this.orderModel
                                    .find({ owner: userId })
                                    .populate('owner', '-password')
                                    .populate('products.product');

        if (!orders) {
            throw new NotFoundException('No orders found');
        }
        return orders;
    }

    // async createOrder(orderDTO: CreateOrderDTO, userId: string): PromiseOrder> {
        
    //     const createOrder = {
    //         owner: userId,
    //         products: { products, quantity };
    //     };

    //     const res = await this.orderModel.create(createOrder);

    //     // let order = await this.orderModel.findById(_id).populate('products.product');

    //     // const totalPrice = order.products.reduce((acc, product) => {
    //     //     const price = product.product.price * product.quantity;
    //     //     return acc + price;
    //     // }, 0);
    //     // await order.update({ totalPrice });

    //     // order = await this.orderModel
    //     //                     .findById(_id)
    //     //                     .populate('owner')
    //     //                     .populate('products.product');

    //     return order;
    // }

}
