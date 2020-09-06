import { Product } from './product';
import { IUser } from './user';
import { Document } from 'mongoose';

interface ProductOrder {
    product: Product;
    quantity: number;
}

export interface Order extends Document {
    owner: IUser["username"];
    totalPrice: number;
    products: ProductOrder[];
    created: Date;
}