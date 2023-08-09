import express from 'express'
import { UserController } from '../controller/UserController'

export const userRouter = express.Router()

const userController = new UserController()

userRouter.post('/signup', userController.create)
userRouter.get('/', userController.getAllUsers)
userRouter.post('/login', userController.login)