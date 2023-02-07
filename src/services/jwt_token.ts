import jwt from "jsonwebtoken";
import moment from "moment";
import { User } from '../models/User';
import { HttResponse } from '../shared/response/http.response';

export default {
    encode: (user:User) => {
        try {
            const payload = {
                id: user.id,
                name: user.name,
                last_name: user.last_name,
                createToken: moment().unix(),
                exp: moment().add(6, "hours").unix()
            };
            const token = jwt.sign(payload, String(process.env.TOKEN_SECRET));
            return token;
        } catch (error) {
            console.log(error);
        }
    },

    refresh: (user:User) => {
        try {
            const payload = {
                id: user.id,
                exp: moment().add(7, "days").unix()
            };
            const refresh_token = jwt.sign(payload, String(process.env.TOKEN_SECRET))
            return refresh_token;
        } catch (error) {
            console.log(error);
        }
    },

    decode: (token:string) => {
        try {
            const token_decode:any = jwt.decode(token, {complete: true}); 
            return token_decode;
        } catch (error) {
            console.log(error);
        }
    }
}