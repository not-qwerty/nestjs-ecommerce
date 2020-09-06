import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/types/user';
import { RegisterDTO, LoginDTO } from '../auth/auth.dto';
import * as bcrypt from 'bcrypt';
import { IPayload } from '../types/payload';
import { ERROR_MESSAGES } from './ERROR_MESSAGES';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<IUser>) { }

    private sanitizeUser(user: IUser) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }

    async findAll(): Promise<IUser[]> {
        return await this.userModel.find();
    }

    async findAllSellers(): Promise<IUser[]> {
        return await this.userModel.find({ seller: true })
    }

    async create(userDTO: RegisterDTO): Promise<RegisterDTO> {
        const { username } = userDTO;
        const user = await this.userModel.findOne({ username });

        if (user) {
            throw new HttpException(ERROR_MESSAGES.EXISTED_USER,
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
            throw new HttpException(ERROR_MESSAGES.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
        }

        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        } else {
            throw new HttpException(ERROR_MESSAGES.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
        }
    }

    async findByPayload(payload: IPayload): Promise<any> {
        const { username } = payload;
        return await this.userModel.findOne({ username });
    }
}
