import { categoryService } from '../../services';
import { RetrieveCategoriesController } from './RetrieveCategoriesController';
import { RetrieveCategoriesUseCase } from './RetrieveCategoriesUseCase';

const retrieveCategoriesUseCase = new RetrieveCategoriesUseCase(categoryService);

const retrieveCategoriesController = new RetrieveCategoriesController(retrieveCategoriesUseCase);

export { retrieveCategoriesController };
