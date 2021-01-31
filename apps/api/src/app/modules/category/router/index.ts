import { Router } from 'express';
import { authGuardMiddleware } from '../../auth/use-cases/guard';
import { createAddCategoryController } from '../use-cases/addCategory';
import { deleteCategoryController } from '../use-cases/deleteCategory';
import { editCategoryController } from '../use-cases/editCategory';
import { pageCategoriesController } from '../use-cases/pageCategories';
import { retrieveCategoriesController } from '../use-cases/retrieveCategories';
import { retrieveCategoryByIdController } from '../use-cases/retrieveCategoryById';

const categoryRouter: Router = Router();

categoryRouter.get('/:id', (req, res) => retrieveCategoryByIdController.execute(req, res));
categoryRouter.post('/list', (req, res) => retrieveCategoriesController.execute(req, res));
categoryRouter.post('/paged', (req, res) => pageCategoriesController.execute(req, res));
categoryRouter.post('/', (req, res) => createAddCategoryController.execute(req, res));
categoryRouter.put('/:id', authGuardMiddleware.execute, (req, res) => editCategoryController.execute(req, res));
categoryRouter.delete('/:id', authGuardMiddleware.execute, (req, res) => deleteCategoryController.execute(req, res));

export { categoryRouter };
