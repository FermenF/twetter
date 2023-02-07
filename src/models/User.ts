import { 
    BaseEntity,
    Column, 
    CreateDateColumn,
    Entity, 
    Index, 
    OneToMany, 
    OneToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

import { 
    IsEmail, Length
} from "class-validator";

import { Posts } from './Posts';
import { Posts_Likes } from './Posts_Likes';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    last_name:string;

    @Column()
    @Length(3, 30)
    @Index('UQ_user_username', { unique: true })
    username:string;

    @Column({select: false})
    @IsEmail()
    @Index('UQ_user_email', { unique: true })
    email:string;

    @Column({select: false})
    password:string;

    @Column({select: false})
    @Index('UQ_user_phone', { unique: true })
    phone:string;

    @OneToMany((type) => Posts, (posts) => posts.author)
    posts: Posts[];

    @OneToMany((type) => Posts_Likes, (post_likes) => post_likes.user)
    posts_like: Posts_Likes

    @CreateDateColumn()
    created_at:Date;
    
    @UpdateDateColumn()
    updated_at:Date;
}