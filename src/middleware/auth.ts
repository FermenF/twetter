import { NextFunction, Request, Response } from "express";
import jwt_service from "../services/jwt_token";
import { HttResponse, HttResponseError } from '../shared/response/http.response';
import moment from "moment";

export default {
    checkAuth: async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.headers.authorization) {
                return HttResponse(res, 403, [], "Please login to continue.");
            }

            const token = req.headers.authorization.split(" ")[1];
            var payload: any = jwt_service.decode(token);

            if (payload?.exp <= moment().unix()) {
                return HttResponse(res, 401, [], "Token expired, Please login to continue.")
            }

            next();
        } catch (error) {
            return HttResponseError(res, error);
        }
    }
}