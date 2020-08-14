import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { RegisterDTO, LoginDTO } from '../auth/auth.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from '../types/payload';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    private sanitizeUser(user: User) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }

    async create(userDTO: RegisterDTO): Promise<any> {
        console.log(userDTO);

        const { username } = userDTO;
        const user = await this.userModel.findOne({ username });

        if (user) {
            throw new HttpException('User already exists',
                HttpStatus.BAD_REQUEST)
        }

        const createdUser = new this.userModel(userDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser)
    }

    async findByLogin(userDTO: LoginDTO): Promise<any> {
        const { username, password } = userDTO;
        const user = await this.userModel.findOne({ username });

        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        } else {
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    async findByPayload(payload: Payload): Promise<any> {
        const { username } = payload;
        return await this.userModel.findOne({ username });
    }
}
