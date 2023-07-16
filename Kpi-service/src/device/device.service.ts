import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Device} from "../schemas/device.schema";

@Injectable()
export class DeviceService {
    constructor(@InjectModel('Device') private readonly deviceModel: Model<Device>) {
    }

    async create(dataDevice: Device): Promise<Device> {
        const createdDevice = new this.deviceModel(dataDevice);
        return createdDevice.save();
    }

    async getTotalDevicesByAppId(appId: string) {
        const result = await this.deviceModel.aggregate([
            {
                $match: {app_id: appId}
            },
            {
                $group: {
                    _id: { id_visitor: "$id_visitor", device: "$device" },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.device",
                    count: { $sum: 1 }
                }
            }
        ]).exec();
        return result;
    }
}
