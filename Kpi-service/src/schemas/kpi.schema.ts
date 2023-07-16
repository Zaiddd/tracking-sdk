import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, now} from 'mongoose';

@Schema()
export class Kpi extends Document {
    @Prop({required: true})
    app_id: string;

    @Prop({required: true})
    id_visitor: string;

    @Prop({required: true})
    id_visit: string;

    @Prop({required: true})
    tag: string;

    @Prop({required: true})
    event: string;

    @Prop({required: true})
    content: string;

    @Prop({required: true, default: now()})
    createdAt: Date;
}

export const KpiSchema = SchemaFactory.createForClass(Kpi);
