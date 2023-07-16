import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Browser} from "../schemas/browser.schema";

@Injectable()
export class BrowserService {
    constructor(@InjectModel('Browser') private readonly browserModel: Model<Browser>) {
    }

    async create(dataBrowser: Browser): Promise<Browser> {
        const createdBrowser = new this.browserModel(dataBrowser);
        return createdBrowser.save();
    }

    async getTotalBrowsersByAppId(appId: string) {
        const result = await this.browserModel.aggregate([
            {
                $match: {app_id: appId}
            },
            {
                $group: {
                    _id: { id_visitor: "$id_visitor", browser: "$browser" },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.browser",
                    count: { $sum: 1 }
                }
            }
        ]).exec();
        return result;
    }
}
