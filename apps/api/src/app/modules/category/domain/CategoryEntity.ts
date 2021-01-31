import { Category } from '@mj-website/api-interfaces';
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { NamedEntity } from '../../../core/domain/NamedEntity';
import { MediaEntity } from '../../media/domain/MediaEntity';

@Entity()
export class CategoryEntity extends NamedEntity implements Category {
  @OneToOne((type) => MediaEntity, { cascade: true })
  @JoinColumn()
  cover: MediaEntity;

  @ManyToOne((type) => CategoryEntity, (category) => category.children)
  parent_id: CategoryEntity;

  @OneToMany((type) => CategoryEntity, (category) => category.parent_id)
  children: CategoryEntity[];
}
