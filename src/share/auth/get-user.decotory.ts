import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/user.schema';

export const GetUser = createParamDecorator(async function GetUser(
  data,
  context: ExecutionContext,
): Promise<User> {
  const req = await context.switchToHttp().getRequest();

  const user = req.user;
  if (user) {
    user.password = undefined;
    return user;
  }

  return undefined;
});
