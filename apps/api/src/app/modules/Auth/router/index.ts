import { Router } from 'express';
import { loginController } from '../use-cases/login';

const authRouter: Router = Router();

authRouter.get('/login', (req, res) => loginController.execute(req, res));

export { authRouter };
