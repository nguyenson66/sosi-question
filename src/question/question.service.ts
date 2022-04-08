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

  async getQuestionById(id: string): Promise<Question> {
    const question = await this.questionModel
      .findById(id)
      .populate('user', 'username Score avatar')
      .populate('category', 'name');

    if (!question) {
      throw new NotFoundException();
    }

    return question;
  }

  /// POST Method ///

  async createQuestion(user: User, createQuestionDto: CreateQuestionDto) {
    // if (!createQuestionDto) throw new BadRequestException();

    console.log(user);

    let { title, content, category } = createQuestionDto;

    if (!Array.isArray(category)) {
      category = [category];
    }

    let categorys = [];

    for (let i = 0; i < category.length; i++) {
      const ctg = await this.categoryService.getCategoryById(category[i]);
      categorys.push(ctg);
    }

    const question = new this.questionModel({
      user,
      category: categorys,
      title,
      content,
    });

    try {
      const res = await question.save();
      return res;
      // return question;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }

  /// PATCH Method ///

  // async changeQuestion(
  //   user: User,
  //   changeQuestionDto: CreateQuestionDto,
  //   id: string,
  // ): Promise<Question> {
  //   const question = await this.questionModel.findOne({ _id: id, user });
  //   if (!question) throw new BadRequestException();

  //   let { title, content, category } = changeQuestionDto;

  //   if(!Array.isArray(category)) category = [category]

  //   question.title = title;
  //   question.content = content;
  //   question.category = await this.categoryService.;

  //   return question;
  // }
}
