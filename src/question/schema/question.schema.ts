import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { timestamp } from 'rxjs';
import { Category } from 'src/category/schema/category.schema';
import { User } from 'src/user/user.schema';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }])
  category: Category[];

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  viewed: number;

  @Prop({ type: [String] })
  voted: [string];

  @Prop({ type: timestamp })
  created_at: Date;

  @Prop({ type: timestamp })
  updated_at: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
