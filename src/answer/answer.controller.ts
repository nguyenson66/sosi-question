import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/share/auth/get-user.decotory';
import { User } from 'src/user/user.schema';
import { AnswerService } from './answer.service';
import { AnswerDto } from './dto/answer.dto';
import { Answer } from './schema/answer.schema';

@ApiBearerAuth()
@ApiTags('Answers')
@Controller('answer')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Post('/question/:id')
  @UseGuards(AuthGuard())
  addAnswer(
    @GetUser() user: User,
    @Body() answerDto: AnswerDto,
    @Param('id') id: string,
  ): Promise<Answer> {
    return this.answerService.addAnswer(user, answerDto, id);
  }

  @Post('/vote/:id')
  @UseGuards(AuthGuard())
  voteAnswer(@GetUser() user: User, @Param('id') id: string): Promise<Answer> {
    return this.answerService.voteAnswer(user, id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateAnswer(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() answerDto: AnswerDto,
  ): Promise<Answer> {
    return this.answerService.update(user, answerDto, id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteAnswer(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<{ statusCode: number; message: string }> {
    return this.answerService.delete(user, id);
  }
}
