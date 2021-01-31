import { ConnectionOptions } from 'typeorm';
import { CategoryEntity } from '../../modules/category/domain/CategoryEntity';
import { ClientEntity } from '../../modules/client/domain/ClientEntity';
import { MediaEntity } from '../../modules/media/domain/MediaEntity';
import { PhotoEntity, ProjectEntity } from '../../modules/proyect/domain/ProjectEntity';

export const connectionOpts = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [ClientEntity, CategoryEntity, MediaEntity, ProjectEntity, PhotoEntity],
  synchronize: true,
  logging: false,
} as ConnectionOptions;
