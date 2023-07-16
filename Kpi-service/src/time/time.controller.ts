import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Time } from '../schemas/time.schema';
import { TimeService } from './time.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTime(@Body() time: Time) {
    return this.timeService.create(time);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getTotalSecondsByPage(@Payload() headers) {
    const app_id = headers['app-id'];
    return await this.timeService.getTotalSecondsByPage(app_id);
  }
}
