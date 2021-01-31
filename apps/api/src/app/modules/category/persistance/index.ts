import { getConnection } from 'typeorm';
import { PgCategoryRepository } from './PgCategoryRepository';

const categoryRepository = getConnection().getCustomRepository(PgCategoryRepository);

export { categoryRepository };
