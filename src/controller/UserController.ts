import express, { Request, Response } from 'express'
import { UserCreate, UserLogin } from '../types'
import { UserBusiness } from '../business/UserBusiness'

export class UserController {
    public async signup(req: Request, res: Response): Promise<void> {
        try {

            const input: UserCreate = {
                id: req.body.id as string,
                name: req.body.name as string,
                email: req.body.email as string,
                password: req.body.password as string,
            }

            const userBusiness = new UserBusiness()
            const output = await userBusiness.signup(input)

            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {

            const userBusiness = new UserBusiness()
            const output = await userBusiness.getAllUsers()

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {

            const input: UserLogin = {
                email: req.body.email,
                password: req.body.password
            }

            const userBusiness = new UserBusiness()
            const output = await userBusiness.login(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}