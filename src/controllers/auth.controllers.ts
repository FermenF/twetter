import { NextFunction, Request, Response } from "express";
import { User } from '../models/User';
import { HttResponse, HttResponseError } from '../shared/response/http.response';
import jwt_service from "../services/jwt_token";
import bcrypt from 'bcrypt';
import { PostgresErrorCode, ValidationUnique } from '../shared/validations/validations.errors';

export default {
    signup: async (req: Request, res: Response) => {
        try {
            const user: User = new User();
            const { name, last_name, username, email, password, phone, confirm_password } = req.body;

            if (password != confirm_password) {
                return HttResponse(res, 400, [], "Password and confirm password does not match.");
            } else {
                const salt = bcrypt.genSaltSync(10);
                user.name = name; 
                user.last_name = last_name; 
                user.username = username;
                user.email = email; 
                user.password = bcrypt.hashSync(password, salt);
                user.phone = phone;

                await user.save().then(() => {
                    
                    return HttResponse(res, 200, [], "Register successful.");
                    
                }).catch(error => {
                    if(error.code == PostgresErrorCode.UniqueViolation){
                        const msg = ValidationUnique(error.constraint);
                        return HttResponse(res, 400, [], msg, error);
                    }else{
                        return HttResponse(res, 400, [], "Error creating your account.", error.detail);
                    }
                });
            }
        } catch (error) {
            return HttResponseError(res, error);
        }
    },

    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            await User.findOneOrFail({
                where: {
                    email: email
                }, select: ['id', 'name', 'last_name','email', 'password']
            }).then((user: User) => {
                if (!bcrypt.compareSync(password, user.password)) {
                    return HttResponse(res, 404, [], "Creadentials doesn't match.");
                }
                const token = jwt_service.encode(user);
                // const refresh_token = jwt_service.refresh(user);
                return res.status(200).json({
                    message: 'Login Successful',
                    token: token,
                    // refresh_token: refresh_token
                });

            }).catch(() => {
                return HttResponse(res, 404, [], "Creadentials doesn't match.");
            });

        } catch (error) {
            return HttResponseError(res, error);
        }
    },

    logout: async (req: Request, res: Response, next: NextFunction) => {
    },

};