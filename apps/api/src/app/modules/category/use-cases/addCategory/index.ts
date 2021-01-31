import { mediaService } from '../../../media/services';
import { categoryService } from '../../services';
import { CreateCategoryController } from './AddCategoryController';
import { AddCategoryUseCase } from './AddCategoryUseCase';

const addCategoryUseCase = new AddCategoryUseCase(categoryService, mediaService);

const createAddCategoryController = new CreateCategoryController(addCategoryUseCase);

export { createAddCategoryController };
