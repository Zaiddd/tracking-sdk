import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Time} from "../schemas/time.schema";

@Injectable()
export class TimeService {
    constructor(@InjectModel('Time') private readonly timeModel: Model<Time>) {
    }

    async create(dataTime: Time): Promise<Time> {
        const createdTime = new this.timeModel(dataTime);
        return createdTime.save();
    }

    async getTotalSecondsByPage(appId: string) {
        const result = await this.timeModel.aggregate([
            {
                $match: {app_id: appId}
            },
            {
                $group: {
                    _id: {page: "$page"},
                    totalSeconds: {$sum: "$seconds"}
                }
            },
            {
                $sort: {totalSeconds: -1}
            }
        ]).exec();
        return result;
    }
}
