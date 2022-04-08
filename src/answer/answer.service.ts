import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer, AnswerDocument } from './schema/answer.schema';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { AnswerDto } from './dto/answer.dto';
import { QuestionService } from 'src/question/question.service';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name)
    private answerModel: Model<AnswerDocument>,
    private questionService: QuestionService,
  ) {}

  async addAnswer(
    user: User,
    answerDto: AnswerDto,
    id: string,
  ): Promise<Answer> {
    const { content } = answerDto;

    const question = await this.questionService.findById(id);

    try {
      const result = await this.answerModel.create({
        user,
        question,
        content,
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async voteAnswer(user: User, id: string): Promise<Answer> {
    const answer = await this.answerModel.findById(id);

    if (!answer) throw new NotFoundException(`Answer ID : ${id} not found !!!`);

    if (answer.voted.includes(user.username)) {
      answer.voted = answer.voted.filter((ele) => ele != user.username);
    } else {
      answer.voted.push(user.username);
    }

    return await answer.save();
  }

  async update(user: User, answerDto: AnswerDto, id: string): Promise<Answer> {
    const { content } = answerDto;

    const answer = await this.answerModel.findOne({
      _id: id,
      user,
    });

    if (!answer) throw new NotFoundException(`Answer ID : ${id} not found !!!`);

    answer.content = content;

    await answer.save();

    return answer;
  }

  async delete(
    user: User,
    id: string,
  ): Promise<{
    statusCode: number;
    message: string;
  }> {
    const answer = await this.answerModel.findOne({
      _id: id,
      user,
    });

    if (!answer) throw new NotFoundException(`Answer ID : ${id} not found !!!`);

    await answer.delete();

    return {
      statusCode: 200,
      message: 'Delete answer successfully !!!',
    };
  }
}
