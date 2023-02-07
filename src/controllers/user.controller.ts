import { Request, Response } from "express";
import { User } from "../models/User";
import { HttResponseError } from '../shared/response/http.response';

export default {

    showUserPost:async (req:Request, res:Response) => {
        try {
            const page: number = parseInt(req.query.page as any) || 1;
            const perPage: number = 15;
            const username = req.params.username;

            const user = await User.find({
                where:{
                    username: username
                },
                relations:{
                    posts: true
                },
                select:['posts']
            }).then((UserAndPosts) =>{
                console.log(UserAndPosts);
            }).catch(() =>{

            });

        } catch (error) {
            return HttResponseError(res, error);
        }
    }

};