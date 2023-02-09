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
import { Photo } from './Photo.model';
import { Account } from './Account.model';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations

  @ManyToOne(() => Child, (child) => child.albums)
  child: Child;

  @ManyToOne(() => Account, (account) => account.albums)
  account: Account;

  @OneToMany(() => Photo, (photo) => photo.album)
  photos: Photo[];
}
