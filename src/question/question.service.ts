import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { User } from 'src/user/user.schema';
import { SearchQuestionDto } from './dto/search-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question, QuestionDocument } from './schema/question.schema';
import * as moment from 'moment';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name)
    private questionModel: Model<QuestionDocument>,
    private categoryService: CategoryService,
  ) {}

  async getAllQuestion(
    searchQuestionDto: SearchQuestionDto,
  ): Promise<Question[]> {
    let { s, category, order, by, limit, skip } = searchQuestionDto;

    if (category && !Array.isArray(category)) category = [category];

    const questions = await this.questionModel
      .find({
        title: { $regex: '.*' + (s || '') + '.*' },
        content: { $regex: '.*' + (s || '') + '.*' },
      })
      .populate('user', 'username Score avatar')
      .populate('category', 'name')
      .where(category ? 'category' : '1')
      .in(category ? category : ['1'])
      .skip(skip ? +skip : 0)
      .limit(limit ? +limit : Number.MAX_SAFE_INTEGER)
      .sort([
        [by ? by : 'title', order && order.toLowerCase() === 'desc' ? -1 : 1],
      ])
      .select('title content voted category');

    return questions;
  }

  async getMyQuestion(
    user: User,
    searchQuestionDto: SearchQuestionDto,
  ): Promise<Question[]> {
    let { s, category, order, by, limit, skip } = searchQuestionDto;

    if (category && !Array.isArray(category)) category = [category];

    const questions = await this.questionModel
      .find({
        title: { $regex: '.*' + (s || '') + '.*' },
        content: { $regex: '.*' + (s || '') + '.*' },
        user,
      })
      .populate('user', 'username Score avatar')
      .populate('category', 'name')
      .where(category ? 'category' : '1')
      .in(category ? category : ['1'])
      .skip(skip ? +skip : 0)
      .limit(limit ? +limit : Number.MAX_SAFE_INTEGER)
      .sort([
        [by ? by : 'title', order && order.toLowerCase() === 'desc' ? -1 : 1],
      ])
      .select('title content voted category');

    return questions;
  }

  async findById(id: string): Promise<Question> {
    const question = await this.questionModel.findById(id);

    question.viewed += 1;

    await question.save();

    if (!question)
      throw new NotFoundException(`Question id ${id} not found !!!`);

    return question;
  }

  async getQuestionById(id: string): Promise<Question> {
    const question = await this.questionModel
      .findById(id)
      .populate('user', 'username Score avatar')
      .populate('category', 'name');
    
    question.viewed += 1;
    await question.save();

    if (!question) {
      throw new NotFoundException();
    }

    return question;
  }

  /// POST Method ///

  async createQuestion(user: User, createQuestionDto: CreateQuestionDto) {
    // if (!createQuestionDto) throw new BadRequestException();

    console.log(createQuestionDto);

    let { title, content, category } = createQuestionDto;
    const currentDate = new Date(moment().format());

    if (!Array.isArray(category)) {
      category = [category];
    }

    let categorys = await this.categoryService.getListCategoryByListID(
      category,
    );

    const question = new this.questionModel({
      user,
      category: categorys,
      title,
      content,
      created_at: currentDate,
      updated_at: currentDate,
    });

    try {
      const res = await question.save();
      res.user.password = undefined;
      return res;
      // return question;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }

  async voteQuestion(user: User, id: string): Promise<Question> {
    let question = await this.questionModel.findById(id);

    if (!question) throw new NotFoundException();

    if (question.voted.includes(user._id)) {
      question.voted = question.voted.filter((ele) => ele.toString() != user._id.toString());
    } else question.voted.push(user._id);

    await question.save();

    return question;
  }

  /// PATCH Method ///

  async changeQuestion(
    user: User,
    changeQuestionDto: CreateQuestionDto,
    id: string,
  ): Promise<Question> {
    const question = await this.questionModel.findOne({ _id: id, user });
    if (!question) throw new BadRequestException();

    let { title, content, category } = changeQuestionDto;

    if (!Array.isArray(category)) category = [category];

    question.title = title;
    question.content = content;
    question.category = await this.categoryService.getListCategoryByListID(
      category,
    );

    const result = await question.save();

    return result;
  }

  /// DELETE Method ///
  async deleteQuestion(
    user: User,
    id: string,
  ): Promise<{ statusCode: number; message: string }> {
    const question = await this.questionModel.findOne({ user, _id: id });

    if (!question) throw new NotFoundException();

    await question.remove();

    return {
      statusCode: 200,
      message: 'Delete question successfully !!!',
    };
  }
}
