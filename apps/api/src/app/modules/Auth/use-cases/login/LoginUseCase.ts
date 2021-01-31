import { AuthProps, AuthToken } from '@mj-website/api-interfaces';
import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { AuthErrors } from '../../domain/AuthErrors';
import { authValidator } from '../../domain/AuthValidator';
import { AuthService } from '../../services/AuthService';

export type LoginCommand = AuthProps;

export type LoginResponse = Either<Result<AuthErrors>, Result<AuthToken>>;

export class LoginUseCase implements UseCase<LoginCommand, LoginResponse> {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async execute(command: LoginCommand): Promise<LoginResponse> {
    const validAuthCode = await authValidator.validate(command);

    if (validAuthCode.isFailure) {
      return left(AuthErrors.createInvalidAuthCodeError(validAuthCode.getValue()));
    }

    const generatedToken = await this.authService.generateCode(command);

    if (generatedToken.isFailure) {
      return left(AuthErrors.createTokenError(generatedToken.error));
    }

    return right(generatedToken);
  }
}
