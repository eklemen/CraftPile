import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.model';
import { Album } from './Album.model';
import { Photo } from './Photo.model';
import { Child } from './Child.model';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.account)
  users: User[];

  @OneToMany(() => Album, (album) => album.account)
  albums: Album[];

  @OneToMany(() => Photo, (photo) => photo.account)
  photos: Photo[];

  @OneToMany(() => Child, (child) => child.account)
  children: Child[];
}
