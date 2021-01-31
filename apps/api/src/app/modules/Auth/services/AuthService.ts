import { AuthProps, AuthToken } from '@mj-website/api-interfaces';
import { Result } from '@mj-website/monads';
import * as jwt from 'jsonwebtoken';

export class AuthService {
  generateCode(auth: AuthProps): Result<AuthToken> {
    const claims = {
      sub: auth.auth_code,
      iat: Math.floor(Date.now() / 1000) + 60 * 60 * 8, // 8h
      state: auth.state,
    };

    try {
      const token = jwt.sign(claims, process.env.AUTH_SECRET);
      return Result.ok({ token });
    } catch (error) {
      return Result.fail(error);
    }
  }

  checkToken(bearerToken: string) {
    try {
      jwt.verify(bearerToken, process.env.AUTH_SECRET);
      return Result.ok();
    } catch (err) {
      return Result.fail(err);
    }
  }
}
