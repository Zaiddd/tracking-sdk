import {Module} from '@nestjs/common';
import {AppidService} from './appid.service';
import {AppidController} from './appid.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Appid, AppidSchema} from "../schemas/appid.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Appid.name, schema: AppidSchema}]),
    ],
    providers: [AppidService],
    controllers: [AppidController],
    exports: [AppidService]
})
export class AppidModule {
}
