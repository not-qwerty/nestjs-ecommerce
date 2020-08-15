import { IUser } from 'src/types/user';
import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { SellerGuard } from '../guards/seller.guard';
import { User } from 'src/utilities/user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService,
        private readonly authService: AuthService) { }


    // accessible to all authorized users
    @Get('getAllUsers')
    @UseGuards(AuthGuard('jwt'))
    async findAll(): Promise<IUser[]> {
        return await this.userService.findAll();
    }


    // can be accessed only if user who made request is seller himself
    @Get('getAllSellerUsers')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async findAllSellers(@User() user: IUser): Promise<IUser[]> {
        console.log(user);
        
        return await this.userService.findAllSellers();
    }

    @Post('login')
    async login(@Body() userDTO: LoginDTO): Promise<{ user: LoginDTO; token: string; }> {
        const user = await this.userService.findByLogin(userDTO);

        const payload = {
            username: user.username,
            seller: user.seller
        }

        const token = await this.authService.signPayload(payload);
        return { user, token };
    }

    @Post('register')
    async register(@Body() userDTO: RegisterDTO): Promise<{ user: LoginDTO; token: string; }> {
        const user = await this.userService.create(userDTO);

        const payload = {
            username: user.username,
            seller: user.seller,
        }
        const token = await this.authService.signPayload(payload);
        return { user, token }
    }
}
