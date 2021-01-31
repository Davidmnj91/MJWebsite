import { categoryService } from '../../services';
import { PageCategoriesController } from './PageCategoriesController';
import { PageCategoriesUseCase } from './PageCategoriesUseCase';

const pageCategoriesUseCase = new PageCategoriesUseCase(categoryService);

const pageCategoriesController = new PageCategoriesController(pageCategoriesUseCase);

export { pageCategoriesController };
