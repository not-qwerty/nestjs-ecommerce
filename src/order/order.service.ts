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

    async createOrder(orderDTO: CreateOrderDTO, userId: string): Promise<any> {
        try {
        
            const { products } = orderDTO;
            console.log(products);
        

        const { _id } = await this.orderModel.create({
            owner: userId,
            products: products,
            totalPrice: 50,
            created: Date.now(),
        });

        const order = await this.orderModel.findById(_id);
        console.log(order);
        

        

        // return createOrder;


        } catch (err) {
            console.log(err);
            
        }
        

        // let order = await this.orderModel.findById(_id).populate('products.product');

    //     const totalPrice = order.products.reduce((acc, product) => {
    //         const price = product.product.price * product.quantity;
    //         return acc + price;
    //     }, 0);
        
    //     await order.update({ totalPrice });

    //     order = await this.orderModel
    //                         .findById(_id)
    //                         .populate('owner')
    //                         .populate('products.product');

    }

}

// Example of body JSON for create order
// {
//     "products": [
//         {
//             "product": "5f386470d0ffc63b64642258",
//             "quantity": 2
//         }
//     ]
// }