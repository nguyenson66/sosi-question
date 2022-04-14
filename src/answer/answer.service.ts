import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer, AnswerDocument } from './schema/answer.schema';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { AnswerDto } from './dto/answer.dto';
import { QuestionService } from 'src/question/question.service';
import { StatusCode } from 'src/share/dto/statusCode.dto';
import { ShowAnswerDto } from './dto/show-answer.dto';
import * as moment from 'moment';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name)
    private answerModel: Model<AnswerDocument>,
    @Inject(forwardRef(() => QuestionService))
    private questionService: QuestionService,
  ) {}

  async findByQuestionId(
    id: string,
    showAnswerDto: ShowAnswerDto,
  ): Promise<Answer[]> {
    let { order, by } = showAnswerDto;

    if (by) {
      if (by === 'new answer') {
        order = 'asc';
      } else if (by === 'oldest answer') {
        order = 'desc';
      }
      by = 'created_at';
    } else {
      by = 'voted';
      order = 'desc';
    }

    const answers = await this.answerModel
      .find({ question: id })
      .populate('user', 'username avatar')
      .sort([[by, order]])
      .select('content voted created_at updated_at');

    return answers;
  }

  async addAnswer(
    user: User,
    answerDto: AnswerDto,
    id: string,
  ): Promise<StatusCode> {
    const { content } = answerDto;
    const currentDate = moment().format();
    const question = await this.questionService.findById(id);

    if (!question) throw new NotFoundException();

    try {
      const result = await this.answerModel.create({
        user,
        question,
        content,
        created_at: currentDate,
        updated_at: currentDate,
      });

      return {
        statusCode: 200,
        message: 'Add answer successfully !!!',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async voteAnswer(user: User, id: string): Promise<Answer> {
    const answer = await this.answerModel.findById(id);

    if (!answer) throw new NotFoundException(`Answer ID : ${id} not found !!!`);

    if (answer.voted.includes(user._id)) {
      answer.voted = answer.voted.filter(
        (ele) => ele.toString() != user._id.toString(),
      );
    } else {
      answer.voted.push(user._id);
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
