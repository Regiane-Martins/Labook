import express, { Request, Response } from "express";
import cors from 'cors';
import { UserController } from "./controller/UserController";

const app = express()

app.use(express.json());
app.use(cors())

app.listen(3003, () => {
    console.log("servidor rodando na porta 3003")
})

const userController = new UserController()

app.post('/users/signup', userController.signup)
app.get('/users', userController.getAllUsers)
app.post('/users/login', userController.login)