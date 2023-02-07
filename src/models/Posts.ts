import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    QueryBuilder,
    UpdateDateColumn
} from "typeorm";

import { User } from "./User";
import { Posts_Likes } from './Posts_Likes';
import { AppDataSource } from '../database/connection';

@Entity('posts')
export class Posts extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => User, (user) => user.posts)
    author: User

    @Column()
    content: string

    @Column("simple-array")
    photos: string[]

    @OneToMany((type) => Posts_Likes, (like) => like.post)
    likes:[] 

    @CreateDateColumn()
    created_at:Date;
    
    @UpdateDateColumn()
    updated_at:Date;
}