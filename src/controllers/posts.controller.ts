import { Request, Response } from "express";
import { Posts } from "../models/Posts"
import { HttResponse, PaginateResponse, HttResponseError, HttResponseActionError } from '../shared/response/http.response';
import { getUser } from '../shared/auth/userId';
import { Posts_Likes } from '../models/Posts_Likes';
import { AppDataSource } from '../database/connection';

function getAuthor(req: Request) {
    const token: string = String(req.headers.authorization?.split(" ")[1]);
    return getUser(token);
}

export default {

    addNewPosts: async (req: Request, res: Response) => {
        try {
            const { content, photos } = req.body;

            const posts: Posts = new Posts();
            posts.author = getAuthor(req);
            posts.content = content;
            posts.photos = photos;

            await posts.save().then(() => {
                return HttResponse(res, 200, [], 'Your tweter has been published.')
            }).catch((error) => {
                return HttResponseActionError(res, error)
            });

        } catch (error) {
            return HttResponseError(res, error);
        }
    },

    userPosts: async (req: Request, res: Response) => {
        try {
            const page: number = parseInt(req.query.page as any) || 1;
            const perPage: number = 15;

            const [posts, total] = await AppDataSource.getRepository(Posts)
                .createQueryBuilder('posts')
                .where('posts.author = :author', { author: getAuthor(req) })
                .offset((page - 1) * perPage).limit(perPage)
                .loadRelationCountAndMap('posts_likes.likes', 'posts.likes')
                .orderBy('created_at', 'DESC')
                .getManyAndCount();

            if (posts) {
                return PaginateResponse(res, 200, posts, total, page, perPage, 'User twets')
            }
            return HttResponse(res, 404, [], 'No recent posts');

        } catch (error) {
            return HttResponseError(res, error);
        }
    },

    userLikePost: async (req: Request, res: Response) => {
        try {
            const like = new Posts_Likes();
            const { post_id } = req.body;
            like.post = post_id;
            like.user = getAuthor(req);

            if (post_id) {
                like.save().then(() => {
                    res.sendStatus(200);
                }).catch(error => {
                    console.log(error);
                    return HttResponseActionError(res, error);
                });
            }

        } catch (error) {
            return HttResponseError(res, error);
        }
    },

    userDisLikePost: async (req: Request, res: Response) => {
        try {
            const { id, post_id } = req.body;
            await Posts_Likes.findOneOrFail({
                where: {
                    id: id
                },
                relations:{
                    user: true,
                    post: true
                }
            }).then((like) =>{
                if(like.user.id == getAuthor(req) && like.post.id == post_id ){
                    return like.remove().then(() =>{{
                       return res.sendStatus(200);
                    }})
                    .catch(() => {
                        return res.sendStatus(400);
                    });
                }

                return HttResponseActionError(res);

            }).catch(error =>{
                return HttResponseActionError(res, error);
            });

        } catch (error) {

        }
    },

}