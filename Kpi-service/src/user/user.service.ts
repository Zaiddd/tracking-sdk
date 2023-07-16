import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async create(userId: number, username: string, email: string, password: string): Promise<User> {
        password = await bcrypt.hash(password, 10);
        const user = new this.userModel({ userId, username, email, password });
        return user.save();
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email }).exec();
    }

    async findLastUserId() {
        return this.userModel.findOne().sort({userId: -1}).exec();
    }
}
