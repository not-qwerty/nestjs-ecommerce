import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDTO } from './product.dto';
import { Product } from '../types/product';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from '../guards/seller.guard';
import { IUser as UserDocument } from '../types/user';
import { User } from 'src/utilities/user.decorator';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async listAll(): Promise<Product[]> {
        return await this.productService.findAll();
    }

    @Get(':id')
    async listMine(@Param('id') id: string): Promise<Product | void> {
        return await this.productService.findOne(id);
    }
    @Post()
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async create(@Body() productDTO: CreateProductDTO, @User() user: UserDocument): Promise<Product> {
        return await this.productService.create(productDTO, user);
    }

    @Put('id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async update(@Param('id') id: string, @Body() productDTO: CreateProductDTO): Promise<any> {
        return await this.productService.update(id, productDTO);
    }

    @Delete('id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async delete(@Param('id') id: string): Promise<any> {
        return await this.productService.delete(id);
    }
}
