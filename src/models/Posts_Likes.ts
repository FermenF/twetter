import { 
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Posts } from "./Posts";
import { User } from './User';

@Entity('posts_likes')

export class Posts_Likes extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne((type) => Posts, (posts) => posts.id)
    post: Posts

    @ManyToOne((type) => User, (user) => user.posts_like)
    user: User

    @Column({default: 1})
    like:number

   
}