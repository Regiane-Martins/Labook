import express from 'express'
import { UserController } from '../controller/UserController'
import { PostController } from '../controller/PostController'
import { PostBusiness } from '../business/PostBusiness'
import { PostDatabase } from '../database/PostDatabase'

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(new PostDatabase())
)

postRouter.post('/', postController.create)
postRouter.get('/', postController.getAll)
postRouter.put('/:id', postController.update)
postRouter.delete('/:id', postController.delete)