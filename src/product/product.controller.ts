import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SellerGuard } from '../guards/seller.guard';
import { IProduct } from '../types/product';
import { IUser as UserDocument } from '../types/user';
import { User } from '../decorators/user.decorator';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    async getAll(): Promise<IProduct[]> {
        return await this.productService.findAll();
    }

    @Get('/mine')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async getMine(@User() user: UserDocument): Promise<IProduct[]> {
        const { id } = user;
        return await this.productService.findByOwner(id);
    }

    @Get('/seller/:id')
    async getBySeller(@Param('id') id: string): Promise<IProduct[]> {
        return await this.productService.findByOwner(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async create(
        @Body() product: CreateProductDTO,
        @User() user: UserDocument,
    ): Promise<IProduct> {
        return await this.productService.create(product, user);
    }

    @Get(':id')
    async read(@Param('id') id: string): Promise<IProduct> {
        return await this.productService.findById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async update(
        @Param('id') id: string,
        @Body() product: UpdateProductDTO,
        @User() user: UserDocument,
    ): Promise<IProduct> {
        const { id: userId } = user;
        return await this.productService.update(id, product, userId);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async delete(
        @Param('id') id: string,
        @User() user: UserDocument,
    ): Promise<IProduct> {
        const { id: userId } = user;
        return await this.productService.delete(id, userId);
    }
}