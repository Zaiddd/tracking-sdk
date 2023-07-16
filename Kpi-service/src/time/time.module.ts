import { Module } from '@nestjs/common';
import { TimeController } from './time.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Time, TimeSchema} from "../schemas/time.schema";
import {TimeService} from "./time.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Time.name, schema: TimeSchema }]),
  ],
  providers: [TimeService],
  controllers: [TimeController]
})
export class TimeModule {}
