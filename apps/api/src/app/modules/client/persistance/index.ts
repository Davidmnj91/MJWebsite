import { getConnection } from 'typeorm';
import { PgClientRepository } from './PgClientRepository';

const clientRepository = getConnection().getCustomRepository(PgClientRepository);

export { clientRepository };
