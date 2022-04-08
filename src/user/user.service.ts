import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserPayLoad } from 'src/share/auth/user-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async register(registerDto: RegisterDto): Promise<User> {
    try {
      const { username, email, password } = registerDto;
      const currentDate = moment().format();

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = {
        username,
        email,
        password: hashedPassword,
        created_at: currentDate,
        updated_at: currentDate,
      };

      const res = await this.userModel.create(user);

      return res;
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException('Email or Username already exists !!');
      throw new InternalServerErrorException();
    }
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;

    const user = await this.userModel.findOne({
      $or: [
        {
          username,
        },
        { email: username },
      ],
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: UserPayLoad = { id: user.id };

      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    }
    throw new NotFoundException();
  }
}
