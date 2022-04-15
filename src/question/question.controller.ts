import {
  Body,
  Controller,
  Delete,
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ShowAnswerDto } from 'src/answer/dto/show-answer.dto';

@ApiTags('Questions')
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
  getQuestionById(
    @Param('id') id: string,
    @Query() showAnswerDto: ShowAnswerDto,
  ): Promise<Question> {
    return this.questionService.getQuestionById(id, showAnswerDto);
  }

  @Post('/create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  createQuestion(
    @GetUser() user: User,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionService.createQuestion(user, createQuestionDto);
  }

  @Post('/vote/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  voteQuestion(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Question> {
    return this.questionService.voteQuestion(user, id);
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  changeQuestion(
    @GetUser() user: User,
    @Body() changeQuestionDto: CreateQuestionDto,
    @Param('id') id: string,
  ): Promise<Question> {
    return this.questionService.changeQuestion(user, changeQuestionDto, id);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  deleteQuestiono(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<{
    statusCode: number;
    message: string;
  }> {
    return this.questionService.deleteQuestion(user, id);
  }
}
