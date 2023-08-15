import express from 'express'
import { UserController } from '../controller/UserController'
import { UserBusiness } from '../business/UserBusiness'
import { UserDatabase } from '../database/UserDatabase'

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(new UserDatabase())
)

userRouter.post('/signup', userController.create)
userRouter.get('/', userController.getAllUsers)
userRouter.post('/login', userController.login)