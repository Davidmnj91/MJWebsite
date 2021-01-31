import { categoryRepository } from '../persistance';
import { CategoryService } from './CategoryService';

const categoryService = new CategoryService(categoryRepository);

export { categoryService };
