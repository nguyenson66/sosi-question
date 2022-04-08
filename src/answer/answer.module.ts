import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

@Module({
  imports: [MongooseModule.forFeature([])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
