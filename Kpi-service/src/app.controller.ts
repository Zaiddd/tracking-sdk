import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Kpi } from './schemas/kpi.schema';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {}
