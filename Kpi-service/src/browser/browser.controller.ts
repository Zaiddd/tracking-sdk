import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { BrowserService } from './browser.service';
import { Browser } from '../schemas/browser.schema';
import { Headers } from '@nestjs/common';

@Controller('browser')
export class BrowserController {
  constructor(private readonly browserService: BrowserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createBrowser(@Body() browser: Browser) {
    return this.browserService.create(browser);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getTotalBrowsersCount(@Headers() headers) {
    const app_id = headers['app-id'];
    return this.browserService.getTotalBrowsersByAppId(app_id);
  }
}
