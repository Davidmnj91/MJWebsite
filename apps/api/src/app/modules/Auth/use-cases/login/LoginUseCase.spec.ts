import { AuthProps } from '@mj-website/api-interfaces';
import * as Faker from 'faker';
import * as jwt from 'jsonwebtoken';
import { totp } from 'otplib';
import { AuthValidator } from '../../domain/AuthValidator';
import { AuthService } from '../../services/AuthService';
import { LoginUseCase } from './LoginUseCase';

let useCase: LoginUseCase;
let authService: AuthService;
let authValidator: AuthValidator;

describe('LoginUseCase', () => {
  beforeEach(() => {
    authService = new AuthService();
    authValidator = new AuthValidator();
    useCase = new LoginUseCase(authService, authValidator);
  });

  it('Should be able to login', async () => {
    const randomJwt = Faker.random.alphaNumeric(36);

    totp.check = jest.fn().mockReturnValue(true);
    jwt.sign = jest.fn().mockReturnValue(randomJwt);

    let errorOccurred = false;

    const authProps: AuthProps = {
      auth_code: Faker.random.number({ max: 999999, min: 100000 }).toString(),
      state: Faker.random.alphaNumeric(),
    };
    try {
      const result = await useCase.execute(authProps);

      expect(result.isRight).toBeTruthy();
      expect(result.value.isSuccess).toBeTruthy();
      expect(result.value.getValue()).toEqual({ token: randomJwt });
    } catch (err) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBeFalsy();
  });
});
