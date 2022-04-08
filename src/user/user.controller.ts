import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return this.userService.login(loginDto);
  }
}
