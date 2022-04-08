import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
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

  @Prop()
  voted: string[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
