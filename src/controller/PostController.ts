import { Request, Response } from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { BaseError } from '../errors/BaseError'
import { BadRequestError } from '../errors/BadRequestError'
import { postUpdateSchema } from '../dtos/postUpdate.dto'
import { ZodError } from 'zod'

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }
    public create = async (req: Request, res: Response) => {
        const { content } = req.body

        try {
            if (typeof content !== 'string') {
                throw new BadRequestError("content must be a string!")
            }



            await this.postBusiness.create(content, 'u001')

            res.status(201).send({ message: "created" })
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {

            const result = await this.postBusiness.getAll()

            res.status(200).send(result)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public update = async (req: Request, res: Response) => {
        try {

            const input = postUpdateSchema.parse({
                id: req.params.id,
                content: req.body.content
            })


            await this.postBusiness.update(input)


            res.status(200).send({ message: "Updated" })
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            await this.postBusiness.delete(id)

            res.status(200).send({ message: "Post deletado." })

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}