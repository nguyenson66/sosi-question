import { forwardRef, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { UserPayLoad } from './user-payload.interface';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {
    super({
      secretOrKey: 'sosi-question',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(userPayload: UserPayLoad) {
    const { username } = userPayload;

    const user = await this.userService.getUserByUsername(username);

    return user;
  }
}
