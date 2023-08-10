import { Request, Response } from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { PostDB, PostUpdate } from '../types'
import { BaseError } from '../errors/BaseError'
import { BadRequestError } from '../errors/BadRequestError'
import { postUpdateSchema } from '../dtos/postUpdate.dto'
import { ZodError } from 'zod'

export class PostController {
    public async create(req: Request, res: Response) {
        const { content } = req.body

        try {
            if (typeof content !== 'string') {
                throw new BadRequestError("content must be a string!")
            }

            const postBusiness = new PostBusiness()

            await postBusiness.create(content, 'u001')

            res.status(201).send({ message: "created" })
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

    public async getAll(req: Request, res: Response) {
        try {
            const postBusiness = new PostBusiness()
            const result = await postBusiness.getAll()

            res.status(200).send(result)
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

    public async update(req: Request, res: Response) {
        try {
            
            const input = postUpdateSchema.parse({
                id: req.params.id,
                content: req.body.content
            })

            const postBusiness = new PostBusiness()
            await postBusiness.update(input)

            
            res.status(200).send({message: "Updated"})
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

    public async delete(req: Request, res: Response){
        try {
            const {id} = req.params

            const postBusiness = new PostBusiness
            await postBusiness.delete(id)

            res.status(200).send({message: "Post deletado."})
            
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