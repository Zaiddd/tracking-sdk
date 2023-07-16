import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, now} from 'mongoose';

@Schema()
export class Appid extends Document {
    @Prop({required: true})
    app_id: string;

    @Prop({required: true})
    mail: string;

    @Prop({required: true, default: now()})
    createdAt: Date;
}

export const AppidSchema = SchemaFactory.createForClass(Appid);