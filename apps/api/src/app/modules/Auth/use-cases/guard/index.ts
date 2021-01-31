import { authService } from '../../services';
import { AuthGuardMiddleware } from './AuthGuardMiddleware';
import { AuthGuardUseCase } from './AuthGuardUseCase';

const authGuardUseCase = new AuthGuardUseCase(authService);

const authGuardMiddleware = new AuthGuardMiddleware(authGuardUseCase);

export { authGuardMiddleware };
