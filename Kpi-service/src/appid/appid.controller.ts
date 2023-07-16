import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppidService } from './appid.service';
import { Appid } from '../schemas/appid.schema';

@Controller('appid')
export class AppidController {
  constructor(private readonly appidService: AppidService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createAppid(@Body() appid: Appid) {
    return this.appidService.create(appid);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getTotalAppidsCount(@Headers() headers) {
    const email = headers['email'];
    return this.appidService.getAppidByEmail(email);
  }
}
