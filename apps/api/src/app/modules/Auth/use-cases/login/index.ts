import { authService } from '../../services';
import { LoginController } from './LoginController';
import { LoginUseCase } from './LoginUseCase';

const loginUseCase = new LoginUseCase(authService);

const loginController = new LoginController(loginUseCase);

export { loginController };
