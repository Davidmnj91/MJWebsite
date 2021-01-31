import { categoryService } from '../../services';
import { EditCategoryController } from './EditCategoryController';
import { EditCategoryUseCase } from './EditCategoryUseCase';

const editCategoryUseCase = new EditCategoryUseCase(categoryService);

const editCategoryController = new EditCategoryController(editCategoryUseCase);

export { editCategoryController };
