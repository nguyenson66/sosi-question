import { Module } from '@nestjs/common';
import { AnswerModule } from './answer/answer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ShareModule } from './share/share.module';
import { QuestionModule } from './question/question.module';
import { CategoryModule } from './category/category.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/sosiquestion',
      //  {
      //   connectionFactory: (connection) => {
      //     connection.plugin(require('mongoose-populate'));
      //     return connection;
      //   },}
    ),
    AnswerModule,
    UserModule,
    ShareModule,
    QuestionModule,
    CategoryModule,
    AdminModule,
  ],
})
export class AppModule {}
