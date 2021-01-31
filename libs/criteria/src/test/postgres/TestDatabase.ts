import { createConnection, getConnection } from 'typeorm';
import { TestEntity } from './TestEntity';

const connection = {
  async create() {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'mjwebsitetest',
      entities: [TestEntity],
      dropSchema: true,
      synchronize: true,
      logging: false,
    });
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    const entityDeletionPromises = entities.map((entity) => async () => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
    await Promise.all(entityDeletionPromises);
  },
};
export default connection;
