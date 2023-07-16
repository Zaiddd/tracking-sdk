import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Tag} from "../schemas/tag.schema";

@Injectable()
export class TagService {
    constructor(@InjectModel('Tag') private readonly tagModel: Model<Tag>) {
    }

    async create(dataTag: Tag): Promise<Tag> {
        const createdTag = new this.tagModel(dataTag);
        return createdTag.save();
    }

    async findAllByAppId(appId: string): Promise<Tag[]> {
        return this.tagModel.find({appId}).exec();
    }

    async findOneByLabel(label: string): Promise<Tag> {
        return this.tagModel.findOne({label: label}).exec();
    }
}
