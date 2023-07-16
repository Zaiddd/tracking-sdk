import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
} from '@nestjs/common';
import { VisitService } from './visit.service';
import { Visit } from '../schemas/visit.schema';
import { MessagePattern } from '@nestjs/microservices';

@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createVisit(@Body() visit: Visit) {
    return this.visitService.create(visit);
  }

  // Get total unique Visits
  /*@Get()
    @HttpCode(200)
    async getUniqueVisitsCount(@Body() body: { app_id: string }) {
        const { app_id } = body;
        return this.visitService.getTotalDistinctVisits(app_id);
    }*/

  @HttpCode(HttpStatus.OK)
  @Get()
  async getTotalVisitsCount(@Headers() headers) {
    const appId = headers['app-id'];
    return this.visitService.getTotalVisitsByAppId(appId);
  }
}
