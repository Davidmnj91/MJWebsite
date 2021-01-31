import { mediaService } from '../../../media/services';
import { categoryService } from '../../services';
import { DeleteCategoryController } from './DeleteCategoryController';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryService, mediaService);

const deleteCategoryController = new DeleteCategoryController(deleteCategoryUseCase);

export { deleteCategoryController };
