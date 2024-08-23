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
routes.get("/get_all", authMiddleware, postController.getAll)
routes.get("/get_all_users", authMiddleware, postController.getAllUsers)


export {routes}