import {Router} from 'express'
import { authMiddleware } from '../Middleware/Auth'
import { registerController } from '../Controllers/RegisterController'
import { signinController } from '../Controllers/signinController'
import { PostController } from '../Controllers/PostController'

const routes = Router()
const postController = new PostController()
routes.post("/register", registerController)
routes.post("/signin", signinController)


routes.post("/post", authMiddleware, postController.store)
routes.get("/post", authMiddleware, postController.index)

export {routes}