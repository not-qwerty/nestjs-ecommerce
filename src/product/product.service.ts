import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IProduct } from '../types/product';
import { IUser } from '../types/user';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { ERROR_MESSAGES } from '../shared/ERROR_MESSAGES';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private productModel: Model<IProduct>) { }

    async findAll(): Promise<IProduct[]> {
        return await this.productModel.find().populate('owner', '-password');
    }

    async findByOwner(userId: string): Promise<IProduct[]> {
        return await this.productModel.find({ owner: userId }).populate('owner', '-password');
    }

    async findById(id: string): Promise<IProduct> {
        const product = await this.productModel.findById(id).populate('owner', '-password');
        if (!product) {
            throw new HttpException(ERROR_MESSAGES.PRODUCT_NOT_FOUND, HttpStatus.NO_CONTENT);
        }
        return product;
    }

    async create(productDTO: CreateProductDTO, user: IUser): Promise<IProduct> {
        const product = await this.productModel.create({
            ...productDTO,
            owner: user,
        });
        await product.save();
        return product.populate('owner', '-password');
    }

    async update(
        id: string,
        productDTO: UpdateProductDTO,
        userId: string,
    ): Promise<IProduct> {
        const product = await this.productModel.findById(id);
        if (userId !== product.owner.toString()) {
            throw new HttpException(
                ERROR_MESSAGES.NOT_OWNING_PRODUCT,
                HttpStatus.UNAUTHORIZED,
            );
        }
        await product.update(productDTO);
        return await this.productModel.findById(id).populate('owner', '-password');
    }

    async delete(id: string, userId: string): Promise<IProduct> {
        const product = await this.productModel.findById(id);
        if (userId !== product.owner.toString()) {
            throw new HttpException(
                ERROR_MESSAGES.NOT_OWNING_PRODUCT,
                HttpStatus.UNAUTHORIZED,
            );
        }
        await product.remove();
        return product.populate('owner', '-password');
    }
}