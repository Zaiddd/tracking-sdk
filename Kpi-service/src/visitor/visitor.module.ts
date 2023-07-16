import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Visitor, VisitorSchema} from "../schemas/visitor.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Visitor.name, schema: VisitorSchema }]),
  ],
  providers: [VisitorService],
  controllers: [VisitorController]
})
export class VisitorModule {}
