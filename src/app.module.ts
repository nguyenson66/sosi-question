import { Module } from '@nestjs/common';
import { AnswerModule } from './answer/answer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ShareModule } from './share/share.module';
import { QuestionModule } from './question/question.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    AnswerModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/sosiquestion',
      //  {
      //   connectionFactory: (connection) => {
      //     connection.plugin(require('mongoose-populate'));
      //     return connection;
      //   },}
    ),
    UserModule,
    ShareModule,
    QuestionModule,
    CategoryModule,
  ],
})
export class AppModule {}
