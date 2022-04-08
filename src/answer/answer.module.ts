import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionModule } from 'src/question/question.module';
import { ShareModule } from 'src/share/share.module';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Answer, AnswerSchema } from './schema/answer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
    QuestionModule,
    ShareModule,
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
