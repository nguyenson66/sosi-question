import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/share/auth/get-user.decotory';
import { User } from 'src/user/user.schema';
import { SearchQuestionDto } from './dto/search-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';
import { Question } from './schema/question.schema';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get()
  getAllQuestion(
    @Query() searchQuestionDto: SearchQuestionDto,
  ): Promise<Question[]> {
    return this.questionService.getAllQuestion(searchQuestionDto);
  }

  @Get('/my-question')
  @UseGuards(AuthGuard())
  getMyQuestion(
    @GetUser() user: User,
    @Query() searchQuestionDto: SearchQuestionDto,
  ): Promise<Question[]> {
    return this.questionService.getMyQuestion(user, searchQuestionDto);
  }

  @Get('/:id')
  getQuestionById(@Param('id') id: string): Promise<Question> {
    return this.questionService.getQuestionById(id);
  }

  @Post('/create')
  @UseGuards(AuthGuard())
  createQuestion(
    @GetUser() user: User,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionService.createQuestion(user, createQuestionDto);
  }

  // @Patch('/:id')
  // @UseGuards(AuthGuard())
  // changeQuestion(
  //   @GetUser() user: User,
  //   @Body() changeQuestionDto: CreateQuestionDto,
  //   @Param('id') id: string,
  // ): Promise<Question> {
  //   return this.questionService.changeQuestion(user, changeQuestionDto, id);
  // }
}
