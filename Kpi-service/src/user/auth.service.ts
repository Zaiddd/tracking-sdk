import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {UserService} from './user.service';
import {User, UserDocument} from "../schemas/user.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CreateUserDto} from "./user.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
    }

    async signIn(email, pass) {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new BadRequestException("User not found");
        }
        let passwordCheck = await bcrypt.compare(pass, user.password);
        if (!passwordCheck) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload = {username: user.username, sub: user.userId};

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(userDto: CreateUserDto): Promise<User> {
        const {username, email, password} = userDto;

        const existingUser = await this.userService.findOneByEmail(email);
        if (existingUser) {
            throw new BadRequestException('This email is already used.');
        }

        const lastUserId = await this.userService.findLastUserId();
        let userId = 1;
        if (lastUserId) {
            userId = lastUserId.userId + 1;
        }

        const user = this.userService.create(userId, username, email, password);
        return await user;
    }

    async logout() {
        return true;
    }
}