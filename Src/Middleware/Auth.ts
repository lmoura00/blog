import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from 'jsonwebtoken'
import { SECRET_KEY } from "../Controllers/signinController";

type RequestWithUser = Request&{
    user?: string | JwtPayload
}

export function authMiddleware(request: RequestWithUser, response:Response, next:NextFunction){
    const token = request.headers['authorization']
    if(!token){
        return response.json({erro:"Token não fornecido"})
    }
    try{
        const decoded = jwt.verify(token, SECRET_KEY)
        //console.log(decoded)
        request.user = decoded
        next()
    } catch (error){
        return response.json({erro:"Token Inválido"})
    }
}