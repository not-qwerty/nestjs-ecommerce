import { Controller, Post } from '@nestjs/common';
import { timeStamp } from 'console';
import { UserService } from '../shared/user.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService) {}

    @Post('login')
    async login(userDTO: any) {
        return await this.userService.findByLogin(userDTO);
    }

    @Post('register')
    async register(userDTO: any) {
        return await this.userService.create(userDTO);
    }
}
