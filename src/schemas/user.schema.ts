import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';



@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], enum: ['user', 'admin'], default: ['user'] })
  roles: string[];

  @Prop()
  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }

  @Prop()
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User)

