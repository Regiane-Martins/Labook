import express from 'express'
import { UserController } from '../controller/UserController'
import { PostController } from '../controller/PostController'

export const postRouter = express.Router()

const postController = new PostController()

postRouter.post('/', postController.create)
postRouter.get('/', postController.getAll)
postRouter.put('/:id', postController.update)
postRouter.delete('/:id', postController.delete)