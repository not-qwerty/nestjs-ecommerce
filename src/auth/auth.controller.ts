import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService) {}

    @Post('login')
    async login(@Body() userDTO: LoginDTO)  {
        return await this.userService.findByLogin(userDTO);
    }

    @Post('register')
    async register(@Body() userDTO: RegisterDTO) {
        return await this.userService.create(userDTO);
    }
}
