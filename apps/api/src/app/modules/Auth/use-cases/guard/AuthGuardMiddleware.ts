import { BaseController } from '../../../../core/infra/BaseController';
import { AuthGuardUseCase } from './AuthGuardUseCase';

export class AuthGuardMiddleware extends BaseController {
  private readonly useCase: AuthGuardUseCase;

  constructor(useCase: AuthGuardUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const bearerToken = this.req.headers.authorization;

    try {
      const result = await this.useCase.execute({ bearerToken });

      if (result.isLeft()) {
        const error = result.value.getValue();

        switch (error.type) {
          case 'CHECK_TOKEN_ERROR':
            return this.invalid(403, error.error);
          default:
            return this.fail(error);
        }
      } else {
        return this.next();
      }
    } catch (err) {
      return this.fail(err);
    }
  }
}
