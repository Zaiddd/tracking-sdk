import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, now} from 'mongoose';

@Schema()
export class Visit extends Document {
    @Prop({required: true})
    app_id: string;

    @Prop({required: true})
    page: string;

    @Prop({required: true})
    id_visit: string;

    @Prop({required: true, default: now()})
    createdAt: Date;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
