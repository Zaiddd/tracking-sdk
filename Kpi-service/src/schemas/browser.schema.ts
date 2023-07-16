import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, now} from 'mongoose';

@Schema()
export class Browser extends Document {
    @Prop({required: true})
    app_id: string;

    @Prop({required: true})
    browser: string;

    @Prop({required: true})
    id_visitor: string;

    @Prop({required: true, default: now()})
    createdAt: Date;
}

export const BrowserSchema = SchemaFactory.createForClass(Browser);
