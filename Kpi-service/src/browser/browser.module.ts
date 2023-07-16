import { Module } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { BrowserController } from './browser.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Browser, BrowserSchema} from "../schemas/browser.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Browser.name, schema: BrowserSchema }]),
  ],
  providers: [BrowserService],
  controllers: [BrowserController]
})
export class BrowserModule {}
