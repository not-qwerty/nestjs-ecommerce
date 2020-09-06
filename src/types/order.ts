import { Product } from './product';
import { IUser } from './user';
import { Document } from 'mongoose';

interface IProductOrder {
    product: Product;
    quantity: number;
}

export interface IOrder extends Document {
    owner: IUser["username"];
    totalPrice: number;
    products: IProductOrder[];
    created: Date;
}