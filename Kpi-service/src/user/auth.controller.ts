import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './user.dto';
import { AuthGuard } from './auth.guard';
import { CreateUserValidationPipe } from './user.pipe';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('kpiAuth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('login')
  async signIn(@Body() signInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UsePipes(new CreateUserValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  async logout() {
    return this.authService.logout();
  }
}
