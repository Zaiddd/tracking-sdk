import {Module} from '@nestjs/common';
import {KpiService} from './kpi.service';
import {KpiController} from './kpi.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Kpi, KpiSchema} from "../schemas/kpi.schema";
import {TagModule} from "../tag/tag.module";
import {AppidModule} from "../appid/appid.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Kpi.name, schema: KpiSchema}]),
        TagModule,
        AppidModule
    ],
    providers: [KpiService],
    controllers: [KpiController]
})
export class KpiModule {
}
