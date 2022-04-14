import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { timestamp } from 'rxjs';
import {ObjectId, Document} from 'mongoose'
import { Role } from './enum/user-role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Transform(({value}) => value.toString())
  _id : ObjectId;

  @Prop({
    unique: true,
  })
  username: string;

  @Prop({
    unique : true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [String] })
  interists: string[];

  @Prop({ default: 'sositech.xyz' })
  avatar: string;

  @Prop({default: [Role.Client]})
  roles : Role[];

  @Prop({ type: timestamp })
  created_at: Date;

  @Prop({ type: timestamp })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
