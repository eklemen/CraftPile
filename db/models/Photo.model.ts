import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Child } from './Child.model';
import { Album } from './Album.model';
import { Account } from './Account.model';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bucketName: string;

  @Column()
  objectKey: string;

  @Column()
  thumbnailKey: string;

  @Column()
  description: string;

  @Column()
  dateOfPhoto: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations

  @ManyToOne(() => Child, (child) => child.photos)
  child: Child;

  @ManyToOne(() => Album, (album) => album.photos)
  album: Album;

  @ManyToOne(() => Account, (account) => account.photos)
  account: Account;
}
