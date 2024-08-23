import { Request, Response } from "express"
import jwt, {JwtPayload} from 'jsonwebtoken'
import prisma from "../../prisma/db"


type RequestWithUser = Request&{
    user?: string | JwtPayload | any
}
export class PostController{
    public async index(request:RequestWithUser, response: Response){
        const {id} = request.user
        console.log(id)
        const posts = await prisma.post.findMany({
            where:{
                authorId:id
            }
        })
        return response.json(posts)
    }
    public async store(request:RequestWithUser, response: Response){
        const {title} = request.body
        const {id} = request.user
        const post = await prisma.post.create({
            data:{
                title:title,
                authorId:id
            }
        })
        return response.json(post)
    }
    public async getAll(request: RequestWithUser, response:Response){
        const posts = await prisma.post.findMany()
        return response.json(posts)
    }
    public async getAllUsers(request:RequestWithUser, response:Response){
        const allUsers = await prisma.user.findMany()
        return response.json(allUsers)
    }
}