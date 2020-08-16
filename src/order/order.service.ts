import { Order } from './../types/order';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDTO } from './dto/create-order.dto';

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) { }

    async getOrdersByUser(userId: string): Promise<Order[]> {
        const orders = await this.orderModel.find({ owner: userId }).populate('owner', '-password').populate('products.product');

        if (!orders) {
            throw new NotFoundException('No orders found');
        }
        return orders;
    }

    async createOrder(orderDTO: CreateOrderDTO, userId: string): Promise<Order> {
        const createOrder = {
            owner: userId,
            products: orderDTO.products,
        }
        const { _id } = await this.orderModel.create(createOrder);

        let order = await (await this.orderModel.findById(_id)).populated('products.product');

        const totalPrice = order.products.reduce((acc, product) => {
            const price = product.product.price * product.quantity;
            return acc + price;
        }, 0);
        await order.update({ totalPrice });

        order = await this.orderModel
            .findById(_id)
            .populate('owner')
            .populate('products.product');

        return order;
    }

}
