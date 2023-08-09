import { Request, Response } from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { PostDB, PostUpdate } from '../types'

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

    public async update(req: Request, res: Response) {
        try {
            const input: PostUpdate = {
                id: req.params.id,
                content: req.body.content as string
            }

            const postBusiness = new PostBusiness()
            await postBusiness.update(input)

            
            res.status(200).send({message: "Updated"})
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

    public async delete(req: Request, res: Response){
        try {
            const {id} = req.params

            const postBusiness = new PostBusiness
            await postBusiness.delete(id)

            res.status(200).send({message: "Post deletado."})
            
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