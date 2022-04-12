import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, ObjectId} from 'mongoose';
import * as mongoose from 'mongoose';
import { timestamp } from 'rxjs';
import { Category } from 'src/category/schema/category.schema';
import { User } from 'src/user/user.schema';
import { Transform } from 'class-transformer';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {

  @Transform(({value}) => value.toString())
  _id : ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }])
  category: Category[];

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ default: 0 })
  viewed: number;

  @Prop({type: [mongoose.Schema.Types.ObjectId],default: []})
  voted: ObjectId[];

  @Prop({ type: timestamp })
  created_at: Date;

  @Prop({ type: timestamp })
  updated_at: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
