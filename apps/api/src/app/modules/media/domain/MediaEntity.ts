import { FileMediaType, Media } from '@mj-website/api-interfaces';
import { Column, Entity } from 'typeorm';
import { NamedEntity } from '../../../core/domain/NamedEntity';

@Entity()
export class MediaEntity extends NamedEntity implements Media {
  @Column()
  path: string;

  @Column()
  original_name: string;

  @Column({ type: 'enum', enum: ['PHOTO', 'VIDEO'] })
  type: FileMediaType;

  @Column()
  mimeType: string;
}
