import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type TestProps = {
  name: string;
  description: string;
  age: number;
};

export interface Test extends TestProps {
  id: string;
  created_at?: Date;
  updated_at?: Date;
}

@Entity()
export class TestEntity implements Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  age: number;

  /**
   * DB insert time.
   */
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  /**
   * DB last update time.
   */
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date;
}
