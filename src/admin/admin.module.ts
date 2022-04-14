import { Module } from '@nestjs/common';
import { AnswerModule } from 'src/answer/answer.module';
import { CategoryModule } from 'src/category/category.module';
import { QuestionModule } from 'src/question/question.module';
import { ShareModule } from 'src/share/share.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    CategoryModule,
    QuestionModule,
    AnswerModule,
    ShareModule,
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
