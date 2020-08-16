import { Document } from 'mongoose';
import { IUser } from './user';

export interface Product extends Document {
    owner: IUser | string;
    title: string;
    image: string;
    description: string;
    price: string,
    created: Date;
}