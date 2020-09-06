import { IProduct } from './product';
import { IUser } from './user';
import { Document } from 'mongoose';

interface IProductOrder {
    product: IProduct;
    quantity: number;
}

export interface IOrder extends Document {
    owner: IUser | string;
    totalPrice: number;
    products: IProductOrder[];
    created: Date;
}