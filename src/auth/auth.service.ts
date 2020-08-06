import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../shared/user.service';
import { Payload } from '../types/payload';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async signPayload(payload: Payload): Promise<any> {
        return sign(payload, 'secretKey', { expiresIn: '12h'})
    }

    async validateUser(payload: Payload): Promise<any> {
        return await this.userService.findByPayload(payload);
    }
}
