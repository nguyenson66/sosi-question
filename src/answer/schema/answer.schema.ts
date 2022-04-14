import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';
import { timestamp } from 'rxjs';
import { Question } from 'src/question/schema/question.schema';
import { User } from 'src/user/user.schema';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Question.name })
  question: Question;

  @Prop()
  content: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], default: [] })
  voted: ObjectId[];

  @Prop({ type: timestamp })
  created_at: string;

  @Prop({ type: timestamp })
  updated_at: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
