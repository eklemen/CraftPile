import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Album } from './Album.model';
import { Photo } from './Photo.model';
import { Account } from './Account.model';

@Entity()
export class Child {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  dateOfBirth: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations

  @OneToMany(() => Album, (album) => album.child)
  albums: Album[];

  @OneToMany(() => Photo, (photo) => photo.child)
  photos: Photo[];

  @ManyToOne(() => Account, (account) => account.children)
  account: Account;
}
