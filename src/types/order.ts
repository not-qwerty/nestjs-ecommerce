import { IProduct } from './product';
import { IUser } from './user';
import { Document } from 'mongoose';

export interface IProductOrder {
    product: IProduct;
    quantity: number;
}

export interface IOrder extends Document {
    owner: IUser["_id"];
    products: IProductOrder[];
    totalPrice: number;
    created: Date;
}