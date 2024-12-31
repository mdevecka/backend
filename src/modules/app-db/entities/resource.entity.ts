import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User, UserId } from './user.entity';
import { ID, MimeType } from '@common/helpers';

export type ResourceId = ID<"Resource">;

@Entity()
@Index(['name', 'userId'], { unique: true })
export class Resource extends BaseEntity {

  id: ResourceId;

  @Column('text')
  name: string;

  @Column({ type: "bytea", select: false })
  data: Buffer;;

  @Column({ type: "text" })
  mimeType: MimeType;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  userId: UserId;

  @Column({ type: 'boolean', default: false })
  public: boolean

}
