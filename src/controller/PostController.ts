import { Request, Response } from 'express'
import { PostBusiness } from '../business/PostBusiness'

export class PostController {
    public async create(req: Request, res: Response) {
        const { content } = req.body

        try {
            if (typeof content !== 'string') {
                throw new Error("content must be a string!")
            }

            const postBusiness = new PostBusiness()

            await postBusiness.create(content, 'u001')

            res.status(201).send({ message: "created" })
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

    public async getAll(req: Request, res: Response) {
        try {
            const postBusiness = new PostBusiness()
            const result = await postBusiness.getAll()

            res.status(200).send(result)
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