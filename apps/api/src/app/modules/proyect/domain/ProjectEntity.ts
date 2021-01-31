import { Photo, Project } from '@mj-website/api-interfaces';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../../core/domain/BaseEntity';
import { NamedEntity } from '../../../core/domain/NamedEntity';
import { CategoryEntity } from '../../category/domain/CategoryEntity';
import { ClientEntity } from '../../client/domain/ClientEntity';
import { MediaEntity } from '../../media/domain/MediaEntity';

@Entity()
export class ProjectEntity extends NamedEntity implements Project {
  @OneToOne((type) => ClientEntity)
  @JoinColumn()
  client: ClientEntity;

  @OneToOne((type) => CategoryEntity)
  @JoinColumn()
  category: CategoryEntity;

  @OneToMany((type) => PhotoEntity, (photo) => photo.project, { cascade: true })
  photos: PhotoEntity[];
}

@Entity()
@Unique('project_order', ['project', 'order'])
export class PhotoEntity extends BaseEntity implements Photo {
  @Column()
  order: number;

  @ManyToOne(() => ProjectEntity, (project) => project.photos, { onDelete: 'CASCADE' })
  project: ProjectEntity;

  @OneToOne((type) => MediaEntity, (media) => media.id, { onDelete: 'CASCADE' })
  file: MediaEntity;
}
