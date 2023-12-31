import express, { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { BaseError } from '../errors/BaseError'
import { userCreateSchema } from '../dtos/userCreate.dto'
import { ZodError } from 'zod'
import { userLoginSchema } from '../dtos/userLogin.dto'

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ){}
    public create= async (req: Request, res: Response): Promise<void> =>{
        try {

            const input = userCreateSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
     
            const output = await this.userBusiness.create(input)

            res.status(201).send(output)

        } catch (error) {
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            }else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public getAllUsers = async(req: Request, res: Response): Promise<void>=>{
        try {
            const output = await this.userBusiness.getAllUsers()

            res.status(200).send(output)

        } catch (error) {
            console.log(error);
            
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public login= async (req: Request, res: Response): Promise<void> =>{
        try {

            const input = userLoginSchema.parse({
                email: req.body.email,
                password: req.body.password
            })

            
            const output = await this.userBusiness.login(input)

            res.status(200).send(output)

        } catch (error) {
            if(error instanceof ZodError){
                res.status(400).send(error.issues)
            }else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


}