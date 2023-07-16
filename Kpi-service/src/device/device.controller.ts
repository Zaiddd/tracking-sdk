import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from '../schemas/device.schema';
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createDevice(@Body() device: Device) {
    return this.deviceService.create(device);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getTotalDevicesCount(@Body() headers) {
    const app_id = headers['app-id'];
    return this.deviceService.getTotalDevicesByAppId(app_id);
  }
}
