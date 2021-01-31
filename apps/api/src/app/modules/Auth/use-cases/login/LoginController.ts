import { BaseController } from '../../../../core/infra/BaseController';
import { LoginUseCase } from './LoginUseCase';

export class LoginController extends BaseController {
  private readonly useCase: LoginUseCase;

  constructor(useCase: LoginUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl() {
    const { auth_code, state } = this.req.query as never;

    try {
      const result = await this.useCase.execute({ auth_code, state });

      if (result.isLeft()) {
        const error = result.value.getValue();

        switch (error.type) {
          case 'VALIDATION_ERRORS':
            return this.invalidEntity(error.error);
          case 'GENERATE_TOKEN_ERROR':
            return this.fail(error.error);
          default:
            return this.fail(error);
        }
      } else {
        return this.ok(result.value.getValue());
      }
    } catch (err) {
      return this.fail(err);
    }
  }
}
