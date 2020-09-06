import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../shared/user.service';
import { IPayload } from '../types/payload';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async signPayload(payload: IPayload): Promise<any> {
        return sign(payload, process.env.SECRET_KEY, { expiresIn: '1h'})
    }

    async validateUser(payload: IPayload): Promise<any> {
        return await this.userService.findByPayload(payload);
    }
}
