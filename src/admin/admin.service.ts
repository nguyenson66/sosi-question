import { Injectable } from '@nestjs/common';
import { AnswerService } from 'src/answer/answer.service';
import { SearchQuestionDto } from 'src/question/dto/search-question.dto';
import { QuestionService } from 'src/question/question.service';

@Injectable()
export class AdminService {
    constructor(
        private questionService : QuestionService,
        private answerService : AnswerService,
    ){}

    questionManagement(searchQuestionDto : SearchQuestionDto){
        const questions = this.questionService.getAllQuestion(searchQuestionDto);


    }


}
