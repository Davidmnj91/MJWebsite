import { categoryService } from '../../services';
import { RetrieveCategoryByIdController } from './RetrieveCategoryByIdController';
import { RetrieveCategoryByIdUseCase } from './RetrieveCategoryByIdUseCase';

const retrieveCategoryByIdUseCase = new RetrieveCategoryByIdUseCase(categoryService);

const retrieveCategoryByIdController = new RetrieveCategoryByIdController(retrieveCategoryByIdUseCase);

export { retrieveCategoryByIdController };
