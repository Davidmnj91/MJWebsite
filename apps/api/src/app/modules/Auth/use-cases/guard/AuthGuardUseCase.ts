import { Either, left, Result, right } from '@mj-website/monads';
import { UseCase } from '../../../../core/infra/UseCase';
import { AuthErrors } from '../../domain/AuthErrors';
import { BearerTokenProps, bearerTokenValidator } from '../../domain/BearerTokenValidator';
import { AuthService } from '../../services/AuthService';
import { bearerToToken } from '../../utils/TokenUtils';

export type AuthCommand = BearerTokenProps;

export type AuthGuardResponse = Either<Result<AuthErrors>, Result<void>>;

export class AuthGuardUseCase implements UseCase<AuthCommand, AuthGuardResponse> {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async execute(command: AuthCommand): Promise<AuthGuardResponse> {
    const isValidFormatToken = await bearerTokenValidator.validate(command);

    if (isValidFormatToken.isFailure) {
      return left(AuthErrors.createTokenError(isValidFormatToken.getValue()));
    }

    const bearerToken = bearerToToken(command.bearerToken);
    const validBearerToken = this.authService.checkToken(bearerToken);

    if (validBearerToken.isFailure) {
      return left(AuthErrors.createTokenError(validBearerToken.getValue()));
    }

    return right(Result.ok());
  }
}
