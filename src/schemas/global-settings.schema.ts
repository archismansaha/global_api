import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class GlobalSettings extends Document {
  @Prop({ required: true, default: true })
  authEnabled: boolean;

  @Prop({ required: true })
  twilio_sid: string;

  @Prop({ required: true })
  twilio_token: string;

  @Prop({ required: true })
  from_twilio_phone_no: string;
  
  @Prop({ required: true })
  to_twilio_phone_no: string;

}

export const GlobalSettingsSchema = SchemaFactory.createForClass(GlobalSettings);
export type GlobalSettingsDocument = GlobalSettings & Document;