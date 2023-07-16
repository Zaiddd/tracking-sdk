import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, now} from 'mongoose';

@Schema()
export class Tag extends Document {
    @Prop({required: true})
    app_id: string;

    @Prop({required: true, min: 3, max: 20})
    label: string;

    @Prop({required: false})
    email: string;

    @Prop({required: true, default: now()})
    createdAt: Date;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
