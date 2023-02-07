import jwt_service from "../../services/jwt_token";
import { HttResponseError } from '../response/http.response';

export function getUser(token:string){
    try {
        return jwt_service.decode(String(token))?.payload.id;
    } catch (error) {
        console.log(error);
    }
}