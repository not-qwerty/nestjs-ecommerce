import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService,
        private readonly authService: AuthService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    tempAuth(): { auth: string } {
        console.log('ok it is working, use "bearer token" in postman to check the token')

        return { auth: 'works' };
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
