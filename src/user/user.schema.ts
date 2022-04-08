import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timestamp } from 'rxjs';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [String] })
  interists: string[];

  @Prop({ default: 0 })
  Score: number;

  @Prop({ default: 'sositech.xyz' })
  avatar: string;

  @Prop({ type: timestamp })
  created_at: Date;

  @Prop({ type: timestamp })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
