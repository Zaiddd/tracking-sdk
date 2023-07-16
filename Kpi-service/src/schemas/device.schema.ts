import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, now} from 'mongoose';

@Schema()
export class Device extends Document {
    @Prop({required: true})
    app_id: string;

    @Prop({required: true})
    device: string;

    @Prop({required: true})
    id_visitor: string;

    @Prop({required: true, default: now()})
    createdAt: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
