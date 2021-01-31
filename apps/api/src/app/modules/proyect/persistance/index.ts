import { getConnection } from 'typeorm';
import { PgProjectRepository } from './PgProjectRepository';

const projectRepository = getConnection().getCustomRepository(PgProjectRepository);

export { projectRepository };
