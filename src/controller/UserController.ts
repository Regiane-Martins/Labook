import express, { Request, Response } from 'express'
import { UserCreate, UserLogin } from '../types'
import { UserBusiness } from '../business/UserBusiness'
import { BaseError } from '../errors/BaseError'

export class UserController {
    public async create(req: Request, res: Response): Promise<void> {
        try {

            const input: UserCreate = {
                id: req.body.id as string,
                name: req.body.name as string,
                email: req.body.email as string,
                password: req.body.password as string,
            }

            const userBusiness = new UserBusiness()
            const output = await userBusiness.create(input)

            res.status(201).send(output)

        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {

            const userBusiness = new UserBusiness()
            const output = await userBusiness.getAllUsers()

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
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
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


}