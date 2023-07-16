import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KpiModule } from './kpi/kpi.module';
import { VisitModule } from './visit/visit.module';
import { VisitorModule } from './visitor/visitor.module';
import { TimeModule } from './time/time.module';
import { BrowserModule } from './browser/browser.module';
import { DeviceModule } from './device/device.module';
import { TagModule } from './tag/tag.module';
import { AppidModule } from './appid/appid.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './user/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://database:27017/nestjs-mongodb'),
    KpiModule,
    VisitModule,
    VisitorModule,
    TimeModule,
    BrowserModule,
    DeviceModule,
    TagModule,
    AppidModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
