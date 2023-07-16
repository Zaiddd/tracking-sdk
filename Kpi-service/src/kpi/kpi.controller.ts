import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { KpiService } from './kpi.service';
import { Kpi } from '../schemas/kpi.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from '../schemas/tag.schema';
import { Model } from 'mongoose';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('kpi')
export class KpiController {
  constructor(private readonly kpiService: KpiService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createKpi(@Body() kpi: Kpi) {
    return this.kpiService.create(kpi);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getUniqueVisitorsCount(appId: string) {
    return this.kpiService.findAllKpis(appId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('tag/:tag')
  async getKpisByTag(@Body() tag: string) {
    return this.kpiService.findKpisByTag(tag);
  }

  @HttpCode(HttpStatus.OK)
  @Get('visitor/:visitor')
  async getKpisByVisitor(@Body() visitor: string) {
    return this.kpiService.findKpisByVisitor(visitor);
  }
}
