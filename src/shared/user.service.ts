import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { RegisterDTO, LoginDTO } from '../auth/auth.tdo';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    private sanitizeUser(user: User) {
        return user.depopulate('password')
    }

    create(userDTO: RegisterDTO) {

    }

    findByLogin(userDTO: LoginDTO) {}
}
