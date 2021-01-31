import * as express from 'express';
import { authRouter } from '../../modules/auth/router';
import { categoryRouter } from '../../modules/category/router';
import { clientRouter } from '../../modules/client/router';
import { mediaRouter } from '../../modules/media/router';
import { projectRouter } from '../../modules/proyect/router';

const v1Router = express.Router();

v1Router.use('/', authRouter);
v1Router.use('/clients', clientRouter);
v1Router.use('/categories', categoryRouter);
v1Router.use('/media', mediaRouter);
v1Router.use('/projects', projectRouter);

// All routes go here

export { v1Router };
