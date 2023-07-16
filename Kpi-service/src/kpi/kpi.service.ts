import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Kpi} from "../schemas/kpi.schema";
import {TagService} from "../tag/tag.service";
import {AppidService} from "../appid/appid.service";

@Injectable()
export class KpiService {
    constructor(@InjectModel('Kpi') private readonly kpiModel: Model<Kpi>, @Inject(TagService) private readonly tagService: TagService, @Inject(AppidService) private readonly appidService: AppidService) {
    }

    async create(dataKpi: Kpi){
        const tag = await this.tagService.findOneByLabel(dataKpi.tag);
        const appid = await this.appidService.findOneByName(dataKpi.app_id);

        if (tag && appid) {
            const createdKpi = new this.kpiModel(dataKpi);
            return createdKpi.save();
        }
        return null;
    }

    async findAllKpis(appId: string){
        return this.kpiModel.find({app_id: appId}).sort({ createdAt: -1 }).exec();
    }

    async findKpisByTag(tag: string): Promise<Kpi[]> {
        return this.kpiModel.find({tag: tag}).exec();
    }

    async findKpisByVisitor(visitor: string): Promise<Kpi[]> {
        return this.kpiModel.find({visitor: visitor}).exec();
    }
}
